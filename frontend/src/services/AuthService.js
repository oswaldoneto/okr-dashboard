import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser';
import { msalConfig, loginRequest, graphConfig } from '../config/auth';

class AuthService {
  constructor() {
    this.msalInstance = new PublicClientApplication(msalConfig);
  }

  async initialize() {
    await this.msalInstance.initialize();
    await this.msalInstance.handleRedirectPromise();
  }

  async login() {
    try {
      const loginResponse = await this.msalInstance.loginPopup(loginRequest);
      if (loginResponse) {
        return loginResponse;
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.msalInstance.logoutPopup();
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
      if (error instanceof InteractionRequiredAuthError) {
        await this.login();
        return this.getUserInfo();
      }
      throw error;
    }
  }

  isAuthenticated() {
    return this.msalInstance.getAllAccounts().length > 0;
  }
}

export default new AuthService(); 