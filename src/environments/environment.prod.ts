const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};
const domain = 'prospectbird.auth0.com';
const clientId = 'onVq1L51x1i11Qs2R7D3Ji2B8Fibexjt';
const stripeKey = 'pk_live_aXANVTDYZw8xewS7ETP24lmu';
const apiURI = 'https://crmgang.com/';
export const environment = {
  production: true,
  BASE_URI: getHost(),
  BASE_API: apiURI,
  CLIENT_ID: clientId,
  STRIPE_KEY: stripeKey,
  DOMAIN: domain
};
