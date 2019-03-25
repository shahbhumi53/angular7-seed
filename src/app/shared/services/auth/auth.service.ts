import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../utils/utils.service';
// import { AnalyticsService } from '../analytics/analytics.service';
import * as LogRocket from 'logrocket';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.apiUrl,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid profile read:messages'
  });

  constructor(public router: Router,
              private httpClient: HttpClient,
              // private analyticsService: AnalyticsService
  ) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
          .then((data) => {
            this.router.navigate(['/layout/search-person']);
          })
          .catch((error) => {
            console.error('Error : ', error);
            alert(`Error: Some error occurred. Please try again.`);
            this.logout();
          });
      } else if (err !== null && err.errorDescription === 'verify-email') {
        this.router.navigate(['/errors/verify-email']);
      } else if (err !== null && err.errorDescription === 'invalid-email-domain') {
        this.router.navigate(['/errors/invalid-email-domain']);
      } else if (err !== null && err.errorDescription === 'too-many-account-with-email-domain') {
        this.router.navigate(['/errors/many-accounts']);
      } else if (err !== null && err.errorDescription === 'mail-detected-in-domain-name') {
        this.router.navigate(['/errors/mail-detected']);
      } else if (err !== null && err.errorDescription === 'edu-in-email-domain-found') {
        this.router.navigate(['/errors/edu-detected']);
      } else if (err !== null && err.errorDescription === 'marketing-email-detected') {
        this.router.navigate(['/errors/marketing-email']);
      } else if (err !== null && err.errorDescription === 'paiement-failed') {
        this.router.navigate(['/errors/paiement-failed']);
      } else if (err !== null ) {
        console.error('handleAuthentication : unidentified error : ', err);
        this.router.navigate(['/errors/generic']);
      }
    });
  }

  private setSession(authResult): Promise<any> {
    return new Promise((resolve, reject) => {
      // -- Set the time that the access token will expire at
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem(UtilsService.KEY_ACCESSTOKEN, authResult.accessToken);
      localStorage.setItem(UtilsService.KEY_IDTOKEN, authResult.idToken);
      localStorage.setItem(UtilsService.KEY_EXPIRESAT, expiresAt);

      this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
        if (err) {
          reject();
        }
        // -- store user_id in local storage
        // -- user id needed in anyalytics
        localStorage.setItem(UtilsService.KEY_USERID, profile.sub);
        localStorage.setItem(UtilsService.KEY_USERNAME, profile.name);

        if (profile && profile[AUTH_CONFIG.isSignUp]) {
          console.log('User has signed up');
          // this.analyticsService.trackUserSignup(profile);
        } else {
          // this.analyticsService.trackUserSignup(profile);
          console.log('User has logged in');
        }
        // -- idetify user for log rocket
        this.identifyUserForLogRocket();
        // -- stores user's list and id of first(default list) in local storage
        this.storeDefaultListId();
        // -- to log user identity in segment debugger
        // this.analyticsService.identifyUser();
        resolve();
      });
    });
  }

  public logout(): void {
    // -- Remove tokens and expiry time from localStorage
    localStorage.removeItem(UtilsService.KEY_ACCESSTOKEN);
    localStorage.removeItem(UtilsService.KEY_IDTOKEN);
    localStorage.removeItem(UtilsService.KEY_EXPIRESAT);
    localStorage.removeItem(UtilsService.KEY_BINGSEARCHSTRING);
    localStorage.removeItem(UtilsService.KEY_USERNAME);
    localStorage.removeItem(UtilsService.KEY_USERID);
    localStorage.removeItem(UtilsService.KEY_DEFAULTLISTID);
    localStorage.removeItem(UtilsService.KEY_USERLISTS);
    // -- Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // -- Check whether the current time is past the
    // -- access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem(UtilsService.KEY_EXPIRESAT));
    return new Date().getTime() < expiresAt;
  }

  public storeDefaultListId(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const apiUrl = `${ environment.BASE_API }v1/list`;
      const accessToken = localStorage.getItem(UtilsService.KEY_ACCESSTOKEN);
      const headers: HttpHeaders = new HttpHeaders({
        authorization: `Bearer ${ accessToken }`
      });

      this.httpClient.get(apiUrl, {headers})
        .toPromise()
        .then((response) => {
          if (response && response[0].id) {
            // localStorage.setItem(UtilsService.KEY_USERLISTS, JSON.stringify(response));
            // localStorage.setItem(UtilsService.KEY_DEFAULTLISTID, response[0].id);
            if (UtilsService.storeSortedLists(response) && UtilsService.storeDefaultListId(response)) { resolve(); } else {
              alert('Some error occurred. Please try again');
              this.logout();
            }
          } else {
            console.error('AuthService : storeDefaultListId : Invalid Response');
            alert('Some error occurred. Please try again');
            this.logout();
            reject();
          }
        })
        .catch((error) => {
          console.error('AuthService : storeDefaultListId : error', error);
          alert('Some error occurred. Please try again');
          this.logout();
        });
    });
  }

  public identifyUserForLogRocket() {
    const userEmail = localStorage.getItem(UtilsService.KEY_USERNAME) ? localStorage.getItem(UtilsService.KEY_USERNAME) : null;
    LogRocket ? LogRocket.identify(userEmail, { email: userEmail, subscriptionType: 'pro' }) : console.error('Logrocket init error');
  }
}
