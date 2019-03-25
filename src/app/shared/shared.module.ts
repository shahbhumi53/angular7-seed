// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatRadioModule,
  MatRippleModule,
  MatSidenavModule,
  MatExpansionModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTabsModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatDialogModule,
  MatToolbarModule,
} from '@angular/material';

// Angular Material
const AngularMaterialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatRadioModule,
  MatSidenavModule,
  MatExpansionModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatTabsModule,
  MatTableModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatDialogModule,
  MatTooltipModule,
  MatToolbarModule
];

import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

/*
*/
// ngx-bootstrap4
/*
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CookieService } from 'ngx-cookie-service';*/


// UI Shared Components
import { FooterComponent } from '../layout/footer/footer.component';
/*
import { AppBackdropComponent } from './components/app_backdrop/app_backdrop.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NamePartPipe } from './pipes/name-part.pipe';
import { AssetsListService } from './services/httpclient/assets-list.service';
import { StripeService } from './services/httpclient/stripe.service';
import { DisplayContactComponent } from '../pages/display-contact/display-contact.component';
import { AddListFormComponent } from '../pages/projects/add-list-form/add-list-form.component';
import { AnalyticsService } from './services/analytics/analytics.service';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2Segment } from 'angulartics2/segment';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FileDropModule } from 'ngx-file-drop';
import { SafePipe } from './pipes/safe.pipe';
import { ImageService } from './services/image/image.service';
import { FormWizardModule } from 'angular2-wizard';
import { StartUsePricingInfoComponent } from './components/start-use-pricing-info/start-use-pricing-info.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';*/

@NgModule({
  imports: [
    [...AngularMaterialModules],
    CommonModule,
    MalihuScrollbarModule.forRoot(),
    /*BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    // Angulartics2Module.forRoot([Angulartics2Segment]),
    FileDropModule,
    FormWizardModule,
    ClipboardModule,
    NgxDatatableModule*/
  ],
  declarations: [
    // AppBackdropComponent,
    FooterComponent,
    /*NamePartPipe,
    DisplayContactComponent,
    AddListFormComponent,
    SpinnerComponent,
    SafePipe,
    StartUsePricingInfoComponent,
    ConfirmBoxComponent*/
  ],
  exports: [
    CommonModule,
    [...AngularMaterialModules],
    MalihuScrollbarModule,
    /*AppBackdropComponent,
    TabsModule,
    BsDropdownModule,
    AlertModule,
    ModalModule,
    PopoverModule,
    NamePartPipe,
    SpinnerComponent,
    MatProgressBarModule,
    FileDropModule,
    SafePipe,
    FormWizardModule,
    NgxDatatableModule*/
  ],
  providers: [
    /*AssetsListService,
    StripeService,
    AnalyticsService,
    CookieService,
    MatProgressBarModule,
    ImageService,*/
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
