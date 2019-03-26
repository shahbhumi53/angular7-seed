import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-start-use-pricing-info',
  templateUrl: './start-use-pricing-info.component.html',
  styleUrls: ['./start-use-pricing-info.component.scss']
})
export class StartUsePricingInfoComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<StartUsePricingInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  onClose() {
    this.thisDialogRef.close('Sample Pass');
  }

}
