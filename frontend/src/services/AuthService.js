import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, loginRequest, graphConfig } from '../config/auth';

class AuthService {
  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  async initialize() {
    try {
      const response = await this.msalInstance.handleRedirectPromise();
      if (response) {
        return response;
      }
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  async login() {
    try {
      return await this.msalInstance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.msalInstance.logoutRedirect();
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  async getUserInfo() {
    try {
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

  isAuthenticated() {
    return this.msalInstance.getAllAccounts().length > 0;
  }

  getAccount() {
    return this.msalInstance.getAllAccounts()[0];
  }
}

export default new AuthService(); 