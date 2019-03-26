import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Asset } from '../../model/asset.model';

@Component({
  selector: 'app-display-contact',
  templateUrl: './display-contact.component.html',
  styleUrls: ['./display-contact.component.scss']
})
export class DisplayContactComponent implements OnInit {

  // -- hold contact asset to display.
  contactToDisplay: Asset;
  profileImageUrl: string;

  // -- before displaying data make sure two params are passed and set
  // -- data - object of type asset
  // -- from - specify string identifier that opens the dialogue
  constructor(public thisDialogRef: MatDialogRef<DisplayContactComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.contactToDisplay = data.dataToDisplay;
  }

  ngOnInit() {
    this.decideProfileImageUrl();
  }

  onClose() {
    this.thisDialogRef.close(null);
  }

  // -- when image src with initial letters is specified then no issue
  // -- when image with normal URL is specified then also it looks for URL in custom_field
  // -- perform a simple check to look in custom field or use image_url key
  decideProfileImageUrl() {
    if (this.contactToDisplay.custom_field.displayImg) {
      this.profileImageUrl = this.contactToDisplay.custom_field.displayImg;
    } else if(this.contactToDisplay.image_url) {
      this.profileImageUrl = this.contactToDisplay.image_url;
    } else {
      this.profileImageUrl = '/assets/img/default-profile.png';
    }
  }

  // -- will execute when image url is broken
  // -- instead of showing alt text or broken image, default profile icon is displayed
  updateUrl(event) {
    this.profileImageUrl = '/assets/img/default-profile.png';
  }
}
