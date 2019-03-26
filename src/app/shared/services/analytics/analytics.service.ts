/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { Angulartics2Segment } from 'angulartics2/segment';
import { UtilsService } from '../utils/utils.service';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AnalyticsService {
  phoneCredit;
  constructor(private analytics: Angulartics2Segment,
              private httpClient: HttpClient) { }
  // -- track - search data entered by user on search page
  trackBingSearch(fullName: string, role: string, company: string, country: string, allWord: string[], anyWord: string[], noneWord: string[], linkedinUrl: string , fbUrl: string) {
    this.analytics.setUserProperties({
      userId: localStorage.getItem(UtilsService.KEY_USERID),
      traits: {
        user: localStorage.getItem(UtilsService.KEY_USERNAME)
      }
    });
    this.analytics.eventTrack('bingSearchClick', {
      user: {
        id: localStorage.getItem(UtilsService.KEY_USERID)
      },
      searchData: {
        fullName,
        role,
        country,
        allOfTheseWords: allWord,
        anyOfTheseWords: anyWord,
        noneOfTheseWords: noneWord,
        facebookUrl: fbUrl,
        linkedinUrl
      }
    });
  }

  // -- track - search page is opened
  trackSearchPage() {
    this.analytics.setUserProperties({
      userId: localStorage.getItem(UtilsService.KEY_USERID),
      traits: {
        user: localStorage.getItem(UtilsService.KEY_USERNAME)
      }
    });
    this.analytics.eventTrack('track Search page', {
      user: {
        id: localStorage.getItem(UtilsService.KEY_USERID)
      }
    });
  }

  // -- identify - user for segment event tracking and intercom
  identifyUser() {
    const accessToken = localStorage.getItem(UtilsService.KEY_ACCESSTOKEN);
    let phoneCredit = '';
    const headers: HttpHeaders = new HttpHeaders({
      authorization: `Bearer ${ accessToken }`
    });
    const apiUrl = `${ environment.BASE_API }v1/user/subscription`;
    this.httpClient.get(apiUrl, {headers})
      .toPromise()
      .then((response: any) => {
        response.phone ? phoneCredit = response.phone : phoneCredit = '0';
        this.analytics.setUserProperties({
          userId: localStorage.getItem(UtilsService.KEY_USERID),
          phoneCredit,
          traits: {
            user: localStorage.getItem(UtilsService.KEY_USERNAME)
          }
        });
      })
      .catch((error) => {
        console.error('AnalyticsService : identifyUser : error', error);
      });

  }

  // -- track - each successful phone search is tracked
  trackPhoneSearch(searchQuery: any, searchResult: any, apiUrl: string) {
    // -- (searchResult.length > 0) added because of searchResult leng
    // -- (searchResult.length > 1) added to avoid error when called from cerebro page
    if ((searchResult !== null && (searchResult.length > 0) && (searchResult[0].phones || searchResult[0].phoneNumbers))) {
      if (searchResult[0].phones && searchResult[0].phones.length > 0) {
        this.analytics.eventTrack('Successful phone search', {
          userEmail: localStorage.getItem(UtilsService.KEY_USERNAME) ? localStorage.getItem(UtilsService.KEY_USERNAME) : null,
          searchQuery,
          searchResult,
          apiUrl
        });
      } else if (searchResult[0].phoneNumbers && searchResult[0].phoneNumbers.length > 0) {
        this.analytics.eventTrack('Successful phone search', {
          userEmail: localStorage.getItem(UtilsService.KEY_USERNAME) ? localStorage.getItem(UtilsService.KEY_USERNAME) : null,
          searchQuery,
          searchResult,
          apiUrl
        });
      }
    }
  }

  // -- track - each unSuccessful phone search is tracked
  trackUnsuccessfulPhoneSearch(socialUrl: string = null, emailAddress: string = null, firstName: string = null, lastName: string = null, company: string = null, searchQuery: any, searchResult: any, apiUrl: string) {
    if (!(searchResult !== null && (searchResult[0].phones && searchResult[0].phones.length > 0 ) || ( searchResult !== null && searchResult[0].phoneNumbers && searchResult[0].phoneNumbers.length > 0))) {
      this.analytics.eventTrack('Unsuccessful phone search', {
        userEmail: localStorage.getItem(UtilsService.KEY_USERNAME) ? localStorage.getItem(UtilsService.KEY_USERNAME) : null,
        socialUrl,
        emailAddress,
        firstName,
        lastName,
        company,
        searchQuery,
        searchResult,
        apiUrl
      });
    }
  }

  // -- track - first step of billing form filled
  trackBillingStepOne(data: any) {
    this.analytics.eventTrack('First step of billing form filled', {
      userEmail: localStorage.getItem(UtilsService.KEY_USERNAME) ? localStorage.getItem(UtilsService.KEY_USERNAME) : null,
      formData: data
    });
  }

  // -- track - each successful Email search is tracked
  trackEmailSearch(searchQuery: any, searchResult: any, apiUrl: string) {
    this.analytics.eventTrack('Successful Email search', {
      userEmail: localStorage.getItem(UtilsService.KEY_USERNAME) ? localStorage.getItem(UtilsService.KEY_USERNAME) : null,
      searchQuery,
      searchResult,
      apiUrl
    });
  }

  // -- track - each email search without quota
  trackemailSearchWithoutQuata(searchQuery: any, searchResult: any, apiUrl: string) {
    this.analytics.eventTrack('emails search without quota', {
      userEmail: localStorage.getItem(UtilsService.KEY_USERNAME) ? localStorage.getItem(UtilsService.KEY_USERNAME) : null,
      searchQuery,
      searchResult,
      apiUrl
    });
  }

  trackPhoneSearchWithoutQuota(searchQuery: any, apiUrl: string) {
    this.analytics.eventTrack('Phone search without quota', {
      userEmail: localStorage.getItem(UtilsService.KEY_USERNAME) ? localStorage.getItem(UtilsService.KEY_USERNAME) : null,
      searchQuery,
      apiUrl
    });
  }

  // -- track - *start use* button of pricing page clicked
  trackPricing() {
    this.analytics.eventTrack('Ask subscription', {
      userEmail: localStorage.getItem(UtilsService.KEY_USERNAME) ? localStorage.getItem(UtilsService.KEY_USERNAME) : null
    });
  }

  // -- track - data entered on cerebro search page
  trackCerebroSearchData(data: any) {
    this.analytics.eventTrack('cerebro search data', {
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.currentCountry,
      social_url: data.social_url,
      email: data.email,
      chk_lendline_no: data.chk_lendline_no
    });
  }

  // -- track - data when new user sign up
  trackUserSignup(profile) {
    this.analytics.eventTrack('User Signup', {
      profile
    });
  }

  // -- track - data purchase plan
  trackPurchaseEvent(plan) {
    this.analytics.eventTrack('Purchase Plan', {
      plan
    });
  }

  trackSearchOverQuota(data) {
    this.analytics.eventTrack('Google search over quota', {
      data,
    });
  }
}
