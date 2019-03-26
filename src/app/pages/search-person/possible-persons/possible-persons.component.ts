import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchPersonService } from '../search-person.service';
import { MatCheckboxChange, MatDialog, MatDialogConfig, TooltipPosition } from '@angular/material';
import { DisplayContactComponent } from '../../../shared/components/display-contact/display-contact.component';
import { UtilsService } from '../../../shared/services/utils/utils.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { Router } from '@angular/router';
import { AddListFormComponent } from '../../../shared/components/add-list-form/add-list-form.component';
import { Page } from '../../../shared/model/page.model';
import { Asset} from '../../../shared/model/asset.model';
import { ImageService } from '../../../shared/services/image/image.service';
import { ClipboardService } from 'ngx-clipboard';
import { List } from '../../../shared/model/list.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-possible-persons',
  templateUrl: './possible-persons.component.html',
  styleUrls: ['./possible-persons.component.scss', '../search-person-page.component.scss']
})
export class PossiblePersonsComponent implements OnInit, OnDestroy {

  rows = [];
  expanded: any = {};
  selected = [];
  temp = [];
  isToolbarActive = false;
  itemsSelected = '';
  itemCount = 0;
  country: string;
  searchBtnClickSubscription: Subscription;
  riskyEmail = true; // true = checked
  lists = [];
  selectedListName = 'Select List';
  selectedListId: number;
  // -- show spinner
  showSpinner: boolean;
  @ViewChild('possiblePersonsTable') table: any;

  // -- pagination settings
  page = new Page();

  // -- tooltip settings -- //
  position: TooltipPosition = 'below';
  message: string; // -- content to display in tooltip
  disabled = false;
  showDelay = 0; // -- when tooltip will appear
  hideDelay = 1000; // -- when tootip will disappear
  showExtraClass = false;

  // -- show not found message
  showErrorDiv = false;
  errorMessage = '';

  constructor(public dialog: MatDialog,
              private service: SearchPersonService,
              private notfication: NotificationService,
              private router: Router,
              private imageService: ImageService,
              private clipboardService: ClipboardService,
              private cookieService: CookieService) { }

  ngOnInit() {
    // -- if user does not select list from dropdown then assets should be added in default list
    if (this.cookieService.get('current_list')) {
      const list: List = JSON.parse(this.cookieService.get('current_list'));
      this.selectedListId = list.id;
      this.selectedListName = list.name;
    } else if (localStorage.getItem(UtilsService.KEY_DEFAULTLISTID)) {
      this.selectedListId = parseInt(localStorage.getItem(UtilsService.KEY_DEFAULTLISTID));
    }
    this.searchBtnClickSubscription = this.service.searchBtnClickSubject.subscribe(data => {
      this.showErrorDiv = false;
      this.errorMessage = '';
      if (data.error === false) {
        // -- while data received from ultra api with social url
        if (data.from === 'socialurl') {
          // const listId = localStorage.getItem(UtilsService.KEY_DEFAULTLISTID); // -- get default list id
          this.service.addContactToList(data.persons, this.selectedListId); // -- add contact to default list
          this.openDialogue({dataToDisplay: data.persons, from: 'advanceSearchBySocialURLs'});
        } else {
          this.rows = [];
          this.page = data.page;
          this.rows = data.persons;
          this.country = data.country;
          // -- from URL to base64 image
          this.loadInitialsAvaratImage();
        }
      } else {
        console.error('PossiblePersonsComponent : ngOnInit : searchBtnClickSubject.subscribe : Some error occurred. Please try again');
        this.showErrorDiv = true;
        this.errorMessage = 'Not Found';
      }

      // -- hide spinner
      this.showSpinner = false;
    });

    // -- to load list of users in drop down
    if (localStorage.getItem(UtilsService.KEY_USERLISTS) !== null ) {
      this.lists = JSON.parse(localStorage.getItem(UtilsService.KEY_USERLISTS));
    }
  }

  onGetBUlkPhoneClick() {
    if (this.selected.length > 0) {
      // -- on submit click make spinner visible
      this.showSpinner = true;
      this.selected.forEach((val, index) => {
        // -- call first pipl(ultra) API and if phone not found then call supra(lusha) api
        this.service.getAndDisplayPhone(val, this.selectedListId)
          .then((response) => {
            if (response.Found && response.info !== null && (response.info.custom_field.phones || response.info.custom_field.phone)) {
              // -- to change from get phone button to phone number
              this.selected[index]._display = true;
              this.selected[index].displayPhone = true;

              // -- single phone number is displayed
              // -- this key is added to show single phone and iterate loop on _foundPhone when multiple phones are there
              this.selected[index]._phoneToDisplay = response.info.custom_field.phones ? (response.info.custom_field.phones[0] ? response.info.custom_field.phones[0] : null) : null;

              // -- if multiple phone numbers are there then send to dialogue to display
              this.selected[index]._foundPhone = response.info.custom_field.phones ? response.info.custom_field.phones : null;

            }  else {
              // -- if phone number is not found then no need to show dialogue
              // -- just show in respective row that phone number is not found
              this.selected[index].displayPhone = false;
              this.selected[index]._foundPhone = false;
              this.selected[index]._display = false;
              // -- set to get error code like no_credit_remained
              this.selected[index]._foundErrorCode = false;
            }
            // -- once response received hide the loader again
            this.showSpinner = false;
          })
          .catch((error) => {
            console.error('PossiblePersonsComponent : onGetBulkPhoneClick : Error : ', error);
            this.selected[index]._foundPhone = 'Not Found';
            this.selected[index]._display = false;
            // -- set to get error code like no_credit_remained
            this.selected[index]._foundErrorCode = true;
            // -- on submit click make spinner visisble
            this.showSpinner = false;
          });
      });
    } else {
      this.notfication.notifyFailure('Please select contacts then try again.');
    }
  }

