"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var LeftSidebarComponent = /** @class */ (function () {
    function LeftSidebarComponent(config, _elementRef, _state) {
        var _this = this;
        this.config = config;
        this._elementRef = _elementRef;
        this._state = _state;
        this.scrollbarOptions = {
            axis: "y",
            theme: "minimal",
            scrollInertia: 0,
            mouseWheel: { preventDefault: true }
        };
        this._state.subscribe("app.isCollapsed", function (isCollapsed) {
            _this.config.appLayout.isApp_SidebarLeftCollapsed = isCollapsed;
        });
    }
    LeftSidebarComponent.prototype.ngOnInit = function () { };
    LeftSidebarComponent.prototype.toggleMenuSideabar = function () {
        this.config.appLayout.isApp_SidebarLeftCollapsed = !this.config.appLayout.isApp_SidebarLeftCollapsed;
        this._state.notifyDataChanged("app.isCollapsed", this.config.appLayout.isApp_SidebarLeftCollapsed);
        return false;
    };
    LeftSidebarComponent.prototype.onWindowResize = function () { };
    __decorate([
        core_1.HostListener("window:resize")
    ], LeftSidebarComponent.prototype, "onWindowResize");
    LeftSidebarComponent = __decorate([
        core_1.Component({
            selector: "app-sidebar",
            templateUrl: "./left-sidebar.component.html",
            styleUrls: ["./left-sidebar.component.scss"]
        })
    ], LeftSidebarComponent);
    return LeftSidebarComponent;
}());
exports.LeftSidebarComponent = LeftSidebarComponent;
//# sourceMappingURL=left-sidebar.component.js.map