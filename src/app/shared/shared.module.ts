// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

// ngx-bootstrap4
/*
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CookieService } from 'ngx-cookie-service';*/


// UI Shared Components

import { AppBackdropComponent } from './components/app_backdrop/app_backdrop.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { DisplayContactComponent } from './components/display-contact/display-contact.component';
import { AddListFormComponent } from './components/add-list-form/add-list-form.component';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';
import { StartUsePricingInfoComponent } from './components/start-use-pricing-info/start-use-pricing-info.component';

// UI Modules
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// PIPES
import { SafePipe } from './pipes/safe.pipe';
import { NamePartPipe } from './pipes/name-part.pipe';
import { ServicesModule } from './services/services.module';

/*
import { AppBackdropComponent } from './components/app_backdrop/app_backdrop.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
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
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    NgxDatatableModule,
    /*BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    FileDropModule,
    FormWizardModule,
    ClipboardModule,
    */
  ],
  declarations: [
    AppBackdropComponent,
    FooterComponent,
    SpinnerComponent,
    DisplayContactComponent,
    AddListFormComponent,
    ConfirmBoxComponent,
    StartUsePricingInfoComponent,
    NamePartPipe,
    SafePipe,
  ],
  exports: [
    CommonModule,
    [...AngularMaterialModules],
    MalihuScrollbarModule,
    ServicesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    AppBackdropComponent,
    SpinnerComponent,
    ConfirmBoxComponent,
    StartUsePricingInfoComponent,
    NamePartPipe,
    SafePipe,
    /*TabsModule,
    BsDropdownModule,
    AlertModule,
    ModalModule,
    PopoverModule,
    FileDropModule,
    FormWizardModule,
    NgxDatatableModule*/
  ],
  providers: [ ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
