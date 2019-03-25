import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ConfigService } from './config/config.service';
// import { PreloaderService } from './preloader/preloader.service';
// import { SpinnerService } from './spinner/spinner.service';
import { ThemesService } from './themes/themes.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
// import { UtilsService } from './utils/utils.service';
// import { BingHttpclientService } from './httpclient/bing-httpclient.service';
// import { LeadgenEmailService } from './httpclient/leadgen-email.service';
// import { NotificationService } from './notification/notification.service';
// import { MobileViewGuardService } from './auth/mobile-view-guard.service';
// import { HidingPriceService } from './auth/hiding-price';
@NgModule({
  imports: [],
  providers: [
    ConfigService,
    ThemesService,
    /*PreloaderService,
    SpinnerService,*/
    AuthService,
    AuthGuardService
  ],
  declarations: [],
  exports: []
})
export class ServicesModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: ServicesModule
  ) {}
}
