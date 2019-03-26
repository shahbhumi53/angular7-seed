import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilsService } from '../../../shared/services/utils/utils.service';
import { SearchPersonService } from '../search-person.service';
import { AnalyticsService } from '../../../shared/services/analytics/analytics.service';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from '../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-search-seaction',
  templateUrl: './search-seaction.component.html',
  styleUrls: ['./search-seaction.component.scss', '../search-person-page.component.scss']
})
export class SearchSeactionComponent implements OnInit, OnDestroy {

  // -- for tag input 'any' of these words
  itemsAsObjectsAny = [];
  // -- for tag input 'all' of these words
  itemsAsObjectsAll = [];
  // -- for tag input 'none' of these words
  itemsAsObjectsNone = [];

  // true means hidden by default
  advanceSearchHidden = true;

  // -- for template driven approach to country autocomplete
  currentCountry = '';
  tdCountry: any[];
  tdDisabled = false;
  countriesArray = [];
  showSpinner: boolean;
  searchBtnClickSubscription: any;

  constructor(private service: SearchPersonService,
              private analyticsService: AnalyticsService,
              private notfication: NotificationService,
              private cookieService: CookieService) {
    this.searchBtnClickSubscription = this.service.searchBtnClickSubject.subscribe((data) => {
      // -- hide spinner
      this.showSpinner = false;
    });
    // -- track search page
    this.analyticsService.trackSearchPage();
  }

  ngOnInit() {
    // -- get countries array from service
    this.countriesArray = UtilsService.COUNTRIES;
    // -- for template driven approach to country autocomplete
    this.tdCountry = this.countriesArray;

    // -- get country name saved from settigs
    if (this.cookieService.get('settings')) {
      this.currentCountry = JSON.parse(this.cookieService.get('settings')).country;
    }
  }

  onSubmit(form: NgForm) {
    // -- track bing search click event
    this.analyticsService.trackBingSearch(form.value.txt_fullName, form.value.txt_role, form.value.txt_company, form.value.dd_countryAutoComplete, this.itemsAsObjectsAll, this.itemsAsObjectsAny, this.itemsAsObjectsNone, form.value.linkedin_url, form.value.facebook_url);
    // -- show spinner
    this.showSpinner = true;
    // -- process input tags to create proper string
    const tagsStr = this.processInputTags();
    // -- if advance search section is hidden then search using fullname, company, country and role
    // -- if facebook link or linked in link is present then call ultra api for facebook link
    // -- if facebook and linkedin both link is not present then call api with fullname, company, country and role
    if (!this.advanceSearchHidden && (form.value.linkedin_url || form.value.facebook_url)) {
      this.service.searchBySocialURL(form.value.linkedin_url, form.value.facebook_url);
      // -- storing search queries into local storage
      // -- used in api call from pagination of possible persons table
      UtilsService.storeBingSearchQueries({
        linkedIn: form.value.linkedin_url,
        facebook: form.value.facebook_url,
        fromUrls: true
      });
      // -- featured functionality : if linkedin and facebook both api give null response then need to call service.searchPerson function ?`
    } else {
      this.service.searchPerson(form.value.txt_fullName, form.value.txt_role, form.value.txt_company, form.value.dd_countryAutoComplete, tagsStr);
      // -- storing search queries into local storage
      // -- used in api call from pagination of possible persons table
      UtilsService.storeBingSearchQueries({
        fullName: form.value.txt_fullName,
        role: form.value.txt_role,
        company: form.value.txt_company,
        country: form.value.dd_countryAutoComplete,
        tags: tagsStr,
        fromUrls: false
      });
    }
  }

  onTagAdd(object: any) {
    switch (object.inTextbox) {
      case 'all':
        object.event.id = this.itemsAsObjectsAll.length + 1;
        this.itemsAsObjectsAll.push(object.event);
        break;

      case 'any':
        object.event.id = this.itemsAsObjectsAny.length + 1;
        this.itemsAsObjectsAny.push(object.event);
        break;

      case 'none':
        object.event.id = this.itemsAsObjectsNone.length + 1;
        this.itemsAsObjectsNone.push(object.event);
        break;

      default:
        console.error('SearchSectionComponent : onTagAdd : Error : Default case is detected');
    }
  }

  onTagRemove(object: any) {
    const removeFrom = object.event.id;
    switch (object.inTextbox) {
      case 'all':
        this.itemsAsObjectsAll.splice(removeFrom - 1, 1);
        break;

      case 'any':
        this.itemsAsObjectsAny.splice(removeFrom - 1, 1);
        break;

      case 'none':
        this.itemsAsObjectsNone.splice(removeFrom - 1, 1);
        break;

      default:
        console.error('SearchSectionComponent : onTagRemove : Error : Default case is detected');
    }
  }

  AdvanceSearchClick() {
    this.advanceSearchHidden = !this.advanceSearchHidden;
  }

  // -- for country autocomplete
  // -- used in both template driven and reactive approach
  filterCountries(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.countriesArray.filter(country =>
        country.name.toLowerCase().startsWith(filterValue)
      );
    }

