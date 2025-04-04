export const msalConfig = {
  auth: {
    clientId: '995158a7-09a1-4d00-99b7-fc1eb2152d96',
    authority: 'https://login.microsoftonline.com/0b96ca9f-6c9e-411d-8d12-fc299ece8307',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true
  },
  system: {
    allowNativeBroker: false,
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
  }
};

export const loginRequest = {
  scopes: ['User.Read']
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me'
}; 