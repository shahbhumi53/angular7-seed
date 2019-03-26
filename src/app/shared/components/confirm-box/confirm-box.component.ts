import { Component, Inject, OnInit } from '@angular/core';
import { DisplayContactComponent } from '../../../shared/components/display-contact/display-contact.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<DisplayContactComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onClose(_delete: boolean) {
    this.thisDialogRef.close(_delete);
  }

}
