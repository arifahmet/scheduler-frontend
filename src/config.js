const CLIENT_ID = process.env.CLIENT_ID;
const ISSUER = process.env.ISSUER;
const BACKEND_URL = process.env.BACKEND_URL;
const REDIRECT_URL = process.env.REDIRECT_URL || 'https://scheduler-frontend-phi.vercel.app/implicit/callback';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URL ,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  backend: BACKEND_URL
};
