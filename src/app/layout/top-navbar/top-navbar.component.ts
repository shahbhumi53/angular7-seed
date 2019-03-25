import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { GlobalState } from '../../app.state';
import { ConfigService } from '../../shared/services/config/config.service';
import { ThemesService } from '../../shared/services/themes/themes.service';

@Component({
  selector: 'app-header',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TopNavbarComponent implements OnInit {

  currentTheme: any ;

  constructor(public config: ConfigService, private _elementRef: ElementRef, private _state: GlobalState, public themes: ThemesService) {
    this._state.subscribe('app.isApp_MobileSidebarLeftOpen', (isApp_MobileSidebarLeftOpen) => {
      this.config.appLayout.isApp_MobileSidebarLeftOpen = isApp_MobileSidebarLeftOpen;
    });
    this._state.subscribe('app.isApp_BackdropVisible', (isApp_BackdropVisible) => {
      this.config.appLayout.isApp_BackdropVisible = isApp_BackdropVisible;
    });
    this._state.subscribe('app.isApp_SidebarRightOpen', (isApp_SidebarRightOpen) => {
      this.config.appLayout.isApp_SidebarRightOpen = isApp_SidebarRightOpen;
    });
  }

  ngOnInit() {
  }

  setTheme() {
    this.themes.setTheme(this.currentTheme);
  }

  toggleAppMobileLeftMenuSidebar() {
    this.config.appLayout.isApp_MobileSidebarLeftOpen = !this.config.appLayout.isApp_MobileSidebarLeftOpen;
    this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
    this._state.notifyDataChanged('app.isApp_MobileSidebarLeftOpen', this.config.appLayout.isApp_MobileSidebarLeftOpen);
    this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
    return false;
  }


  toggleAppRightSidebar() {
    this.config.appLayout.isApp_SidebarRightOpen = !this.config.appLayout.isApp_SidebarRightOpen;
    this.config.appLayout.isApp_BackdropVisible = !this.config.appLayout.isApp_BackdropVisible;
    this._state.notifyDataChanged('app.isApp_SidebarRightOpen', this.config.appLayout.isApp_SidebarRightOpen);
    this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
    return false;
  }
}
