import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SearchPersonPageComponent } from './search-person-page.component';
import { TagInputModule } from 'ngx-chips';
import { PossiblePersonsComponent } from './possible-persons/possible-persons.component';
import { SearchSeactionComponent } from './search-seaction/search-seaction.component';
import { FormsModule } from '@angular/forms';
import { SearchPersonService } from './search-person.service';
import { MatDialogModule } from '@angular/material';
import { DisplayContactComponent } from '../../shared/components/display-contact/display-contact.component';
import { AddListFormComponent } from '../../shared/components/add-list-form/add-list-form.component';
import { MobileViewGuardService } from '../../shared/services/auth/mobile-view-guard.service';

const DASHBOARDS_ROUTE = [
  { path: '', component: SearchPersonPageComponent, canActivate: [ MobileViewGuardService ]},
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(DASHBOARDS_ROUTE),
    TagInputModule,
    FormsModule,
    MatDialogModule
  ],
  declarations: [
    SearchPersonPageComponent,
    PossiblePersonsComponent,
    SearchSeactionComponent
  ],
  providers: [
    SearchPersonService
  ],
  entryComponents: [
    DisplayContactComponent,
    AddListFormComponent
  ]
})
export class SearchPersonPageModule { }