    return this.countriesArray;
  }

  ngOnDestroy() {
    this.searchBtnClickSubscription.unsubscribe();
  }

  processInputTags(): string {

    let finalStr = '';
    let allStr = '';
    let anyStr = '';
    let noneStr = '';

    if (this.itemsAsObjectsAll.length === 0 && this.itemsAsObjectsAny.length === 0 && this.itemsAsObjectsNone.length === 0) {
      finalStr = '';
    } else if (this.itemsAsObjectsAll.length > 0 && this.itemsAsObjectsAny.length === 0 && this.itemsAsObjectsNone.length === 0) {

      // -- first process tags of 'all' input tag
      // -- concat all tags with sign '+'
      // -- ex: api+developer
      this.itemsAsObjectsAll.forEach((val, idx) => {
        (idx === this.itemsAsObjectsAll.length - 1) ? allStr = allStr + val.name : allStr = allStr + val.name + '+';
      });

      finalStr = allStr;

    } else if (this.itemsAsObjectsAll.length === 0 && this.itemsAsObjectsAny.length > 0 && this.itemsAsObjectsNone.length === 0) {

      // -- second process tags of 'any' input tag
      // -- concat all tags with ' OR ', in beginning '(', at end ')'
      // -- ex: (puthon OR node OR laravel)
      // -- if last element is detected then concat closing round bracket

      anyStr = '(';

      this.itemsAsObjectsAny.forEach((val, idx) => {
        (idx === this.itemsAsObjectsAny.length - 1) ? anyStr = anyStr + val.name + ')' : anyStr = anyStr + val.name + ' OR ';
      });

      finalStr = anyStr;

    } else if (this.itemsAsObjectsAll.length === 0 && this.itemsAsObjectsAny.length === 0 && this.itemsAsObjectsNone.length > 0) {

      // -- last process tags of 'none' input tag
      // -- concat all tags with '-'
      // -- ex: -siva-upwork
      // -- if last element is detected then concat value only, no need of '-'

      noneStr = ' -';

      this.itemsAsObjectsNone.forEach((val, idx) => {
        (idx === this.itemsAsObjectsNone.length - 1) ? noneStr = noneStr + val.name : noneStr = noneStr + val.name + '-';
      });

      finalStr = noneStr;

    } else if (this.itemsAsObjectsAll.length > 0 && this.itemsAsObjectsAny.length > 0 && this.itemsAsObjectsNone.length === 0) {

      this.itemsAsObjectsAll.forEach((val, idx) => {
        (idx === this.itemsAsObjectsAll.length - 1) ? allStr = allStr + val.name : allStr = allStr + val.name + '+';
      });

      anyStr = '(';

      this.itemsAsObjectsAny.forEach((val, idx) => {
        (idx === this.itemsAsObjectsAny.length - 1) ? anyStr = anyStr + val.name + ')' : anyStr = anyStr + val.name + ' OR ';
      });

      finalStr = allStr + anyStr;

    } else if (this.itemsAsObjectsAll.length === 0 && this.itemsAsObjectsAny.length > 0 && this.itemsAsObjectsNone.length > 0) {

      anyStr = '(';

      this.itemsAsObjectsAny.forEach((val, idx) => {
        (idx === this.itemsAsObjectsAny.length - 1) ? anyStr = anyStr + val.name + ')' : anyStr = anyStr + val.name + ' OR ';
      });

      noneStr = ' -';

      this.itemsAsObjectsNone.forEach((val, idx) => {
        (idx === this.itemsAsObjectsNone.length - 1) ? noneStr = noneStr + val.name : noneStr = noneStr + val.name + '-';
      });

      finalStr = anyStr + noneStr;

    } else if (this.itemsAsObjectsAll.length > 0 && this.itemsAsObjectsAny.length === 0 && this.itemsAsObjectsNone.length > 0) {

      this.itemsAsObjectsAll.forEach((val, idx) => {
        (idx === this.itemsAsObjectsAll.length - 1) ? allStr = allStr + val.name : allStr = allStr + val.name + '+';
      });

      noneStr = '-';

      this.itemsAsObjectsNone.forEach((val, idx) => {
        (idx === this.itemsAsObjectsNone.length - 1) ? noneStr = noneStr + val.name : noneStr = noneStr + val.name + '-';
      });

      finalStr = allStr + noneStr;

    } else if (this.itemsAsObjectsAll.length > 0 && this.itemsAsObjectsAny.length > 0 && this.itemsAsObjectsNone.length > 0) {

      this.itemsAsObjectsAll.forEach((val, idx) => {
        (idx === this.itemsAsObjectsAll.length - 1) ? allStr = allStr + val.name : allStr = allStr + val.name + '+';
      });

      anyStr = '(';

      this.itemsAsObjectsAny.forEach((val, idx) => {
        (idx === this.itemsAsObjectsAny.length - 1) ? anyStr = anyStr + val.name + ')' : anyStr = anyStr + val.name + ' OR ';
      });

      noneStr = ' -';

      this.itemsAsObjectsNone.forEach((val, idx) => {
        (idx === this.itemsAsObjectsNone.length - 1) ? noneStr = noneStr + val.name : noneStr = noneStr + val.name + '-';
      });

      finalStr = allStr + anyStr + noneStr;
    }

    return finalStr;
  }

}
