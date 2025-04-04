import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest, graphConfig } from '../config/auth';

class AuthService {
  constructor() {
    this.msalInstance = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) {
      return;
    }

    try {
      this.msalInstance = new PublicClientApplication(msalConfig);
      await this.msalInstance.initialize();
      
      // Handle the redirect promise
      const response = await this.msalInstance.handleRedirectPromise();
      
      this.initialized = true;
      
      if (response) {
        // If we have a response, we came back from a redirect
        return response;
      }

      // Check if we have any accounts
      const accounts = this.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        return accounts[0];
      }

    } catch (error) {
      console.error('Error during MSAL initialization:', error);
      throw error;
    }
  }

  async ensureInitialized() {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  async login() {
    try {
      await this.ensureInitialized();
      const loginRequest = {
        scopes: ['User.Read'],
        prompt: 'select_account'
      };
      
      return await this.msalInstance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.ensureInitialized();
      return await this.msalInstance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin
      });
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  async getUserInfo() {
    try {
      await this.ensureInitialized();
      const account = this.msalInstance.getAllAccounts()[0];
      if (!account) {
        throw new Error('No active account');
      }

      const response = await this.msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account
      });

      const headers = new Headers();
      headers.append('Authorization', `Bearer ${response.accessToken}`);

      const options = {
        method: 'GET',
        headers: headers
      };

      const graphResponse = await fetch(graphConfig.graphMeEndpoint, options);
      return await graphResponse.json();
    } catch (error) {
      console.error('Error getting user info:', error);
      throw error;
    }
  }

  async isAuthenticated() {
    await this.ensureInitialized();
    return this.msalInstance.getAllAccounts().length > 0;
  }

  async getAccount() {
    await this.ensureInitialized();
    return this.msalInstance.getAllAccounts()[0];
  }
}

export default new AuthService(); 