import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'search-person', pathMatch: 'full' },
      // ----------------------------------------------------------->
      // -Search Person
      // ----------------------------------------------------------->
      {
        path: 'search-person',
        loadChildren: '../pages/search-person/search-person-page.module#SearchPersonPageModule'
      },
      /*
      // ----------------------------------------------------------->
      // -Block Page
      // ----------------------------------------------------------->
      { path: 'bulk-tools',
        loadChildren: '../pages/block/block-page.module#BlockPageModule'
      },
      // ----------------------------------------------------------->
      // -Dashboards
      // ----------------------------------------------------------->
      {
        path: 'dashboards',
        loadChildren: '../pages/dashboards/dashboards.module#DashboardsModule'
      },
      // ----------------------------------------------------------->
      // -Contacts
      // ----------------------------------------------------------->
      {
        path: 'contacts',
        loadChildren: '../pages/contacts/contacts.module#ContactsModule'
      },
      // ----------------------------------------------------------->
      // -Contacts
      // ----------------------------------------------------------->
      {
        path: 'lists',
        loadChildren: '../pages/projects/projects.module#ProjectsModule'
      },
      // ----------------------------------------------------------->
      // -Contacts Pipeline
      // ----------------------------------------------------------->
      {
        path: 'contacts-pipeline',
        loadChildren: '../pages/contacts-pipeline/contacts-pipeline.module#ContactsPipelineModule'
      },
      // ----------------------------------------------------------->
      // -Cerebro
      // ------------------------------------------------------------->
      {
        path: 'cerebro',
        loadChildren: '../pages/cerebro/cerebro.module#CerebroModule'
      },
      // ----------------------------------------------------------->
      // -Find people in bulk
      // ----------------------------------------------------------->
      {
        path: 'find-assets',
        loadChildren: '../pages/bulk-people-find/bulk-people-find.module#BulkPeopleFindModule'
      },
      // ----------------------------------------------------------->
      // -Find emails in bulk
      // ----------------------------------------------------------->
      {
        path: 'bulk-email-find',
        loadChildren: '../pages/bulk-email-find/bulk-email-find.module#BulkEmailFindModule'
      },
      // ----------------------------------------------------------->
      // -Find phones in bulk
      // ----------------------------------------------------------->
      {
        path: 'bulk-phone-find',
        loadChildren: '../pages/bulk-phone-find/bulk-phone-find.module#BulkPhoneFindModule'
      },
      // ----------------------------------------------------------->
      // -temp
      // ----------------------------------------------------------->
      {
        path: 'temp',
        loadChildren: '../pages/temp/temp.module#TempModule'
      },
      // ----------------------------------------------------------->
      // -Search Data 2
      // ----------------------------------------------------------->
      {
        path: 'search-data2',
        loadChildren: '../pages/search-by-name/search-by-name.module#SearchByNameModule'
      },
      // ----------------------------------------------------------->
      // -pricing page
      // ----------------------------------------------------------->
      {
        path: 'pricing',
        loadChildren: '../pages/pricing/pricing.module#PricingModule'
      },
      {
        path: 'settings',
        loadChildren: '../pages/settings/settings.module#SettingsModule'
      }*/
    ]
  },

  // - 404 Page Not Found
  { path: '**', redirectTo: 'search-person' }
];

export const LayoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);
