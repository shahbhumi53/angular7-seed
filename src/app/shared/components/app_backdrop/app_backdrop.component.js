"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var AppBackdropComponent = /** @class */ (function () {
    function AppBackdropComponent(config, _state) {
        var _this = this;
        this.config = config;
        this._state = _state;
        this.isApp_BackdropVisible = false;
        this._state.subscribe('app.isApp_BackdropVisible', function (isApp_BackdropVisible) {
            _this.isApp_BackdropVisible = _this.config.appLayout.isApp_BackdropVisible;
        });
    }
    AppBackdropComponent.prototype.ngOnInit = function () {
    };
    AppBackdropComponent.prototype.appBackdropClose = function () {
        this.config.appLayout.isApp_BackdropVisible = false;
        this._state.notifyDataChanged('app.isApp_BackdropVisible', this.config.appLayout.isApp_BackdropVisible);
        if (this.config.appLayout.isApp_BackdropVisible === false) {
            this.config.appLayout.isApp_MobileSidebarLeftOpen = false;
            this._state.notifyDataChanged('app.isApp_MobileSidebarLeftOpen', this.config.appLayout.isApp_MobileSidebarLeftOpen);
            this.config.appLayout.isApp_SidebarRightOpen = false;
            this._state.notifyDataChanged('app.isApp_SidebarRightOpen', this.config.appLayout.isApp_SidebarRightOpen);
        }
    };
    AppBackdropComponent = __decorate([
        core_1.Component({
            selector: 'appBackdrop',
            templateUrl: './app_backdrop.component.html',
            styleUrls: ['./app_backdrop.component.scss']
        })
    ], AppBackdropComponent);
    return AppBackdropComponent;
}());
exports.AppBackdropComponent = AppBackdropComponent;
//# sourceMappingURL=app_backdrop.component.js.map