  // -- show email of selected data
  onGetBulkEmailClick() {
    if (this.selected.length > 0) {
      // -- on submit click make spinner visible
      this.showSpinner = true;
      this.selected.forEach((val, index) => {
        ((val, index) => {
          // -- set delay of 2 seconds between requests
          setTimeout(() => {
            const fullName = val.full_name;
            const company = val.company_name;
            if (fullName !== null && fullName.trim().length > 0 && company !== null && company.trim().length > 0) {
              // -- find country from linkedin url
              const country = UtilsService.determineCountryFromLinkedin(val.linkedin_url);
              this.service.getAndDisplayBulkEmail(val, fullName, company, country, false, this.riskyEmail, this.selectedListId)
                .then((response) => {
                  this.selected[index].displayEmail = true;
                  if (response.emailFound && response.info !== null && (response.info.emails || response.info.email)) {
                    this.selected[index]._foundEmail = response.info.emails ? response.info.emails[0].email
                      : response.info.email;
                  } else {
                    this.selected[index]._foundEmail = 'Not Found';
                  }
                  // -- make spinner invisible
                  this.showSpinner = false;
                })
                .catch((error) => {
                  this.selected[index].displayEmail = true;
                  this.selected[index]._foundEmail = 'Not Found';
                  console.error('onGetBulkEmailClick : getAndDisplayBulkEmail : some error occurred : ', error, val, fullName, company);
                  // -- make spinner invisible
                  this.showSpinner = false;
                });
            } else {
              this.selected[index].displayEmail = true;
              this.selected[index]._foundEmail = 'Not Found';
              console.error('SearchPersonService : getAndDisplayBulkEmail : findEmailBulk : error : null data');
              // -- make spinner invisible
              this.showSpinner = false;
            }
          }, index * 2000);
        })(val, index);
      });
    } else {
      this.notfication.notifyFailure('Please select contacts then try again.');
    }
  }

