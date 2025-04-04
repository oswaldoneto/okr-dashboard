import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser';
import { msalConfig, loginRequest, graphConfig } from '../config/auth';

class AuthService {
  constructor() {
    this.msalInstance = null;
    this.initialize();
  }

  async initialize() {
    if (!this.msalInstance) {
      this.msalInstance = new PublicClientApplication(msalConfig);
      await this.msalInstance.initialize();
      
      // Handle the redirect flow
      try {
        const response = await this.msalInstance.handleRedirectPromise();
        if (response) {
          return response;
        }
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    }
    return null;
  }

  async ensureInitialized() {
    if (!this.msalInstance) {
      await this.initialize();
    }
  }

  async login() {
    try {
      await this.ensureInitialized();
      return await this.msalInstance.loginPopup({
        ...loginRequest,
        prompt: 'select_account'
      });
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.ensureInitialized();
      await this.msalInstance.logoutPopup({
        postLogoutRedirectUri: window.location.origin,
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
      if (error instanceof InteractionRequiredAuthError) {
        const response = await this.msalInstance.acquireTokenPopup(loginRequest);
        if (response) {
          return this.getUserInfo();
        }
      }
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