"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PreloaderService = /** @class */ (function () {
    function PreloaderService() {
    }
    PreloaderService_1 = PreloaderService;
    PreloaderService.registerLoader = function (method) {
        PreloaderService_1._loaders.push(method);
    };
    PreloaderService.clear = function () {
        PreloaderService_1._loaders = [];
    };
    PreloaderService.load = function () {
        return new Promise(function (resolve, reject) {
            PreloaderService_1._executeAll(resolve);
        });
    };
    PreloaderService._executeAll = function (done) {
        setTimeout(function () {
            Promise.all(PreloaderService_1._loaders).then(function (values) {
                done.call(null, values);
            })["catch"](function (error) {
                console.error(error);
            });
        });
    };
    PreloaderService._loaders = [];
    PreloaderService = PreloaderService_1 = __decorate([
        core_1.Injectable()
    ], PreloaderService);
    return PreloaderService;
    var PreloaderService_1;
}());
exports.PreloaderService = PreloaderService;
//# sourceMappingURL=preloader.service.js.map