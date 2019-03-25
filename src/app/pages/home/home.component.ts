import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  checked: boolean = false;
  toggleRegister: boolean = false;
  message: string =  ' Access to ColdCRM';
  email: string;
  verifymsg: string;
  sucess: any ;
  btnTaxt: string = 'Sign in or Sign up';
  constructor(public auth: AuthService,
              public router: Router) {
    // -- get query params form url after user click on email verify button
    this.email = this.getQueryStringValue('email');
    this.verifymsg = this.getQueryStringValue('message');
    this.sucess = this.getQueryStringValue('success');
    if (this.sucess === 'true') {
      this.message = this.verifymsg;
      this.btnTaxt = 'Access to your account';
    }
    // -- to detect website is accessed from mobile or desktop
    // this.detectmob();
  }

  ngOnInit() {
  }
  // -- get query params
  getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }
  // -- detect from where website access. mobile or desktop
  detectmob() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      // -- redirect to info page which display message as 'coldcrm is not yet available on mobile, please use a desktop device.'
      this.router.navigate(['/errors/mobileview-info']);
    } else {
      return false;
    }
  }
}
