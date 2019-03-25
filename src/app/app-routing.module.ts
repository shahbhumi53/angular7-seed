import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './shared/services/auth/auth-guard.service';
// import { BillingComponent } from './pages/billing/billing.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'layout',
    loadChildren: './layout/layout.module#LayoutModule',
    canActivate: [ AuthGuardService ]
  },
  /*{
    path: 'errors',
    loadChildren: './pages/errors/errors.module#ErrorsModule'
  },
  {
    path: 'billing',
    component: BillingComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'logout',
    redirectTo: 'layout',
    canActivate: [ AuthGuardService ]
  },*/
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
