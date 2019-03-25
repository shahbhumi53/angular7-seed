// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};
const domain = 'prospectbird.auth0.com';
const apiURI = 'https://crmgang.com/';
const clientId = 'hMnBewO9tcLMqM1_yusPFDKUrNdWr5jm';
const stripeKey = 'pk_test_gPA51N21tmN6tYXdAa48hdZB';

export const environment = {
  production: false,
  BASE_URI: getHost(),
  BASE_API: apiURI,
  CLIENT_ID: clientId,
  STRIPE_KEY: stripeKey,
  DOMAIN: domain
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
