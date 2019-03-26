import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { AuthService} from '../auth/auth.service';
import { Router} from '@angular/router';

import { environment} from '../../../../environments/environment';
import { UtilsService} from '../utils/utils.service';
import { AnalyticsService} from '../analytics/analytics.service';
import { NotificationService} from '../notification/notification.service';

@Injectable()
export class LeadgenEmailService {

  constructor(private auth: AuthService,
              private router: Router,
              private httpClient: HttpClient,
              private analytics: AnalyticsService,
              private notification: NotificationService) {
  }

  getEmail(fullName = '', company = '', country = 'general'): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.auth.isAuthenticated()) {
        alert('User is not authenticated');
        this.auth.logout();
      } else {
        const accessToken = localStorage.getItem(UtilsService.KEY_ACCESSTOKEN);
        if (!accessToken) {
          alert('Access token must exist to get Email');
          this.auth.logout();
        }
        const headers: HttpHeaders = new HttpHeaders({
          'authorization': `Bearer ${accessToken}`
        });
        const apiUrl = `${environment.BASE_API}v1/leadgen/leadgen?company=${company}&full_name=${fullName}&country=${country}`;
        this.httpClient.get(encodeURI(apiUrl), {headers: headers})
          .toPromise()
          .then(
            (response: HttpResponse<any>) => {
              if (response === null) {
                resolve({
                  error: false,
                  isAuthenticated: this.auth.isAuthenticated(),
                  message: 'Email not found',
                  response: response
                })
              } else {
                // -- successful Email searched is tracked
                this.analytics.trackEmailSearch({
                  socialUrl: null,
                  firstName: fullName.split(' ')[0],
                  lastName: fullName.split(' ')[1],
                  company: company,
                  country: country
                }, response, apiUrl);
                resolve({
                  error: false,
                  isAuthenticated: this.auth.isAuthenticated(),
                  message: 'all good',
                  response: response
                })
              }
            },
            (error) => {
              if (error.error && error.error.code === 'monthly_limit_exceeds_free_plan') {
                this.analytics.trackemailSearchWithoutQuata({
                  firstName: fullName !== null ? (fullName).trim().split(' ')[0] : null,
                  lastName: fullName !== null ? (fullName).trim().split(' ')[1] : null,
                  company: company !== null ? company : null,
                  country: country !== null ? country : 'general'
                }, error, apiUrl);
                this.notification.notifyFailure('You\'ve reached your email search limit on the free plan, upgrade to continue');
                reject({
                  error: true,
                  isAuthenticated: this.auth.isAuthenticated(),
                  message: 'You\'ve reached your email search limit on the free plan, upgrade to continue',
                  response: null
                })
              }
              reject({
                error: true,
                isAuthenticated: this.auth.isAuthenticated(),
                message: error && error.error && error.error.Message,
                response: null
              })
            }
          );

      }
    });
  }

  getPhone(linkedUrl): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.auth.isAuthenticated()) {
        alert('User is not authenticated');
        this.auth.logout();
      } else {
        const accessToken = localStorage.getItem(UtilsService.KEY_ACCESSTOKEN);
        if (!accessToken) {
          alert('Access token must exist to get Email');
          this.auth.logout();
        }
        const headers: HttpHeaders = new HttpHeaders({
          'authorization': `Bearer ${accessToken}`
        });
        const apiUrl = `${environment.BASE_API}v1/phone/ultra?url=` + linkedUrl;
        return this.httpClient.get(encodeURI(apiUrl), {headers: headers})
          .toPromise()
          .then(
            (response: HttpResponse<any>) => {
              // -- successful phone searched is tracked
              this.analytics.trackPhoneSearch({
                socialUrl: linkedUrl,
                emailAddress: null,
                firstName: null,
                lastName: null,
                company: null
              }, response, apiUrl);
              resolve(response)
            },
            (error) => {
              // check error status and code
              // if they are 400 and no_remaining_credit
              // call analytics
              // this.analytics.trackPhoneSearchWithoutQuota();
              if (error.status === 400 && error.error.code === 'no_remaining_credit') {
                this.analytics.trackPhoneSearchWithoutQuota({
                  socialUrl: linkedUrl,
                  emailAddress: null,
                  firstName: null,
                  lastName: null,
                  company: null
                }, apiUrl);
              }
              console.error('LeadgenService : getPhone : error : ', error);
              reject(error)
            }
          )
      }
    });
  }

  getPhoneByLusha(firstName, lastName, company): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.auth.isAuthenticated()) {
        alert('User is not authenticated');
        this.auth.logout();
      } else {
        const accessToken = localStorage.getItem(UtilsService.KEY_ACCESSTOKEN);
        if (!accessToken) {
          alert('Access token must exist to get Email');
          this.auth.logout();
        }
        const headers: HttpHeaders = new HttpHeaders({
          'authorization': `Bearer ${accessToken}`
        });
        const apiUrl = `${environment.BASE_API}v1/phone/supra?first_name=${firstName}&last_name=${lastName}&company=${company}&property_name=phoneNumbers`;
        this.httpClient.get(encodeURI(apiUrl), {headers: headers})
          .toPromise()
          .then(
            (response: HttpResponse<any>) => {
              // -- successful phone searched is tracked
              this.analytics.trackPhoneSearch({
                socialUrl: null,
                emailAddress: null,
                firstName: firstName,
                lastName: lastName,
                company: company
              }, response, apiUrl);
              resolve(response)
            },
            (error) => {
              if (error.status === 400 && error.error.code === 'no_remaining_credit') {
                this.analytics.trackPhoneSearchWithoutQuota({
                  socialUrl: null,
                  emailAddress: null,
                  firstName: firstName,
                  lastName: lastName,
                  company: company
                }, apiUrl);
              }
              console.error('LeadgenService : getPhoneByLusha : error : ', error);
              reject(error)
            }
          )
      }
    });
  }

  cerebroSearchForCerebro(data: any, from: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.auth.isAuthenticated()) {
        alert('User is not authenticated');
        this.auth.logout();
      } else {
        const accessToken = localStorage.getItem(UtilsService.KEY_ACCESSTOKEN);
        if (!accessToken) {
          alert('Access token must exist');
          this.auth.logout();
        }
        const headers: HttpHeaders = new HttpHeaders({
          'authorization': `Bearer ${accessToken}`
        });
        let apiUrl = `${environment.BASE_API}v1/phone/ultra?`;
        switch (from) {
          case 'socialUrl':
            apiUrl = apiUrl + `url=${data.socialUrl}`;
            break;
          // -- firstName, lastName, country = flc
          case 'flc':
            let countryData = data.country !== '' ? UtilsService.getCountryDetail(data.country) : UtilsService.getCountryDetail(UtilsService.DefaultCountry);
            if (countryData.URLSubStr === '' || countryData.URLSubStr === null) {
              countryData = UtilsService.getCountryDetail(UtilsService.DefaultCountry);
            }
            apiUrl = apiUrl + `first_name=${data.firstName}&last_name=${data.lastName}&country=${countryData.URLSubStr}`;
            break;

          case 'email':
            apiUrl = apiUrl + `email=${data.email}`;
            break;

          default:
            console.error('LeadgenEmailService : cerebroSearchForCerebro : error : default case detected');
            reject('Default case detected')
        }
        // -- if no landline number checbox is checked then add &match_requirements=phone.mobile with api
        if (data.chk_lendline_no === true) {
          apiUrl += '&match_requirements=phone.mobile'
        }
        // apiUrl = '/assets/data/cerebri-flc-alice-zagury-response.json';
        this.httpClient.get(encodeURI(apiUrl.toLowerCase()), {headers: headers})
          .toPromise()
          .then((response: HttpResponse<any>) => {
              // -- successful phone search is tracked
              this.analytics.trackPhoneSearch({
                socialUrl: data.socialUrl ? data.socialUrl : null,
                emailAddress: data.email ? data.email : null,
                firstName: data.firstName ? data.firstName : null,
                lastName: data.lastName ? data.lastName : null,
                company: null
              }, response, apiUrl);
              resolve(response)
            },
            (error) => {
              if (error.status === 400 && error.error.code === 'no_remaining_credit') {
                this.analytics.trackPhoneSearchWithoutQuota({
                  socialUrl: data.socialUrl ? data.socialUrl : null,
                  emailAddress: data.email ? data.email : null,
                  firstName: data.firstName ? data.firstName : null,
                  lastName: data.lastName ? data.lastName : null,
                  company: null
                }, apiUrl);
              }
              console.error('LeadgenService : cerebroSearchForCerebro : error : ', error);
              reject(error)
            }
          )
      }
    });
  }

  getCompaniesClearbit(val: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const apiUrl = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${val}`;
      this.httpClient.get(apiUrl)
        .toPromise()
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
