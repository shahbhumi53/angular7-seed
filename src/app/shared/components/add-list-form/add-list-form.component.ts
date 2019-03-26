import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { List } from '../../../shared/model/list.model';
import { LeadgenEmailService } from '../../../shared/services/httpclient/leadgen-email.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';

@Component({
  selector: 'app-add-list-form',
  templateUrl: './add-list-form.component.html',
  styleUrls: ['./add-list-form.component.scss']
})
export class AddListFormComponent implements OnInit {

  currentCompany: string;
  tdCompany: any;
  tdDisabled = false;
  countriesArray = [];
  selectedCompany: any;

  form: FormGroup;
  listToEdit: List;

  constructor(private fb: FormBuilder,
              public thisDialogRef: MatDialogRef<AddListFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private leadgen: LeadgenEmailService,
              private notification: NotificationService) {
    if (this.data.editMode === false) {
      // -- editMode false means dialogue is opened by clicking on Add List button
      // -- Present forms to add new list
      // -- name of HTML field  - lable in form     - list object for postList API
      // -- txt_company_name    - Name*             - list.name
      // -- txt_shortDesc       - Description       - list.short_description
      // -- txt_note            - Note              - Not added
      // -- txt_listName        - Client's Name     - data.txt_note
      this.form = this.fb.group({
        txt_listName: [''],
        txt_shortDesc: [''],
        txt_note: [''],
        list_picture: [null],
        txt_company_name: ['', Validators.compose([Validators.required])]
      });
    } else {
      // -- editMode true means dialogue is opened by clicking on Edit List button from list cards
      // -- Present form filled with existing value
      if (this.data.list !== null && this.data.list !== undefined) {
        // -- list name was missing after setting clearbit auto complete api
        this.currentCompany = this.data.list.note;
        this.form = this.fb.group({
          // -- txt_listName is client's name filed in form
          txt_listName: [this.data.list.note],
          txt_shortDesc: [this.data.list.short_description, Validators.compose([Validators.maxLength(35)])],
          txt_note: ['', Validators.compose([Validators.maxLength(100)])],
          list_picture: [this.data.list.picture],
          txt_company_name: [this.data.list.name]
        });
      }
    }
  }

  ngOnInit() {
  }

  onClose(form: NgForm) {
    if (form !== null) {
      // client's name (company name from clearbit api) is set in note key as explained by client //
      this.form.controls.txt_note.setValue((this.selectedCompany && this.selectedCompany.name) ? this.selectedCompany.name : '');
      this.thisDialogRef.close(this.form.value);
    } else {
      this.thisDialogRef.close(null);
    }
  }

  onFileChange(event) {

    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('list_picture').setValue({
          filename: file.name ? file.name.toLowerCase() : 'listimage.png',
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        });
      };
    }
  }

  filterCompanies(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      this.leadgen.getCompaniesClearbit(filterValue)
        .then((results) => {
            this.form.controls.list_picture.setValue(results[0].logo);
            this.tdCompany = results;
          }
        );
    }
  }

  onSelectCompany(aCompany: any) {
    if (aCompany === undefined) {
      this.notification.notifyFailure('Select Client\'s name');
      return;
    }
    this.selectedCompany = aCompany;
  }
}
