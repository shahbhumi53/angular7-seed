import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../../environments/environment';
import { UtilsService } from '../utils/utils.service';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable()
export class StripeService {

  constructor(private auth: AuthService,
              private httpClient: HttpClient,
              private analytics: AnalyticsService) { }

  addCreditCard(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if(!this.auth.isAuthenticated()) {
        alert('User is not authenticated');
        this.auth.logout();
      } else {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          alert('Access token must exist to get Email');
          this.auth.logout();
        }
        const headers: HttpHeaders = new HttpHeaders({
          'authorization': `Bearer ${ accessToken }`
        });
        const apiUrl = `${ environment.BASE_API }v1/user/payment`;
        const cardId = data.id ? data.id : null;
        if (cardId === null) {
          reject({
            error: {
              description: 'Card id is null.'
            }
          })
        }
        this.httpClient.post(apiUrl, { token: cardId }, { headers: headers })
          .toPromise()
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            error.status === 201 ? resolve('Card added successfully') : reject({error: { description: 'Card id is null.'}})
          })
      }
    })
  }

  checkSubscription(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if(!this.auth.isAuthenticated()) {
        alert('User is not authenticated');
        this.auth.logout();
      } else {
        const accessToken = localStorage.getItem(UtilsService.KEY_ACCESSTOKEN);
        if (!accessToken) {
          alert('Access token must exist to get Email');
          this.auth.logout();
        }
        const headers: HttpHeaders = new HttpHeaders({
          'authorization': `Bearer ${ accessToken }`
        });
        const apiUrl = `${ environment.BASE_API }v1/user/subscription`;
        this.httpClient.get(apiUrl, {headers: headers})
          .toPromise()
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      }
    })
  }

  subscribeLeadGen(plan: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if(!this.auth.isAuthenticated()) {
        alert('User is not authenticated');
        this.auth.logout();
      } else {
        const accessToken = localStorage.getItem(UtilsService.KEY_ACCESSTOKEN);
        if (!accessToken) {
          alert('Access token must exist to get Email');
          this.auth.logout();
        }
        const headers: HttpHeaders = new HttpHeaders({
          'authorization': `Bearer ${ accessToken }`
        });
        const apiUrl = `${ environment.BASE_API }v1/user/${ plan.endpoint }`;

        this.httpClient.post(apiUrl, plan.postParam, {headers: headers})
          .toPromise()
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            if (error.status === 201) {
              this.analytics.trackPurchaseEvent(plan)
              resolve('Subscribed successfully')
            } else  {
              reject(error)
            }
          })
      }
    })
  }

  buyPhoneCredits(noOfCredits: number, plan: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if(!this.auth.isAuthenticated()) {
        alert('User is not authenticated');
        this.auth.logout();
      } else {
        const accessToken = localStorage.getItem(UtilsService.KEY_ACCESSTOKEN);
        if (!accessToken) {
          alert('Access token must exist to get Email');
          this.auth.logout();
        }
        const headers: HttpHeaders = new HttpHeaders({
          'authorization': `Bearer ${ accessToken }`
        });
        const apiUrl = `${ environment.BASE_API }v1/user/${ plan.endpoint }`;

        this.httpClient.post(apiUrl, plan.postParam, {headers: headers})
          .toPromise()
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            (error.status === 201) ? resolve('Successful transaction') : reject(error)
          })
      }
    })
  }
}
