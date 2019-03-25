import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class ConfigService {
  public app: any;
  public appLayout: any;
  public breakpoint: any;

  constructor() {
    this.app = {
      name: 'MaterialWrap'
    };
    this.appLayout = {
      isApp_Boxed: false,
      isApp_SidebarLeftCollapsed: false,
      isApp_MobileSidebarLeftOpen: false,
      isApp_SidebarRightOpen: false,
      isApp_BackdropVisible: false
    };
    this.breakpoint = {
      desktopLG: 1280,
      desktop: 992,
      tablet: 768,
      mobile: 576
    };
  }
}
