import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ConfigService } from './config/config.service';
import { ThemesService } from './themes/themes.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AssetsListService} from './httpclient/assets-list.service';
import { StripeService } from './httpclient/stripe.service';
import { AnalyticsService } from './analytics/analytics.service';
import { CookieService } from 'ngx-cookie-service';
import { ImageService } from './image/image.service';
import { SpinnerService } from './spinner/spinner.service';
import { MobileViewGuardService } from './auth/mobile-view-guard.service';
import { PreloaderService } from './preloader/preloader.service';
import { NotificationService } from './notification/notification.service';
import { LeadgenEmailService } from './httpclient/leadgen-email.service';
import { BingHttpclientService } from './httpclient/bing-httpclient.service';
// import { UtilsService } from './utils/utils.service';
// import { NotificationService } from './notification/notification.service';
// import { HidingPriceService } from './auth/hiding-price';
@NgModule({
  imports: [],
  providers: [
    ConfigService,
    ThemesService,
    AuthService,
    AuthGuardService,
    AssetsListService,
    StripeService,
    AnalyticsService,
    CookieService,
    ImageService,
    SpinnerService,
    MobileViewGuardService,
    PreloaderService,
    NotificationService,
    LeadgenEmailService,
    BingHttpclientService
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
