import {
  Component,
  OnInit,
  ElementRef,
  HostListener
} from '@angular/core';
import { GlobalState } from '../../app.state';
import { ConfigService } from '../../shared/services/config/config.service';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  public scrollbarOptions = {
    axis: 'y',
    theme: 'minimal',
    scrollInertia: 0,
    mouseWheel: { preventDefault: true }
  };

  hidePricingEmailList = [
    'juliebertoni@groupefed.fr',
  ];
  isPriceHide = false;

  constructor(public config: ConfigService, private _elementRef: ElementRef, private _state: GlobalState, public auth: AuthService) {
    this.config.appLayout.isApp_SidebarLeftCollapsed = true; // --- true means menu is collapsed
  }

  ngOnInit() {
    this.isPriceHide = this.hidePricingEmailList.includes(JSON.parse(localStorage.getItem('ajs_user_traits')).traits.user);
  }

  toggleMenuSideabar() {
    this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
    this._state.notifyDataChanged('app.isCollapsed', this.config.appLayout.isApp_SidebarLeftCollapsed);
    return false;
  }
  @HostListener('window:resize')
  public onWindowResize(): void { }
}
