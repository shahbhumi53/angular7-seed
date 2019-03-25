import { environment } from '../../../../environments/environment';

interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
  isSignUp: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: `${ environment.CLIENT_ID }`,
  domain: `${ environment.DOMAIN }`,
  callbackURL: `${ environment.BASE_URI }/layout/search-person`,
  apiUrl: `${ environment.BASE_API }`,
  isSignUp: `http://myapp.com/signed_up`
};
