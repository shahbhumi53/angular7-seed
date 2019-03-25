"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var NavDropdownDirective = /** @class */ (function () {
    function NavDropdownDirective(el) {
        this.el = el;
    }
    NavDropdownDirective.prototype.toggle = function () {
        this.el.nativeElement.classList.toggle('open');
    };
    NavDropdownDirective = __decorate([
        core_1.Directive({
            selector: '[appNavDropdown]'
        })
    ], NavDropdownDirective);
    return NavDropdownDirective;
}());
exports.NavDropdownDirective = NavDropdownDirective;
var NavDropdownToggleDirective = /** @class */ (function () {
    function NavDropdownToggleDirective(dropdown) {
        this.dropdown = dropdown;
    }
    NavDropdownToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        this.dropdown.toggle();
    };
    __decorate([
        core_1.HostListener('click', ['$event'])
    ], NavDropdownToggleDirective.prototype, "toggleOpen");
    NavDropdownToggleDirective = __decorate([
        core_1.Directive({
            selector: '[appNavDropdownToggle]'
        })
    ], NavDropdownToggleDirective);
    return NavDropdownToggleDirective;
}());
exports.NavDropdownToggleDirective = NavDropdownToggleDirective;
exports.NavDropDownDirectives = [NavDropdownDirective, NavDropdownToggleDirective];
//# sourceMappingURL=nav-dropdown.directive.js.map