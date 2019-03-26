import { Injectable } from '@angular/core';
import { Asset } from '../../model/asset.model';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NamePartPipe } from '../../pipes/name-part.pipe';
import { List } from '../../model/list.model';
import { UtilsService } from '../utils/utils.service';
import { CookieService } from 'ngx-cookie-service';
import { AnalyticsService } from '../analytics/analytics.service';
import { NotificationService } from '../notification/notification.service';
import { Page } from '../../model/page.model';
import { delay } from "rxjs/operators";

@Injectable()
export class AssetsListService {

  namePart = new NamePartPipe();
  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private analytics: AnalyticsService,
    private notification: NotificationService) { }

  // -- email response can be null when email not found for that any full name and company data
  createAsset(data: any, emailResponse: any = null, createFrom = 'bing'): Asset {
    const asset = new Asset();
    let fullName, company, role;

    switch (createFrom) {
      case 'bing':
        fullName = data.name_id_database_id ? data.name_id_database_id : (data.full_name_database_id ? data.full_name_database_id : '');
        company = data.company_id_database_id ? data.company_id_database_id : (data.organization_database_id ? data.organization_database_id : '');
        role = data.role_secondary_database_id ? data.role_secondary_database_id : (data.role_third_database_id ? data.role_third_database_id : '');

        asset.email_perso =  (emailResponse !== null) ? ((emailResponse.response) ? ((emailResponse.response.emails || emailResponse.response.email) ? (emailResponse.response.emails ? emailResponse.response.emails[0].email : emailResponse.response.email) : null ) : (emailResponse.emails || emailResponse.email) ? (emailResponse.emails ? emailResponse.emails[0].email : emailResponse.email) : null) : null;
        asset.email_pro = (emailResponse !== null && (emailResponse.emails || emailResponse.email)) ?
          (emailResponse.emails ? (emailResponse.emails[1] ? emailResponse.emails[1].email : null) : emailResponse.email) : null;

        asset.status_of_email = (emailResponse !== null) ? ((emailResponse.response) ? (emailResponse.response.status  ? emailResponse.response.status : null ) : (emailResponse.status) ? emailResponse.status  : null) : null;
        asset.full_name = fullName;
        asset.company_name = company;
        asset.linkedin_url = data.profile_database_id ? data.profile_database_id : null;
        asset.role = role;
        asset.image_url = data.image_database_id ? data.image_database_id : null;
        asset.first_name = (asset.full_name ? (asset.full_name.split(' '))[0] : null);
        asset.last_name = (asset.full_name ? (asset.full_name.split(' '))[1] : null);

        asset.standard_phone_number = null;
        asset.personal_phone_number = null;
        // -- extra emails and phones are stored into custom field
        asset.custom_field = {
          phones: null,
          emails: [],
          created_from: 'email',
          phoneToDisplay: null,
          emailToDisplay: null,
          names: null,
          users_profile_images_url: null,
          socialmedia_profile_urls: null,
          relationships: null,
          addresses: null,
          gender: null,
          profile_images: null,
          languages: null,
          user_ids: null,
          educations: null,
          jobs: null,
          contactList: null,
          phoneswithtype: null,
          org_score: null,
          role_score: null,
          score: null
        };

        // -- for converting type of custom field emails from string to array
        if (emailResponse) {
          if (emailResponse.response) {
            if (emailResponse.response.emails || emailResponse.response.email) {
              if (emailResponse.response.emails)  {
                emailResponse.response.emails.forEach((email) => {
                  asset.custom_field.emails.push(email.email);
                });
              } else {
                asset.custom_field.emails.push(emailResponse.response.email);
              }
            }
          } else {
            if (emailResponse.emails || emailResponse.email) {
              if (emailResponse.emails) {
                emailResponse.emails.forEach((email) => {
                  asset.custom_field.emails.push(email.email);
                });
              } else {
                asset.custom_field.emails.push(emailResponse.email);
              }
            }
          }
        }
        // -- concat multiple emails by by pipe sign
        asset.custom_field.emailToDisplay = asset.custom_field.emails.toString().replace(/(,)/g, ' | ');
        break;

      case 'google':
        fullName = data.fn ? data.fn.toString().trim().toLowerCase() : null;
        company = data.org ? data.org.toString().trim().toLowerCase() : null;
        role = data.role ? data.role : null;

        asset.email_perso = (emailResponse !== null && (emailResponse.response.emails || emailResponse.response.email)) ? (emailResponse.response.emails ? emailResponse.response.emails[0].email : emailResponse.response.email) : null;
        asset.status_of_email = emailResponse !== null ? emailResponse.response.status : null;
        asset.full_name = fullName;
        asset.company_name = company;
        asset.country = data.country ? data.country : '';
        asset.linkedin_url = data.link ? data.link : null;
        asset.role = role;
        asset.image_url = data.openGraphImage ? (data.openGraphImage.contentUrl ? data.openGraphImage.contentUrl : null) : null;
        asset.first_name = (asset.full_name ? (asset.full_name.split(' '))[0] : null);
        asset.last_name = (asset.full_name ? (asset.full_name.split(' '))[1] : null);

        asset.standard_phone_number = null;
        asset.personal_phone_number = null;

        // -- extra emails and phones are stored into custom field
        asset.custom_field = {
          phones: null,
          emails: ((emailResponse !== null && (emailResponse.response.emails || emailResponse.response.email)) ? (emailResponse.response.emails ? emailResponse.response.emails : emailResponse.response.email) : null),
          created_from: 'email',
          phoneToDisplay: null,
          emailToDisplay: null,
          names: null,
          users_profile_images_url: null,
          socialmedia_profile_urls: null,
          relationships: null,
          addresses: null,
          gender: null,
          profile_images: null,
          languages: null,
          user_ids: null,
          educations: null,
          jobs: null,
          contactList: null,
          phoneswithtype: null,
          org_score: data.org_score ? data.org_score : null,
          role_score: data.role_score ? data.role_score : null,
          score: data.org_score * data.role_score
        };
        break;

      case 'cerebro':
        asset.full_name = data.names ? data.names[0] ? data.names[0].display : null : null;
        asset.first_name = data.names ? data.names[0] ? data.names[0].first : null : null;
        asset.last_name = data.names ? data.names[0] ? data.names[0].last : null : null;
        asset.country = data.addresses[0].country ? data.addresses[0].country : null;
        asset.image_url = (data.images ? (data.images[0] ? data.images[0].display : null) : null);
        // -- if image_url found null then generate base64 image with initial letters
        if (asset.image_url === null && asset.full_name !== null) {
          asset.image_url = UtilsService.getBase64ImgURL(asset.full_name);
        }
        asset.company_name = (data.jobs ? ( data.jobs[0] ? ( data.jobs[0].organization ? data.jobs[0].organization : null) : null) : null);
        asset.role = (data.jobs ? ( data.jobs[0] ? ( data.jobs[0].title ? data.jobs[0].title : null) : null) : null);
        asset.email_perso = null;
        asset.status_of_email = null;

        asset.standard_phone_number = data.phones ? data.phones[0] ? data.phones[0].display_international : null : null;
        asset.personal_phone_number = data.phones ? data.phones[1] ? data.phones[1].display_international : null : null;

        // -- for find facebook, linkedin and twitter url from multiple urls
        if (data.user_ids) {
          data.user_ids.forEach((url) => {
            // -- if facebook url is not available then go to if block
            if (!asset.facebook_url) {
              // -- if url includes 'facebook' word then assign to facebook variable
              asset.facebook_url = url.content.includes('facebook') ? 'https://www.facebook.com/' + url.content.split('@')[0] : null;
            }
            // -- if linkedin url is not available then go to if block
            if (!asset.linkedin_url) {
              // -- if url includes 'linkedin' word then assign to linkedin variable
              asset.linkedin_url = url.content.includes('linkedin') ? 'https://www.linkedin.com/in/' + url.content.split('@')[0] : null;
            }
            // -- if twitter url is not available then go to if block
            if (!asset.twitter_url) {
              // -- if url includes 'twitter' word then assign to twitter variable
              asset.twitter_url = url.content.includes('twitter') ? 'https://twitter.com/intent/user?user_id=' + url.content.split('@')[0] : null;
            }
          });
        }

        asset.custom_field = {
          phones: data.phones ? data.phones.map(obj => obj.display_international) : null,
          emails: null,
          secondary_emails: data.emails ? data.emails.map(obj => obj.address) : null,
          secondary_emailsToDisplay : data.emails ? (data.emails.map(obj => obj.address)).join(' | ') : null,
          created_from: 'cerebro',
          phoneToDisplay: data.phones ? (data.phones.map(obj => obj.display_international)).join(' | ') : null,
          emailToDisplay: null,
          users_profile_images_url: null,
          socialmedia_profile_urls: null,
          relationships: data.relationships ? data.relationships : null,
          addresses: data.addresses ? data.addresses : null,
          gender: data.gender && data.gender.content ? data.gender.content : null,
          profile_images: data.images ? data.images : null,
          languages: data.languages[0].language ? data.languages[0].language : null,
          user_ids: data.user_ids ? data.user_ids : null,
          names: data.names ? data.names : null,
          usernames: data.usernames ? data.usernames.map(obj => obj.display) : null,
          educations: data.educations ? data.educations : null,
          jobs: data.jobs ? data.jobs : null,
          contactList: data.contactList ? data.contactList : null,
          phoneswithtype: data.phones ? data.phones : null,
          org_score: null,
          role_score: null,
          score: null,
          urls: data.urls ? data.urls.map(obj => obj.url) : null
        };
        break;
      case 'emailBulkSearch':
        const firstName = (data.fullName ? (data.fullName.split(' '))[0] : null);
        const lastName = (data.fullName ? (data.fullName.split(' '))[1] : null);

        asset.full_name = data.fullName;
        asset.first_name = firstName;
        asset.last_name = lastName;
        asset.company_name = data.company ? data.company : '';
        asset.country = data.country ? data.country : '';
        asset.email_perso = (emailResponse !== null && (emailResponse.emails || emailResponse.email)) ?
          (emailResponse.emails ? emailResponse.emails[0].email : emailResponse.email) : null;
        asset.email_pro = (emailResponse !== null && (emailResponse.emails || emailResponse.email)) ?
          (emailResponse.emails ? (emailResponse.emails[1] ? emailResponse.emails[1].email : null) : emailResponse.email) : null;
        asset.status_of_email = emailResponse !== null ? emailResponse.status : null;
        asset.image_url = (data.openGraphImage ? (data.openGraphImage.contentUrl ? data.openGraphImage.contentUrl : null) : null);

        // -- multiple phones can be there in response, first 2 phones are set for the keys
        // -- rest of phones are stored into custom field
        asset.standard_phone_number = null;
        asset.personal_phone_number = null;

        // -- extra emails and phones are stored into custom field
        asset.custom_field = {
          phones: null,
          emails: [],
          created_from: 'email',
          phoneToDisplay : null,
          emailToDisplay: null,
          usernames: null,
          users_profile_images_url: null,
          socialmedia_profile_urls: null,
          relationships: null,
          addresses: null,
          gender: null,
          profile_images: null,
          languages: null,
          user_ids: null,
          educations: null,
          jobs: null,
          contactList: null,
          phoneswithtype: null,
          org_score: null,
          role_score: null,
          score: null
        };
        if (emailResponse) {
          if (emailResponse.email) {
            asset.custom_field.emails.push(emailResponse.email);
          } else if (emailResponse.emails) {
            emailResponse.emails.forEach((email) => {
              asset.custom_field.emails.push(email.email);
            });
          }
        }

        // -- concat multiple emails by by pipe sign
        const emails = asset.custom_field.emails.toString();
        asset.custom_field.emailToDisplay = emails.replace(/(,)/g, ' | ');
        break;
      default:
        console.error('AssetsListService : createAsset : error : default case is detected');
    }

    return asset;
  }

  // -- phone response can be null when phone not found for that any full name and company data
  createPhoneAsset(data: any, phoneResponse: any = null, createFrom = 'bing'): Asset {

    const asset = new Asset();
    let fullName, company, role;

    switch (createFrom) {
      case 'bing':
        if (phoneResponse.lusha === false) {
          // -- if data comes from pipl api call
          fullName = data.name_id_database_id ? data.name_id_database_id : (data.full_name_database_id ? data.full_name_database_id : '');
          company = data.company_id_database_id ? data.company_id_database_id : (data.organization_database_id ? data.organization_database_id : '');
          role = data.role_secondary_database_id ? data.role_secondary_database_id : (data.role_third_database_id ? data.role_third_database_id : '');

          // -- multiple emails can be there in response, first 2 emails are set for the keys
          // -- rest of emails are stored into custom field
          // -- multiple phones can be there in response, first 2 phones are set for the keys
          // -- rest of phones are stored into custom field
          asset.standard_phone_number = (phoneResponse !== null && phoneResponse.phones) ? (phoneResponse.phones[0] ? phoneResponse.phones[0] : null) : null;
          asset.personal_phone_number = (phoneResponse !== null && phoneResponse.phones) ? (phoneResponse.phones[1] ? phoneResponse.phones[1] : null) : null;

          asset.full_name = fullName;
          asset.company_name = company;
          asset.linkedin_url = data.profile_database_id ? data.profile_database_id : null;
          asset.role = role;
          asset.first_name = (asset.full_name ? (asset.full_name.split(' '))[0] : null);
          asset.last_name = (asset.full_name ? (asset.full_name.split(' '))[1] : null);
          asset.email_perso = null;
          asset.status_of_email = null;


          // -- extra emails and phones are stored into custom field
          asset.custom_field = {
            phones: ((phoneResponse !== null) ? (phoneResponse.phones ? phoneResponse.phones : null) : null),
            emails: ((phoneResponse !== null) ? (phoneResponse.emails ? phoneResponse.emails : null) : null),
            created_from: 'phone',
            phoneToDisplay: null,
            emailToDisplay: null,
            // -- key name change from usernames to names
            // usernames: null,
            names: null,
            users_profile_images_url: null,
            socialmedia_profile_urls: null,
            relationships: null,
            addresses: null,
            gender: null,
            profile_images: null,
            languages: null,
            user_ids: null,
            educations: null,
            jobs: null,
            contactList: null,
            phoneswithtype: null,
            org_score: null,
            role_score: null,
            score: null
          };
        } else {
          // -- if data comes from lusha api call
          fullName = this.namePart.transform(data.name, 0);
          company = this.namePart.transform(data.name, 2);
          role = this.namePart.transform(data.name, 1);

          // -- multiple emails can be there in response, first 2 emails are set for the keys
          // -- rest of emails are stored into custom field
          // -- multiple phones can be there in response, first 2 phones are set for the keys
          // -- rest of phones are stored into custom field
          asset.standard_phone_number = (phoneResponse !== null && phoneResponse.phoneNumbers) ? (phoneResponse.phoneNumbers[0] ? phoneResponse.phoneNumbers[0] : null) : null;
          asset.personal_phone_number = (phoneResponse !== null && phoneResponse.phoneNumbers) ? (phoneResponse.phoneNumbers[1] ? phoneResponse.phoneNumbers[1] : null) : null;

          asset.full_name = fullName;
          asset.company_name = company;
          asset.linkedin_url = data.url ? data.url : null;
          asset.role = role;
          asset.image_url = data.openGraphImage.contentUrl ? data.openGraphImage.contentUrl : null;
          asset.first_name = (asset.full_name ? (asset.full_name.split(' '))[0] : null);
          asset.last_name = (asset.full_name ? (asset.full_name.split(' '))[1] : null);
          asset.email_perso = null;
          asset.status_of_email = null;

          // -- extra emails and phones are stored into custom field
          asset.custom_field = {
            phones: ((phoneResponse !== null) ? (phoneResponse.phoneNumbers ? phoneResponse.phoneNumbers : null) : null),
            emails: ((phoneResponse !== null) ? (phoneResponse.emailAddresses ? phoneResponse.emailAddresses : null) : null),
            created_from: 'phone',
            phoneToDisplay: null,
            emailToDisplay: null,
            names: null,
            users_profile_images_url: null,
            socialmedia_profile_urls: null,
            relationships: null,
            addresses: null,
            gender: null,
            profile_images: null,
            languages: null,
            user_ids: null,
            educations: null,
            jobs: null,
            contactList: null,
            phoneswithtype: null,
            org_score: null,
            role_score: null,
            score: null
          };
        }
        break;

      case 'google':
        if (phoneResponse.lusha === false) {
          // if data comes from pipl api call
          fullName = data.fn ? data.fn.toString().trim().toLowerCase() : null;
          company = data.org ? data.org.toString().trim().toLowerCase() : null;
          role = data.role ? data.role : null;

          // -- multiple emails can be there in response, first 2 emails are set for the keys
          // -- rest of emails are stored into custom field
          // -- multiple phones can be there in response, first 2 phones are set for the keys
          // -- rest of phones are stored into custom field
          asset.standard_phone_number = (phoneResponse !== null && phoneResponse.phones) ? (phoneResponse.phones[0] ? phoneResponse.phones[0] : null) : null;
          asset.personal_phone_number = (phoneResponse !== null && phoneResponse.phones) ? (phoneResponse.phones[1] ? phoneResponse.phones[1] : null) : null;

          asset.full_name = fullName;
          asset.company_name = company;
          asset.linkedin_url = data.link ? data.link : null;
          asset.role = role;
          asset.image_url = data.openGraphImage.contentUrl ? data.openGraphImage.contentUrl : null;
          asset.first_name = (asset.full_name ? (asset.full_name.split(' '))[0] : null);
          asset.last_name = (asset.full_name ? (asset.full_name.split(' '))[1] : null);
          asset.email_perso = null;
          asset.status_of_email = null;

          // -- extra emails and phones are stored into custom field
          asset.custom_field = {
            phones: ((phoneResponse !== null) ? (phoneResponse.phones ? phoneResponse.phones : null) : null),
            emails: ((phoneResponse !== null) ? (phoneResponse.emails ? phoneResponse.emails : null) : null),
            created_from: 'phone',
            phoneToDisplay: null,
            emailToDisplay: null,
            names: null,
            users_profile_images_url: null,
            socialmedia_profile_urls: null,
            relationships: null,
            addresses: null,
            gender: null,
            profile_images: null,
            languages: null,
            user_ids: null,
            educations: null,
            jobs: null,
            contactList: null,
            phoneswithtype: null,
            org_score: null,
            role_score: null,
            score: null
          };
        } else {
          // if data comes from lusha api call
          fullName = data.fn ? data.fn.toString().trim().toLowerCase() : null;
          company = data.org ? data.org.toString().trim().toLowerCase() : null;
          role = data.role ? data.role : null;

          // -- multiple emails can be there in response, first 2 emails are set for the keys
          // -- rest of emails are stored into custom field
          // -- multiple phones can be there in response, first 2 phones are set for the keys
          // -- rest of phones are stored into custom field
          asset.standard_phone_number = (phoneResponse !== null && phoneResponse.phoneNumbers) ? (phoneResponse.phoneNumbers[0] ? phoneResponse.phoneNumbers[0] : null) : null;
          asset.personal_phone_number = (phoneResponse !== null && phoneResponse.phoneNumbers) ? (phoneResponse.phoneNumbers[1] ? phoneResponse.phoneNumbers[1] : null) : null;

          asset.full_name = fullName;
          asset.company_name = company;
          asset.linkedin_url = data.link ? data.link : null;
          asset.role = role;
          asset.image_url = data.openGraphImage.contentUrl ? data.openGraphImage.contentUrl : null;
          asset.first_name = (asset.full_name ? (asset.full_name.split(' '))[0] : null);
          asset.last_name = (asset.full_name ? (asset.full_name.split(' '))[1] : null);
          asset.email_perso = null;
          asset.status_of_email = null;

          // -- extra emails and phones are stored into custom field
          asset.custom_field = {
            phones: ((phoneResponse !== null) ? (phoneResponse.phoneNumbers ? phoneResponse.phoneNumbers : null) : null),
            emails: ((phoneResponse !== null) ? (phoneResponse.emailAddresses ? phoneResponse.emailAddresses : null) : null),
            created_from: 'phone',
            phoneToDisplay: null,
            emailToDisplay: null,
            // -- key name change from usernames to names
            // usernames: null,
            names: null,
            users_profile_images_url: null,
            socialmedia_profile_urls: null,
            relationships: null,
            addresses: null,
            gender: null,
            profile_images: null,
            languages: null,
            user_ids: null,
            educations: null,
            jobs: null,
            contactList: null,
            phoneswithtype: null,
            org_score: null,
            role_score: null,
            score: null
          };
        }
        break;

      case 'emailBulkSearch':
        // -- bulk email searched is performed on full name, company and country information
        // -- phone api lusha uses first name, last name and company name
        // -- so here assumed that response is from lusha phone API

        const firstName = (data.fullName ? (data.fullName.split(' '))[0] : null);
        const lastName = (data.fullName ? (data.fullName.split(' '))[1] : null);

        asset.full_name = data.fullName;
        asset.first_name = firstName;
        asset.last_name = lastName;
        asset.company_name = data.company ? data.company : '';
        asset.email_perso = data.email ? data.email : '';
        asset.status_of_email = data.emailStatus ? data.emailStatus : '';
        asset.image_url = (data.openGraphImage ? (data.openGraphImage.contentUrl ? data.openGraphImage.contentUrl : null) : null);

        // -- multiple phones can be there in response, first 2 phones are set for the keys
        // -- rest of phones are stored into custom field
        asset.standard_phone_number = (phoneResponse !== null && phoneResponse.phoneNumbers) ? (phoneResponse.phoneNumbers[0] ? phoneResponse.phoneNumbers[0] : null) : null;
        asset.personal_phone_number = (phoneResponse !== null && phoneResponse.phoneNumbers) ? (phoneResponse.phoneNumbers[1] ? phoneResponse.phoneNumbers[1] : null) : null;

        // -- concat multiple phones by by pipe sign
        let phoneToDisplay = null;
        if (phoneResponse !== null) {
          phoneToDisplay = phoneResponse.phoneNumbers.toString();
          phoneToDisplay = phoneToDisplay.replace(/(,)/g, ' | ');
        }

        // -- extra emails and phones are stored into custom field
        asset.custom_field = {
          phones: ((phoneResponse !== null) ? (phoneResponse.phoneNumbers ? phoneResponse.phoneNumbers : null) : null),
          emails: ((phoneResponse !== null) ? (phoneResponse.emailAddresses ? phoneResponse.emailAddresses : null) : null),
          created_from: 'bulk',
          phoneToDisplay,
          emailToDisplay: null,
          // -- key name change from usernames to names
          // usernames: null,
          names: null,
          users_profile_images_url: null,
          socialmedia_profile_urls: null,
          relationships: null,
          addresses: null,
          gender: null,
          profile_images: null,
          languages: null,
          user_ids: null,
          educations: null,
          jobs: null,
          contactList: null,
          phoneswithtype: null,
          org_score: null,
          role_score: null,
          score: null
        };
        break;
      // -- Advance search for social url response asset
      case 'social':
        // -- multiple phones can be there in response, first 2 phones are set for the keys
        // -- rest of phones are stored into custom field
        asset.standard_phone_number = (phoneResponse !== null && phoneResponse.phones) ? (phoneResponse.phones[0] ? phoneResponse.phones[0] : null) : null;
        asset.personal_phone_number = (phoneResponse !== null && phoneResponse.phones) ? (phoneResponse.phones[1] ? phoneResponse.phones[1] : null) : null;

        asset.full_name = phoneResponse.names[0] ? phoneResponse.names[0] : '';
        asset.first_name = phoneResponse.names[0] ? phoneResponse.names[0].split(' ')[0] : '';
        asset.last_name = phoneResponse.names[0] ? phoneResponse.names[0].split(' ')[1] : '';
        asset.company_name = null;
        asset.role = null;
        asset.image_url = phoneResponse.images[0] ? phoneResponse.images[0] : '';
        asset.email_perso = null;
        asset.status_of_email = null;

        // -- for find facebook, linkedin and twitter url from multiple urls
        phoneResponse.url.forEach((url) => {
          // -- if facebook url is not available then go to if block
          if (!asset.facebook_url) {
            // -- if url includes 'facebook' word then assign to facebook variable
            asset.facebook_url = url.includes('facebook') ? url : null;
          }
          // -- if linkedin url is not available then go to if block
          if (!asset.linkedin_url) {
            // -- if url includes 'linkedin' word then assign to linkedin variable
            asset.linkedin_url = url.includes('linkedin') ? url : null;
          }
          // -- if twitter url is not available then go to if block
          if (!asset.twitter_url) {
            // -- if url includes 'twitter' word then assign to twitter variable
            asset.twitter_url = url.includes('twitter') ? url : null;
          }
        });

        // -- concat multiple phones by by pipe sign
        let phoneToDisplayBySocial = null;
        if (phoneResponse !== null) {
          phoneToDisplayBySocial = phoneResponse.phones.toString();
          phoneToDisplayBySocial = phoneToDisplayBySocial.replace(/(,)/g, ' | ');
        }

        // -- extra emails and phones are stored into custom field
        asset.custom_field = {
          phones: ((phoneResponse !== null) ? (phoneResponse.phones ? phoneResponse.phones : null) : null),
          emails: ((phoneResponse !== null) ? (phoneResponse.emails ? phoneResponse.emails : null) : null),
          created_from: 'phone',
          phoneToDisplay: phoneToDisplayBySocial,
          emailToDisplay: null,
          // -- multiple names are store in customfield
          names: ((phoneResponse !== null) ? (phoneResponse.names ? phoneResponse.names : null) : null),
          // -- multiple images store in customfield
          users_profile_images_url: ((phoneResponse !== null) ? (phoneResponse.images ? phoneResponse.images : null) : null),
          // -- multiple urls store in customfield
          socialmedia_profile_urls: ((phoneResponse !== null) ? (phoneResponse.url ? phoneResponse.url : null) : null),
          relationships: null,
          addresses: null,
          gender: null,
          profile_images: null,
          languages: null,
          user_ids: null,
          educations: null,
          jobs: null,
          contactList: null,
          phoneswithtype: null,
          org_score: null,
          role_score: null,
          score: null
        };
        break;
      default:
        console.error('AssetsListService : createPhoneAsset : error : Default case is detected');
    }

    return asset;
  }

  // -- new find asset for get response individually
  live_findAsset(company: string, country: string, role: string): Promise<any> {
    // -- main promise is returned
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
        // set headers
        const headers: HttpHeaders = new HttpHeaders({
          authorization: `Bearer ${ accessToken }`
        });
        // get country code
        let detail = UtilsService.getCountryDetail(country);
        if (detail.countryCodeForGRes === '' || detail.countryCodeForGRes === null) {
          detail = UtilsService.getCountryDetail(UtilsService.DefaultCountry);
        }
        // -- URL is set for find Asset
        const apiUrl = encodeURI(`${ environment.BASE_API }v1/leadgen/person?company=${ company }&country_code=${  detail.countryCodeForGRes.toLowerCase() }&role=${ role }&max_pages=1`);

        this.httpClient.get(apiUrl, {headers})
          .pipe(delay(1000))
          .toPromise()
          .then(
            (response) => {
              resolve(response);
            },
            (error) => {
              console.error('AssetsListService : findAsset : error : ', error);
              error.status === 201 ? resolve() : reject();
            }
          );
      }
    });
  }

  postAssetInList(asset: Asset[], listId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
          authorization: `Bearer ${ accessToken }`
        });

        const targetListId = listId ? listId : localStorage.getItem(UtilsService.KEY_DEFAULTLISTID);

        // -- to resolve issue of pass by reference for initial avatars
        // -- 198-initial-avatar-integration-on-search
        const _copyAsset = JSON.parse(JSON.stringify(asset));
        // -- remove extra information fields from object
        // -- fields will be removed from object's copy, not from original object
        _copyAsset.forEach((_asset) => {
          delete _asset.custom_field.page_specific;
          delete _asset.custom_field.displayImg;
        });
        const apiUrl = `${ environment.BASE_API }v1/list/${ targetListId }/asset`;
        this.httpClient.post(apiUrl, _copyAsset, {headers})
          .toPromise()
          .then(
            (response) => {
              console.log('AssetsListService : postAsset : response : ', response);
              resolve();
            },
            (error) => {
              error.status === 201 ? resolve() : reject();
            }
          );
      }
    });
  }

  // -- create list
  createList(data: any): List {
    const list = new List();
    // -- list id will be available only at time of edit
    list.id = data.id ? data.id : null;
    list.name = data.txt_company_name.toString().toLowerCase();
    list.note = data.txt_note ? data.txt_note.toString().toLowerCase() : '';
    list.short_description = data.txt_shortDesc.toString().toLowerCase();
    list.picture = data.list_picture ? data.list_picture.toString().toLowerCase() : '';

    return list;
  }

  // -- post list
  postList(list: List): Promise<any> {

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
          authorization: `Bearer ${ accessToken }`
        });

        const apiUrl = `${ environment.BASE_API }v1/list`;
        this.httpClient.post(apiUrl, list, {headers})
          .toPromise()
          .then(
            (response => {
              // -- load new lists and update localstorage
              this.loadLists().then(() => {
                resolve(response);
              }, (error) => {
                reject(error);
              });
            }),
            (error => {
              reject(error);
            })
          );
      }
    });
  }

  // -- load contacts of list
  getAssets(list: List, page: Page): Promise<any> {
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
          authorization: `Bearer ${ accessToken }`
        });
        // -- undefined null list or page then reject
        if (!list) {
          console.error('AssetsListService : getAssets : error : list is null');
          reject();
        }
        // -- if list is undefined or null then user default list id from local storage
        const apiUrl = page ? `${ environment.BASE_API }v1/list/${ list.id }/asset?page_number=${ page.pageNumber }&item_per_page=${ page.size }` : `${ environment.BASE_API }v1/list/${ list.id }/asset`;
        this.httpClient.get(apiUrl, {headers})
          .toPromise()
          .then((response) => { resolve(response); },
            (error) => { reject(error); });
      }
    });
  }

  // -- update existing list
  putList(newList: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
          authorization: `Bearer ${ accessToken }`
        });

        const apiUrl = `${ environment.BASE_API }v1/list/${ newList.id }`;
        newList.new_list_id = 0;
        this.httpClient.put(apiUrl, newList, {headers})
          .toPromise()
          .then((response) => {
            // -- load updated lists and update localstorage
            this.loadLists().then(() => {
              resolve(response);
            }, (error) => {
              reject(error);
            });
          })
          .catch((error) => {
            // -- created then status 201 is sent
            if (error.status === 201) {
              console.log('Updated successfully');
              // -- load updated lists and update localstorage
              this.loadLists().then(() => {
                resolve(error);
              }, (e) => {
                reject(e);
              });
            } else {
              console.log('Some error occurred.');
              reject(error);
            }
          });
      }
    });
  }

  // -- load list in local storage
  loadLists(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
          authorization: `Bearer ${ accessToken }`
        });

        const apiUrl = `${ environment.BASE_API }v1/list`;
        this.httpClient.get(apiUrl, {headers})
          .toPromise()
          .then((response) => {
            if (response && response[0].id) {
              // localStorage.setItem(UtilsService.KEY_USERLISTS, JSON.stringify(response));
              // localStorage.setItem(UtilsService.KEY_DEFAULTLISTID, response[0].id);
              UtilsService.storeSortedLists(response);
              UtilsService.storeDefaultListId(response);
              resolve();
            } else {
              console.error('AuthService : storeDefaultListId : Invalid Response');
              reject();
            }
          })
          .catch((error) => {
            reject(error);
            console.error('AuthService : storeDefaultListId : error', error);
          });
      }
    });
  }

  findPhoneBulk(socialUrl: string, emailAddress: string, fullName: string, company: string, findFrom: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
          authorization: `Bearer ${ accessToken }`
        });
        let apiUrl = '';
        switch (findFrom) {
          case 'socialURL':
            apiUrl = `${ environment.BASE_API }v1/phone/ultra?url=${ socialUrl.trim() }`;
            break;
          case 'emailAddress_true':
            apiUrl = `https://nrcl9babgb.execute-api.us-east-2.amazonaws.com/test2/phone/get_data?email=${ emailAddress.trim() }`;
            break;
          case 'emailAddress_false':
            apiUrl = `${ environment.BASE_API }v1/phone/ultra?email=${ emailAddress.trim() }`;
            break;
          case 'fullNameCompany':
            // -- for case when found from search-person page
            if (fullName === null || company === null) {
              resolve({response: [], findFrom});
            }
            const name = (fullName).trim().split(' ');
            apiUrl = `${ environment.BASE_API }v1/phone/supra?first_name=${ name[0] }&last_name=${ name[1] }&company=${ company }&property_name=phoneNumbers`;
            break;
          default:
            console.error('AssetsListService : findPhoneBulk : Default Case :Something went wrong');
            resolve({response: [], findFrom});
        }
        // apiUrl = '/assets/data/findPhoneBulck.json';
        this.httpClient.get(encodeURI(apiUrl), {headers})
          .pipe(delay(1000))
          .toPromise()
          .then((response) => {
            // -- successful phone search is tracked
            this.analytics.trackPhoneSearch({
              socialUrl: socialUrl !== null ? socialUrl.trim() : null,
              emailAddress: emailAddress !== null ? emailAddress.trim() : null,
              firstName: fullName !== null ? (fullName).trim().split(' ')[0] : null,
              lastName: fullName !== null ? (fullName).trim().split(' ')[1] : null,
              company: company !== null ? company : null
            }, response, apiUrl);
            resolve({response, findFrom});
          })
          .catch((error) => {
            if (error.status === 400 && error.error.code === 'no_remaining_credit' ) {
              this.analytics.trackPhoneSearchWithoutQuota({
                socialUrl: socialUrl !== null ? socialUrl.trim() : null,
                emailAddress: emailAddress !== null ? emailAddress.trim() : null,
                firstName: fullName !== null ? (fullName).trim().split(' ')[0] : null,
                lastName: fullName !== null ? (fullName).trim().split(' ')[1] : null,
                company: company !== null ? company : null
              }, apiUrl);
            }
            console.error('AssetsListService : findPhoneBulk : from : ' + findFrom + ' : error', error);
            if (status !== '200') {
              this.analytics.trackUnsuccessfulPhoneSearch(socialUrl, emailAddress, fullName !== null ? (fullName).trim().split(' ')[0] : null, fullName !== null ? (fullName).trim().split(' ')[1] : null, company, {}, null, apiUrl);
            }
            reject({response: error, findFrom});
          });
      }
    });
  }

  updateAsset(asset: Asset, phoneResponse: any = null, emailResponse: any = null, updateWith: string = 'phone'): Asset {
    switch (updateWith) {
      case 'phone':
        if (phoneResponse && phoneResponse.lusha === false) {

          // -- multiple emails can be there in response, first 2 emails are set for the keys
          // -- rest of emails are stored into custom field
          // -- multiple phones can be there in response, first 2 phones are set for the keys
          // -- rest of phones are stored into custom field
          asset.standard_phone_number = (phoneResponse !== null && phoneResponse.phones) ? (phoneResponse.phones[0] ? phoneResponse.phones[0] : null) : null;
          asset.personal_phone_number = (phoneResponse !== null && phoneResponse.phones) ? (phoneResponse.phones[1] ? phoneResponse.phones[1] : null) : null;

          // -- extra emails and phones are stored into custom field
          asset.custom_field.phones = (phoneResponse !== null) ? (phoneResponse.phones ? phoneResponse.phones : null) : null;

          // -- phones for display on tooltip
          asset.custom_field.phoneToDisplay = ((phoneResponse !== null) ? (phoneResponse.phones ? phoneResponse.phones.join(' | ') : null) : null);

          // -- extra emails and phones are stored into custom field
          asset.custom_field.users_profile_images_url = ((phoneResponse !== null) ? (phoneResponse.images ? phoneResponse.images : null ) : null);
          asset.custom_field.socialmedia_profile_urls = ((phoneResponse !== null) ? (phoneResponse.url ? phoneResponse.url : null ) : null);
          asset.custom_field.names = ((phoneResponse !== null) ? (phoneResponse.names ? phoneResponse.names : null ) : null);
          asset.custom_field.secondary_emails = ((phoneResponse !== null) ? (phoneResponse.emails ? phoneResponse.emails : null) : null);
          asset.custom_field.secondary_emailsToDisplay = ((phoneResponse !== null) ? (phoneResponse.emails ? phoneResponse.emails.join(' | ') : null) : null);

          asset.custom_field.created_from = 'phone';

        } else {

          // -- multiple emails can be there in response, first 2 emails are set for the keys
          // -- rest of emails are stored into custom field
          // -- multiple phones can be there in response, first 2 phones are set for the keys
          // -- rest of phones are stored into custom field
          asset.standard_phone_number = (phoneResponse !== null && phoneResponse.phoneNumbers) ? (phoneResponse.phoneNumbers[0] ? phoneResponse.phoneNumbers[0] : null) : null;
          asset.personal_phone_number = (phoneResponse !== null && phoneResponse.phoneNumbers) ? (phoneResponse.phoneNumbers[1] ? phoneResponse.phoneNumbers[1] : null) : null;

          // -- extra emails and phones are stored into custom field
          asset.custom_field.phones = (phoneResponse !== null) ? (phoneResponse.phoneNumbers ? phoneResponse.phoneNumbers : null) : null;

          // -- extra emails and phones are stored into custom field
          // -- phones for display on tooltip
          asset.custom_field.phoneToDisplay = ((phoneResponse !== null) ? (phoneResponse.phoneNumbers ? phoneResponse.phoneNumbers.join(' | ') : null) : null);
          asset.custom_field.secondary_emails = ((phoneResponse !== null) ? (phoneResponse.emailAddresses ? phoneResponse.emailAddresses : null) : null);
          asset.custom_field.secondary_emailsToDisplay = ((phoneResponse !== null) ? (phoneResponse.emailAddresses ? phoneResponse.emailAddresses.join(' | ') : null) : null);
          asset.custom_field.secondary_linkedin_url = ((phoneResponse !== null) ? (phoneResponse.linkedin_url ? phoneResponse.linkedin_url : null ) : null),

            asset.custom_field.created_from = 'phone';
        }
        break;

      case 'email':

        asset.custom_field.emails = [];
        // --for converting type of custom field emails from string to array
        if (emailResponse) {
          if (emailResponse.response) {
            if (emailResponse.response.emails || emailResponse.response.email) {
              if (emailResponse.response.emails)  {
                emailResponse.response.emails.forEach((email) => {
                  asset.custom_field.emails.push(email.email);
                });
              } else {
                asset.custom_field.emails.push(emailResponse.response.email);
              }
            }
          } else {
            if (emailResponse.emails || emailResponse.email) {
              if (emailResponse.emails) {
                emailResponse.emails.forEach((email) => {
                  asset.custom_field.emails.push(email.email);
                });
              } else {
                asset.custom_field.emails.push(emailResponse.email);
              }
            }
          }
        }
        asset.email_perso = (emailResponse !== null && (emailResponse.response.emails || emailResponse.response.email)) ?
          (emailResponse.response.emails ? emailResponse.response.emails[0].email : emailResponse.response.email) : null;

        asset.email_pro = (emailResponse !== null && (emailResponse.response.emails || emailResponse.response.email)) ?
          (emailResponse.response.emails ? emailResponse.response.emails[1] ? emailResponse.response.emails[1].email : null : emailResponse.response.email) : null;


        asset.status_of_email = emailResponse !== null ? emailResponse.response.status : null;
        asset.location = asset.location ? asset.location : 'general';
        asset.custom_field.created_from = 'email';

        // -- concat multiple phones by by pipe sign
        const emails = asset.custom_field.emails.toString();
        asset.custom_field.emailToDisplay = emails.replace(/(,)/g, ' | ');

        break;

      default:
        console.error('Update with Default !!');
    }
    return asset;
  }

  updateContact(data): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
          authorization: `Bearer ${ accessToken }`
        });

        const body: any = {
          op: 'assetchange',
          data:
            {
              city: data.city,
              company_name: data.company_name,
              country: data.country,
              custom_field: {
                secondary_emails: data.secondary_emails,
                phones : data.phones
              },
              email_pro: data.email_pro,
              email_perso: data.email_perso,
              status_of_email: data.status_of_email,
              linkedin_url: data.linkedin_url,
              facebook_url: data.facebook_url,
              twitter_url: data.twitter_url,
              first_name: data.first_name,
              last_name: data.last_name,
              full_name: data.full_name,
              location: data.location,
              personal_phone_number: data.personal_phone_number,
              role: data.role,
              school: data.school
            }
        };

        const apiUrl = `${ environment.BASE_API }v1/list/${ data.list_id }/asset/${ data.id }`;

        this.httpClient.put(apiUrl, body, {headers})
          .toPromise()
          .then((response) => {

            console.log('AssetsListService : updateContactService : Contact : Updated');
          })
          .catch((error) => {
            console.log('AssetsListService : updateContactService : error :',  error);
            reject();
          });
      }
    });
  }

  putAssetInList(asset: Asset, listId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
          authorization: `Bearer ${ accessToken }`
        });

        const apiUrl = `${ environment.BASE_API }v1/list/${ listId }/asset/${ asset.id }`;
        const body = {
          op: 'assetchange',
          data: asset
        };

        this.httpClient.put(apiUrl, body, {headers})
          .toPromise()
          .then((response) => {

            console.log('AssetsListService : putAssetInList : put : Added');
          })
          .catch((error) => {
            console.error('AssetsListService : putAssetInList : put : error : ', error);
            reject();
          });
      }

    });
  }

  // -- this function is created to avoid lusha response if check
  // -- both phone API has difference only it's key, structure is same
  // -- phone response can be null when phone not found for that any full name and company data
  new_createPhoneAsset(data: any, phoneResponse: any = null, createFrom = 'bing', useKey: any): Asset {
    const asset = new Asset();

    let fullName, company, role;

    switch (createFrom) {
      case 'bing':
        fullName = data.name_id_database_id ? data.name_id_database_id : (data.full_name_database_id ? data.full_name_database_id : '');
        company = data.company_id_database_id ? data.company_id_database_id : (data.organization_database_id ? data.organization_database_id : '');
        role = data.role_secondary_database_id ? data.role_secondary_database_id : (data.role_third_database_id ? data.role_third_database_id : '');

        asset.linkedin_url = data.profile_database_id ? data.profile_database_id : null;
        asset.image_url = data.image_database_id ? data.image_database_id : null;
        asset.first_name = fullName.split(' ')[0];
        asset.last_name = fullName.split(' ')[1];
        asset.full_name = fullName;
        asset.company_name = company;
        asset.role = role;
        break;

      case 'google':
        // if data comes from pipl api call
        fullName = data.fn ? data.fn.toString().trim().toLowerCase() : null;
        company = data.org ? data.org.toString().trim().toLowerCase() : null;
        role = data.role ? data.role : null;

        asset.first_name = fullName.split(' ')[0];
        asset.last_name = fullName.split(' ')[1];
        asset.full_name = fullName;
        asset.company_name = company;
        asset.role = role;
        asset.linkedin_url = data.link ? data.link : null;

        break;

      case 'emailBulkSearch':
        // -- bulk email searched is performed on full name, company and country information
        // -- phone api lusha uses first name, last name and company name
        // -- so here assumed that response is from lusha phone API
        const firstName = (data.fullName ? (data.fullName.split(' '))[0] : null);
        const lastName = (data.fullName ? (data.fullName.split(' '))[1] : null);

        asset.full_name = firstName + ' ' + lastName;
        asset.first_name = firstName;
        asset.last_name = lastName;
        break;

      case 'bulkPhoneSocialMedia':
        asset.full_name = phoneResponse ? (phoneResponse.names ? (phoneResponse.names[0] ? phoneResponse.names[0] : null) : null) : null;
        // check image is jpg or jpeg
        if (phoneResponse && phoneResponse[useKey.profileImgUrlKey]) {
          phoneResponse[useKey.profileImgUrlKey].forEach((img) => {
            const images = img.split('.');
            images.forEach((type) => {
              if (type === 'jpg' || type === 'jpeg') {
                asset.image_url = img;
              }
            });
          });
          if (!asset.image_url) {
            asset.image_url = phoneResponse[useKey.profileImgUrlKey][0];
          }
        }
        // -- for find facebook, linkedin and twitter url from multiple urls
        if (phoneResponse && phoneResponse.url && phoneResponse.url.length > 0) {

          phoneResponse.url.forEach((url) => {
            // -- if facebook url is not available then go to if block
            if (!asset.facebook_url) {
              // -- if url includes 'facebook' word then assign to facebook variable
              asset.facebook_url = url.includes('facebook') ? url : null;
            }
            // -- if linkedin url is not available then go to if block
            if (!asset.linkedin_url) {
              // -- if url includes 'linkedin' word then assign to linkedin variable
              asset.linkedin_url = url.includes('linkedin') ? url : null;
            }
            // -- if twitter url is not available then go to if block
            if (!asset.twitter_url) {
              // -- if url includes 'twitter' word then assign to twitter variable
              asset.twitter_url = url.includes('twitter') ? url : null;
            }
          });
        } else {
          // -- if phone response is not present, status is 204 then just add social media URL with which phone is searched
          if (!asset.facebook_url) {
            asset.facebook_url = data && data.socialMediaUrl.includes('facebook') ? data.socialMediaUrl : null;
          }
          if (!asset.linkedin_url) {
            asset.linkedin_url = data && data.socialMediaUrl.includes('linkedin') ? data.socialMediaUrl : null;
          }
          if (!asset.twitter_url) {
            asset.twitter_url = data && data.socialMediaUrl.includes('twitter') ? data.socialMediaUrl : null;
          }
        }
        console.log('AssetsListService : new_createPhoneAsset : case - bulkPhoneSocialMedia :', data);
        break;

      case 'bulkPhoneEmailsProfession':
        // -- for find fullName, first_name, last_name and company name from phoneResponse
        asset.full_name = phoneResponse ? phoneResponse.fullName : null;
        asset.first_name = phoneResponse ? phoneResponse.firstName : null;
        asset.last_name = phoneResponse ? phoneResponse.lastName : null;
        asset.company_name = phoneResponse ? phoneResponse.organization : null;

        console.log('AssetsListService : new_createPhoneAsset : case - bulkPhoneEmails :', data);
        break;

      case 'bulkPhoneEmails':
        asset.full_name = phoneResponse ? phoneResponse.names[0] : null;
        asset.image_url = phoneResponse ? (phoneResponse[useKey.profileImgUrlKey] ? (phoneResponse[useKey.profileImgUrlKey][0] ? phoneResponse[useKey.profileImgUrlKey][0] : null) : null ) : null;
        // -- for find facebook, linkedin and twitter url from multiple urls
        if (phoneResponse && phoneResponse.url.length > 0) {
          phoneResponse.url.forEach((url) => {
            // -- if facebook url is not available then go to if block
            if (!asset.facebook_url) {
              // -- if url includes 'facebook' word then assign to facebook variable
              asset.facebook_url = url.includes('facebook') ? url : null;
            }
            // -- if linkedin url is not available then go to if block
            if (!asset.linkedin_url) {
              // -- if url includes 'linkedin' word then assign to linkedin variable
              asset.linkedin_url = url.includes('linkedin') ? url : null;
            }
            // -- if twitter url is not available then go to if block
            if (!asset.twitter_url) {
              // -- if url includes 'twitter' word then assign to twitter variable
              asset.twitter_url = url.includes('twitter') ? url : null;
            }
          });
        }
        console.log('AssetsListService : new_createPhoneAsset : case - bulkPhoneEmails :', data);
        break;

      case 'bulkPhoneFullNameCompany':
        asset.full_name = data.fullName;
        asset.first_name = data.firstName;
        asset.last_name = data.lastName;
        asset.company_name = data.company;

        if (phoneResponse) {
          // -- for find linkedin url from multiple urls
          if (phoneResponse.linkedin_url && phoneResponse.linkedin_url.length > 0) {
            phoneResponse.linkedin_url.forEach((url) => {
              if (!asset.linkedin_url) {
                // -- if url includes 'linkedin' word then assign to linkedin variable
                asset.linkedin_url = url.includes('linkedin') ? url : null;
              }
            });
          } else if (phoneResponse[0] && phoneResponse[0].linkedin_url && phoneResponse[0].linkedin_url.length > 0) {
            phoneResponse[0].linkedin_url.forEach((url) => {
              if (!asset.linkedin_url) {
                // -- if url includes 'linkedin' word then assign to linkedin variable
                asset.linkedin_url = url.includes('linkedin') ? url : null;
              }
            });
          }
          // -- for find facebook url from multiple urls
          if (phoneResponse.facebook_url && phoneResponse.facebook_url.length > 0) {
            phoneResponse.facebook_url.forEach((url) => {
              if (!asset.facebook_url) {
                // -- if url includes 'linkedin' word then assign to linkedin variable
                asset.facebook_url = url.includes('facebook') ? url : null;
              }
            });
          } else if (phoneResponse[0] && phoneResponse[0].facebook_url && phoneResponse[0].facebook_url.length > 0) {
            phoneResponse[0].facebook_url.forEach((url) => {
              if (!asset.facebook_url) {
                // -- if url includes 'linkedin' word then assign to linkedin variable
                asset.facebook_url = url.includes('facebook') ? url : null;
              }
            });
          }
          // -- for find twitter_url from multiple urls
          if (phoneResponse.twitter_url && phoneResponse.twitter_url.length > 0) {
            phoneResponse.twitter_url.forEach((url) => {
              if (!asset.twitter_url) {
                // -- if url includes 'linkedin' word then assign to linkedin variable
                asset.twitter_url = url.includes('twitter') ? url : null;
              }
            });
          } else if (phoneResponse[0] && phoneResponse[0].twitter_url && phoneResponse[0].twitter_url.length > 0) {
            phoneResponse[0].twitter_url.forEach((url) => {
              if (!asset.twitter_url) {
                // -- if url includes 'linkedin' word then assign to linkedin variable
                asset.twitter_url = url.includes('twitter') ? url : null;
              }
            });
          }
        }
        break;

      case 'cerebro':
        asset.full_name = phoneResponse.names[0] ? phoneResponse.names[0] : '';
        asset.first_name = phoneResponse.names[0] ? phoneResponse.names[0].split(' ')[0] : '';
        asset.last_name = phoneResponse.names[0] ? phoneResponse.names[0].split(' ')[1] : '';
        asset.company_name = null;
        asset.role = null;
        asset.image_url = phoneResponse.images[0] ? phoneResponse.images[0] : '';
        // -- if image_url found null then generate base64 image with initial letters
        if (asset.image_url === null) {
          asset.image_url = UtilsService.getBase64ImgURL(asset.full_name);
        }
        asset.email_perso = null;
        asset.status_of_email = null;

        // -- for find facebook, linkedin and twitter url from multiple urls
        phoneResponse.url.forEach((url) => {
          // -- if facebook url is not available then go to if block
          if (!asset.facebook_url) {
            // -- if url includes 'facebook' word then assign to facebook variable
            asset.facebook_url = url.includes('facebook') ? url : null;
          }
          // -- if linkedin url is not available then go to if block
          if (!asset.linkedin_url) {
            // -- if url includes 'linkedin' word then assign to linkedin variable
            asset.linkedin_url = url.includes('linkedin') ? url : null;
          }
          // -- if twitter url is not available then go to if block
          if (!asset.twitter_url) {
            // -- if url includes 'twitter' word then assign to twitter variable
            asset.twitter_url = url.includes('twitter') ? url : null;
          }
        });
        break;

      default:
        console.error('AssetsListService : new_createPhoneAsset : error : default case detected');

    }

    // -- differentiate emails found from email api and and phone api
    // -- email found from phone api are stored in key - secondary_emails, secondary_emailsToDisplay
    // -- email found from email api are stored in key - emails, emailToDisplay

    // -- multiple phones can be there in response, first 2 phones are set for the keys
    // -- rest of phones are stored into custom field
    asset.standard_phone_number = ((phoneResponse !== null) ? (phoneResponse[useKey.phoneKey] ? (phoneResponse[useKey.phoneKey][0] ? phoneResponse[useKey.phoneKey][0] : null) : ((phoneResponse[0] && phoneResponse[0][useKey.phoneKey][0]) ? phoneResponse[0][useKey.phoneKey][0] : null)) : null);
    asset.personal_phone_number = ((phoneResponse !== null) ? (phoneResponse[useKey.phoneKey] ? (phoneResponse[useKey.phoneKey][0] ? phoneResponse[useKey.phoneKey][0] : null) : ((phoneResponse[0] && phoneResponse[0][useKey.phoneKey][1]) ? phoneResponse[0][useKey.phoneKey][1] : null)) : null);
    // -- extra emails and phones are stored into custom field
    asset.custom_field = {
      phones: ((phoneResponse !== null) ? ((phoneResponse[useKey.phoneKey]) ? phoneResponse[useKey.phoneKey] : (phoneResponse[0] && phoneResponse[0][useKey.phoneKey]) ? phoneResponse[0][useKey.phoneKey] : null) : null),
      emails: null,
      created_from: 'phone',
      phoneToDisplay: ((phoneResponse !== null) ? (phoneResponse[useKey.phoneKey] ? phoneResponse[useKey.phoneKey].join(' | ') : (phoneResponse[0] && phoneResponse[0][useKey.phoneKey]) ? phoneResponse[0][useKey.phoneKey].join(' | ') : null) : null),
      emailToDisplay: null,
      // usernames: null,
      users_profile_images_url: ((phoneResponse !== null) ? (phoneResponse[useKey.profileImgUrlKey] ? phoneResponse[useKey.profileImgUrlKey] : (phoneResponse[0] && phoneResponse[0][useKey.profileImgUrlKey]) ? phoneResponse[0][useKey.profileImgUrlKey] : null ) : null),
      socialmedia_profile_urls: ((phoneResponse !== null) ? (phoneResponse[useKey.socialMediaProfileKey] ? phoneResponse[useKey.socialMediaProfileKey] : (phoneResponse[0] && phoneResponse[0][useKey.socialMediaProfileKey]) ? phoneResponse[0][useKey.socialMediaProfileKey] : null ) : null),
      names: ((phoneResponse !== null) ? (phoneResponse[useKey.nameKey] ? phoneResponse[useKey.nameKey] : (phoneResponse[0] && phoneResponse[0][useKey.nameKey]) ? phoneResponse[0][useKey.nameKey] : null  ) : null),
      secondary_emails: ((phoneResponse !== null) ? (phoneResponse[useKey.emailKey] ? phoneResponse[useKey.emailKey] : (phoneResponse[0] && phoneResponse[0][useKey.emailKey]) ? phoneResponse[0][useKey.emailKey] : null) : null),
      secondary_emailsToDisplay : ((phoneResponse !== null) ? (phoneResponse[useKey.emailKey] ? phoneResponse[useKey.emailKey].join(' | ') : (phoneResponse[0] && phoneResponse[0][useKey.emailKey]) ? phoneResponse[0][useKey.emailKey].join(' | ') : null) : null),
      secondary_linkedin_url: ((phoneResponse !== null) ? (phoneResponse[useKey.linkedInURLKey] ? phoneResponse[useKey.linkedInURLKey] :  null ) : null),
      page_specific: {
        for_cerebro: {
          email: data ? (data.emailAddress ? data.emailAddress : null) : null,
          socialUrl: data ? (data.socialMediaUrl ? data.socialMediaUrl : null) : null,
          flc: data ? ((data.firstName && data.lastName) ? [data.firstName, data.lastName] : null) : null
        }
      },
      // -- below all keys are set on cerebro page flc search so for other set as null
      relationships: null,
      addresses: null,
      gender: null,
      profile_images: null,
      languages: null,
      user_ids: null,
      educations: null,
      jobs: null,
      contactList: null,
      phoneswithtype: null,
      org_score: null,
      role_score: null,
      score: null
    };

    return asset;
  }

  // -- find email for bulk information
  live_findEmailBulk(fullName: string, company: string, country: string, sendGeneralCountry: boolean): Promise<any> {
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
          authorization: `Bearer ${ accessToken }`
        });
        const detail = UtilsService.getCountryDetail(country);
        const apiUrl = `${ environment.BASE_API }v1/leadgen/leadgen?company=${ company.toLowerCase() }&full_name=${ fullName.toLowerCase() }&country=${ sendGeneralCountry ? 'General' : (country === undefined || country === null || country.trim().length <= 0) ? 'General' : detail.name }`;
        this.httpClient.get(encodeURI(apiUrl), { headers })
          .pipe(delay(1000))
          .toPromise()
          .then((response) => {
            // -- successful Email searched is tracked
            this.analytics.trackEmailSearch({
              socialUrl: null,
              firstName: fullName.split(' ')[0],
              lastName: fullName.split(' ')[1],
              company,
              country
            }, response, apiUrl);
            resolve(response);
          })
          .catch((error) => {
            if (error.error && error.error.code === 'monthly_limit_exceeds_free_plan') {
              this.analytics.trackemailSearchWithoutQuata({
                firstName: fullName !== null ? (fullName).trim().split(' ')[0] : null,
                lastName: fullName !== null ? (fullName).trim().split(' ')[1] : null,
                company: company !== null ? company : null,
                country : country !== null ? country : 'general'
              }, error, apiUrl);
              this.notification.notifyFailure('You\'ve reached your email search limit on the free plan, upgrade to continue');
            }
            // -- if status code is any other than 200, then needs to display in table with not found message, so reject changed to resolve with null response
            resolve(null);
          });
      }
    });
  }

  deleteAsset(assets: Asset[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
          authorization: `Bearer ${ accessToken }`
        });
        const requestArray = [];
        assets.forEach((asset) => {
          const apiUrl = `${ environment.BASE_API }v1/list/${ asset.list_id }/asset/${ asset.id }`;
          requestArray.push(this.httpClient.delete(apiUrl, {headers}).toPromise());
        });
        Promise.all(requestArray)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  deleteList(list: List): Promise<any> {
    return new Promise<any>((resolve, reject) => {
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
          authorization: `Bearer ${ accessToken }`
        });
        const apiUrl = `${ environment.BASE_API }v1/list/${ list.id }`;
        this.httpClient.delete(apiUrl, { headers})
          .toPromise()
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject();
          });
      }
    });
  }

}
