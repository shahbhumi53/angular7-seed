import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class BingHttpclientService {

  constructor(private httpClient: HttpClient,
              private auth: AuthService,
              private analytics: AnalyticsService,
              private cs: CookieService) {
  }

  searchPerson(fullname = '', role = '', company = '', country = '', tagString = '', pagenumber = '1'): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const q = UtilsService.generateQParam(fullname, role, company, tagString);
      if (!q) {
        reject({error: true, message: 'Invalid data'});
      }


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
          Authorization : `Bearer ${ accessToken }`,
          'Content-Type': 'application/json'
        });

        const countryData = UtilsService.getCountryDetail(country);

        let apiUrl = 'https://nrcl9babgb.execute-api.us-east-2.amazonaws.com/test2/database/results_cache';
        if (this.sendRGPDParam()) {
          apiUrl = 'https://nrcl9babgb.execute-api.us-east-2.amazonaws.com/test2/database/results_cache?gpdr=true';
        }

        const data = {
          keywords: tagString ? tagString : '',
          country: countryData.countryCodeForGRes ? countryData.countryCodeForGRes.toLowerCase() : '',
          fullname: fullname ? fullname : '',
          company: company ? company : '',
          location: '',
          role: role ? role : '',
          page: pagenumber
        };
        // this.httpClient.get('/assets/data/newGoogleApi.json')
        // this.httpClient.get('/assets/data/newBing.json')
        this.httpClient.post(apiUrl, data, {headers})
          .toPromise()
          .then(
            (response) => {
              resolve(response);
            },
            (error) => {
              reject();
              this.analytics.trackSearchOverQuota(data);
            }
          );
      }
    });

    return promise;
  }

  sendRGPDParam(): boolean {
    if (this.cs.get('settings')) {
      const settings = JSON.parse(this.cs.get('settings'));
      return settings.RGPD;
    } else if (UtilsService.AppSettings.RGPD) {
      return UtilsService.AppSettings.RGPD;
    } else {
      return false;
    }
  }
}
