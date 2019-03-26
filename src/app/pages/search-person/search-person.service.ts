import { Injectable } from '@angular/core';
import { BingHttpclientService } from '../../shared/services/httpclient/bing-httpclient.service';
import { Subject } from 'rxjs';
import { LeadgenEmailService } from '../../shared/services/httpclient/leadgen-email.service';
import { NamePartPipe } from '../../shared/pipes/name-part.pipe';
import { AssetsListService } from '../../shared/services/httpclient/assets-list.service';
import { UtilsService } from '../../shared/services/utils/utils.service';
import { Asset } from '../../shared/model/asset.model';
import { Page } from '../../shared/model/page.model';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { AnalyticsService } from '../../shared/services/analytics/analytics.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class SearchPersonService {

  searchBtnClickSubject = new Subject<any>();
  namePart = new NamePartPipe();

  constructor(
    private assetService: AssetsListService,
    private leadgen: LeadgenEmailService,
    private bing: BingHttpclientService,
    private notification: NotificationService,
    private analytics: AnalyticsService) {
  }

  searchPerson(fullname = '', role = '', company = '', country = '', tagsString = '', pageNumber = '1') {

    this.bing.searchPerson(fullname, role, company, country, tagsString, pageNumber)
      .then((response) => {
        if (response.results) {
          // -- pagination settings
          let page = new Page();
          // -- total number of records is mentioned in API response
          page.totalElements = response.totalResults ? ((response.totalResults > 100) ?  100 : response.totalResults) : 100;
          // -- in response, page number starts from 1
          // -- in ngx-datatable, page count starts from 0
          page.pageNumber = parseInt(response.currentPage) - 1;
          // -- total records divided by number of records to show in a single page
          page.totalPages = (page.totalElements / page.size);
          const asset = [];
          response.results.forEach((data) => {
            asset.push(this.assetService.createAsset(data, null));
          });
          this.searchBtnClickSubject.next({
            error: false,
            persons: asset,
            country: country,
            page: page
          });
        } else {
          console.error('SearchPersonService : searchPerson : bing.searchPerson : error : results key not found');
        }
      })
      .catch((error) => {
        this.searchBtnClickSubject.next({error: true, message: 'Invalid data. Please try again with correct data.'});
      })
  }

  getAndDisplayBulkEmail(data: any, fullName: string, company: string, country: string, sendGeneralCountry: boolean, riskyEmail: boolean, listId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.assetService.live_findEmailBulk(fullName, company, country, sendGeneralCountry)
        .then((response) => {
          let obj: any;
          // -- risky email decides whether to display/add email or not
          // -- exclude all the email where status is predicted when risky email checkbox is unchecked
          if(response !== null && (riskyEmail || response.status === 'valid' || response.status === 'extravalid')) {
            obj = {
              error: false,
              emailFound: true,
              message: 'Email is found',
              info: response
            }
            const asset = this.assetService.updateAsset(data, null, { response : response }, 'email');
            this.assetService.postAssetInList([asset], listId)
              .then((response) => { })
              .catch((error) => { })
            resolve(obj)
          } else {
            obj = {
              error: false,
              emailFound: false,
              message: 'Email is not found',
              info: null
            }
            resolve(obj)
          }
        })
        .catch((error) => {
          console.error('SearchPersonService : getAndDisplayBulkEmail : live_findEmailBulk : error : ', error);
          reject()
        });
    })
  }
  getAndDisplayEmail(data: any, riskyEmail: boolean, listId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      // -- extract full name and company name to get email
      // const fullName = this.namePart.transform(data.name, 0);
      // const company = this.namePart.transform(data.name, 2);
      // const role = this.namePart.transform(data.name, 1);

      const fullName = data.full_name ? data.full_name.toString().trim().toLowerCase() : null;
      const company = data.company_name ? data.company_name.toString().trim().toLowerCase() : null;
      const role = data.role;

      if (fullName !== null && fullName.length > 0 && company !== null && company.length > 0){
        // -- find country from linkedin url
        const country = UtilsService.determineCountryFromLinkedin(data.linkedin_url);
        // -- call to get email
        // -- if full name and company is not null then only call email API
        this.leadgen.getEmail(fullName, company, country)
          .then((response) => {
            if (!response.error && response.response && (response.response.emails || response.response.email)) {
              // -- email found and create asset with email data
              const asset = riskyEmail ? this.assetService.updateAsset(data, null, response, 'email') : (response.response.status === 'valid' || response.response.status === 'extravalid') ? this.assetService.updateAsset(data, null, response, 'email') : this.assetService.updateAsset(data, null, null, 'email');
              // const asset = riskyEmail ? this.assetService.createAsset(data, response) : (response.response.status === 'valid' || response.response.status === 'extravalid') ? this.assetService.createAsset(data, response) : this.assetService.createAsset(data);
              this.assetService.postAssetInList([asset], listId);

              // -- do not send email response if email is predicted and riskyEmail is unchecked
              if (riskyEmail) {
                resolve({ error: false, emailFound: true, message: 'Email is found', info: response })
              }
              else {
                // -- check email status
                if(response.response.status === 'valid' || response.response.status === 'extravalid' || response.response.status === 'ultravalid') {
                  resolve({ error: false, emailFound: true, message: 'Email is found', info: response })
                }
                else {
                  resolve({ error: false, emailFound: true, message: 'Email is found', info: null })
                }
              }
            } else if (!response.error) {
              // -- create asset without email data
              // const asset = this.assetService.createAsset(data);
              const asset = this.assetService.updateAsset(data, null, null, 'email');
              this.assetService.postAssetInList([asset], listId);
              resolve({
                error: false,
                emailFound: false,
                message: 'Email is not found',
                info: response
              })
            }
          }).catch((error) => {
          console.error('SearchPersonService : getEmail : error : ', error);
          // -- create asset without email data1
          let asset = this.assetService.updateAsset(data, null, null, 'email');
          // const asset = this.assetService.createAsset(data);
          this.assetService.postAssetInList([asset], listId);
          resolve({
            error: false,
            emailFound: false,
            message: '',
            info: error
          })
        });
      } else {
        console.error('SearchPersonService : getEmail : error : Invalid full name and company');
        reject({
          error: true,
          emailFound: false,
          message: 'SearchPersonService : getEmail : error : Invalid full name and company',
          info: null
        })
      }
    })
  }

  getAndDisplayPhone(data: any, listId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      // extract first name, company name and last name to get phone
      const fullName = data.full_name ? data.full_name.toString().trim().toLowerCase() : null;
      const company = data.company_name ? data.company_name.toString().trim().toLowerCase() : null;
      const firstName = fullName.split(' ')[0];
      const lastName = fullName.substring(firstName.length).trim();

      // -- call ultra API
      this.leadgen.getPhone(data.linkedin_url)
        .then((response) => {
          // -- check if response found in ultra call
          if (response) {
            if (response[0].phones.length === 0) {
              // -- if phone is not found from ultra(pipl) API then call supra(lusha) api
              this.leadgen.getPhoneByLusha(firstName, lastName, company)
                .then((responseByLusha) => {
                  // track, send response
                  this.analytics.trackUnsuccessfulPhoneSearch(null, null, firstName, lastName, company, {firstName: firstName, lastName: lastName, company: company},responseByLusha, `${ environment.BASE_API }v1/phone/supra?first_name=${firstName}&last_name=${lastName}&company=${company}&property_name=phoneNumbers`);
                  if (responseByLusha) {
                    responseByLusha[0].lusha = true;
                    const asset = this.assetService.updateAsset(data, responseByLusha[0], null, 'phone');
                    this.assetService.postAssetInList([asset], listId);
                    resolve({
                      error: false,
                      Found: true,
                      message: 'Phone is found',
                      info: asset
                    })
                  } else {
                    resolve({
                      error: false,
                      message: 'Phone is not found',
                      info: responseByLusha
                    })
                  }
                })
            } else {
              // -- phone found in ultra(pipl) API call
              // -- set supra(lusha) flag
              response[0].lusha = false;
              // -- update asset with phone data
              const asset = this.assetService.updateAsset(data, response[0], null, 'phone');
              // -- add asset to the list
              this.assetService.postAssetInList([asset], listId);
              resolve({
                error: false,
                Found: true,
                message: 'Phone is found',
                info: asset
              })
            }
          } else {
            // -- response is not found in ultra call
            // -- calling supra(lusha) API
            this.leadgen.getPhoneByLusha(firstName, lastName, company)
              .then((responseByLusha) => {
                // track, send response
                this.analytics.trackUnsuccessfulPhoneSearch(null, null, firstName, lastName, company, {firstName: firstName, lastName: lastName, company: company}, responseByLusha, `${ environment.BASE_API }v1/phone/supra?first_name=${firstName}&last_name=${lastName}&company=${company}&property_name=phoneNumbers`);
                if (responseByLusha) {
                  // -- if response found in supra then set supra(lusha) flag
                  responseByLusha[0].lusha = true;
                  // -- update asset
                  const asset = this.assetService.updateAsset(data, responseByLusha[0], null, 'phone');
                  // -- add asset in list
                  this.assetService.postAssetInList([asset], listId);
                  resolve({
                    error: false,
                    Found: true,
                    message: 'Phone is found',
                    info: asset
                  })
                } else {
                  // -- phone data is not found in supra
                  resolve({
                    error: false,
                    message: 'Phone is not found',
                    info: responseByLusha
                  })
                }
              })
          }
        }).catch((error) => {
        if (error.status === 400 && error.error.code === 'no_remaining_credit' ) {
          this.analytics.trackPhoneSearchWithoutQuota({firstName: firstName, lastName: lastName, company: company},`${ environment.BASE_API }v1/phone/supra?first_name=${firstName}&last_name=${lastName}&company=${company}&property_name=phoneNumbers`);
        }
        console.error('SearchPersonService : getPhone : error : ', error);
        reject({
          error: error,
          emailFound: false,
          message: 'Phone is not Found',
          info: error
        })
      });
    })
  }

  getEmailAddedAssets(data: any, riskyEmail: boolean): Promise<Asset> {
    return new Promise((resolve, reject) => {
      // extract full name and company name to get email
      const fullName = data.full_name;
      const company = data.company_name;
      const role = data.role;

      if (fullName !== null && fullName.length > 0 && company !== null && company.length > 0) {
        // -- find country from linkedin url
        const country = UtilsService.determineCountryFromLinkedin(data.linkedin_url);
        // -- call to get email
        this.leadgen.getEmail(fullName, company, country)
          .then((response) => {
            if (!response.error && response.response && (response.response.emails || response.response.email)) {
              // email found and create asset with email data
              const asset = riskyEmail ? this.assetService.updateAsset(data, null, response, 'email') : (response.response.status === 'valid' || response.response.status === 'extravalid') ? this.assetService.updateAsset(data, null, response, 'email') : this.assetService.updateAsset(data, null, null, 'email');
              // const asset = riskyEmail ? this.assetService.createAsset(data, response) : (response.response.status === 'valid' || response.response.status === 'extravalid') ? this.assetService.createAsset(data, response) : this.assetService.createAsset(data);
              resolve(asset)
            } else if (!response.error) {
              // create asset without email data
              const asset = this.assetService.updateAsset(data, null, null, 'email');
              // const asset = this.assetService.createAsset(data);
              resolve(asset)
            }
          }).catch((error) => {
          console.error('SearchPersonService1 : getEmail : error : ', error);
          // create asset without email data
          const asset = this.assetService.updateAsset(data, null, null, 'email');
          // const asset = this.assetService.createAsset(data);
          resolve(asset)
        });
      } else {
        console.error('SearchPersonService : getEmail : error : Invalid full name and company');
        reject(null)
      }
    })
  }

  addAssets(data: any, riskyEmail: boolean, listId: number): Promise<any> {
    return new Promise<any>((resolve,reject) => {
      const promises = [];
      data.forEach(person => {
        const promise = this.getEmailAddedAssets(person, riskyEmail);
        promises.push(promise);
      });

      Promise.all(promises)
        .then((assets: Asset[]) => {
          this.assetService.postAssetInList(assets, listId);
          resolve();
        })
        .catch((error) => {
          console.error('SearchPersonService : addContacts : getEmailAddedAsset : error : ', error);
          reject();
        })
    })
  }
  // -- call from search-section component for get data from social urls
  searchBySocialURL(linkedinurl, facebookurl) {
    if (linkedinurl) {
      // -- if linkedin url present then getPhone function call with linkedin url
      this.leadgen.getPhone(linkedinurl).then((response) => {
        if (response[0].phones.length === 0) {
          if (facebookurl) {
            // -- not received result from linkedin url and facebook url present then getPhone function call with facebook url.
            this.leadgen.getPhone(facebookurl).then((responseByFacebooklink) => {
              if (responseByFacebooklink) {
                const asset = this.assetService.createPhoneAsset(null, responseByFacebooklink[0], 'social'); // --convert data to asset
                this.searchBtnClickSubject.next({
                  error: false,
                  persons: asset,
                  from: 'socialurl'
                });
              }
            }).catch((error) => {
              this.searchBtnClickSubject.next({error: true});
            });
          }
        }
        if (response[0].phones.length !== 0) {
          const asset = this.assetService.createPhoneAsset(null, response[0], 'social');
          this.searchBtnClickSubject.next({
            error: false,
            persons: asset,
            from: 'socialurl'
          });
        }
      }).catch((error) => {
        this.searchBtnClickSubject.next({error: true});
      });
    } else {
      this.leadgen.getPhone(facebookurl).then((responseByFacebooklink) => {
        if (responseByFacebooklink) {
          const asset = this.assetService.createPhoneAsset(null, responseByFacebooklink[0], 'social'); // --convert data to asset
          this.searchBtnClickSubject.next({
            error: false,
            persons: asset,
            from: 'socialurl'
          });
        } else {
          this.searchBtnClickSubject.next({error: true});
        }
      }).catch((error) => {
        this.searchBtnClickSubject.next({error: true});
      });
    }
  }
  // -- call from possible persions component for add contact in to list
  addContactToList(contact, id) {
    this.assetService.postAssetInList([contact], id);
  }

  // -- create new list
  createList(result: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (result !== null) {
        const list = this.assetService.createList(result);
        this.assetService.postList(list)
          .then((response) => {

            // -- notify success
            this.notification.notifySuccess('List is added');

            resolve()
          })
          .catch((error) => {
            console.error('searchPersionService : createList : postList : error', error);
            reject()
          })
      } else {
        console.error('searchPersionService : createList : postList : error : result is empty');
        reject()
      }
    })
  }

}