  // -- when data table row selected
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    if (selected.length === 1) {
      this.isToolbarActive = true;
      this.itemCount = selected.length;
      this.itemsSelected = 'Item Selected';
    } else if (selected.length > 0) {
      this.isToolbarActive = true;
      this.itemCount = selected.length;
      this.itemsSelected = 'Items Selected';
    } else {
      this.isToolbarActive = false;
    }
  }

  onGetEmailClick(data: any) {
    this.showSpinner = true;
    this.service.getAndDisplayEmail(data, this.riskyEmail, this.selectedListId)
      .then((response) => {
        data.displayEmail = true;
        if (response.emailFound && response.info !== null && (response.info.response.emails || response.info.response.email)) {
          data._foundEmail = response.info.response.emails ? response.info.response.emails[0].email
            : response.info.response.email;
        } else {
          data._foundEmail = 'Not Found';
        }
        this.showSpinner = false;
      })
      .catch((error) => {
        console.error('PossiblePersonsComponent : onGetEmailClick : Error : ', error);
        data.displayEmail = true;
        data._foundEmail = 'Not Found';
        this.showSpinner = false;
      });
  }

  onGetPhoneClick(data: any) {
    // -- on submit click make spinner visible
    // this.openDialogue(data)

    this.showSpinner = true;
    this.service.getAndDisplayPhone(data, this.selectedListId)
      .then((response) => {
        if (response.Found && response.info !== null && (response.info.custom_field.phones || response.info.custom_field.phone)) {

          // -- to change from get phone button to phone number
          data.displayPhone = true;
          data._display = true;

          // -- single phone number is displayed
          // -- this key is added to show single phone and iterate loop on _foundPhone when multiple phones are there
          data._phoneToDisplay = response.info.custom_field.phones ? (response.info.custom_field.phones[0] ? response.info.custom_field.phones[0] : null)
            : null;

          // -- if multiple phone numbers are there then send to dialogue to display
          data._foundPhone = response.info.custom_field.phones ? response.info.custom_field.phones
            : null;

          // -- to display email in dialogue
          data._foundEmail = response.info.custom_field.emails ? (response.info.custom_field.emails) : null;

            // -- present data in dialogue
          this.openDialogue({dataToDisplay: response.info, from: 'searchPersionGetPhoneClick'});

        } else {
          // -- if phone number is not found then no need to show dialogue
          // -- just show in respective row that phone number is not found
          data.displayPhone = false;
          data._foundPhone = false;
          data._display = false;
          data._foundErrorCode = false;
        }
        // -- once response received hide the loader again //
        this.showSpinner = false;
      })
      .catch((error) => {
        console.error('PossiblePersonsComponent : onGetPhoneClick : Error : ', error);
        data._display = false;
        data._foundPhone = 'Not Found';
        // -- if user not subscribed then display lock icon
        data._foundErrorCode = true;
        // -- on submit click make spinner visisble
        this.showSpinner = false;
      });
  }

  ngOnDestroy() {
    this.searchBtnClickSubscription.unsubscribe();
  }

  onChangeRiskyEmail(event: MatCheckboxChange) {
    this.riskyEmail = event.checked;
  }

  onSelectListOption(selectedList: any) {
    this.selectedListName = selectedList.name;
    this.selectedListId = selectedList.id;
    // -- set current list in cookie
    this.cookieService.set('current_list', JSON.stringify(selectedList));
  }

  // -- open popup on the click of create-new-list button
  onAddList() {
    const dialogRef = this.dialog.open(AddListFormComponent, {
      width: '600px',
      data: {editMode: false, list: null}
    } as MatDialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // -- show spinner
        this.showSpinner = !this.showSpinner;
        if (result !== undefined && result !== null) {
        this.service.createList(result)
          .then(() => {
            // -- load lists from local storage on create new list
            if (localStorage.getItem(UtilsService.KEY_USERLISTS) !== null) {
              this.lists = JSON.parse(localStorage.getItem(UtilsService.KEY_USERLISTS));
            }
          // -- hide spinner
            this.showSpinner = !this.showSpinner;
        })
        .catch(() => {
          // -- hide spinner
          this.showSpinner = !this.showSpinner;
        });
      } else {
        // -- hide spinner
        this.showSpinner = !this.showSpinner;
      }
    });
  }

  // -- Called whenever the user changes page
  // -- load searched queries from local storage and make request
  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: string }) {

    // -- show spinner
    this.showSpinner = true;

    // -- check searched queries exists
    if (localStorage.getItem(UtilsService.KEY_BINGSEARCHSTRING) === null) {
      this.errorMessage = 'Not Found';
      this.showErrorDiv = true;
      console.error('PossiblePersonsComponent : pageCallback : search string in local storage not found');

      // -- hide spinner
      this.showSpinner = false;

      return;
    }

    // -- load searched queries
    const searchedQueries = JSON.parse(localStorage.getItem(UtilsService.KEY_BINGSEARCHSTRING));

    // -- if search was performed from social URLs check
    if (searchedQueries.fromUrls) {
      this.service.searchBySocialURL(searchedQueries.linkedIn, searchedQueries.facebook);
    } else {
      // -- in response, page number starts from 1
      // -- in ngx-datatable, page count starts from 0
      this.service.searchPerson(searchedQueries.fullName, searchedQueries.role, searchedQueries.company, searchedQueries.country, searchedQueries.tags, (pageInfo.offset + 1).toString());
    }

    // -- once response is arrived spinner is hidden in subject subscription
  }

  goToCerebro(row) {
    const fullName = row.full_name;
    const fname = (fullName ? (fullName.split(' '))[0] : null) ;
    const lname = (fullName ? (fullName.split(' '))[1] : null) ;
    this.router.navigate(['/layout/cerebro' , { fname, lname, country: this.country } ]);
  }

  openDialogue(data: any) {
    const dialogRef = this.dialog.open(DisplayContactComponent, {
      width: '600px',
      data,
      panelClass: 'custom-dialog-container'
    } as MatDialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      console.log('closed now');
    });
  }

  onPhoneNumberClick(row: Asset) {
    // -- if multiple phones are there, then only display the dialogue
    if (row.custom_field.phones && row.custom_field.phones.length > 1) {
      this.openDialogue({dataToDisplay: row, from: 'searchpagePhoneNumberClick'});
    }
  }

  onEmailClick(row: Asset) {
    // -- if multiple phones are there, then only display the dialogue
    if (row.custom_field.emails && row.custom_field.emails.length > 1) {
      this.openDialogue({dataToDisplay: row, from: 'searchpageEmailClick'});
    }
    // -- copy content to clipboard
    this.clipboardService.copyFromContent(row.email_perso);
  }

  // -- from image URL to base64 image
  // -- used for presentation purpose so defined and used in template script file
  loadInitialsAvaratImage() {
    this.rows.forEach((val, i) => {
      const imageUrl = '';
      if (-1 !== val.image_url.indexOf('?initials=')) {
        this.imageService.getImage(val.image_url)
          .then((response) => {
            this.rows[i].custom_field.displayImg = response;
          })
          .catch((error) => {
            this.rows[i].custom_field.displayImg = '';
          });
      } else {
        this.rows[i].custom_field.displayImg = val.image_url;
      }
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

}
