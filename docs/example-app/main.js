"use strict";
(self["webpackChunkexample_app"] = self["webpackChunkexample_app"] || []).push([["main"],{

/***/ 4630:
/*!*******************************************************!*\
  !*** ./projects/example-app/src/app/app.component.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": function() { return /* binding */ AppComponent; }
/* harmony export */ });
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ 8069);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass.js */ 8047);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component.html?ngResource */ 4015);
/* harmony import */ var _app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component.scss?ngResource */ 598);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var petriflow_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! petriflow-svg */ 4743);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ 9946);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ 5758);
/* harmony import */ var _petriflow_info_dialog_petriflow_info_dialog_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./petriflow-info-dialog/petriflow-info-dialog.component */ 6773);











var AppComponent = /*#__PURE__*/function () {
  function AppComponent(_petriflowCanvasService, _petriflowFactoryService, _petriflowConfigService, dialog) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, AppComponent);

    this._petriflowCanvasService = _petriflowCanvasService;
    this._petriflowFactoryService = _petriflowFactoryService;
    this._petriflowConfigService = _petriflowConfigService;
    this.dialog = dialog;
    this._mode = _petriflowConfigService.mode;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AppComponent, [{
    key: "ngAfterViewInit",
    value: function ngAfterViewInit() {
      var _this = this;

      if (!this._petriflowCanvasService.canvas) throw new Error("Petriflow SVG canvas does not exists!");

      this._petriflowCanvasService.canvas.svg.onclick = function (e) {
        _this.addTransition(e);

        _this.addPlace(e);
      };

      if (!this.toolbar) throw new Error("MatToolbar could not be found!");

      this._petriflowConfigService.addCanvasEvent(this._petriflowCanvasService.canvas.svg, this.toolbar);

      this.toolbar._elementRef.nativeElement.onmouseenter = function () {
        _this._petriflowConfigService.deleteClipboard();
      };
    }
  }, {
    key: "addTransition",
    value: function addTransition($event) {
      var _a, _b, _c, _d;

      if (this._petriflowConfigService.mode === petriflow_svg__WEBPACK_IMPORTED_MODULE_5__.CanvasMode.CREATE_TRANSITION) {
        var offset = this._petriflowCanvasService.getPanZoomOffset();

        var transition = this._petriflowFactoryService.createTransition(new DOMPoint(($event.offsetX - ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0)) / ((_b = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _b !== void 0 ? _b : 1), ($event.offsetY - ((_c = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _c !== void 0 ? _c : 0)) / ((_d = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _d !== void 0 ? _d : 1)));

        this._petriflowConfigService.addTransitionEvents(transition);
      }
    }
  }, {
    key: "addPlace",
    value: function addPlace(e) {
      var _a, _b, _c, _d;

      if (this._petriflowConfigService.mode === petriflow_svg__WEBPACK_IMPORTED_MODULE_5__.CanvasMode.CREATE_PLACE) {
        var offset = this._petriflowCanvasService.getPanZoomOffset();

        var place = this._petriflowFactoryService.createPlace(0, new DOMPoint((e.offsetX - ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0)) / ((_b = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _b !== void 0 ? _b : 1), (e.offsetY - ((_c = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _c !== void 0 ? _c : 0)) / ((_d = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _d !== void 0 ? _d : 1)));

        this._petriflowConfigService.addPlaceEvents(place);
      }
    }
  }, {
    key: "disablePreviousArcMode",
    value: function disablePreviousArcMode() {
      var _a;

      if (this._petriflowFactoryService.arcLine) {
        (_a = this._petriflowCanvasService.canvas) === null || _a === void 0 ? void 0 : _a.container.removeChild(this._petriflowFactoryService.arcLine);
        this._petriflowFactoryService.source = undefined;
        this._petriflowFactoryService.arcLine = undefined;
      }
    }
  }, {
    key: "changeCanvasMode",
    value: function changeCanvasMode(mode) {
      var panzoomEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var _a, _b, _c;

      this.disablePreviousArcMode();
      this._petriflowConfigService.mode = mode;

      if (panzoomEnabled && ((_a = this._petriflowCanvasService.panzoom) === null || _a === void 0 ? void 0 : _a.isPaused())) {
        this._petriflowCanvasService.panzoom.resume();
      } else if (!panzoomEnabled && !((_b = this._petriflowCanvasService.panzoom) === null || _b === void 0 ? void 0 : _b.isPaused())) {
        (_c = this._petriflowCanvasService.panzoom) === null || _c === void 0 ? void 0 : _c.pause();
      }
    }
  }, {
    key: "goToLink",
    value: function goToLink(url) {
      window.open(url, '_blank');
    }
  }, {
    key: "resetPanZoom",
    value: function resetPanZoom() {
      var _a, _b;

      (_a = this._petriflowCanvasService.panzoom) === null || _a === void 0 ? void 0 : _a.moveTo(0, 0);
      (_b = this._petriflowCanvasService.panzoom) === null || _b === void 0 ? void 0 : _b.zoomAbs(0, 0, 1);
    }
  }, {
    key: "canvasMode",
    get: function get() {
      return petriflow_svg__WEBPACK_IMPORTED_MODULE_5__.CanvasMode;
    }
  }, {
    key: "openDialog",
    value: function openDialog() {
      this.dialog.open(_petriflow_info_dialog_petriflow_info_dialog_component__WEBPACK_IMPORTED_MODULE_4__.PetriflowInfoDialogComponent);
    }
  }]);

  return AppComponent;
}();

AppComponent.ctorParameters = function () {
  return [{
    type: petriflow_svg__WEBPACK_IMPORTED_MODULE_5__.PetriflowCanvasService
  }, {
    type: petriflow_svg__WEBPACK_IMPORTED_MODULE_5__.PetriflowCanvasFactoryService
  }, {
    type: petriflow_svg__WEBPACK_IMPORTED_MODULE_5__.PetriflowCanvasConfigurationService
  }, {
    type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__.MatDialog
  }];
};

AppComponent.propDecorators = {
  toolbar: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
    args: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbar]
  }],
  canvasComponent: [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ViewChild,
    args: ['canvasComponent']
  }]
};
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
  selector: 'pf-app-root',
  template: _app_component_html_ngResource__WEBPACK_IMPORTED_MODULE_2__,
  styles: [_app_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_3__]
})], AppComponent);


/***/ }),

/***/ 282:
/*!****************************************************!*\
  !*** ./projects/example-app/src/app/app.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": function() { return /* binding */ AppModule; }
/* harmony export */ });
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass.js */ 8047);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ 8069);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 4630);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3598);
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/flex-layout */ 7114);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 2816);
/* harmony import */ var ngx_joyride__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-joyride */ 1019);
/* harmony import */ var petriflow_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! petriflow-svg */ 4743);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ 5590);
/* harmony import */ var _petriflow_info_dialog_petriflow_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./petriflow-info-dialog/petriflow-info-dialog.component */ 6773);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 7317);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button-toggle */ 1959);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/toolbar */ 9946);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/dialog */ 5758);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/snack-bar */ 2528);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common/http */ 8784);



















var appRoutes = [{
  path: 'app',
  component: _app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent
}, {
  path: '**',
  redirectTo: 'app'
}];

var AppModule = /*#__PURE__*/(0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function AppModule(matIconRegistry, domSanitizer) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, AppModule);

  matIconRegistry.addSvgIcon('data', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/data.svg"));
  matIconRegistry.addSvgIcon('cursor-default-outline', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/cursor-default-outline.svg"));
  matIconRegistry.addSvgIcon('transition', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/transition.svg"));
  matIconRegistry.addSvgIcon('place', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/place.svg"));
  matIconRegistry.addSvgIcon('marking', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/marking.svg"));
  matIconRegistry.addSvgIcon('arc', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/arc.svg"));
  matIconRegistry.addSvgIcon('arcweight', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/arcweight.svg"));
  matIconRegistry.addSvgIcon('arcdataref', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/arcdataref.svg"));
  matIconRegistry.addSvgIcon('arcplaceref', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/arcplaceref.svg"));
  matIconRegistry.addSvgIcon('resetarc', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/resetarc.svg"));
  matIconRegistry.addSvgIcon('inhibitor', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/inhibitor.svg"));
  matIconRegistry.addSvgIcon('read', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/read.svg"));
  matIconRegistry.addSvgIcon('properties', domSanitizer.bypassSecurityTrustResourceUrl("../assets/modeler/icons/properties.svg"));
  matIconRegistry.addSvgIcon('github', domSanitizer.bypassSecurityTrustResourceUrl("../assets/github.svg"));
  matIconRegistry.addSvgIcon('netgrif_logo', domSanitizer.bypassSecurityTrustResourceUrl("../assets/netgrif_logo.svg"));
});

AppModule.ctorParameters = function () {
  return [{
    type: _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconRegistry
  }, {
    type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.DomSanitizer
  }];
};

AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
  declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent, _petriflow_info_dialog_petriflow_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__.PetriflowInfoDialogComponent],
  imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__.BrowserAnimationsModule, _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__.FlexLayoutModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule.forRoot(appRoutes), ngx_joyride__WEBPACK_IMPORTED_MODULE_11__.JoyrideModule.forRoot(), petriflow_svg__WEBPACK_IMPORTED_MODULE_12__.PetriflowCanvasModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIconModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_14__.MatButtonToggleModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_15__.MatToolbarModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_16__.MatDialogModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_17__.MatSnackBarModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButtonModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_18__.HttpClientModule],
  entryComponents: [_petriflow_info_dialog_petriflow_info_dialog_component__WEBPACK_IMPORTED_MODULE_3__.PetriflowInfoDialogComponent],
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent]
})], AppModule);


/***/ }),

/***/ 6773:
/*!***********************************************************************************************!*\
  !*** ./projects/example-app/src/app/petriflow-info-dialog/petriflow-info-dialog.component.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PetriflowInfoDialogComponent": function() { return /* binding */ PetriflowInfoDialogComponent; }
/* harmony export */ });
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass.js */ 8047);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ 8069);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _petriflow_info_dialog_component_html_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./petriflow-info-dialog.component.html?ngResource */ 5138);
/* harmony import */ var _petriflow_info_dialog_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./petriflow-info-dialog.component.scss?ngResource */ 9323);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);







var PetriflowInfoDialogComponent = /*#__PURE__*/(0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function PetriflowInfoDialogComponent() {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, PetriflowInfoDialogComponent);
});

PetriflowInfoDialogComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'pf-app-info-dialog',
  template: _petriflow_info_dialog_component_html_ngResource__WEBPACK_IMPORTED_MODULE_2__,
  styles: [_petriflow_info_dialog_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_3__]
})], PetriflowInfoDialogComponent);


/***/ }),

/***/ 4842:
/*!**************************************************************!*\
  !*** ./projects/example-app/src/environments/environment.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": function() { return /* binding */ environment; }
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
  production: false,
  deployUrl: '/'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 3437:
/*!******************************************!*\
  !*** ./projects/example-app/src/main.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ 5977);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 8150);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ 282);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ 4842);






if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.enableProdMode)();
}

(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_4__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__.AppModule).catch(function (err) {
  return console.error(err);
});

/***/ }),

/***/ 25:
/*!*****************************************!*\
  !*** ./dist/petri-svg/petri.svg.esm.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Arc": function() { return /* binding */ s; },
/* harmony export */   "ArcEnd": function() { return /* binding */ r; },
/* harmony export */   "ArrowArcEnd": function() { return /* binding */ a; },
/* harmony export */   "Canvas": function() { return /* binding */ v; },
/* harmony export */   "CanvasConfiguration": function() { return /* binding */ t; },
/* harmony export */   "CanvasElement": function() { return /* binding */ i; },
/* harmony export */   "CircleArcEnd": function() { return /* binding */ o; },
/* harmony export */   "Container": function() { return /* binding */ e; },
/* harmony export */   "DoubleArrowArcEnd": function() { return /* binding */ c; },
/* harmony export */   "EmptyCircleArcEnd": function() { return /* binding */ u; },
/* harmony export */   "EmptyNode": function() { return /* binding */ p; },
/* harmony export */   "FullCircleArcEnd": function() { return /* binding */ h; },
/* harmony export */   "InhibitorArc": function() { return /* binding */ d; },
/* harmony export */   "LabeledObject": function() { return /* binding */ g; },
/* harmony export */   "NodeElement": function() { return /* binding */ A; },
/* harmony export */   "Place": function() { return /* binding */ b; },
/* harmony export */   "PlaceTransitionArc": function() { return /* binding */ n; },
/* harmony export */   "ReadArc": function() { return /* binding */ _; },
/* harmony export */   "RegularPlaceTransitionArc": function() { return /* binding */ E; },
/* harmony export */   "RegularTransitionPlaceArc": function() { return /* binding */ m; },
/* harmony export */   "ResetArc": function() { return /* binding */ S; },
/* harmony export */   "StaticPlace": function() { return /* binding */ N; },
/* harmony export */   "Transition": function() { return /* binding */ k; },
/* harmony export */   "TransitionPlaceArc": function() { return /* binding */ l; }
/* harmony export */ });
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/get.js */ 4756);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js */ 265);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ 8277);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js */ 5488);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits.js */ 4582);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper.js */ 2496);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass.js */ 8047);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ 8069);









var t = /*#__PURE__*/(0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(function t() {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, t);
});

t.SVG_NAMESPACE = "http://www.w3.org/2000/svg", t.COLORS = {
  ACTIVE: "blue",
  INACTIVE: "black"
}, t.RADIUS = 18, t.SIZE = 36, t.ICON_SIZE = 25, t.TOKEN_RADIUS = 3, t.TOKEN_OFFSET = 7, t.FONT = {
  FAMILY: "verdana",
  SIZE: 12,
  SIZE_OFFSET: 18
}, t.ARROW_HEAD_SIZE = 5, t.WEIGHT_OFFSET = 10;

var e = /*#__PURE__*/function () {
  function e() {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, e);

    this._container = document.createElementNS(t.SVG_NAMESPACE, "g");
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(e, [{
    key: "container",
    get: function get() {
      return this._container;
    },
    set: function set(t) {
      this._container = t;
    }
  }]);

  return e;
}();

var i = /*#__PURE__*/function (_e) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(i, _e);

  var _super = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(i);

  function i() {
    var _this;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, i);

    _this = _super.apply(this, arguments), _this._isSelected = !1;
    return _this;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(i, [{
    key: "isEnclosedByRectangle",
    value: function isEnclosedByRectangle(t) {
      var e = this.container.getBBox();
      return !(t.x > e.x + e.width || e.x > t.x + t.width || t.y > e.y + e.height || e.y > t.y + t.height);
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      return this._isSelected;
    }
  }, {
    key: "setSelected",
    value: function setSelected(t) {
      this._isSelected = t;
    }
  }], [{
    key: "pointsToString",
    value: function pointsToString() {
      for (var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++) {
        t[_key] = arguments[_key];
      }

      return t.map(function (t) {
        return "".concat(t.x, ",").concat(t.y);
      }).join(" ") + " ";
    }
  }]);

  return i;
}(e);

var s = /*#__PURE__*/function (_i) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(s, _i);

  var _super2 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(s);

  function s(e, i, _s, n, l) {
    var _this2$_linePoints;

    var _this2;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, s);

    _this2 = _super2.call(this), _this2._start = e, _this2._end = i, _this2._linePoints = [], _this2._arcLineBackground = document.createElementNS(t.SVG_NAMESPACE, "polyline"), _this2._arcLineBackground.setAttributeNS(null, "fill", "none"), _this2._arcLineBackground.setAttributeNS(null, "stroke", "white"), _this2._arcLineBackground.setAttributeNS(null, "stroke-width", "4"), _this2.container.appendChild(_this2._arcLineBackground), _this2._arcLine = document.createElementNS(t.SVG_NAMESPACE, "polyline"), _this2._arcLine.setAttributeNS(null, "fill", "none"), _this2._arcLine.setAttributeNS(null, "stroke", "black"), _this2._arcLine.setAttributeNS(null, "stroke-width", "2"), _this2._arcLine.setAttributeNS(null, "marker-end", "url(#".concat(_s, ")")), _this2.container.appendChild(_this2._arcLine), _this2._multiplicityElement = document.createElementNS(t.SVG_NAMESPACE, "text"), _this2._multiplicityElement.setAttributeNS(null, "font-size", "".concat(t.FONT.SIZE)), _this2._multiplicityElement.setAttributeNS(null, "font-family", t.FONT.FAMILY), _this2._multiplicity = document.createTextNode(null != l ? l : ""), _this2._multiplicityElement.appendChild(_this2._multiplicity), _this2.container.appendChild(_this2._multiplicityElement), e.arcs.push((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_this2)), i.arcs.push((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_this2)), n && n.length > 0 && (_this2$_linePoints = _this2._linePoints).push.apply(_this2$_linePoints, (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(n)), _this2.move(e, i);
    return _this2;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(s, [{
    key: "activate",
    value: function activate() {
      this.arcLine.setAttributeNS(null, "class", "svg-active-stroke"), this.multiplicityElement.setAttributeNS(null, "class", "svg-active-fill");
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.arcLine.setAttributeNS(null, "class", "svg-inactive-stroke"), this.multiplicityElement.setAttributeNS(null, "class", "svg-inactive-fill");
    }
  }, {
    key: "move",
    value: function move(t, e) {
      var i = [t.position].concat(this._linePoints).concat(e.position),
          _s2 = Object.assign([], i);

      i[0] = t.getEdgeIntersection(i[1], 0), i[i.length - 1] = e.getEdgeIntersection(i[i.length - 2], 1);
      var n = i.map(function (t) {
        return "".concat(t.x, ",").concat(t.y);
      }).join(" ");
      _s2[0] = t.getEdgeIntersection(i[1], 2), _s2[i.length - 1] = e.getEdgeIntersection(i[i.length - 2], 2), this._arcLine.setAttributeNS(null, "points", n);

      var l = _s2.map(function (t) {
        return "".concat(t.x, ",").concat(t.y);
      }).join(" ");

      this._arcLineBackground.setAttributeNS(null, "points", l);

      var r = this.arcLine.points.length - 1,
          a = parseInt(String(r / 2), 10),
          o = this.getArcWeightPosition(this.arcLine.points[a], this.arcLine.points[a + 1]);
      this._multiplicityElement.setAttributeNS(null, "x", "".concat(o.x)), this._multiplicityElement.setAttributeNS(null, "y", "".concat(o.y));
    }
  }, {
    key: "getArcWeightPosition",
    value: function getArcWeightPosition(e, i) {
      var _s3 = e.x,
          n = e.y,
          l = i.x,
          r = i.y,
          a = (l - _s3) / 2,
          o = (r - n) / 2,
          c = Math.sqrt(a * a + o * o),
          u = a / c,
          h = o / c;

      var d, _;

      return a >= 0 && o >= 0 && (d = l - a + h * t.WEIGHT_OFFSET, _ = r - o - u * t.WEIGHT_OFFSET), a >= 0 && o < 0 && (d = l - a - h * t.WEIGHT_OFFSET, _ = r - o + u * t.WEIGHT_OFFSET), a < 0 && o > 0 && (d = l - a + h * t.WEIGHT_OFFSET, _ = r - o - u * t.WEIGHT_OFFSET), a < 0 && o <= 0 && (d = l - a - h * t.WEIGHT_OFFSET, _ = r - o + u * t.WEIGHT_OFFSET), new DOMPoint(d, _);
    }
  }, {
    key: "moveBy",
    value: function moveBy(t, e) {
      this.linePoints.forEach(function (i) {
        i.x = i.x + t, i.y = i.y + e;
      }), this.move(this.start, this.end);
    }
  }, {
    key: "isEnclosedByRectangle",
    value: function isEnclosedByRectangle(t) {
      return console.debug("By default the rectangle argument is ignored. Ignoring passed object.", t), this.setSelected(this.start.isSelected() && this.end.isSelected()), this.isSelected();
    }
  }, {
    key: "arcLineBackground",
    get: function get() {
      return this._arcLineBackground;
    },
    set: function set(t) {
      this._arcLineBackground = t;
    }
  }, {
    key: "arcLine",
    get: function get() {
      return this._arcLine;
    },
    set: function set(t) {
      this._arcLine = t;
    }
  }, {
    key: "multiplicityElement",
    get: function get() {
      return this._multiplicityElement;
    },
    set: function set(t) {
      this._multiplicityElement = t;
    }
  }, {
    key: "multiplicity",
    get: function get() {
      return this._multiplicity;
    },
    set: function set(t) {
      this._multiplicity = t;
    }
  }, {
    key: "linePoints",
    get: function get() {
      return this._linePoints;
    },
    set: function set(t) {
      this._linePoints = t;
    }
  }, {
    key: "start",
    get: function get() {
      return this._start;
    },
    set: function set(t) {
      this._start = t;
    }
  }, {
    key: "end",
    get: function get() {
      return this._end;
    },
    set: function set(t) {
      this._end = t;
    }
  }]);

  return s;
}(i);

var n = /*#__PURE__*/function (_s4) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(n, _s4);

  var _super3 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(n);

  function n() {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, n);

    return _super3.apply(this, arguments);
  }

  return (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(n);
}(s);

var l = /*#__PURE__*/function (_s5) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(l, _s5);

  var _super4 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(l);

  function l() {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, l);

    return _super4.apply(this, arguments);
  }

  return (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(l);
}(s);

var r = /*#__PURE__*/function () {
  function r(e, i, s, n, l) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, r);

    this._arrow = document.createElementNS(t.SVG_NAMESPACE, "marker"), this._arrow.setAttributeNS(null, "id", e), this._arrow.setAttributeNS(null, "markerHeight", "".concat(i)), this._arrow.setAttributeNS(null, "markerWidth", "".concat(s)), this._arrow.setAttributeNS(null, "refX", "".concat(n)), this._arrow.setAttributeNS(null, "refY", "".concat(l)), this._arrow.setAttributeNS(null, "orient", "auto"), this._arrow.setAttributeNS(null, "overflow", "visible");
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(r, [{
    key: "arrow",
    get: function get() {
      return this._arrow;
    },
    set: function set(t) {
      this._arrow = t;
    }
  }]);

  return r;
}();

var a = /*#__PURE__*/function (_r) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a, _r);

  var _super5 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(a);

  function a() {
    var _this3;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, a);

    _this3 = _super5.call(this, a.ID, t.ARROW_HEAD_SIZE, t.ARROW_HEAD_SIZE, t.ARROW_HEAD_SIZE - 1, t.ARROW_HEAD_SIZE / 2), _this3._arrowHead = document.createElementNS(t.SVG_NAMESPACE, "polygon"), _this3._arrowHead.setAttributeNS(null, "points", "0,0 ".concat(t.ARROW_HEAD_SIZE, ",").concat(t.ARROW_HEAD_SIZE / 2, " 0,").concat(t.ARROW_HEAD_SIZE)), _this3.arrow.appendChild(_this3._arrowHead);
    return _this3;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(a, [{
    key: "activate",
    value: function activate() {
      this.arrow.setAttributeNS(null, "class", "svg-active-fill svg-active-stroke");
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.arrow.setAttributeNS(null, "class", "svg-inactive-fill svg-inactive-stroke");
    }
  }]);

  return a;
}(r);

a.ID = "arc_end_arrow";

var o = /*#__PURE__*/function (_r2) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(o, _r2);

  var _super6 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(o);

  function o(e) {
    var _this4;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, o);

    _this4 = _super6.call(this, e, t.ARROW_HEAD_SIZE, t.ARROW_HEAD_SIZE, t.ARROW_HEAD_SIZE / 2, 0), _this4._circle = document.createElementNS(t.SVG_NAMESPACE, "circle"), _this4._circle.setAttributeNS(null, "r", "" + t.ARROW_HEAD_SIZE / 2), _this4.arrow.appendChild(_this4._circle);
    return _this4;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(o, [{
    key: "circle",
    get: function get() {
      return this._circle;
    }
  }]);

  return o;
}(r);

var c = /*#__PURE__*/function (_r3) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(c, _r3);

  var _super7 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(c);

  function c() {
    var _this5;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, c);

    _this5 = _super7.call(this, c.ID, t.ARROW_HEAD_SIZE, t.ARROW_HEAD_SIZE, t.ARROW_HEAD_SIZE - 1, t.ARROW_HEAD_SIZE / 2), _this5._arrowHead = document.createElementNS(t.SVG_NAMESPACE, "polygon"), _this5._arrowHead.setAttributeNS(null, "points", "0,0 ".concat(t.ARROW_HEAD_SIZE, ",").concat(t.ARROW_HEAD_SIZE / 2, " 0,").concat(t.ARROW_HEAD_SIZE));
    var e = document.createElementNS(t.SVG_NAMESPACE, "polygon");
    e.setAttributeNS(null, "points", "".concat(1 - t.ARROW_HEAD_SIZE, ",0 1,").concat(t.ARROW_HEAD_SIZE / 2, " ").concat(1 - t.ARROW_HEAD_SIZE, ",").concat(t.ARROW_HEAD_SIZE)), _this5.arrow.appendChild(_this5._arrowHead), _this5.arrow.appendChild(e);
    return _this5;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(c, [{
    key: "activate",
    value: function activate() {
      this._arrowHead.setAttributeNS(null, "stroke", t.COLORS.ACTIVE);
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this._arrowHead.setAttributeNS(null, "stroke", t.COLORS.INACTIVE);
    }
  }]);

  return c;
}(r);

c.ID = "arc_end_double_arrow";

var u = /*#__PURE__*/function (_o) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(u, _o);

  var _super8 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(u);

  function u() {
    var _this6;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, u);

    _this6 = _super8.call(this, u.ID), _this6.circle.setAttributeNS(null, "fill", "white"), _this6.deactivate();
    return _this6;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(u, [{
    key: "activate",
    value: function activate() {
      this.circle.setAttributeNS(null, "stroke", t.COLORS.ACTIVE);
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.circle.setAttributeNS(null, "stroke", t.COLORS.INACTIVE);
    }
  }]);

  return u;
}(o);

u.ID = "arc_end_circle_empty";

var h = /*#__PURE__*/function (_o2) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(h, _o2);

  var _super9 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(h);

  function h() {
    var _this7;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, h);

    _this7 = _super9.call(this, h.ID), _this7.deactivate();
    return _this7;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(h, [{
    key: "activate",
    value: function activate() {
      this.circle.setAttributeNS(null, "stroke", t.COLORS.ACTIVE), this.circle.setAttributeNS(null, "fill", t.COLORS.ACTIVE);
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.circle.setAttributeNS(null, "stroke", t.COLORS.INACTIVE), this.circle.setAttributeNS(null, "fill", t.COLORS.INACTIVE);
    }
  }]);

  return h;
}(o);

h.ID = "read_arc_end";

var d = /*#__PURE__*/function (_n) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(d, _n);

  var _super10 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(d);

  function d(t, e, i, s) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, d);

    return _super10.call(this, t, e, d.ID, i, null != s ? s : "");
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(d, [{
    key: "createArcEnd",
    value: function createArcEnd() {
      return new u();
    }
  }, {
    key: "clone",
    value: function clone() {
      var t;
      return new d(this.start, this.end, this.linePoints, null === (t = this.multiplicity) || void 0 === t ? void 0 : t.textContent);
    }
  }]);

  return d;
}(n);

d.ID = "arc_end_circle_empty";

var _ = /*#__PURE__*/function (_n2) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_, _n2);

  var _super11 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_);

  function _(t, e, i, s) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, _);

    return _super11.call(this, t, e, _.ID, i, null != s ? s : "");
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(_, [{
    key: "createArcEnd",
    value: function createArcEnd() {
      return new h();
    }
  }, {
    key: "clone",
    value: function clone() {
      var t;
      return new _(this.start, this.end, this.linePoints, null === (t = this.multiplicity) || void 0 === t ? void 0 : t.textContent);
    }
  }]);

  return _;
}(n);

_.ID = "read_arc_end";

var S = /*#__PURE__*/function (_n3) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(S, _n3);

  var _super12 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(S);

  function S(t, e, i, s) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, S);

    return _super12.call(this, t, e, S.ID, i, null != s ? s : "");
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(S, [{
    key: "createArcEnd",
    value: function createArcEnd() {
      return new c();
    }
  }, {
    key: "clone",
    value: function clone() {
      var t;
      return new S(this.start, this.end, this.linePoints, null === (t = this.multiplicity) || void 0 === t ? void 0 : t.textContent);
    }
  }]);

  return S;
}(n);

S.ID = "arc_end_double_arrow";

var E = /*#__PURE__*/function (_n4) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(E, _n4);

  var _super13 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(E);

  function E(t, e, i, s) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, E);

    return _super13.call(this, t, e, E.ID, i, null != s ? s : "");
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(E, [{
    key: "createArcEnd",
    value: function createArcEnd() {
      return new a();
    }
  }, {
    key: "clone",
    value: function clone() {
      var t;
      return new E(this.start, this.end, this.linePoints, null === (t = this.multiplicity) || void 0 === t ? void 0 : t.textContent);
    }
  }]);

  return E;
}(n);

E.ID = "arc_end_arrow";

var m = /*#__PURE__*/function (_l) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(m, _l);

  var _super14 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(m);

  function m(t, e, i, s) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, m);

    return _super14.call(this, t, e, m.ID, i, null != s ? s : "");
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(m, [{
    key: "createArcEnd",
    value: function createArcEnd() {
      return new a();
    }
  }, {
    key: "clone",
    value: function clone() {
      var t;
      return new m(this.start, this.end, this.linePoints, null === (t = this.multiplicity) || void 0 === t ? void 0 : t.textContent);
    }
  }]);

  return m;
}(l);

m.ID = "arc_end_arrow";

var A = /*#__PURE__*/function (_i2) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(A, _i2);

  var _super15 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(A);

  function A(e) {
    var _this8;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, A);

    _this8 = _super15.call(this), _this8._arcs = [], _this8._position = e, _this8._element = document.createElementNS(t.SVG_NAMESPACE, "rect");
    return _this8;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(A, [{
    key: "move",
    value: function move(t) {
      this._position = t, this.arcs.forEach(function (t) {
        t.move(t.start, t.end);
      });
    }
  }, {
    key: "deleteArcs",
    value: function deleteArcs(t) {
      var _this9 = this;

      t.forEach(function (t) {
        var e = _this9.arcs.indexOf(t);

        -1 !== e && _this9.arcs.splice(e, 1);
      });
    }
  }, {
    key: "moveBy",
    value: function moveBy(t, e) {
      var i = new DOMPoint(this.position.x + t, this.position.y + e);
      this.move(i);
    }
  }, {
    key: "position",
    get: function get() {
      return this._position;
    }
  }, {
    key: "arcs",
    get: function get() {
      return this._arcs;
    },
    set: function set(t) {
      this._arcs = t;
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    },
    set: function set(t) {
      this._element = t;
    }
  }, {
    key: "isEnclosedByRectangle",
    value: function isEnclosedByRectangle(t) {
      return this.setSelected((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(A.prototype), "isEnclosedByRectangle", this).call(this, t)), this.isSelected();
    }
  }]);

  return A;
}(i);

var g = /*#__PURE__*/function (_A) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(g, _A);

  var _super16 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(g);

  function g(e, i, s) {
    var _this10;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, g);

    _this10 = _super16.call(this, s), _this10._labelBackground = document.createElementNS(t.SVG_NAMESPACE, "rect"), _this10._labelBackground.setAttributeNS(null, "width", "0"), _this10._labelBackground.setAttributeNS(null, "height", "".concat(t.FONT.SIZE)), _this10._labelBackground.setAttributeNS(null, "fill-opacity", "0.7"), _this10._labelBackground.setAttributeNS(null, "fill", "white"), _this10.container.appendChild(_this10._labelBackground), _this10._labelElement = document.createElementNS(t.SVG_NAMESPACE, "text"), _this10._labelElement.setAttributeNS(null, "font-size", String(t.FONT.SIZE)), _this10._labelElement.setAttributeNS(null, "font-family", t.FONT.FAMILY), _this10._labelElement.setAttributeNS(null, "text-anchor", "middle"), _this10._label = document.createTextNode(i), _this10._labelElement.appendChild(_this10._label), _this10._id = e, _this10.container.appendChild(_this10._labelElement), _this10.setLabelElementPosition(s);
    return _this10;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(g, [{
    key: "setLabelElementPosition",
    value: function setLabelElementPosition(e) {
      this._labelElement.setAttributeNS(null, "x", "".concat(e.x)), this._labelElement.setAttributeNS(null, "y", "".concat(e.y + t.SIZE)), this._labelBackground.setAttributeNS(null, "x", "".concat(e.x)), this._labelBackground.setAttributeNS(null, "y", "".concat(e.y + t.SIZE));
    }
  }, {
    key: "activate",
    value: function activate() {
      this._labelElement.setAttributeNS(null, "class", "svg-active-fill");
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this._labelElement.setAttributeNS(null, "class", "svg-inactive-fill");
    }
  }, {
    key: "move",
    value: function move(t) {
      (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(g.prototype), "move", this).call(this, t), this.setLabelElementPosition(t);
    }
  }, {
    key: "labelElement",
    get: function get() {
      return this._labelElement;
    },
    set: function set(t) {
      this._labelElement = t;
    }
  }, {
    key: "label",
    get: function get() {
      return this._label;
    },
    set: function set(t) {
      this._label = t;
    }
  }, {
    key: "labelBackground",
    get: function get() {
      return this._labelBackground;
    },
    set: function set(t) {
      this._labelBackground = t;
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    },
    set: function set(t) {
      this._id = t, this._label.textContent = t;
    }
  }]);

  return g;
}(A);

var b = /*#__PURE__*/function (_g) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(b, _g);

  var _super17 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(b);

  function b(e, i, s, n) {
    var _this11;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, b);

    _this11 = _super17.call(this, e, i, n), _this11.element = document.createElementNS(t.SVG_NAMESPACE, "circle"), _this11.element.id = "svg_place_".concat(e), _this11.element.setAttributeNS(null, "r", "".concat(t.RADIUS)), _this11.element.setAttributeNS(null, "stroke-width", "2"), _this11.element.setAttributeNS(null, "fill", "white"), _this11.container.appendChild(_this11.element), _this11._tokensCount = s, _this11._markingTokens = [];

    for (var _e2 = 0; _e2 < 9; _e2++) {
      _this11._markingTokens[_e2] = document.createElementNS(t.SVG_NAMESPACE, "circle"), _this11._markingTokens[_e2].setAttributeNS(null, "r", t.TOKEN_RADIUS.toString()), _this11.container.appendChild(_this11._markingTokens[_e2]);
    }

    _this11._markingElement = document.createElementNS(t.SVG_NAMESPACE, "text"), _this11._markingElement.setAttributeNS(null, "font-size", "".concat(t.FONT.SIZE)), _this11._markingElement.setAttributeNS(null, "font-family", t.FONT.FAMILY), _this11._markingElement.setAttributeNS(null, "text-anchor", "middle"), _this11._markingElement.setAttributeNS(null, "dominant-baseline", "middle"), _this11._marking = document.createTextNode(""), _this11._markingElement.appendChild(_this11._marking), _this11.container.appendChild(_this11._markingElement), _this11.updateMarking(s), _this11.move(n), _this11.deactivate();
    return _this11;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(b, [{
    key: "markingToString",
    value: function markingToString(t) {
      return this.tokensVisible(t) ? "" : "".concat(t);
    }
  }, {
    key: "tokensVisible",
    value: function tokensVisible(t) {
      return t >= 0 && t <= 9;
    }
  }, {
    key: "activate",
    value: function activate() {
      (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b.prototype), "activate", this).call(this), this.element.setAttributeNS(null, "class", "svg-active-stroke");
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b.prototype), "deactivate", this).call(this), this.element.setAttributeNS(null, "stroke", "black"), this.element.setAttributeNS(null, "class", "svg-inactive-stroke");
    }
  }, {
    key: "move",
    value: function move(t) {
      (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b.prototype), "move", this).call(this, t), this.setElementPosition(t);

      for (var _e3 = 0; _e3 < 9; _e3++) {
        this.setMarkingTokenPosition(_e3, t);
      }
    }
  }, {
    key: "getEdgeIntersection",
    value: function getEdgeIntersection(e, i) {
      var s = new DOMPoint(e.x - this.position.x, e.y - this.position.y),
          n = t.RADIUS + i,
          l = 0 - s.x,
          r = 0 - s.y,
          a = Math.sqrt(l * l + r * r),
          o = +this.sgn(r) * l * Math.sqrt(n * n * a * a) / (a * a),
          c = -this.sgn(r) * l * Math.sqrt(n * n * a * a) / (a * a),
          u = +Math.abs(r) * Math.sqrt(n * n * a * a) / (a * a),
          h = -Math.abs(r) * Math.sqrt(n * n * a * a) / (a * a),
          d = new DOMPoint();
      return d.x = this.getIntersectionCoordinate(this.position.x, o, c, s.x), d.y = this.getIntersectionCoordinate(this.position.y, u, h, s.y), d;
    }
  }, {
    key: "getIntersectionCoordinate",
    value: function getIntersectionCoordinate(t, e, i, s) {
      return s < 0 ? e < 0 ? e + t : i + t : e > 0 ? e + t : i + t;
    }
  }, {
    key: "sgn",
    value: function sgn(t) {
      return t < 0 ? -1 : 1;
    }
  }, {
    key: "setElementPosition",
    value: function setElementPosition(t) {
      this.element.setAttributeNS(null, "cx", "".concat(t.x)), this.element.setAttributeNS(null, "cy", "".concat(t.y)), this._markingElement.setAttributeNS(null, "x", "".concat(t.x)), this._markingElement.setAttributeNS(null, "y", "".concat(t.y));
    }
  }, {
    key: "setMarkingTokenPosition",
    value: function setMarkingTokenPosition(e, i) {
      var s = b.TOKEN_OFFSETS[e];
      this._markingTokens[e].setAttributeNS(null, "cx", (i.x + s[0] * t.TOKEN_OFFSET).toString()), this._markingTokens[e].setAttributeNS(null, "cy", (i.y + s[1] * t.TOKEN_OFFSET).toString());
    }
  }, {
    key: "updateMarking",
    value: function updateMarking(t) {
      this._marking.nodeValue = this.markingToString(t);

      for (var _e4 = 0; _e4 < 9; _e4++) {
        var _i3 = void 0;

        _i3 = this.tokensVisible(t) && 1 === b.TOKEN_LAYOUTS[t][_e4] ? "black" : "white", this._markingTokens[_e4].setAttributeNS(null, "fill", _i3);
      }
    }
  }, {
    key: "markingTokens",
    get: function get() {
      return this._markingTokens;
    },
    set: function set(t) {
      this._markingTokens = t;
    }
  }, {
    key: "markingElement",
    get: function get() {
      return this._markingElement;
    },
    set: function set(t) {
      this._markingElement = t;
    }
  }, {
    key: "marking",
    get: function get() {
      return this._marking;
    },
    set: function set(t) {
      this._marking = t;
    }
  }, {
    key: "tokensCount",
    get: function get() {
      return this._tokensCount;
    },
    set: function set(t) {
      this._tokensCount = t;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new b(this.id, this.label.data, this.tokensCount, this.position);
    }
  }]);

  return b;
}(g);

b.TOKEN_OFFSETS = [[0, 0], [1, 1], [-1, 1], [1, -1], [-1, -1], [-1, 0], [1, 0], [0, -1], [0, 1]], b.TOKEN_LAYOUTS = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0], [1, 0, 1, 1, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 0, 0, 0, 0], [1, 1, 1, 1, 1, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1]];

var N = /*#__PURE__*/function (_b) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(N, _b);

  var _super18 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(N);

  function N() {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, N);

    return _super18.apply(this, arguments);
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(N, [{
    key: "activate",
    value: function activate() {
      (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(N.prototype), "activate", this).call(this), this.setStaticPlaceAttributes();
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(N.prototype), "deactivate", this).call(this), this.setStaticPlaceAttributes();
    }
  }, {
    key: "setStaticPlaceAttributes",
    value: function setStaticPlaceAttributes() {
      this.element.setAttributeNS(null, "class", "svg-inactive-stroke"), this.element.setAttributeNS(null, "fill", "white"), this.element.setAttributeNS(null, "stroke-dasharray", "14, 5"), this.element.setAttributeNS(null, "stroke-width", "3");
    }
  }]);

  return N;
}(b);

var p = /*#__PURE__*/function (_A2) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(p, _A2);

  var _super19 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(p);

  function p() {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, p);

    return _super19.apply(this, arguments);
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(p, [{
    key: "activate",
    value: function activate() {}
  }, {
    key: "deactivate",
    value: function deactivate() {}
  }, {
    key: "getEdgeIntersection",
    value: function getEdgeIntersection() {
      return this.position;
    }
  }, {
    key: "clone",
    value: function clone() {}
  }]);

  return p;
}(A);

var k = /*#__PURE__*/function (_g2) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(k, _g2);

  var _super20 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(k);

  function k(e, i, s) {
    var _this12;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, k);

    _this12 = _super20.call(this, e, i, s), _this12.element = document.createElementNS(t.SVG_NAMESPACE, "rect"), _this12.element.id = "svg_transition_".concat(e), _this12.element.setAttributeNS(null, "width", "".concat(t.SIZE)), _this12.element.setAttributeNS(null, "height", "".concat(t.SIZE)), _this12.element.setAttributeNS(null, "stroke", "black"), _this12.element.setAttributeNS(null, "stroke-width", "1"), _this12.container.appendChild(_this12.element), _this12.move(s);
    return _this12;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(k, [{
    key: "move",
    value: function move(t) {
      (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k.prototype), "move", this).call(this, t), this.setElementPosition(t);
    }
  }, {
    key: "activate",
    value: function activate() {
      (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k.prototype), "activate", this).call(this), this.element.setAttributeNS(null, "class", "svg-active-stroke");
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_get_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k.prototype), "deactivate", this).call(this), this.element.setAttributeNS(null, "class", "svg-inactive-stroke"), this.element.setAttributeNS(null, "fill", "white"), this.element.setAttributeNS(null, "stroke-width", "2");
    }
  }, {
    key: "getEdgeIntersection",
    value: function getEdgeIntersection(e, i) {
      var s = new DOMPoint(e.x - this.position.x, e.y - this.position.y),
          n = t.SIZE / 2 + i;
      var l = 1 / 0;
      0 !== s.x && (l = Math.abs(s.y / s.x));
      var r = Math.sign(s.x),
          a = Math.sign(s.y);
      return l > 1 ? new DOMPoint(this.position.x + n / l * r, this.position.y + n * a) : new DOMPoint(this.position.x + n * r, this.position.y + n * l * a);
    }
  }, {
    key: "setElementPosition",
    value: function setElementPosition(e) {
      this.element.setAttributeNS(null, "x", "" + (e.x - t.SIZE / 2)), this.element.setAttributeNS(null, "y", "" + (e.y - t.SIZE / 2));
    }
  }, {
    key: "setEnabled",
    value: function setEnabled(t) {
      t ? this.element.setAttributeNS(null, "class", "svg-transition-firing") : this.element.setAttributeNS(null, "class", "svg-transition-enabled");
    }
  }, {
    key: "setDisabled",
    value: function setDisabled() {
      this.element.setAttributeNS(null, "class", "svg-transition-disabled");
    }
  }, {
    key: "cancelArrowPoints",
    value: function cancelArrowPoints(t) {
      return this.arrowPoints(t, -1);
    }
  }, {
    key: "finishArrowPoints",
    value: function finishArrowPoints(t) {
      return this.arrowPoints(t, 1);
    }
  }, {
    key: "arrowPoints",
    value: function arrowPoints(e, s) {
      var n = e.x + .1 * t.SIZE / 2 * s,
          l = e.y - .8 * t.SIZE / 2,
          r = e.x + .1 * t.SIZE / 2 * s,
          a = e.y + .8 * t.SIZE / 2,
          o = e.x + .85 * t.SIZE / 2 * s;
      return i.pointsToString(new DOMPoint(n, l), new DOMPoint(r, a), new DOMPoint(o, e.y));
    }
  }, {
    key: "clone",
    value: function clone() {
      var t, e;
      return new k(this.id, null !== (e = null === (t = this.label) || void 0 === t ? void 0 : t.textContent) && void 0 !== e ? e : "", this.position);
    }
  }]);

  return k;
}(g);

var v = /*#__PURE__*/function (_e5) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_4__["default"])(v, _e5);

  var _super21 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_5__["default"])(v);

  function v(e) {
    var _this13;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_7__["default"])(this, v);

    _this13 = _super21.call(this), _this13._svg = e, _this13._defs = document.createElementNS(t.SVG_NAMESPACE, "defs"), _this13.svg.appendChild(_this13._defs), _this13.svg.appendChild(_this13.container);
    return _this13;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_6__["default"])(v, [{
    key: "add",
    value: function add(t) {
      this.container.appendChild(t.container);
    }
  }, {
    key: "remove",
    value: function remove(t) {
      return this.container.removeChild(t.container);
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this.container.childNodes.forEach(function (t) {
        return t.remove();
      });
    }
  }, {
    key: "register",
    value: function register(t) {
      this._defs.appendChild(t.arrow);
    }
  }, {
    key: "svg",
    get: function get() {
      return this._svg;
    },
    set: function set(t) {
      this._svg = t;
    }
  }]);

  return v;
}(e);



/***/ }),

/***/ 598:
/*!********************************************************************!*\
  !*** ./projects/example-app/src/app/app.component.scss?ngResource ***!
  \********************************************************************/
/***/ (function(module) {

module.exports = ".mat-badge-content {\n  font-weight: 600;\n  font-size: 12px;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-badge-small .mat-badge-content {\n  font-size: 9px;\n}\n\n.mat-badge-large .mat-badge-content {\n  font-size: 24px;\n}\n\n.mat-h1,\n.mat-headline,\n.mat-typography .mat-h1,\n.mat-typography .mat-headline,\n.mat-typography h1 {\n  font: 400 24px / 32px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n  margin: 0 0 16px;\n}\n\n.mat-h2,\n.mat-title,\n.mat-typography .mat-h2,\n.mat-typography .mat-title,\n.mat-typography h2 {\n  font: 500 20px / 32px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n  margin: 0 0 16px;\n}\n\n.mat-h3,\n.mat-subheading-2,\n.mat-typography .mat-h3,\n.mat-typography .mat-subheading-2,\n.mat-typography h3 {\n  font: 400 16px / 28px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n  margin: 0 0 16px;\n}\n\n.mat-h4,\n.mat-subheading-1,\n.mat-typography .mat-h4,\n.mat-typography .mat-subheading-1,\n.mat-typography h4 {\n  font: 400 15px / 24px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n  margin: 0 0 16px;\n}\n\n.mat-h5,\n.mat-typography .mat-h5,\n.mat-typography h5 {\n  font: 400 calc(14px * 0.83) / 20px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 12px;\n}\n\n.mat-h6,\n.mat-typography .mat-h6,\n.mat-typography h6 {\n  font: 400 calc(14px * 0.67) / 20px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 12px;\n}\n\n.mat-body-strong,\n.mat-body-2,\n.mat-typography .mat-body-strong,\n.mat-typography .mat-body-2 {\n  font: 500 14px / 24px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n}\n\n.mat-body,\n.mat-body-1,\n.mat-typography .mat-body,\n.mat-typography .mat-body-1,\n.mat-typography {\n  font: 400 14px / 20px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n}\n\n.mat-body p,\n.mat-body-1 p,\n.mat-typography .mat-body p,\n.mat-typography .mat-body-1 p,\n.mat-typography p {\n  margin: 0 0 12px;\n}\n\n.mat-small,\n.mat-caption,\n.mat-typography .mat-small,\n.mat-typography .mat-caption {\n  font: 400 12px / 20px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n}\n\n.mat-display-4,\n.mat-typography .mat-display-4 {\n  font: 300 112px / 112px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: -0.05em;\n  margin: 0 0 56px;\n}\n\n.mat-display-3,\n.mat-typography .mat-display-3 {\n  font: 400 56px / 56px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: -0.02em;\n  margin: 0 0 64px;\n}\n\n.mat-display-2,\n.mat-typography .mat-display-2 {\n  font: 400 45px / 48px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: -0.005em;\n  margin: 0 0 64px;\n}\n\n.mat-display-1,\n.mat-typography .mat-display-1 {\n  font: 400 34px / 40px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n  margin: 0 0 64px;\n}\n\n.mat-bottom-sheet-container {\n  font: 400 14px / 20px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n}\n\n.mat-button, .mat-raised-button, .mat-icon-button, .mat-stroked-button,\n.mat-flat-button, .mat-fab, .mat-mini-fab {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.mat-button-toggle {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-card {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-card-title {\n  font-size: 24px;\n  font-weight: 500;\n}\n\n.mat-card-header .mat-card-title {\n  font-size: 20px;\n}\n\n.mat-card-subtitle,\n.mat-card-content {\n  font-size: 14px;\n}\n\n.mat-checkbox {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-checkbox-layout .mat-checkbox-label {\n  line-height: 24px;\n}\n\n.mat-chip {\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.mat-chip .mat-chip-trailing-icon.mat-icon,\n.mat-chip .mat-chip-remove.mat-icon {\n  font-size: 18px;\n}\n\n.mat-table {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-header-cell {\n  font-size: 12px;\n  font-weight: 500;\n}\n\n.mat-cell, .mat-footer-cell {\n  font-size: 14px;\n}\n\n.mat-calendar {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-calendar-body {\n  font-size: 13px;\n}\n\n.mat-calendar-body-label,\n.mat-calendar-period-button {\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.mat-calendar-table-header th {\n  font-size: 11px;\n  font-weight: 400;\n}\n\n.mat-dialog-title {\n  font: 500 20px / 32px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n}\n\n.mat-expansion-panel-header {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 15px;\n  font-weight: 400;\n}\n\n.mat-expansion-panel-content {\n  font: 400 14px / 20px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n}\n\n.mat-form-field {\n  font-size: inherit;\n  font-weight: 400;\n  line-height: 1.125;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n}\n\n.mat-form-field-wrapper {\n  padding-bottom: 1.34375em;\n}\n\n.mat-form-field-prefix .mat-icon,\n.mat-form-field-suffix .mat-icon {\n  font-size: 150%;\n  line-height: 1.125;\n}\n\n.mat-form-field-prefix .mat-icon-button,\n.mat-form-field-suffix .mat-icon-button {\n  height: 1.5em;\n  width: 1.5em;\n}\n\n.mat-form-field-prefix .mat-icon-button .mat-icon,\n.mat-form-field-suffix .mat-icon-button .mat-icon {\n  height: 1.125em;\n  line-height: 1.125;\n}\n\n.mat-form-field-infix {\n  padding: 0.5em 0;\n  border-top: 0.84375em solid transparent;\n}\n\n.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  transform: translateY(-1.34375em) scale(0.75);\n  width: 133.3333333333%;\n}\n\n.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n  transform: translateY(-1.34374em) scale(0.75);\n  width: 133.3333433333%;\n}\n\n.mat-form-field-label-wrapper {\n  top: -0.84375em;\n  padding-top: 0.84375em;\n}\n\n.mat-form-field-label {\n  top: 1.34375em;\n}\n\n.mat-form-field-underline {\n  bottom: 1.34375em;\n}\n\n.mat-form-field-subscript-wrapper {\n  font-size: 75%;\n  margin-top: 0.6666666667em;\n  top: calc(100% - 1.7916666667em);\n}\n\n.mat-form-field-appearance-legacy .mat-form-field-wrapper {\n  padding-bottom: 1.25em;\n}\n\n.mat-form-field-appearance-legacy .mat-form-field-infix {\n  padding: 0.4375em 0;\n}\n\n.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.001px);\n  width: 133.3333333333%;\n}\n\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill + .mat-form-field-label-wrapper .mat-form-field-label {\n  transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00101px);\n  width: 133.3333433333%;\n}\n\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n  transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00102px);\n  width: 133.3333533333%;\n}\n\n.mat-form-field-appearance-legacy .mat-form-field-label {\n  top: 1.28125em;\n}\n\n.mat-form-field-appearance-legacy .mat-form-field-underline {\n  bottom: 1.25em;\n}\n\n.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper {\n  margin-top: 0.5416666667em;\n  top: calc(100% - 1.6666666667em);\n}\n\n@media print {\n  .mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n    transform: translateY(-1.28122em) scale(0.75);\n  }\n  .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill + .mat-form-field-label-wrapper .mat-form-field-label {\n    transform: translateY(-1.28121em) scale(0.75);\n  }\n  .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n    transform: translateY(-1.2812em) scale(0.75);\n  }\n}\n\n.mat-form-field-appearance-fill .mat-form-field-infix {\n  padding: 0.25em 0 0.75em 0;\n}\n\n.mat-form-field-appearance-fill .mat-form-field-label {\n  top: 1.09375em;\n  margin-top: -0.5em;\n}\n\n.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  transform: translateY(-0.59375em) scale(0.75);\n  width: 133.3333333333%;\n}\n\n.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n  transform: translateY(-0.59374em) scale(0.75);\n  width: 133.3333433333%;\n}\n\n.mat-form-field-appearance-outline .mat-form-field-infix {\n  padding: 1em 0 1em 0;\n}\n\n.mat-form-field-appearance-outline .mat-form-field-label {\n  top: 1.84375em;\n  margin-top: -0.25em;\n}\n\n.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  transform: translateY(-1.59375em) scale(0.75);\n  width: 133.3333333333%;\n}\n\n.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n  transform: translateY(-1.59374em) scale(0.75);\n  width: 133.3333433333%;\n}\n\n.mat-grid-tile-header,\n.mat-grid-tile-footer {\n  font-size: 14px;\n}\n\n.mat-grid-tile-header .mat-line,\n.mat-grid-tile-footer .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n\n.mat-grid-tile-header .mat-line:nth-child(n+2),\n.mat-grid-tile-footer .mat-line:nth-child(n+2) {\n  font-size: 12px;\n}\n\ninput.mat-input-element {\n  margin-top: -0.0625em;\n}\n\n.mat-menu-item {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n}\n\n.mat-paginator,\n.mat-paginator-page-size .mat-select-trigger {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n}\n\n.mat-radio-button {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-select {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-select-trigger {\n  height: 1.125em;\n}\n\n.mat-slide-toggle-content {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-slider-thumb-label-text {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n  font-weight: 500;\n}\n\n.mat-stepper-vertical, .mat-stepper-horizontal {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-step-label {\n  font-size: 14px;\n  font-weight: 400;\n}\n\n.mat-step-sub-label-error {\n  font-weight: normal;\n}\n\n.mat-step-label-error {\n  font-size: 14px;\n}\n\n.mat-step-label-selected {\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.mat-tab-group {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-tab-label, .mat-tab-link {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.mat-toolbar,\n.mat-toolbar h1,\n.mat-toolbar h2,\n.mat-toolbar h3,\n.mat-toolbar h4,\n.mat-toolbar h5,\n.mat-toolbar h6 {\n  font: 500 20px / 32px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n  margin: 0;\n}\n\n.mat-tooltip {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 10px;\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n\n.mat-tooltip-handset {\n  font-size: 14px;\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n\n.mat-list-item {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-list-option {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-list-base .mat-list-item {\n  font-size: 16px;\n}\n\n.mat-list-base .mat-list-item .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n\n.mat-list-base .mat-list-item .mat-line:nth-child(n+2) {\n  font-size: 14px;\n}\n\n.mat-list-base .mat-list-option {\n  font-size: 16px;\n}\n\n.mat-list-base .mat-list-option .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n\n.mat-list-base .mat-list-option .mat-line:nth-child(n+2) {\n  font-size: 14px;\n}\n\n.mat-list-base .mat-subheader {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n}\n\n.mat-list-base[dense] .mat-list-item {\n  font-size: 12px;\n}\n\n.mat-list-base[dense] .mat-list-item .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n\n.mat-list-base[dense] .mat-list-item .mat-line:nth-child(n+2) {\n  font-size: 12px;\n}\n\n.mat-list-base[dense] .mat-list-option {\n  font-size: 12px;\n}\n\n.mat-list-base[dense] .mat-list-option .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n\n.mat-list-base[dense] .mat-list-option .mat-line:nth-child(n+2) {\n  font-size: 12px;\n}\n\n.mat-list-base[dense] .mat-subheader {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n  font-weight: 500;\n}\n\n.mat-option {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 16px;\n}\n\n.mat-optgroup-label {\n  font: 500 14px / 24px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: normal;\n}\n\n.mat-simple-snackbar {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n}\n\n.mat-simple-snackbar-action {\n  line-height: 1;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: 500;\n}\n\n.mat-tree {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n\n.mat-tree-node,\n.mat-nested-tree-node {\n  font-weight: 400;\n  font-size: 14px;\n}\n\n.mat-ripple {\n  overflow: hidden;\n  position: relative;\n}\n\n.mat-ripple:not(:empty) {\n  transform: translateZ(0);\n}\n\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible;\n}\n\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transform: scale(0);\n}\n\n.cdk-high-contrast-active .mat-ripple-element {\n  display: none;\n}\n\n.cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  white-space: nowrap;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  left: 0;\n}\n\n[dir=rtl] .cdk-visually-hidden {\n  left: auto;\n  right: 0;\n}\n\n.cdk-overlay-container, .cdk-global-overlay-wrapper {\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n}\n\n.cdk-overlay-container {\n  position: fixed;\n  z-index: 1000;\n}\n\n.cdk-overlay-container:empty {\n  display: none;\n}\n\n.cdk-global-overlay-wrapper {\n  display: flex;\n  position: absolute;\n  z-index: 1000;\n}\n\n.cdk-overlay-pane {\n  position: absolute;\n  pointer-events: auto;\n  box-sizing: border-box;\n  z-index: 1000;\n  display: flex;\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.cdk-overlay-backdrop {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  pointer-events: auto;\n  -webkit-tap-highlight-color: transparent;\n  transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  opacity: 0;\n}\n\n.cdk-overlay-backdrop.cdk-overlay-backdrop-showing {\n  opacity: 1;\n}\n\n.cdk-high-contrast-active .cdk-overlay-backdrop.cdk-overlay-backdrop-showing {\n  opacity: 0.6;\n}\n\n.cdk-overlay-dark-backdrop {\n  background: rgba(0, 0, 0, 0.32);\n}\n\n.cdk-overlay-transparent-backdrop {\n  transition: visibility 1ms linear, opacity 1ms linear;\n  visibility: hidden;\n  opacity: 1;\n}\n\n.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing {\n  opacity: 0;\n  visibility: visible;\n}\n\n.cdk-overlay-connected-position-bounding-box {\n  position: absolute;\n  z-index: 1000;\n  display: flex;\n  flex-direction: column;\n  min-width: 1px;\n  min-height: 1px;\n}\n\n.cdk-global-scrollblock {\n  position: fixed;\n  width: 100%;\n  overflow-y: scroll;\n}\n\ntextarea.cdk-textarea-autosize {\n  resize: none;\n}\n\ntextarea.cdk-textarea-autosize-measuring {\n  padding: 2px 0 !important;\n  box-sizing: content-box !important;\n  height: auto !important;\n  overflow: hidden !important;\n}\n\ntextarea.cdk-textarea-autosize-measuring-firefox {\n  padding: 2px 0 !important;\n  box-sizing: content-box !important;\n  height: 0 !important;\n}\n\n@-webkit-keyframes cdk-text-field-autofill-start {\n  /*!*/\n}\n\n@keyframes cdk-text-field-autofill-start {\n  /*!*/\n}\n\n@-webkit-keyframes cdk-text-field-autofill-end {\n  /*!*/\n}\n\n@keyframes cdk-text-field-autofill-end {\n  /*!*/\n}\n\n.cdk-text-field-autofill-monitored:-webkit-autofill {\n  -webkit-animation: cdk-text-field-autofill-start 0s 1ms;\n          animation: cdk-text-field-autofill-start 0s 1ms;\n}\n\n.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {\n  -webkit-animation: cdk-text-field-autofill-end 0s 1ms;\n          animation: cdk-text-field-autofill-end 0s 1ms;\n}\n\n.mat-focus-indicator {\n  position: relative;\n}\n\n.mat-mdc-focus-indicator {\n  position: relative;\n}\n\nbody ::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  border-radius: 10px;\n  background-color: white;\n}\n\nbody ::-webkit-scrollbar {\n  width: 7px;\n  height: 7px;\n  background-color: white;\n}\n\nbody ::-webkit-scrollbar-thumb {\n  border-radius: 5px;\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #82A5DD;\n}\n\n.mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n.mat-option {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-option:hover:not(.mat-option-disabled), .mat-option:focus:not(.mat-option-disabled) {\n  background: rgba(0, 0, 0, 0.04);\n}\n\n.mat-option.mat-selected:not(.mat-option-multiple):not(.mat-option-disabled) {\n  background: rgba(0, 0, 0, 0.04);\n}\n\n.mat-option.mat-active {\n  background: rgba(0, 0, 0, 0.04);\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-option.mat-option-disabled {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-primary .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #0f4c81;\n}\n\n.mat-accent .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #ffab40;\n}\n\n.mat-warn .mat-option.mat-selected:not(.mat-option-disabled) {\n  color: #f44336;\n}\n\n.mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-optgroup-disabled .mat-optgroup-label {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-pseudo-checkbox {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-pseudo-checkbox::after {\n  color: #fafafa;\n}\n\n.mat-pseudo-checkbox-disabled {\n  color: #b0b0b0;\n}\n\n.mat-primary .mat-pseudo-checkbox-checked,\n.mat-primary .mat-pseudo-checkbox-indeterminate {\n  background: #0f4c81;\n}\n\n.mat-pseudo-checkbox-checked,\n.mat-pseudo-checkbox-indeterminate,\n.mat-accent .mat-pseudo-checkbox-checked,\n.mat-accent .mat-pseudo-checkbox-indeterminate {\n  background: #ffab40;\n}\n\n.mat-warn .mat-pseudo-checkbox-checked,\n.mat-warn .mat-pseudo-checkbox-indeterminate {\n  background: #f44336;\n}\n\n.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled,\n.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {\n  background: #b0b0b0;\n}\n\n.mat-app-background {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-elevation-z0 {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z1 {\n  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z2 {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z3 {\n  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z4 {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z5 {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z6 {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z7 {\n  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z8 {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z9 {\n  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2), 0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z10 {\n  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z11 {\n  box-shadow: 0px 6px 7px -4px rgba(0, 0, 0, 0.2), 0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z12 {\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z13 {\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z14 {\n  box-shadow: 0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z15 {\n  box-shadow: 0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z16 {\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z17 {\n  box-shadow: 0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z18 {\n  box-shadow: 0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z19 {\n  box-shadow: 0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z20 {\n  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z21 {\n  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z22 {\n  box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z23 {\n  box-shadow: 0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12);\n}\n\n.mat-elevation-z24 {\n  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);\n}\n\n.mat-theme-loaded-marker {\n  display: none;\n}\n\n.mat-autocomplete-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-autocomplete-panel:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover) {\n  background: white;\n}\n\n.mat-autocomplete-panel .mat-option.mat-selected:not(.mat-active):not(:hover):not(.mat-option-disabled) {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-badge {\n  position: relative;\n}\n\n.mat-badge.mat-badge {\n  overflow: visible;\n}\n\n.mat-badge-hidden .mat-badge-content {\n  display: none;\n}\n\n.mat-badge-content {\n  position: absolute;\n  text-align: center;\n  display: inline-block;\n  border-radius: 50%;\n  transition: transform 200ms ease-in-out;\n  transform: scale(0.6);\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  pointer-events: none;\n}\n\n.ng-animate-disabled .mat-badge-content,\n.mat-badge-content._mat-animation-noopable {\n  transition: none;\n}\n\n.mat-badge-content.mat-badge-active {\n  transform: none;\n}\n\n.mat-badge-small .mat-badge-content {\n  width: 16px;\n  height: 16px;\n  line-height: 16px;\n}\n\n.mat-badge-small.mat-badge-above .mat-badge-content {\n  top: -8px;\n}\n\n.mat-badge-small.mat-badge-below .mat-badge-content {\n  bottom: -8px;\n}\n\n.mat-badge-small.mat-badge-before .mat-badge-content {\n  left: -16px;\n}\n\n[dir=rtl] .mat-badge-small.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -16px;\n}\n\n.mat-badge-small.mat-badge-after .mat-badge-content {\n  right: -16px;\n}\n\n[dir=rtl] .mat-badge-small.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -16px;\n}\n\n.mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -8px;\n}\n\n[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -8px;\n}\n\n.mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -8px;\n}\n\n[dir=rtl] .mat-badge-small.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -8px;\n}\n\n.mat-badge-medium .mat-badge-content {\n  width: 22px;\n  height: 22px;\n  line-height: 22px;\n}\n\n.mat-badge-medium.mat-badge-above .mat-badge-content {\n  top: -11px;\n}\n\n.mat-badge-medium.mat-badge-below .mat-badge-content {\n  bottom: -11px;\n}\n\n.mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: -22px;\n}\n\n[dir=rtl] .mat-badge-medium.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -22px;\n}\n\n.mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: -22px;\n}\n\n[dir=rtl] .mat-badge-medium.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -22px;\n}\n\n.mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -11px;\n}\n\n[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -11px;\n}\n\n.mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -11px;\n}\n\n[dir=rtl] .mat-badge-medium.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -11px;\n}\n\n.mat-badge-large .mat-badge-content {\n  width: 28px;\n  height: 28px;\n  line-height: 28px;\n}\n\n.mat-badge-large.mat-badge-above .mat-badge-content {\n  top: -14px;\n}\n\n.mat-badge-large.mat-badge-below .mat-badge-content {\n  bottom: -14px;\n}\n\n.mat-badge-large.mat-badge-before .mat-badge-content {\n  left: -28px;\n}\n\n[dir=rtl] .mat-badge-large.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -28px;\n}\n\n.mat-badge-large.mat-badge-after .mat-badge-content {\n  right: -28px;\n}\n\n[dir=rtl] .mat-badge-large.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -28px;\n}\n\n.mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: -14px;\n}\n\n[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-before .mat-badge-content {\n  left: auto;\n  right: -14px;\n}\n\n.mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: -14px;\n}\n\n[dir=rtl] .mat-badge-large.mat-badge-overlap.mat-badge-after .mat-badge-content {\n  right: auto;\n  left: -14px;\n}\n\n.mat-badge-content {\n  color: white;\n  background: #0f4c81;\n}\n\n.cdk-high-contrast-active .mat-badge-content {\n  outline: solid 1px;\n  border-radius: 0;\n}\n\n.mat-badge-accent .mat-badge-content {\n  background: #ffab40;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-badge-warn .mat-badge-content {\n  color: white;\n  background: #f44336;\n}\n\n.mat-badge-disabled .mat-badge-content {\n  background: #b9b9b9;\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-bottom-sheet-container {\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);\n  background: white;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-button, .mat-icon-button, .mat-stroked-button {\n  color: inherit;\n  background: transparent;\n}\n\n.mat-button.mat-primary, .mat-icon-button.mat-primary, .mat-stroked-button.mat-primary {\n  color: #0f4c81;\n}\n\n.mat-button.mat-accent, .mat-icon-button.mat-accent, .mat-stroked-button.mat-accent {\n  color: #ffab40;\n}\n\n.mat-button.mat-warn, .mat-icon-button.mat-warn, .mat-stroked-button.mat-warn {\n  color: #f44336;\n}\n\n.mat-button.mat-primary.mat-button-disabled, .mat-button.mat-accent.mat-button-disabled, .mat-button.mat-warn.mat-button-disabled, .mat-button.mat-button-disabled.mat-button-disabled, .mat-icon-button.mat-primary.mat-button-disabled, .mat-icon-button.mat-accent.mat-button-disabled, .mat-icon-button.mat-warn.mat-button-disabled, .mat-icon-button.mat-button-disabled.mat-button-disabled, .mat-stroked-button.mat-primary.mat-button-disabled, .mat-stroked-button.mat-accent.mat-button-disabled, .mat-stroked-button.mat-warn.mat-button-disabled, .mat-stroked-button.mat-button-disabled.mat-button-disabled {\n  color: rgba(0, 0, 0, 0.26);\n}\n\n.mat-button.mat-primary .mat-button-focus-overlay, .mat-icon-button.mat-primary .mat-button-focus-overlay, .mat-stroked-button.mat-primary .mat-button-focus-overlay {\n  background-color: #0f4c81;\n}\n\n.mat-button.mat-accent .mat-button-focus-overlay, .mat-icon-button.mat-accent .mat-button-focus-overlay, .mat-stroked-button.mat-accent .mat-button-focus-overlay {\n  background-color: #ffab40;\n}\n\n.mat-button.mat-warn .mat-button-focus-overlay, .mat-icon-button.mat-warn .mat-button-focus-overlay, .mat-stroked-button.mat-warn .mat-button-focus-overlay {\n  background-color: #f44336;\n}\n\n.mat-button.mat-button-disabled .mat-button-focus-overlay, .mat-icon-button.mat-button-disabled .mat-button-focus-overlay, .mat-stroked-button.mat-button-disabled .mat-button-focus-overlay {\n  background-color: transparent;\n}\n\n.mat-button .mat-ripple-element, .mat-icon-button .mat-ripple-element, .mat-stroked-button .mat-ripple-element {\n  opacity: 0.1;\n  background-color: currentColor;\n}\n\n.mat-button-focus-overlay {\n  background: black;\n}\n\n.mat-stroked-button:not(.mat-button-disabled) {\n  border-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-flat-button, .mat-raised-button, .mat-fab, .mat-mini-fab {\n  color: rgba(0, 0, 0, 0.87);\n  background-color: white;\n}\n\n.mat-flat-button.mat-primary, .mat-raised-button.mat-primary, .mat-fab.mat-primary, .mat-mini-fab.mat-primary {\n  color: white;\n}\n\n.mat-flat-button.mat-accent, .mat-raised-button.mat-accent, .mat-fab.mat-accent, .mat-mini-fab.mat-accent {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-flat-button.mat-warn, .mat-raised-button.mat-warn, .mat-fab.mat-warn, .mat-mini-fab.mat-warn {\n  color: white;\n}\n\n.mat-flat-button.mat-primary.mat-button-disabled, .mat-flat-button.mat-accent.mat-button-disabled, .mat-flat-button.mat-warn.mat-button-disabled, .mat-flat-button.mat-button-disabled.mat-button-disabled, .mat-raised-button.mat-primary.mat-button-disabled, .mat-raised-button.mat-accent.mat-button-disabled, .mat-raised-button.mat-warn.mat-button-disabled, .mat-raised-button.mat-button-disabled.mat-button-disabled, .mat-fab.mat-primary.mat-button-disabled, .mat-fab.mat-accent.mat-button-disabled, .mat-fab.mat-warn.mat-button-disabled, .mat-fab.mat-button-disabled.mat-button-disabled, .mat-mini-fab.mat-primary.mat-button-disabled, .mat-mini-fab.mat-accent.mat-button-disabled, .mat-mini-fab.mat-warn.mat-button-disabled, .mat-mini-fab.mat-button-disabled.mat-button-disabled {\n  color: rgba(0, 0, 0, 0.26);\n}\n\n.mat-flat-button.mat-primary, .mat-raised-button.mat-primary, .mat-fab.mat-primary, .mat-mini-fab.mat-primary {\n  background-color: #0f4c81;\n}\n\n.mat-flat-button.mat-accent, .mat-raised-button.mat-accent, .mat-fab.mat-accent, .mat-mini-fab.mat-accent {\n  background-color: #ffab40;\n}\n\n.mat-flat-button.mat-warn, .mat-raised-button.mat-warn, .mat-fab.mat-warn, .mat-mini-fab.mat-warn {\n  background-color: #f44336;\n}\n\n.mat-flat-button.mat-primary.mat-button-disabled, .mat-flat-button.mat-accent.mat-button-disabled, .mat-flat-button.mat-warn.mat-button-disabled, .mat-flat-button.mat-button-disabled.mat-button-disabled, .mat-raised-button.mat-primary.mat-button-disabled, .mat-raised-button.mat-accent.mat-button-disabled, .mat-raised-button.mat-warn.mat-button-disabled, .mat-raised-button.mat-button-disabled.mat-button-disabled, .mat-fab.mat-primary.mat-button-disabled, .mat-fab.mat-accent.mat-button-disabled, .mat-fab.mat-warn.mat-button-disabled, .mat-fab.mat-button-disabled.mat-button-disabled, .mat-mini-fab.mat-primary.mat-button-disabled, .mat-mini-fab.mat-accent.mat-button-disabled, .mat-mini-fab.mat-warn.mat-button-disabled, .mat-mini-fab.mat-button-disabled.mat-button-disabled {\n  background-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-flat-button.mat-primary .mat-ripple-element, .mat-raised-button.mat-primary .mat-ripple-element, .mat-fab.mat-primary .mat-ripple-element, .mat-mini-fab.mat-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n\n.mat-flat-button.mat-accent .mat-ripple-element, .mat-raised-button.mat-accent .mat-ripple-element, .mat-fab.mat-accent .mat-ripple-element, .mat-mini-fab.mat-accent .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n.mat-flat-button.mat-warn .mat-ripple-element, .mat-raised-button.mat-warn .mat-ripple-element, .mat-fab.mat-warn .mat-ripple-element, .mat-mini-fab.mat-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n\n.mat-stroked-button:not([class*=mat-elevation-z]), .mat-flat-button:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-raised-button:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-raised-button:not(.mat-button-disabled):active:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.mat-raised-button.mat-button-disabled:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-fab:not([class*=mat-elevation-z]), .mat-mini-fab:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-fab:not(.mat-button-disabled):active:not([class*=mat-elevation-z]), .mat-mini-fab:not(.mat-button-disabled):active:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12);\n}\n\n.mat-fab.mat-button-disabled:not([class*=mat-elevation-z]), .mat-mini-fab.mat-button-disabled:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-button-toggle-standalone:not([class*=mat-elevation-z]),\n.mat-button-toggle-group:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),\n.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {\n  box-shadow: none;\n}\n\n.mat-button-toggle {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-button-toggle .mat-button-toggle-focus-overlay {\n  background-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-button-toggle-appearance-standard {\n  color: rgba(0, 0, 0, 0.87);\n  background: white;\n}\n\n.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {\n  background-color: black;\n}\n\n.mat-button-toggle-group-appearance-standard .mat-button-toggle + .mat-button-toggle {\n  border-left: solid 1px #e0e0e0;\n}\n\n[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle + .mat-button-toggle {\n  border-left: none;\n  border-right: solid 1px #e0e0e0;\n}\n\n.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle + .mat-button-toggle {\n  border-left: none;\n  border-right: none;\n  border-top: solid 1px #e0e0e0;\n}\n\n.mat-button-toggle-checked {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-button-toggle-checked.mat-button-toggle-appearance-standard {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-button-toggle-disabled {\n  color: rgba(0, 0, 0, 0.26);\n  background-color: #eeeeee;\n}\n\n.mat-button-toggle-disabled.mat-button-toggle-appearance-standard {\n  background: white;\n}\n\n.mat-button-toggle-disabled.mat-button-toggle-checked {\n  background-color: #bdbdbd;\n}\n\n.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,\n.mat-button-toggle-group-appearance-standard {\n  border: solid 1px #e0e0e0;\n}\n\n.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {\n  line-height: 48px;\n}\n\n.mat-card {\n  background: white;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-card:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-card.mat-card-flat:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-card-subtitle {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-checkbox-frame {\n  border-color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-checkbox-checkmark {\n  fill: #fafafa;\n}\n\n.mat-checkbox-checkmark-path {\n  stroke: #fafafa !important;\n}\n\n.mat-checkbox-mixedmark {\n  background-color: #fafafa;\n}\n\n.mat-checkbox-indeterminate.mat-primary .mat-checkbox-background, .mat-checkbox-checked.mat-primary .mat-checkbox-background {\n  background-color: #0f4c81;\n}\n\n.mat-checkbox-indeterminate.mat-accent .mat-checkbox-background, .mat-checkbox-checked.mat-accent .mat-checkbox-background {\n  background-color: #ffab40;\n}\n\n.mat-checkbox-indeterminate.mat-warn .mat-checkbox-background, .mat-checkbox-checked.mat-warn .mat-checkbox-background {\n  background-color: #f44336;\n}\n\n.mat-checkbox-disabled.mat-checkbox-checked .mat-checkbox-background, .mat-checkbox-disabled.mat-checkbox-indeterminate .mat-checkbox-background {\n  background-color: #b0b0b0;\n}\n\n.mat-checkbox-disabled:not(.mat-checkbox-checked) .mat-checkbox-frame {\n  border-color: #b0b0b0;\n}\n\n.mat-checkbox-disabled .mat-checkbox-label {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-checkbox .mat-ripple-element {\n  background-color: black;\n}\n\n.mat-checkbox-checked:not(.mat-checkbox-disabled).mat-primary .mat-ripple-element,\n.mat-checkbox:active:not(.mat-checkbox-disabled).mat-primary .mat-ripple-element {\n  background: #0f4c81;\n}\n\n.mat-checkbox-checked:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element,\n.mat-checkbox:active:not(.mat-checkbox-disabled).mat-accent .mat-ripple-element {\n  background: #ffab40;\n}\n\n.mat-checkbox-checked:not(.mat-checkbox-disabled).mat-warn .mat-ripple-element,\n.mat-checkbox:active:not(.mat-checkbox-disabled).mat-warn .mat-ripple-element {\n  background: #f44336;\n}\n\n.mat-chip.mat-standard-chip {\n  background-color: #e0e0e0;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-chip.mat-standard-chip .mat-chip-remove {\n  color: rgba(0, 0, 0, 0.87);\n  opacity: 0.4;\n}\n\n.mat-chip.mat-standard-chip:not(.mat-chip-disabled):active {\n  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-chip.mat-standard-chip:not(.mat-chip-disabled) .mat-chip-remove:hover {\n  opacity: 0.54;\n}\n\n.mat-chip.mat-standard-chip.mat-chip-disabled {\n  opacity: 0.4;\n}\n\n.mat-chip.mat-standard-chip::after {\n  background: black;\n}\n\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary {\n  background-color: #0f4c81;\n  color: white;\n}\n\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-chip-remove {\n  color: white;\n  opacity: 0.4;\n}\n\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-primary .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn {\n  background-color: #f44336;\n  color: white;\n}\n\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-chip-remove {\n  color: white;\n  opacity: 0.4;\n}\n\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-warn .mat-ripple-element {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent {\n  background-color: #ffab40;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-chip-remove {\n  color: rgba(0, 0, 0, 0.87);\n  opacity: 0.4;\n}\n\n.mat-chip.mat-standard-chip.mat-chip-selected.mat-accent .mat-ripple-element {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n.mat-table {\n  background: white;\n}\n\n.mat-table thead, .mat-table tbody, .mat-table tfoot,\nmat-header-row, mat-row, mat-footer-row,\n[mat-header-row], [mat-row], [mat-footer-row],\n.mat-table-sticky {\n  background: inherit;\n}\n\nmat-row, mat-header-row, mat-footer-row,\nth.mat-header-cell, td.mat-cell, td.mat-footer-cell {\n  border-bottom-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-header-cell {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-cell, .mat-footer-cell {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-calendar-arrow {\n  fill: rgba(0, 0, 0, 0.54);\n}\n\n.mat-datepicker-toggle,\n.mat-datepicker-content .mat-calendar-next-button,\n.mat-datepicker-content .mat-calendar-previous-button {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-calendar-table-header-divider::after {\n  background: rgba(0, 0, 0, 0.12);\n}\n\n.mat-calendar-table-header,\n.mat-calendar-body-label {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-calendar-body-cell-content,\n.mat-date-range-input-separator {\n  color: rgba(0, 0, 0, 0.87);\n  border-color: transparent;\n}\n\n.mat-calendar-body-disabled > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-form-field-disabled .mat-date-range-input-separator {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-calendar-body-in-preview {\n  color: rgba(0, 0, 0, 0.24);\n}\n\n.mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  border-color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-calendar-body-disabled > .mat-calendar-body-today:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  border-color: rgba(0, 0, 0, 0.18);\n}\n\n.mat-calendar-body-in-range::before {\n  background: rgba(15, 76, 129, 0.2);\n}\n\n.mat-calendar-body-comparison-identical,\n.mat-calendar-body-in-comparison-range::before {\n  background: rgba(249, 171, 0, 0.2);\n}\n\n.mat-calendar-body-comparison-bridge-start::before,\n[dir=rtl] .mat-calendar-body-comparison-bridge-end::before {\n  background: linear-gradient(to right, rgba(15, 76, 129, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%);\n}\n\n.mat-calendar-body-comparison-bridge-end::before,\n[dir=rtl] .mat-calendar-body-comparison-bridge-start::before {\n  background: linear-gradient(to left, rgba(15, 76, 129, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%);\n}\n\n.mat-calendar-body-in-range > .mat-calendar-body-comparison-identical,\n.mat-calendar-body-in-comparison-range.mat-calendar-body-in-range::after {\n  background: #a8dab5;\n}\n\n.mat-calendar-body-comparison-identical.mat-calendar-body-selected,\n.mat-calendar-body-in-comparison-range > .mat-calendar-body-selected {\n  background: #46a35e;\n}\n\n.mat-calendar-body-selected {\n  background-color: #0f4c81;\n  color: white;\n}\n\n.mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(15, 76, 129, 0.4);\n}\n\n.mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white;\n}\n\n.cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical),\n.cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  background-color: rgba(15, 76, 129, 0.3);\n}\n\n@media (hover: hover) {\n  .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n    background-color: rgba(15, 76, 129, 0.3);\n  }\n}\n\n.mat-datepicker-content {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-datepicker-content.mat-accent .mat-calendar-body-in-range::before {\n  background: rgba(255, 171, 64, 0.2);\n}\n\n.mat-datepicker-content.mat-accent .mat-calendar-body-comparison-identical,\n.mat-datepicker-content.mat-accent .mat-calendar-body-in-comparison-range::before {\n  background: rgba(249, 171, 0, 0.2);\n}\n\n.mat-datepicker-content.mat-accent .mat-calendar-body-comparison-bridge-start::before,\n.mat-datepicker-content.mat-accent [dir=rtl] .mat-calendar-body-comparison-bridge-end::before {\n  background: linear-gradient(to right, rgba(255, 171, 64, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%);\n}\n\n.mat-datepicker-content.mat-accent .mat-calendar-body-comparison-bridge-end::before,\n.mat-datepicker-content.mat-accent [dir=rtl] .mat-calendar-body-comparison-bridge-start::before {\n  background: linear-gradient(to left, rgba(255, 171, 64, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%);\n}\n\n.mat-datepicker-content.mat-accent .mat-calendar-body-in-range > .mat-calendar-body-comparison-identical,\n.mat-datepicker-content.mat-accent .mat-calendar-body-in-comparison-range.mat-calendar-body-in-range::after {\n  background: #a8dab5;\n}\n\n.mat-datepicker-content.mat-accent .mat-calendar-body-comparison-identical.mat-calendar-body-selected,\n.mat-datepicker-content.mat-accent .mat-calendar-body-in-comparison-range > .mat-calendar-body-selected {\n  background: #46a35e;\n}\n\n.mat-datepicker-content.mat-accent .mat-calendar-body-selected {\n  background-color: #ffab40;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-datepicker-content.mat-accent .mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(255, 171, 64, 0.4);\n}\n\n.mat-datepicker-content.mat-accent .mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.87);\n}\n\n.mat-datepicker-content.mat-accent .cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical),\n.mat-datepicker-content.mat-accent .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  background-color: rgba(255, 171, 64, 0.3);\n}\n\n@media (hover: hover) {\n  .mat-datepicker-content.mat-accent .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n    background-color: rgba(255, 171, 64, 0.3);\n  }\n}\n\n.mat-datepicker-content.mat-warn .mat-calendar-body-in-range::before {\n  background: rgba(244, 67, 54, 0.2);\n}\n\n.mat-datepicker-content.mat-warn .mat-calendar-body-comparison-identical,\n.mat-datepicker-content.mat-warn .mat-calendar-body-in-comparison-range::before {\n  background: rgba(249, 171, 0, 0.2);\n}\n\n.mat-datepicker-content.mat-warn .mat-calendar-body-comparison-bridge-start::before,\n.mat-datepicker-content.mat-warn [dir=rtl] .mat-calendar-body-comparison-bridge-end::before {\n  background: linear-gradient(to right, rgba(244, 67, 54, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%);\n}\n\n.mat-datepicker-content.mat-warn .mat-calendar-body-comparison-bridge-end::before,\n.mat-datepicker-content.mat-warn [dir=rtl] .mat-calendar-body-comparison-bridge-start::before {\n  background: linear-gradient(to left, rgba(244, 67, 54, 0.2) 50%, rgba(249, 171, 0, 0.2) 50%);\n}\n\n.mat-datepicker-content.mat-warn .mat-calendar-body-in-range > .mat-calendar-body-comparison-identical,\n.mat-datepicker-content.mat-warn .mat-calendar-body-in-comparison-range.mat-calendar-body-in-range::after {\n  background: #a8dab5;\n}\n\n.mat-datepicker-content.mat-warn .mat-calendar-body-comparison-identical.mat-calendar-body-selected,\n.mat-datepicker-content.mat-warn .mat-calendar-body-in-comparison-range > .mat-calendar-body-selected {\n  background: #46a35e;\n}\n\n.mat-datepicker-content.mat-warn .mat-calendar-body-selected {\n  background-color: #f44336;\n  color: white;\n}\n\n.mat-datepicker-content.mat-warn .mat-calendar-body-disabled > .mat-calendar-body-selected {\n  background-color: rgba(244, 67, 54, 0.4);\n}\n\n.mat-datepicker-content.mat-warn .mat-calendar-body-today.mat-calendar-body-selected {\n  box-shadow: inset 0 0 0 1px white;\n}\n\n.mat-datepicker-content.mat-warn .cdk-keyboard-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical),\n.mat-datepicker-content.mat-warn .cdk-program-focused .mat-calendar-body-active > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n  background-color: rgba(244, 67, 54, 0.3);\n}\n\n@media (hover: hover) {\n  .mat-datepicker-content.mat-warn .mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover > .mat-calendar-body-cell-content:not(.mat-calendar-body-selected):not(.mat-calendar-body-comparison-identical) {\n    background-color: rgba(244, 67, 54, 0.3);\n  }\n}\n\n.mat-datepicker-content-touch {\n  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);\n}\n\n.mat-datepicker-toggle-active {\n  color: #0f4c81;\n}\n\n.mat-datepicker-toggle-active.mat-accent {\n  color: #ffab40;\n}\n\n.mat-datepicker-toggle-active.mat-warn {\n  color: #f44336;\n}\n\n.mat-date-range-input-inner[disabled] {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-dialog-container {\n  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);\n  background: white;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-divider {\n  border-top-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-divider-vertical {\n  border-right-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-expansion-panel {\n  background: white;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-expansion-panel:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-action-row {\n  border-top-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-expansion-panel .mat-expansion-panel-header.cdk-keyboard-focused:not([aria-disabled=true]), .mat-expansion-panel .mat-expansion-panel-header.cdk-program-focused:not([aria-disabled=true]), .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:hover:not([aria-disabled=true]) {\n  background: rgba(0, 0, 0, 0.04);\n}\n\n@media (hover: none) {\n  .mat-expansion-panel:not(.mat-expanded):not([aria-disabled=true]) .mat-expansion-panel-header:hover {\n    background: white;\n  }\n}\n\n.mat-expansion-panel-header-title {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-expansion-panel-header-description,\n.mat-expansion-indicator::after {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-expansion-panel-header[aria-disabled=true] {\n  color: rgba(0, 0, 0, 0.26);\n}\n\n.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,\n.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description {\n  color: inherit;\n}\n\n.mat-expansion-panel-header {\n  height: 48px;\n}\n\n.mat-expansion-panel-header.mat-expanded {\n  height: 64px;\n}\n\n.mat-form-field-label {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.mat-hint {\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.mat-form-field.mat-focused .mat-form-field-label {\n  color: #0f4c81;\n}\n\n.mat-form-field.mat-focused .mat-form-field-label.mat-accent {\n  color: #ffab40;\n}\n\n.mat-form-field.mat-focused .mat-form-field-label.mat-warn {\n  color: #f44336;\n}\n\n.mat-focused .mat-form-field-required-marker {\n  color: #ffab40;\n}\n\n.mat-form-field-ripple {\n  background-color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-form-field.mat-focused .mat-form-field-ripple {\n  background-color: #0f4c81;\n}\n\n.mat-form-field.mat-focused .mat-form-field-ripple.mat-accent {\n  background-color: #ffab40;\n}\n\n.mat-form-field.mat-focused .mat-form-field-ripple.mat-warn {\n  background-color: #f44336;\n}\n\n.mat-form-field-type-mat-native-select.mat-focused:not(.mat-form-field-invalid) .mat-form-field-infix::after {\n  color: #0f4c81;\n}\n\n.mat-form-field-type-mat-native-select.mat-focused:not(.mat-form-field-invalid).mat-accent .mat-form-field-infix::after {\n  color: #ffab40;\n}\n\n.mat-form-field-type-mat-native-select.mat-focused:not(.mat-form-field-invalid).mat-warn .mat-form-field-infix::after {\n  color: #f44336;\n}\n\n.mat-form-field.mat-form-field-invalid .mat-form-field-label {\n  color: #f44336;\n}\n\n.mat-form-field.mat-form-field-invalid .mat-form-field-label.mat-accent,\n.mat-form-field.mat-form-field-invalid .mat-form-field-label .mat-form-field-required-marker {\n  color: #f44336;\n}\n\n.mat-form-field.mat-form-field-invalid .mat-form-field-ripple,\n.mat-form-field.mat-form-field-invalid .mat-form-field-ripple.mat-accent {\n  background-color: #f44336;\n}\n\n.mat-error {\n  color: #f44336;\n}\n\n.mat-form-field-appearance-legacy .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-form-field-appearance-legacy .mat-hint {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-form-field-appearance-legacy .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42);\n}\n\n.mat-form-field-appearance-legacy.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x;\n}\n\n.mat-form-field-appearance-standard .mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.42);\n}\n\n.mat-form-field-appearance-standard.mat-form-field-disabled .mat-form-field-underline {\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.42) 33%, transparent 0%);\n  background-size: 4px 100%;\n  background-repeat: repeat-x;\n}\n\n.mat-form-field-appearance-fill .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-flex {\n  background-color: rgba(0, 0, 0, 0.02);\n}\n\n.mat-form-field-appearance-fill .mat-form-field-underline::before {\n  background-color: rgba(0, 0, 0, 0.42);\n}\n\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-form-field-appearance-fill.mat-form-field-disabled .mat-form-field-underline::before {\n  background-color: transparent;\n}\n\n.mat-form-field-appearance-outline .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-form-field-appearance-outline .mat-form-field-outline-thick {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {\n  color: #0f4c81;\n}\n\n.mat-form-field-appearance-outline.mat-focused.mat-accent .mat-form-field-outline-thick {\n  color: #ffab40;\n}\n\n.mat-form-field-appearance-outline.mat-focused.mat-warn .mat-form-field-outline-thick {\n  color: #f44336;\n}\n\n.mat-form-field-appearance-outline.mat-form-field-invalid.mat-form-field-invalid .mat-form-field-outline-thick {\n  color: #f44336;\n}\n\n.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-label {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-form-field-appearance-outline.mat-form-field-disabled .mat-form-field-outline {\n  color: rgba(0, 0, 0, 0.06);\n}\n\n.mat-icon.mat-primary {\n  color: #0f4c81;\n}\n\n.mat-icon.mat-accent {\n  color: #ffab40;\n}\n\n.mat-icon.mat-warn {\n  color: #f44336;\n}\n\n.mat-form-field-type-mat-native-select .mat-form-field-infix::after {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-input-element:disabled,\n.mat-form-field-type-mat-native-select.mat-form-field-disabled .mat-form-field-infix::after {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-input-element {\n  caret-color: #0f4c81;\n}\n\n.mat-input-element::-moz-placeholder {\n  color: rgba(0, 0, 0, 0.42);\n}\n\n.mat-input-element::placeholder {\n  color: rgba(0, 0, 0, 0.42);\n}\n\n.mat-input-element::-moz-placeholder {\n  color: rgba(0, 0, 0, 0.42);\n}\n\n.mat-input-element::-webkit-input-placeholder {\n  color: rgba(0, 0, 0, 0.42);\n}\n\n.mat-input-element:-ms-input-placeholder {\n  color: rgba(0, 0, 0, 0.42);\n}\n\n.mat-form-field.mat-accent .mat-input-element {\n  caret-color: #ffab40;\n}\n\n.mat-form-field.mat-warn .mat-input-element,\n.mat-form-field-invalid .mat-input-element {\n  caret-color: #f44336;\n}\n\n.mat-form-field-type-mat-native-select.mat-form-field-invalid .mat-form-field-infix::after {\n  color: #f44336;\n}\n\n.mat-list-base .mat-list-item {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-list-base .mat-list-option {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-list-base .mat-subheader {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-list-base .mat-list-item-disabled {\n  background-color: #eeeeee;\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-list-option:hover, .mat-list-option:focus,\n.mat-nav-list .mat-list-item:hover,\n.mat-nav-list .mat-list-item:focus,\n.mat-action-list .mat-list-item:hover,\n.mat-action-list .mat-list-item:focus {\n  background: rgba(0, 0, 0, 0.04);\n}\n\n.mat-list-single-selected-option, .mat-list-single-selected-option:hover, .mat-list-single-selected-option:focus {\n  background: rgba(0, 0, 0, 0.12);\n}\n\n.mat-menu-panel {\n  background: white;\n}\n\n.mat-menu-panel:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-menu-item {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-menu-item[disabled],\n.mat-menu-item[disabled] .mat-menu-submenu-icon,\n.mat-menu-item[disabled] .mat-icon-no-color {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-menu-item .mat-icon-no-color,\n.mat-menu-submenu-icon {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-menu-item:hover:not([disabled]),\n.mat-menu-item.cdk-program-focused:not([disabled]),\n.mat-menu-item.cdk-keyboard-focused:not([disabled]),\n.mat-menu-item-highlighted:not([disabled]) {\n  background: rgba(0, 0, 0, 0.04);\n}\n\n.mat-paginator {\n  background: white;\n}\n\n.mat-paginator,\n.mat-paginator-page-size .mat-select-trigger {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-paginator-decrement,\n.mat-paginator-increment {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n  border-right: 2px solid rgba(0, 0, 0, 0.54);\n}\n\n.mat-paginator-first,\n.mat-paginator-last {\n  border-top: 2px solid rgba(0, 0, 0, 0.54);\n}\n\n.mat-icon-button[disabled] .mat-paginator-decrement,\n.mat-icon-button[disabled] .mat-paginator-increment,\n.mat-icon-button[disabled] .mat-paginator-first,\n.mat-icon-button[disabled] .mat-paginator-last {\n  border-color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-paginator-container {\n  min-height: 56px;\n}\n\n.mat-progress-bar-background {\n  fill: #bfcfdc;\n}\n\n.mat-progress-bar-buffer {\n  background-color: #bfcfdc;\n}\n\n.mat-progress-bar-fill::after {\n  background-color: #0f4c81;\n}\n\n.mat-progress-bar.mat-accent .mat-progress-bar-background {\n  fill: #fbe6cc;\n}\n\n.mat-progress-bar.mat-accent .mat-progress-bar-buffer {\n  background-color: #fbe6cc;\n}\n\n.mat-progress-bar.mat-accent .mat-progress-bar-fill::after {\n  background-color: #ffab40;\n}\n\n.mat-progress-bar.mat-warn .mat-progress-bar-background {\n  fill: #f9ccc9;\n}\n\n.mat-progress-bar.mat-warn .mat-progress-bar-buffer {\n  background-color: #f9ccc9;\n}\n\n.mat-progress-bar.mat-warn .mat-progress-bar-fill::after {\n  background-color: #f44336;\n}\n\n.mat-progress-spinner circle, .mat-spinner circle {\n  stroke: #0f4c81;\n}\n\n.mat-progress-spinner.mat-accent circle, .mat-spinner.mat-accent circle {\n  stroke: #ffab40;\n}\n\n.mat-progress-spinner.mat-warn circle, .mat-spinner.mat-warn circle {\n  stroke: #f44336;\n}\n\n.mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-radio-button.mat-primary.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #0f4c81;\n}\n\n.mat-radio-button.mat-primary .mat-radio-inner-circle,\n.mat-radio-button.mat-primary .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple), .mat-radio-button.mat-primary.mat-radio-checked .mat-radio-persistent-ripple, .mat-radio-button.mat-primary:active .mat-radio-persistent-ripple {\n  background-color: #0f4c81;\n}\n\n.mat-radio-button.mat-accent.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #ffab40;\n}\n\n.mat-radio-button.mat-accent .mat-radio-inner-circle,\n.mat-radio-button.mat-accent .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple), .mat-radio-button.mat-accent.mat-radio-checked .mat-radio-persistent-ripple, .mat-radio-button.mat-accent:active .mat-radio-persistent-ripple {\n  background-color: #ffab40;\n}\n\n.mat-radio-button.mat-warn.mat-radio-checked .mat-radio-outer-circle {\n  border-color: #f44336;\n}\n\n.mat-radio-button.mat-warn .mat-radio-inner-circle,\n.mat-radio-button.mat-warn .mat-radio-ripple .mat-ripple-element:not(.mat-radio-persistent-ripple), .mat-radio-button.mat-warn.mat-radio-checked .mat-radio-persistent-ripple, .mat-radio-button.mat-warn:active .mat-radio-persistent-ripple {\n  background-color: #f44336;\n}\n\n.mat-radio-button.mat-radio-disabled.mat-radio-checked .mat-radio-outer-circle,\n.mat-radio-button.mat-radio-disabled .mat-radio-outer-circle {\n  border-color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-radio-button.mat-radio-disabled .mat-radio-ripple .mat-ripple-element,\n.mat-radio-button.mat-radio-disabled .mat-radio-inner-circle {\n  background-color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-radio-button.mat-radio-disabled .mat-radio-label-content {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-radio-button .mat-ripple-element {\n  background-color: black;\n}\n\n.mat-select-value {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-select-placeholder {\n  color: rgba(0, 0, 0, 0.42);\n}\n\n.mat-select-disabled .mat-select-value {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-select-arrow {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-select-panel {\n  background: white;\n}\n\n.mat-select-panel:not([class*=mat-elevation-z]) {\n  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-select-panel .mat-option.mat-selected:not(.mat-option-multiple) {\n  background: rgba(0, 0, 0, 0.12);\n}\n\n.mat-form-field.mat-focused.mat-primary .mat-select-arrow {\n  color: #0f4c81;\n}\n\n.mat-form-field.mat-focused.mat-accent .mat-select-arrow {\n  color: #ffab40;\n}\n\n.mat-form-field.mat-focused.mat-warn .mat-select-arrow {\n  color: #f44336;\n}\n\n.mat-form-field .mat-select.mat-select-invalid .mat-select-arrow {\n  color: #f44336;\n}\n\n.mat-form-field .mat-select.mat-select-disabled .mat-select-arrow {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-drawer-container {\n  background-color: #fafafa;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-drawer {\n  background-color: white;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-drawer.mat-drawer-push {\n  background-color: white;\n}\n\n.mat-drawer:not(.mat-drawer-side) {\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);\n}\n\n.mat-drawer-side {\n  border-right: solid 1px rgba(0, 0, 0, 0.12);\n}\n\n.mat-drawer-side.mat-drawer-end {\n  border-left: solid 1px rgba(0, 0, 0, 0.12);\n  border-right: none;\n}\n\n[dir=rtl] .mat-drawer-side {\n  border-left: solid 1px rgba(0, 0, 0, 0.12);\n  border-right: none;\n}\n\n[dir=rtl] .mat-drawer-side.mat-drawer-end {\n  border-left: none;\n  border-right: solid 1px rgba(0, 0, 0, 0.12);\n}\n\n.mat-drawer-backdrop.mat-drawer-shown {\n  background-color: rgba(0, 0, 0, 0.6);\n}\n\n.mat-slide-toggle.mat-checked .mat-slide-toggle-thumb {\n  background-color: #ffab40;\n}\n\n.mat-slide-toggle.mat-checked .mat-slide-toggle-bar {\n  background-color: rgba(255, 171, 64, 0.54);\n}\n\n.mat-slide-toggle.mat-checked .mat-ripple-element {\n  background-color: #ffab40;\n}\n\n.mat-slide-toggle.mat-primary.mat-checked .mat-slide-toggle-thumb {\n  background-color: #0f4c81;\n}\n\n.mat-slide-toggle.mat-primary.mat-checked .mat-slide-toggle-bar {\n  background-color: rgba(15, 76, 129, 0.54);\n}\n\n.mat-slide-toggle.mat-primary.mat-checked .mat-ripple-element {\n  background-color: #0f4c81;\n}\n\n.mat-slide-toggle.mat-warn.mat-checked .mat-slide-toggle-thumb {\n  background-color: #f44336;\n}\n\n.mat-slide-toggle.mat-warn.mat-checked .mat-slide-toggle-bar {\n  background-color: rgba(244, 67, 54, 0.54);\n}\n\n.mat-slide-toggle.mat-warn.mat-checked .mat-ripple-element {\n  background-color: #f44336;\n}\n\n.mat-slide-toggle:not(.mat-checked) .mat-ripple-element {\n  background-color: black;\n}\n\n.mat-slide-toggle-thumb {\n  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);\n  background-color: #fafafa;\n}\n\n.mat-slide-toggle-bar {\n  background-color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26);\n}\n\n.mat-slider.mat-primary .mat-slider-track-fill,\n.mat-slider.mat-primary .mat-slider-thumb,\n.mat-slider.mat-primary .mat-slider-thumb-label {\n  background-color: #0f4c81;\n}\n\n.mat-slider.mat-primary .mat-slider-thumb-label-text {\n  color: white;\n}\n\n.mat-slider.mat-primary .mat-slider-focus-ring {\n  background-color: rgba(15, 76, 129, 0.2);\n}\n\n.mat-slider.mat-accent .mat-slider-track-fill,\n.mat-slider.mat-accent .mat-slider-thumb,\n.mat-slider.mat-accent .mat-slider-thumb-label {\n  background-color: #ffab40;\n}\n\n.mat-slider.mat-accent .mat-slider-thumb-label-text {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-slider.mat-accent .mat-slider-focus-ring {\n  background-color: rgba(255, 171, 64, 0.2);\n}\n\n.mat-slider.mat-warn .mat-slider-track-fill,\n.mat-slider.mat-warn .mat-slider-thumb,\n.mat-slider.mat-warn .mat-slider-thumb-label {\n  background-color: #f44336;\n}\n\n.mat-slider.mat-warn .mat-slider-thumb-label-text {\n  color: white;\n}\n\n.mat-slider.mat-warn .mat-slider-focus-ring {\n  background-color: rgba(244, 67, 54, 0.2);\n}\n\n.mat-slider:hover .mat-slider-track-background,\n.mat-slider.cdk-focused .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-slider.mat-slider-disabled .mat-slider-track-background,\n.mat-slider.mat-slider-disabled .mat-slider-track-fill,\n.mat-slider.mat-slider-disabled .mat-slider-thumb {\n  background-color: rgba(0, 0, 0, 0.26);\n}\n\n.mat-slider.mat-slider-disabled:hover .mat-slider-track-background {\n  background-color: rgba(0, 0, 0, 0.26);\n}\n\n.mat-slider.mat-slider-min-value .mat-slider-focus-ring {\n  background-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb,\n.mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb,\n.mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing.cdk-focused .mat-slider-thumb-label {\n  background-color: rgba(0, 0, 0, 0.26);\n}\n\n.mat-slider.mat-slider-min-value:not(.mat-slider-thumb-label-showing) .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n  background-color: transparent;\n}\n\n.mat-slider.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover .mat-slider-thumb, .mat-slider.mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-slider.mat-slider-min-value:not(.mat-slider-thumb-label-showing):hover.mat-slider-disabled .mat-slider-thumb, .mat-slider.mat-slider-min-value:not(.mat-slider-thumb-label-showing).cdk-focused.mat-slider-disabled .mat-slider-thumb {\n  border-color: rgba(0, 0, 0, 0.26);\n}\n\n.mat-slider-has-ticks .mat-slider-wrapper::after {\n  border-color: rgba(0, 0, 0, 0.7);\n}\n\n.mat-slider-horizontal .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n  background-image: -moz-repeating-linear-gradient(0.0001deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n}\n\n.mat-slider-vertical .mat-slider-ticks {\n  background-image: repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 2px, transparent 0, transparent);\n}\n\n.mat-step-header.cdk-keyboard-focused, .mat-step-header.cdk-program-focused, .mat-step-header:hover:not([aria-disabled]), .mat-step-header:hover[aria-disabled=false] {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n\n.mat-step-header:hover[aria-disabled=true] {\n  cursor: default;\n}\n\n@media (hover: none) {\n  .mat-step-header:hover {\n    background: none;\n  }\n}\n\n.mat-step-header .mat-step-label,\n.mat-step-header .mat-step-optional {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.mat-step-header .mat-step-icon {\n  background-color: rgba(0, 0, 0, 0.54);\n  color: white;\n}\n\n.mat-step-header .mat-step-icon-selected,\n.mat-step-header .mat-step-icon-state-done,\n.mat-step-header .mat-step-icon-state-edit {\n  background-color: #0f4c81;\n  color: white;\n}\n\n.mat-step-header.mat-accent .mat-step-icon {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-step-header.mat-accent .mat-step-icon-selected,\n.mat-step-header.mat-accent .mat-step-icon-state-done,\n.mat-step-header.mat-accent .mat-step-icon-state-edit {\n  background-color: #ffab40;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-step-header.mat-warn .mat-step-icon {\n  color: white;\n}\n\n.mat-step-header.mat-warn .mat-step-icon-selected,\n.mat-step-header.mat-warn .mat-step-icon-state-done,\n.mat-step-header.mat-warn .mat-step-icon-state-edit {\n  background-color: #f44336;\n  color: white;\n}\n\n.mat-step-header .mat-step-icon-state-error {\n  background-color: transparent;\n  color: #f44336;\n}\n\n.mat-step-header .mat-step-label.mat-step-label-active {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-step-header .mat-step-label.mat-step-label-error {\n  color: #f44336;\n}\n\n.mat-stepper-horizontal, .mat-stepper-vertical {\n  background-color: white;\n}\n\n.mat-stepper-vertical-line::before {\n  border-left-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-horizontal-stepper-header::before,\n.mat-horizontal-stepper-header::after,\n.mat-stepper-horizontal-line {\n  border-top-color: rgba(0, 0, 0, 0.12);\n}\n\n.mat-horizontal-stepper-header {\n  height: 72px;\n}\n\n.mat-stepper-label-position-bottom .mat-horizontal-stepper-header,\n.mat-vertical-stepper-header {\n  padding: 24px 24px;\n}\n\n.mat-stepper-vertical-line::before {\n  top: -16px;\n  bottom: -16px;\n}\n\n.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after, .mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before {\n  top: 36px;\n}\n\n.mat-stepper-label-position-bottom .mat-stepper-horizontal-line {\n  top: 36px;\n}\n\n.mat-sort-header-arrow {\n  color: #757575;\n}\n\n.mat-tab-nav-bar,\n.mat-tab-header {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n\n.mat-tab-group-inverted-header .mat-tab-nav-bar,\n.mat-tab-group-inverted-header .mat-tab-header {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  border-bottom: none;\n}\n\n.mat-tab-label, .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-tab-label.mat-tab-disabled, .mat-tab-link.mat-tab-disabled {\n  color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: rgba(0, 0, 0, 0.38);\n}\n\n.mat-tab-group[class*=mat-background-] > .mat-tab-header,\n.mat-tab-nav-bar[class*=mat-background-] {\n  border-bottom: none;\n  border-top: none;\n}\n\n.mat-tab-group.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(183, 201, 217, 0.3);\n}\n\n.mat-tab-group.mat-primary .mat-ink-bar, .mat-tab-nav-bar.mat-primary .mat-ink-bar {\n  background-color: #0f4c81;\n}\n\n.mat-tab-group.mat-primary.mat-background-primary > .mat-tab-header .mat-ink-bar, .mat-tab-group.mat-primary.mat-background-primary > .mat-tab-link-container .mat-ink-bar, .mat-tab-nav-bar.mat-primary.mat-background-primary > .mat-tab-header .mat-ink-bar, .mat-tab-nav-bar.mat-primary.mat-background-primary > .mat-tab-link-container .mat-ink-bar {\n  background-color: white;\n}\n\n.mat-tab-group.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 209, 128, 0.3);\n}\n\n.mat-tab-group.mat-accent .mat-ink-bar, .mat-tab-nav-bar.mat-accent .mat-ink-bar {\n  background-color: #ffab40;\n}\n\n.mat-tab-group.mat-accent.mat-background-accent > .mat-tab-header .mat-ink-bar, .mat-tab-group.mat-accent.mat-background-accent > .mat-tab-link-container .mat-ink-bar, .mat-tab-nav-bar.mat-accent.mat-background-accent > .mat-tab-header .mat-ink-bar, .mat-tab-nav-bar.mat-accent.mat-background-accent > .mat-tab-link-container .mat-ink-bar {\n  background-color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-tab-group.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3);\n}\n\n.mat-tab-group.mat-warn .mat-ink-bar, .mat-tab-nav-bar.mat-warn .mat-ink-bar {\n  background-color: #f44336;\n}\n\n.mat-tab-group.mat-warn.mat-background-warn > .mat-tab-header .mat-ink-bar, .mat-tab-group.mat-warn.mat-background-warn > .mat-tab-link-container .mat-ink-bar, .mat-tab-nav-bar.mat-warn.mat-background-warn > .mat-tab-header .mat-ink-bar, .mat-tab-nav-bar.mat-warn.mat-background-warn > .mat-tab-link-container .mat-ink-bar {\n  background-color: white;\n}\n\n.mat-tab-group.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-primary .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-primary .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(183, 201, 217, 0.3);\n}\n\n.mat-tab-group.mat-background-primary > .mat-tab-header, .mat-tab-group.mat-background-primary > .mat-tab-link-container, .mat-tab-group.mat-background-primary > .mat-tab-header-pagination, .mat-tab-nav-bar.mat-background-primary > .mat-tab-header, .mat-tab-nav-bar.mat-background-primary > .mat-tab-link-container, .mat-tab-nav-bar.mat-background-primary > .mat-tab-header-pagination {\n  background-color: #0f4c81;\n}\n\n.mat-tab-group.mat-background-primary > .mat-tab-header .mat-tab-label, .mat-tab-group.mat-background-primary > .mat-tab-link-container .mat-tab-link, .mat-tab-nav-bar.mat-background-primary > .mat-tab-header .mat-tab-label, .mat-tab-nav-bar.mat-background-primary > .mat-tab-link-container .mat-tab-link {\n  color: white;\n}\n\n.mat-tab-group.mat-background-primary > .mat-tab-header .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-primary > .mat-tab-link-container .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-primary > .mat-tab-header .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-primary > .mat-tab-link-container .mat-tab-link.mat-tab-disabled {\n  color: rgba(255, 255, 255, 0.4);\n}\n\n.mat-tab-group.mat-background-primary > .mat-tab-header .mat-tab-header-pagination-chevron,\n.mat-tab-group.mat-background-primary > .mat-tab-header-pagination .mat-tab-header-pagination-chevron,\n.mat-tab-group.mat-background-primary > .mat-tab-link-container .mat-focus-indicator::before,\n.mat-tab-group.mat-background-primary > .mat-tab-header .mat-focus-indicator::before, .mat-tab-nav-bar.mat-background-primary > .mat-tab-header .mat-tab-header-pagination-chevron,\n.mat-tab-nav-bar.mat-background-primary > .mat-tab-header-pagination .mat-tab-header-pagination-chevron,\n.mat-tab-nav-bar.mat-background-primary > .mat-tab-link-container .mat-focus-indicator::before,\n.mat-tab-nav-bar.mat-background-primary > .mat-tab-header .mat-focus-indicator::before {\n  border-color: white;\n}\n\n.mat-tab-group.mat-background-primary > .mat-tab-header .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,\n.mat-tab-group.mat-background-primary > .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-primary > .mat-tab-header .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,\n.mat-tab-nav-bar.mat-background-primary > .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: white;\n  opacity: 0.4;\n}\n\n.mat-tab-group.mat-background-primary > .mat-tab-header .mat-ripple-element,\n.mat-tab-group.mat-background-primary > .mat-tab-link-container .mat-ripple-element,\n.mat-tab-group.mat-background-primary > .mat-tab-header-pagination .mat-ripple-element, .mat-tab-nav-bar.mat-background-primary > .mat-tab-header .mat-ripple-element,\n.mat-tab-nav-bar.mat-background-primary > .mat-tab-link-container .mat-ripple-element,\n.mat-tab-nav-bar.mat-background-primary > .mat-tab-header-pagination .mat-ripple-element {\n  background-color: white;\n  opacity: 0.12;\n}\n\n.mat-tab-group.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-accent .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-accent .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 209, 128, 0.3);\n}\n\n.mat-tab-group.mat-background-accent > .mat-tab-header, .mat-tab-group.mat-background-accent > .mat-tab-link-container, .mat-tab-group.mat-background-accent > .mat-tab-header-pagination, .mat-tab-nav-bar.mat-background-accent > .mat-tab-header, .mat-tab-nav-bar.mat-background-accent > .mat-tab-link-container, .mat-tab-nav-bar.mat-background-accent > .mat-tab-header-pagination {\n  background-color: #ffab40;\n}\n\n.mat-tab-group.mat-background-accent > .mat-tab-header .mat-tab-label, .mat-tab-group.mat-background-accent > .mat-tab-link-container .mat-tab-link, .mat-tab-nav-bar.mat-background-accent > .mat-tab-header .mat-tab-label, .mat-tab-nav-bar.mat-background-accent > .mat-tab-link-container .mat-tab-link {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-tab-group.mat-background-accent > .mat-tab-header .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-accent > .mat-tab-link-container .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-accent > .mat-tab-header .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-accent > .mat-tab-link-container .mat-tab-link.mat-tab-disabled {\n  color: rgba(0, 0, 0, 0.4);\n}\n\n.mat-tab-group.mat-background-accent > .mat-tab-header .mat-tab-header-pagination-chevron,\n.mat-tab-group.mat-background-accent > .mat-tab-header-pagination .mat-tab-header-pagination-chevron,\n.mat-tab-group.mat-background-accent > .mat-tab-link-container .mat-focus-indicator::before,\n.mat-tab-group.mat-background-accent > .mat-tab-header .mat-focus-indicator::before, .mat-tab-nav-bar.mat-background-accent > .mat-tab-header .mat-tab-header-pagination-chevron,\n.mat-tab-nav-bar.mat-background-accent > .mat-tab-header-pagination .mat-tab-header-pagination-chevron,\n.mat-tab-nav-bar.mat-background-accent > .mat-tab-link-container .mat-focus-indicator::before,\n.mat-tab-nav-bar.mat-background-accent > .mat-tab-header .mat-focus-indicator::before {\n  border-color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-tab-group.mat-background-accent > .mat-tab-header .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,\n.mat-tab-group.mat-background-accent > .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-accent > .mat-tab-header .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,\n.mat-tab-nav-bar.mat-background-accent > .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: black;\n  opacity: 0.4;\n}\n\n.mat-tab-group.mat-background-accent > .mat-tab-header .mat-ripple-element,\n.mat-tab-group.mat-background-accent > .mat-tab-link-container .mat-ripple-element,\n.mat-tab-group.mat-background-accent > .mat-tab-header-pagination .mat-ripple-element, .mat-tab-nav-bar.mat-background-accent > .mat-tab-header .mat-ripple-element,\n.mat-tab-nav-bar.mat-background-accent > .mat-tab-link-container .mat-ripple-element,\n.mat-tab-nav-bar.mat-background-accent > .mat-tab-header-pagination .mat-ripple-element {\n  background-color: black;\n  opacity: 0.12;\n}\n\n.mat-tab-group.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-group.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-group.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-keyboard-focused:not(.mat-tab-disabled), .mat-tab-nav-bar.mat-background-warn .mat-tab-label.cdk-program-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-keyboard-focused:not(.mat-tab-disabled),\n.mat-tab-nav-bar.mat-background-warn .mat-tab-link.cdk-program-focused:not(.mat-tab-disabled) {\n  background-color: rgba(255, 205, 210, 0.3);\n}\n\n.mat-tab-group.mat-background-warn > .mat-tab-header, .mat-tab-group.mat-background-warn > .mat-tab-link-container, .mat-tab-group.mat-background-warn > .mat-tab-header-pagination, .mat-tab-nav-bar.mat-background-warn > .mat-tab-header, .mat-tab-nav-bar.mat-background-warn > .mat-tab-link-container, .mat-tab-nav-bar.mat-background-warn > .mat-tab-header-pagination {\n  background-color: #f44336;\n}\n\n.mat-tab-group.mat-background-warn > .mat-tab-header .mat-tab-label, .mat-tab-group.mat-background-warn > .mat-tab-link-container .mat-tab-link, .mat-tab-nav-bar.mat-background-warn > .mat-tab-header .mat-tab-label, .mat-tab-nav-bar.mat-background-warn > .mat-tab-link-container .mat-tab-link {\n  color: white;\n}\n\n.mat-tab-group.mat-background-warn > .mat-tab-header .mat-tab-label.mat-tab-disabled, .mat-tab-group.mat-background-warn > .mat-tab-link-container .mat-tab-link.mat-tab-disabled, .mat-tab-nav-bar.mat-background-warn > .mat-tab-header .mat-tab-label.mat-tab-disabled, .mat-tab-nav-bar.mat-background-warn > .mat-tab-link-container .mat-tab-link.mat-tab-disabled {\n  color: rgba(255, 255, 255, 0.4);\n}\n\n.mat-tab-group.mat-background-warn > .mat-tab-header .mat-tab-header-pagination-chevron,\n.mat-tab-group.mat-background-warn > .mat-tab-header-pagination .mat-tab-header-pagination-chevron,\n.mat-tab-group.mat-background-warn > .mat-tab-link-container .mat-focus-indicator::before,\n.mat-tab-group.mat-background-warn > .mat-tab-header .mat-focus-indicator::before, .mat-tab-nav-bar.mat-background-warn > .mat-tab-header .mat-tab-header-pagination-chevron,\n.mat-tab-nav-bar.mat-background-warn > .mat-tab-header-pagination .mat-tab-header-pagination-chevron,\n.mat-tab-nav-bar.mat-background-warn > .mat-tab-link-container .mat-focus-indicator::before,\n.mat-tab-nav-bar.mat-background-warn > .mat-tab-header .mat-focus-indicator::before {\n  border-color: white;\n}\n\n.mat-tab-group.mat-background-warn > .mat-tab-header .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,\n.mat-tab-group.mat-background-warn > .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron, .mat-tab-nav-bar.mat-background-warn > .mat-tab-header .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron,\n.mat-tab-nav-bar.mat-background-warn > .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n  border-color: white;\n  opacity: 0.4;\n}\n\n.mat-tab-group.mat-background-warn > .mat-tab-header .mat-ripple-element,\n.mat-tab-group.mat-background-warn > .mat-tab-link-container .mat-ripple-element,\n.mat-tab-group.mat-background-warn > .mat-tab-header-pagination .mat-ripple-element, .mat-tab-nav-bar.mat-background-warn > .mat-tab-header .mat-ripple-element,\n.mat-tab-nav-bar.mat-background-warn > .mat-tab-link-container .mat-ripple-element,\n.mat-tab-nav-bar.mat-background-warn > .mat-tab-header-pagination .mat-ripple-element {\n  background-color: white;\n  opacity: 0.12;\n}\n\n.mat-toolbar {\n  background: whitesmoke;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-toolbar.mat-primary {\n  background: #0f4c81;\n  color: white;\n}\n\n.mat-toolbar.mat-accent {\n  background: #ffab40;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-toolbar.mat-warn {\n  background: #f44336;\n  color: white;\n}\n\n.mat-toolbar .mat-form-field-underline,\n.mat-toolbar .mat-form-field-ripple,\n.mat-toolbar .mat-focused .mat-form-field-ripple {\n  background-color: currentColor;\n}\n\n.mat-toolbar .mat-form-field-label,\n.mat-toolbar .mat-focused .mat-form-field-label,\n.mat-toolbar .mat-select-value,\n.mat-toolbar .mat-select-arrow,\n.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {\n  color: inherit;\n}\n\n.mat-toolbar .mat-input-element {\n  caret-color: currentColor;\n}\n\n.mat-toolbar-multiple-rows {\n  min-height: 64px;\n}\n\n.mat-toolbar-row, .mat-toolbar-single-row {\n  height: 64px;\n}\n\n@media (max-width: 599px) {\n  .mat-toolbar-multiple-rows {\n    min-height: 56px;\n  }\n\n  .mat-toolbar-row, .mat-toolbar-single-row {\n    height: 56px;\n  }\n}\n\n.mat-tooltip {\n  background: rgba(97, 97, 97, 0.9);\n}\n\n.mat-tree {\n  background: white;\n}\n\n.mat-tree-node,\n.mat-nested-tree-node {\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.mat-tree-node {\n  min-height: 48px;\n}\n\n.mat-snack-bar-container {\n  color: rgba(255, 255, 255, 0.7);\n  background: #323232;\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);\n}\n\n.mat-simple-snackbar-action {\n  color: #ffab40;\n}\n\n.svg-inactive-stroke {\n  stroke: black !important;\n}\n\n.svg-inactive-fill {\n  fill: black !important;\n}\n\n.svg-active-stroke {\n  stroke: #ffab40 !important;\n}\n\n.svg-active-fill {\n  fill: #ffab40 !important;\n}\n\n.svg-invisible-fill {\n  fill: none !important;\n}\n\n.svg-transition-enabled {\n  stroke: green;\n  fill: yellowgreen;\n}\n\n.svg-transition-disabled {\n  stroke: red;\n  fill: white;\n}\n\n.svg-transition-firing {\n  stroke: green;\n  fill: none;\n}\n\n.svg-fire-arrow-cancel-active {\n  fill: coral;\n  stroke: red;\n}\n\n.svg-fire-arrow-cancel-inactive {\n  fill: none;\n  stroke: none;\n}\n\n.svg-fire-arrow-finish-active {\n  stroke: green;\n  fill: yellowgreen;\n}\n\n.svg-fire-arrow-finish-inactive {\n  fill: none;\n  stroke: none;\n}\n\n.svg-icon-active {\n  display: block;\n}\n\n.svg-icon-inactive {\n  display: none;\n}\n\n.path {\n  stroke-dasharray: 2 5;\n  -webkit-animation: dash 10s linear;\n          animation: dash 10s linear;\n  -webkit-animation-iteration-count: infinite;\n          animation-iteration-count: infinite;\n}\n\n@-webkit-keyframes dash {\n  to {\n    stroke-dashoffset: 400;\n  }\n}\n\n@keyframes dash {\n  to {\n    stroke-dashoffset: 400;\n  }\n}\n\n.app-container {\n  padding: 0 16px;\n  width: 100%;\n  overflow: hidden;\n  border-bottom: 5px solid #DDDDDD;\n  background-color: #0d4579;\n}\n\n.canvas {\n  width: 10000px;\n  height: 10000px;\n}\n\n.inner {\n  display: block;\n}\n\n.outer {\n  display: flex;\n  overflow: scroll;\n  min-height: 100%;\n}\n\n#source-button {\n  position: absolute;\n  right: 15px;\n  top: 15px;\n}\n\n#netgrif-icon {\n  font-size: 50px;\n  height: 50px;\n  width: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9iYWRnZS9fYmFkZ2UtdGhlbWUuc2NzcyIsImFwcC5jb21wb25lbnQuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9jb3JlL3R5cG9ncmFwaHkvX3R5cG9ncmFwaHkuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9jb3JlL3R5cG9ncmFwaHkvX3R5cG9ncmFwaHktdXRpbHMuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9ib3R0b20tc2hlZXQvX2JvdHRvbS1zaGVldC10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbi9fYnV0dG9uLXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uLXRvZ2dsZS9fYnV0dG9uLXRvZ2dsZS10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQvX2NhcmQtdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveC9fY2hlY2tib3gtdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9jaGlwcy9fY2hpcHMtdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC90YWJsZS9fdGFibGUtdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyL19kYXRlcGlja2VyLXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nL19kaWFsb2ctdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9leHBhbnNpb24vX2V4cGFuc2lvbi10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvX2Zvcm0tZmllbGQtdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkL19mb3JtLWZpZWxkLWxlZ2FjeS10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvX2Zvcm0tZmllbGQtZmlsbC10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQvX2Zvcm0tZmllbGQtb3V0bGluZS10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2dyaWQtbGlzdC9fZ3JpZC1saXN0LXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZS9zdHlsZS9fbGlzdC1jb21tb24uc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9pbnB1dC9faW5wdXQtdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9tZW51L19tZW51LXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yL19wYWdpbmF0b3ItdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9yYWRpby9fcmFkaW8tdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QvX3NlbGVjdC10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZS9fc2xpZGUtdG9nZ2xlLXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGVyL19zbGlkZXItdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9zdGVwcGVyL19zdGVwcGVyLXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicy9fdGFicy10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2xiYXIvX3Rvb2xiYXItdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC90b29sdGlwL190b29sdGlwLXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvbGlzdC9fbGlzdC10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUvb3B0aW9uL19vcHRpb24tdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9jb3JlL29wdGlvbi9fb3B0Z3JvdXAtdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXIvX3NuYWNrLWJhci10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL3RyZWUvX3RyZWUtdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9jb3JlL3JpcHBsZS9fcmlwcGxlLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvY2RrL2ExMXkvX2luZGV4LnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvY2RrL292ZXJsYXkvX2luZGV4LnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvY2RrL3RleHQtZmllbGQvX2luZGV4LnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZS9mb2N1cy1pbmRpY2F0b3JzL19mb2N1cy1pbmRpY2F0b3JzLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZS9fY29yZS5zY3NzIiwiLi4vbmV0Z2lmLXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZS90aGVtaW5nL19wYWxldHRlLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZS9yaXBwbGUvX3JpcHBsZS10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUvc2VsZWN0aW9uL3BzZXVkby1jaGVja2JveC9fcHNldWRvLWNoZWNrYm94LXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZS9fY29yZS10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUvc3R5bGUvX2VsZXZhdGlvbi5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZS9fYXV0b2NvbXBsZXRlLXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvZGl2aWRlci9fZGl2aWRlci10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2V4cGFuc2lvbi9fZXhwYW5zaW9uLW1peGlucy5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUvc3R5bGUvX2Zvcm0tY29tbW9uLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZC9fZm9ybS1maWVsZC1zdGFuZGFyZC10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL2ljb24vX2ljb24tdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9jb3JlL3N0eWxlL192ZW5kb3ItcHJlZml4ZXMuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9wcm9ncmVzcy1iYXIvX3Byb2dyZXNzLWJhci10aGVtZS5zY3NzIiwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXIvX3Byb2dyZXNzLXNwaW5uZXItdGhlbWUuc2NzcyIsIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYW5ndWxhci9tYXRlcmlhbC9zaWRlbmF2L19zaWRlbmF2LXRoZW1lLnNjc3MiLCIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydC9fc29ydC10aGVtZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNORTtFQUNFLGdCQTFNVTtFQTJNVixlQTVNUTtFQTZNUixpREFBQTtBQ3JOSjs7QUR3TkU7RUFFRSxjQUFBO0FDdE5KOztBRHlORTtFQUNFLGVBQUE7QUN0Tko7O0FDZ0xFOzs7OztFQzVHRSwwREFBQTtFQWNGLHNCQUFBO0VEb0dFLGdCQUFBO0FENUtKOztBQytLRTs7Ozs7RUNySEUsMERBQUE7RUFjRixzQkFBQTtFRDZHRSxnQkFBQTtBRDNLSjs7QUM4S0U7Ozs7O0VDOUhFLDBEQUFBO0VBY0Ysc0JBQUE7RURzSEUsZ0JBQUE7QUQxS0o7O0FDNktFOzs7OztFQ3ZJRSwwREFBQTtFQWNGLHNCQUFBO0VEK0hFLGdCQUFBO0FEektKOztBQytLRTs7O0VDbkpFLHVFQUFBO0VEOEpBLGdCQUFBO0FEbkxKOztBQ3NMRTs7O0VDaktFLHVFQUFBO0VENEtBLGdCQUFBO0FEMUxKOztBQzZMRTs7OztFQy9LRSwwREFBQTtFQWNGLHNCQUFBO0FGcEJGOztBQzRMRTs7Ozs7RUN0TEUsMERBQUE7RUFjRixzQkFBQTtBRlhGOztBQzBMSTs7Ozs7RUFDRSxnQkFBQTtBRHBMTjs7QUN3TEU7Ozs7RUNsTUUsMERBQUE7RUFjRixzQkFBQTtBRklGOztBQ3VMRTs7RUN6TUUsNERBQUE7RUFjRix1QkFBQTtFRDhMRSxnQkFBQTtBRG5MSjs7QUNzTEU7O0VDL01FLDBEQUFBO0VBY0YsdUJBQUE7RURvTUUsZ0JBQUE7QURsTEo7O0FDcUxFOztFQ3JORSwwREFBQTtFQWNGLHdCQUFBO0VEME1FLGdCQUFBO0FEakxKOztBQ29MRTs7RUMzTkUsMERBQUE7RUFjRixzQkFBQTtFRGdORSxnQkFBQTtBRGhMSjs7QUd6R0U7RUQyREUsMERBQUE7RUFjRixzQkFBQTtBRnFDRjs7QUlxQ0U7O0VBR0ksaURBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUpuQ047O0FLckNFO0VBQ0UsaURBQUE7QUx3Q0o7O0FNL0dFO0VBQ0UsaURBQUE7QU5rSEo7O0FNL0dFO0VBRUksZUFBQTtFQUNBLGdCQUFBO0FOaUhOOztBTTdHRTtFQUNFLGVBQUE7QU5nSEo7O0FNN0dFOztFQUVFLGVBQUE7QU5nSEo7O0FPMURFO0VBQ0UsaURBQUE7QVA2REo7O0FPekRFO0VBQ0UsaUJBQUE7QVA0REo7O0FRMUVFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FSNkVKOztBUTNFSTs7RUFFRSxlQTdGa0I7QVIwS3hCOztBUzNJRTtFQUNFLGlEQUFBO0FUOElKOztBUzNJRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBVDhJSjs7QVMzSUU7RUFDRSxlQUFBO0FUOElKOztBVUlFO0VBQ0UsaURBQUE7QVZESjs7QVVJRTtFQUNFLGVBekxzQjtBVndMMUI7O0FVSUU7O0VBR0ksZUFBQTtFQUNBLGdCQUFBO0FWRk47O0FVTUU7RUFFSSxlQXJNNkI7RUFzTTdCLGdCQUFBO0FWSk47O0FXM0xFO0VUMERFLDBEQUFBO0VBY0Ysc0JBQUE7QUZ3SEY7O0FZM0pFO0VBRUksaURBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QVo2Sk47O0FZekpFO0VWYUUsMERBQUE7RUFjRixzQkFBQTtBRm1JRjs7QWE1REU7RVg1RkUsa0JBZVU7RUFkVixnQkFlWTtFQWRaLGtCQWVZO0VBZFosaURBZVk7RUFHZCxzQkFBQTtBRjJJRjs7QWFoRUU7RUFDRSx5QkFQdUI7QWIwRTNCOztBYTdESTs7RUFDRSxlQXZCMkI7RUF3QjNCLGtCQXhDVTtBYnlHaEI7O0FhN0RJOztFQUNFLGFBQUE7RUFDQSxZQUFBO0FiZ0VOOztBYTlETTs7RUFDRSxlQUFBO0VBQ0Esa0JBbERRO0FibUhoQjs7QWE1REU7RUFDRSxnQkFBQTtFQUVBLHVDQUFBO0FiOERKOztBYTFESTs7RUF6RUYsNkNBQUE7RUFFQSxzQkFBQTtBYnVJRjs7QWF4REk7RUFqRkYsNkNBQUE7RUFFQSxzQkFBQTtBYjJJRjs7QWFyREU7RUFDRSxlQUFBO0VBQ0Esc0JBcEVpQjtBYjRIckI7O0FhckRFO0VBQ0UsY0FBQTtBYndESjs7QWFyREU7RUFHRSxpQkFoRXVCO0Fic0gzQjs7QWFuREU7RUFDRSxjQS9Fb0I7RUFnRnBCLDBCQXpFcUI7RUE2RXJCLGdDQUFBO0FibURKOztBYzlMSTtFQUNFLHNCQUpxQjtBZHFNM0I7O0FjOUxJO0VBQ0UsbUJBQUE7QWRnTU47O0FjNUxNOztFQXhESixvRkFBQTtFQUVBLHNCQUFBO0FkdVBGOztBYzFMTTtFQS9ESixzRkFBQTtFQUVBLHNCQUFBO0FkMlBGOztBY3RMTTtFQXZFSixzRkFBQTtFQUVBLHNCQUFBO0FkK1BGOztBY25MSTtFQUNFLGNBQUE7QWRxTE47O0FjbExJO0VBR0UsY0F6Q3FCO0FkMk4zQjs7QWMvS0k7RUFDRSwwQkFqRG1CO0VBcURuQixnQ0FBQTtBZDhLTjs7QWN4S0U7RUFHTTs7SUEzRk4sNkNBQUE7RWRzUUE7RWNwS007SUFsR04sNkNBQUE7RWR5UUE7RWMvSk07SUExR04sNENBQUE7RWQ0UUE7QUFDRjs7QWUxUEk7RUFDRSwwQkFBQTtBZjRQTjs7QWV6UEk7RUFDRSxjQUFBO0VBQ0Esa0JBVDJCO0Fmb1FqQzs7QWV2UE07O0VBbkNKLDZDQUFBO0VBRUEsc0JBQUE7QWY2UkY7O0FlblBNO0VBNUNKLDZDQUFBO0VBRUEsc0JBQUE7QWZpU0Y7O0FnQjVPSTtFQUNFLG9CQUFBO0FoQitPTjs7QWdCNU9JO0VBQ0UsY0FBQTtFQUNBLG1CQVQ4QjtBaEJ1UHBDOztBZ0IxT007O0VBMUNKLDZDQUFBO0VBRUEsc0JBQUE7QWhCdVJGOztBZ0J0T007RUFuREosNkNBQUE7RUFFQSxzQkFBQTtBaEIyUkY7O0FpQi9WRTs7RUFHRSxlQUFBO0FqQmlXSjs7QWtCcldFOztFQVJBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQVFFLGNBQUE7RUFDQSxzQkFBQTtBbEIwV0o7O0FrQnZXSTs7RUFDRSxlREp3QjtBakI4VzlCOztBbUIvU0U7RUFDRSxxQkFBQTtBbkJrVEo7O0FvQmhWRTtFQUVJLGlEQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FwQmtWTjs7QXFCelZFOztFQUdJLGlEQUFBO0VBQ0EsZUFBQTtBckIyVk47O0FzQm5VRTtFQUNFLGlEQUFBO0F0QnNVSjs7QXVCeFVFO0VBQ0UsaURBQUE7QXZCMlVKOztBdUJ4VUU7RUFDRSxlQUFBO0F2QjJVSjs7QXdCelVFO0VBQ0UsaURBQUE7QXhCNFVKOztBeUI3T0U7RUFFSSxpREFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBekIrT047O0EwQjlTRTtFQUNFLGlEQUFBO0ExQmlUSjs7QTBCOVNFO0VBRUksZUFBQTtFQUNBLGdCQUFBO0ExQmdUTjs7QTBCNVNFO0VBQ0UsbUJBQUE7QTFCK1NKOztBMEI1U0U7RUFDRSxlQUFBO0ExQitTSjs7QTBCNVNFO0VBRUksZUFBQTtFQUNBLGdCQUFBO0ExQjhTTjs7QTJCclNFO0VBQ0UsaURBQUE7QTNCd1NKOztBMkJyU0U7RUFFSSxpREFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBM0J1U047O0E0QnpYRTs7Ozs7OztFMUJPRSwwREFBQTtFQWNGLHNCQUFBO0UwQmJFLFNBQUE7QTVCNlhKOztBNkJwYkU7RUFDRSxpREFBQTtFQUNBLGVBckJRO0VBc0JSLGdCQXJCZTtFQXNCZixtQkF0QmU7QTdCNmNuQjs7QTZCcGJFO0VBQ0UsZUF2QmdCO0VBd0JoQixnQkF2QnVCO0VBd0J2QixtQkF4QnVCO0E3QitjM0I7O0E4QnhhRTtFQUNFLGlEQUhZO0E5QjhhaEI7O0E4QnhhRTtFQUNFLGlEQVBZO0E5QmtiaEI7O0E4QnRhSTtFQUNFLGVBQUE7QTlCeWFOOztBa0I1ZEU7RUFSQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFRRSxjQUFBO0VBQ0Esc0JBQUE7QWxCZ2VKOztBa0I3ZEk7RUFDRSxlWTZDMEI7QTlCa2JoQzs7QThCL2FJO0VBQ0UsZUFBQTtBOUJpYk47O0FrQnplRTtFQVJBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQVFFLGNBQUE7RUFDQSxzQkFBQTtBbEI2ZUo7O0FrQjFlSTtFQUNFLGVZa0QwQjtBOUIwYmhDOztBOEJ2Ykk7RUFDRSxpREFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBOUJ5Yk47O0E4Qm5iSTtFQUNFLGVBQUE7QTlCc2JOOztBa0I1ZkU7RUFSQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFRRSxjQUFBO0VBQ0Esc0JBQUE7QWxCZ2dCSjs7QWtCN2ZJO0VBQ0UsZVlnRTBCO0E5QitiaEM7O0E4QjViSTtFQUNFLGVBQUE7QTlCOGJOOztBa0J6Z0JFO0VBUkEsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBUUUsY0FBQTtFQUNBLHNCQUFBO0FsQjZnQko7O0FrQjFnQkk7RUFDRSxlWXFFMEI7QTlCdWNoQzs7QThCcGNJO0VBQ0UsaURBMUNVO0VBMkNWLGVBQUE7RUFDQSxnQkFBQTtBOUJzY047O0ErQi9lRTtFQUVJLGlEQUFBO0VBQ0EsZUFBQTtBL0JpZk47O0FnQ25oQkU7RTlCMkRFLDBEQUFBO0VBY0Ysc0JBQUE7QUYrY0Y7O0FpQ2hoQkU7RUFFSSxpREFBQTtFQUNBLGVBQUE7QWpDa2hCTjs7QWlDOWdCRTtFQUNFLGNBQUE7RUFFRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QWpDZ2hCTjs7QWtDaGlCRTtFQUNFLGlEQUFBO0FsQ21pQko7O0FrQ2hpQkU7O0VBRUUsZ0JBQUE7RUFDQSxlQUFBO0FsQ21pQko7O0FtQzlqQkU7RUFDRSxnQkFBQTtFQUlBLGtCQUFBO0FuQzhqQko7O0FtQ3ZqQkk7RUFDRSx3QkFBQTtBbkN5akJOOztBbUNyakJFO0VBQ0UsaUJBQUE7QW5Dd2pCSjs7QW1DcmpCRTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUVBLDZEQUFBO0VBQ0EsbUJBQUE7QW5DdWpCSjs7QW9DcmlCSTtFRGRFLGFBQUE7QW5Dc2pCTjs7QW9DdmxCRTtFQUNFLFNBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBSUEsbUJBQUE7RUFHQSxVQUFBO0VBR0Esd0JBQUE7RUFDQSxxQkFBQTtFQU1BLE9BQUE7QXBDOGtCSjs7QW9DNWtCSTtFQUNFLFVBQUE7RUFDQSxRQUFBO0FwQzhrQk47O0FxQzlsQkU7RUFFRSxvQkFBQTtFQUdBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QXJDOGxCSjs7QXFDMWxCRTtFQUNFLGVBQUE7RUFDQSxhQTNCd0I7QXJDd25CNUI7O0FxQzNsQkk7RUFHRSxhQUFBO0FyQzJsQk47O0FxQ25sQkU7RUFDRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQTFDYztBckNnb0JsQjs7QXFDbGxCRTtFQUdFLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxzQkFBQTtFQUNBLGFBcERjO0VBd0RkLGFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QXJDZ2xCSjs7QXFDN2tCRTtFQUVFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUVBLGFBcEV1QjtFQXFFdkIsb0JBQUE7RUFDQSx3Q0FBQTtFQUNBLDBEQUFBO0VBQ0EsVUFBQTtBckM4a0JKOztBcUM1a0JJO0VBQ0UsVUFBQTtBckM4a0JOOztBcUN6a0JNO0VBR0UsWUFBQTtBckN5a0JSOztBcUNwa0JFO0VBQ0UsK0JBdEZxQjtBckM2cEJ6Qjs7QXFDcGtCRTtFQUVFLHFEQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0FyQ3NrQko7O0FxQ2hrQkk7RUFDRSxVQUFBO0VBQ0EsbUJBQUE7QXJDa2tCTjs7QXFDNWpCRTtFQUNFLGtCQUFBO0VBQ0EsYUFqSGM7RUFzSGQsYUFBQTtFQUlBLHNCQUFBO0VBR0EsY0FBQTtFQUNBLGVBQUE7QXJDc2pCSjs7QXFDbGpCRTtFQUNFLGVBQUE7RUFLQSxXQUFBO0VBS0Esa0JBQUE7QXJDNmlCSjs7QXNDMXJCRTtFQUNFLFlBQUE7QXRDNnJCSjs7QXNDdnJCRTtFQXlDQSx5QkFBQTtFQUNBLGtDQUFBO0VBeENFLHVCQUFBO0VBQ0EsMkJBQUE7QXRDMnJCSjs7QXNDbHJCRTtFQTZCQSx5QkFBQTtFQUNBLGtDQUFBO0VBNUJFLG9CQUFBO0F0Q3NyQko7O0FzQzVxQkU7RUFBMEMsSUFBQTtBdENnckI1Qzs7QXNDaHJCRTtFQUEwQyxJQUFBO0F0Q2dyQjVDOztBc0MvcUJFO0VBQXdDLElBQUE7QXRDa3JCMUM7O0FzQ2xyQkU7RUFBd0MsSUFBQTtBdENrckIxQzs7QXNDaHJCRTtFQUVFLHVEQUFBO1VBQUEsK0NBQUE7QXRDaXJCSjs7QXNDOXFCRTtFQUVFLHFEQUFBO1VBQUEsNkNBQUE7QXRDZ3JCSjs7QXVDbG9CRTtFQUNFLGtCQUFBO0F2Q3FvQko7O0F3Q2xzQkU7RUFDRSxrQkFBQTtBeENxc0JKOztBeUNwcEJJO0VBQ0ksb0RBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQ25EYTtBMUMwc0JyQjs7QXlDcHBCSTtFQUNJLFVBQUE7RUFDQSxXQUFBO0VBQ0EsdUJDekRhO0ExQytzQnJCOztBeUNucEJJO0VBQ0ksa0JBQUE7RUFDQSxvREFBQTtFQUNBLHlCQUFBO0F6Q3FwQlI7O0EyQzF1QkU7RUFJSSxvQ0FBQTtBM0MwdUJOOztBK0I1dUJFO0VBQ0UsMEJBQUE7QS9CK3VCSjs7QStCN3VCSTtFQUVFLCtCQUFBO0EvQjh1Qk47O0ErQjF1Qkk7RUFDRSwrQkFBQTtBL0I0dUJOOztBK0J6dUJJO0VBQ0UsK0JBQUE7RUFDQSwwQkFBQTtBL0IydUJOOztBK0J4dUJJO0VBQ0UsMEJBQUE7QS9CMHVCTjs7QStCdHVCRTtFQUNFLGNBQUE7QS9CeXVCSjs7QStCdHVCRTtFQUNFLGNBQUE7QS9CeXVCSjs7QStCdHVCRTtFQUNFLGNBQUE7QS9CeXVCSjs7QWdDN3dCRTtFQUNFLDBCQUFBO0FoQ2d4Qko7O0FnQzd3QkU7RUFDRSwwQkFBQTtBaENneEJKOztBNEMzd0JFO0VBQ0UsMEJBQUE7QTVDOHdCSjs7QTRDNXdCSTtFQUNFLGNBQUE7QTVDOHdCTjs7QTRDMXdCRTtFQUNFLGNBWmU7QTVDeXhCbkI7O0E0QzF3QkU7O0VBRUUsbUJBQUE7QTVDNndCSjs7QTRDcndCRTs7OztFQUlFLG1CQUFBO0E1Q3d3Qko7O0E0Q3J3QkU7O0VBRUUsbUJBQUE7QTVDd3dCSjs7QTRDbndCSTs7RUFDRSxtQkF4Q2E7QTVDK3lCbkI7O0E2Q2h6QkU7RUFJRSx5QkFBQTtFQUNBLDBCQUFBO0E3Q2d6Qko7O0E2Q3p5Qkk7RUNrSUYsd0hBQUE7QTlDMnFCRjs7QTZDN3lCSTtFQ2tJRix5SEFBQTtBOUMrcUJGOztBNkNqekJJO0VDa0lGLHlIQUFBO0E5Q21yQkY7O0E2Q3J6Qkk7RUNrSUYseUhBQUE7QTlDdXJCRjs7QTZDenpCSTtFQ2tJRiwwSEFBQTtBOUMyckJGOztBNkM3ekJJO0VDa0lGLDBIQUFBO0E5QytyQkY7O0E2Q2owQkk7RUNrSUYsMkhBQUE7QTlDbXNCRjs7QTZDcjBCSTtFQ2tJRiwySEFBQTtBOUN1c0JGOztBNkN6MEJJO0VDa0lGLDJIQUFBO0E5QzJzQkY7O0E2QzcwQkk7RUNrSUYsMkhBQUE7QTlDK3NCRjs7QTZDajFCSTtFQ2tJRiw0SEFBQTtBOUNtdEJGOztBNkNyMUJJO0VDa0lGLDRIQUFBO0E5Q3V0QkY7O0E2Q3oxQkk7RUNrSUYsNEhBQUE7QTlDMnRCRjs7QTZDNzFCSTtFQ2tJRiw0SEFBQTtBOUMrdEJGOztBNkNqMkJJO0VDa0lGLDRIQUFBO0E5Q211QkY7O0E2Q3IyQkk7RUNrSUYsNEhBQUE7QTlDdXVCRjs7QTZDejJCSTtFQ2tJRiw2SEFBQTtBOUMydUJGOztBNkM3MkJJO0VDa0lGLDZIQUFBO0E5Qyt1QkY7O0E2Q2ozQkk7RUNrSUYsNkhBQUE7QTlDbXZCRjs7QTZDcjNCSTtFQ2tJRiw2SEFBQTtBOUN1dkJGOztBNkN6M0JJO0VDa0lGLDhIQUFBO0E5QzJ2QkY7O0E2QzczQkk7RUNrSUYsOEhBQUE7QTlDK3ZCRjs7QTZDajRCSTtFQ2tJRiw4SEFBQTtBOUNtd0JGOztBNkNyNEJJO0VDa0lGLDhIQUFBO0E5Q3V3QkY7O0E2Q3o0Qkk7RUNrSUYsOEhBQUE7QTlDMndCRjs7QTZDdDRCSTtFQUNFLGFBQUE7QTdDeTRCTjs7QStDbjZCRTtFQUVFLGlCQUFBO0VBQ0EsMEJBQUE7QS9DcTZCSjs7QThDendCRTtFQVhBLDBIQUFBO0E5Q3V4QkY7O0ErQ2o2Qkk7RUFDRSxpQkFBQTtBL0NtNkJOOztBK0NqNkJNO0VBQ0UsMEJBQUE7QS9DbTZCUjs7QUR0MUJFO0VBQ0Usa0JBQUE7QUN5MUJKOztBRGwxQkU7RUFDRSxpQkFBQTtBQ3ExQko7O0FEajFCSTtFQUNFLGFBQUE7QUNvMUJOOztBRGgxQkU7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLHVDQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQkFBQTtBQ20xQko7O0FEaDFCRTs7RUFFRSxnQkFBQTtBQ20xQko7O0FEOTBCRTtFQUVFLGVBQUE7QUNnMUJKOztBRHI4QkU7RUFDRSxXQVRTO0VBVVQsWUFWUztFQVdULGlCQVhTO0FDbTlCYjs7QURwOEJJO0VBQ0UsU0FBQTtBQ3M4Qk47O0FEajhCSTtFQUNFLFlBQUE7QUNtOEJOOztBRDk3Qkk7RUFDRSxXQUFBO0FDZzhCTjs7QUQzN0JJO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUM2N0JOOztBRHg3Qkk7RUFDRSxZQUFBO0FDMDdCTjs7QURyN0JJO0VBQ0UsV0FBQTtFQUNBLFdBQUE7QUN1N0JOOztBRGo3Qk07RUFDRSxVQUFBO0FDbTdCUjs7QUQ5NkJNO0VBQ0UsVUFBQTtFQUNBLFdBQUE7QUNnN0JSOztBRDM2Qk07RUFDRSxXQUFBO0FDNjZCUjs7QUR4NkJNO0VBQ0UsV0FBQTtFQUNBLFVBQUE7QUMwNkJSOztBRDcrQkU7RUFDRSxXQVZXO0VBV1gsWUFYVztFQVlYLGlCQVpXO0FDNC9CZjs7QUQ1K0JJO0VBQ0UsVUFBQTtBQzgrQk47O0FEeitCSTtFQUNFLGFBQUE7QUMyK0JOOztBRHQrQkk7RUFDRSxXQUFBO0FDdytCTjs7QURuK0JJO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUNxK0JOOztBRGgrQkk7RUFDRSxZQUFBO0FDaytCTjs7QUQ3OUJJO0VBQ0UsV0FBQTtFQUNBLFdBQUE7QUMrOUJOOztBRHo5Qk07RUFDRSxXQUFBO0FDMjlCUjs7QUR0OUJNO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUN3OUJSOztBRG45Qk07RUFDRSxZQUFBO0FDcTlCUjs7QURoOUJNO0VBQ0UsV0FBQTtFQUNBLFdBQUE7QUNrOUJSOztBRHJoQ0U7RUFDRSxXQVJTO0VBU1QsWUFUUztFQVVULGlCQVZTO0FDa2lDYjs7QURwaENJO0VBQ0UsVUFBQTtBQ3NoQ047O0FEamhDSTtFQUNFLGFBQUE7QUNtaENOOztBRDlnQ0k7RUFDRSxXQUFBO0FDZ2hDTjs7QUQzZ0NJO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUM2Z0NOOztBRHhnQ0k7RUFDRSxZQUFBO0FDMGdDTjs7QURyZ0NJO0VBQ0UsV0FBQTtFQUNBLFdBQUE7QUN1Z0NOOztBRGpnQ007RUFDRSxXQUFBO0FDbWdDUjs7QUQ5L0JNO0VBQ0UsVUFBQTtFQUNBLFlBQUE7QUNnZ0NSOztBRDMvQk07RUFDRSxZQUFBO0FDNi9CUjs7QUR4L0JNO0VBQ0UsV0FBQTtFQUNBLFdBQUE7QUMwL0JSOztBRGg3QkU7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7QUNtN0JKOztBb0N2aUNJO0VyQ3VIRSxrQkFBQTtFQUNBLGdCQUFBO0FDbTdCTjs7QUQ5NkJJO0VBQ0UsbUJBQUE7RUFDQSwwQkFBQTtBQ2k3Qk47O0FENTZCSTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQys2Qk47O0FEMTZCSTtFQVdJLG1CQUFBO0VBTUYsMEJBQUE7QUM4NUJOOztBR2ptQ0U7RTJDa0pBLDZIQUFBO0UzQ2hKRSxpQkFBQTtFQUNBLDBCQUFBO0FIb21DSjs7QUlsaENFO0VBS0UsY0FBQTtFQUNBLHVCQUFBO0FKaWhDSjs7QUlqakNFO0VBQ0UsY0FBQTtBSm1qQ0o7O0FJampDRTtFQUNFLGNBQUE7QUptakNKOztBSWpqQ0U7RUFDRSxjQUFBO0FKbWpDSjs7QUkvaUNJO0VBRUUsMEJBQUE7QUpnakNOOztBSW5uQ0U7RUFDRSx5QkFBQTtBSnFuQ0o7O0FJbG5DRTtFQUNFLHlCQUFBO0FKb25DSjs7QUlqbkNFO0VBQ0UseUJBQUE7QUptbkNKOztBSWhuQ0U7RUFDRSw2QkFBQTtBSmtuQ0o7O0FJamlDSTtFQUNFLFlBeEdZO0VBeUdaLDhCQUFBO0FKbWlDTjs7QUkvaENFO0VBQ0UsaUJBQUE7QUpraUNKOztBSTdoQ0U7RUFDRSxpQ0FBQTtBSmdpQ0o7O0FJN2hDRTtFQUVFLDBCQUFBO0VBQ0EsdUJBQUE7QUoraENKOztBSTFsQ0U7RUFDRSxZQUFBO0FKNGxDSjs7QUkxbENFO0VBQ0UsMEJBQUE7QUo0bENKOztBSTFsQ0U7RUFDRSxZQUFBO0FKNGxDSjs7QUl4bENJO0VBRUUsMEJBQUE7QUp5bENOOztBSXRtQ0U7RUFDRSx5QkFBQTtBSndtQ0o7O0FJdG1DRTtFQUNFLHlCQUFBO0FKd21DSjs7QUl0bUNFO0VBQ0UseUJBQUE7QUp3bUNKOztBSXBtQ0k7RUFFRSxxQ0FBQTtBSnFtQ047O0FJdm9DRTtFQVhBLDBDQURtQjtBSnNwQ3JCOztBSXRvQ0U7RUFmQSxvQ0FEbUI7QUp5cENyQjs7QUlyb0NFO0VBbkJBLDBDQURtQjtBSjRwQ3JCOztBOEN6aENFO0VBWEEsd0hBQUE7QTlDd2lDRjs7QThDN2hDRTtFQVhBLHlIQUFBO0E5QzRpQ0Y7O0E4Q2ppQ0U7RUFYQSwySEFBQTtBOUMraUNGOztBOENwaUNFO0VBWEEsd0hBQUE7QTlDa2pDRjs7QThDdmlDRTtFQVhBLDJIQUFBO0E5Q3NqQ0Y7O0E4QzNpQ0U7RUFYQSw0SEFBQTtBOUN5akNGOztBOEM5aUNFO0VBWEEsd0hBQUE7QTlDNGpDRjs7QThDampDRTs7RUFYQSx5SEFBQTtBOUNpa0NGOztBSy9yQ0k7O0VBQ0UsZ0JBQUE7QUxtc0NOOztBSy9yQ0U7RUFDRSwwQkFBQTtBTGtzQ0o7O0FLaHNDSTtFQUNFLHFDQUFBO0FMa3NDTjs7QUs5ckNFO0VBQ0UsMEJBQUE7RUFDQSxpQkFBQTtBTGlzQ0o7O0FLL3JDSTtFQUNFLHVCQUFBO0FMaXNDTjs7QUs3ckNFO0VBQ0UsOEJBQUE7QUxnc0NKOztBSzdyQ0U7RUFDRSxpQkFBQTtFQUNBLCtCQUFBO0FMZ3NDSjs7QUs1ckNJO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLDZCQUFBO0FMK3JDTjs7QUszckNFO0VBQ0UseUJBQUE7RUFDQSwwQkFBQTtBTDhyQ0o7O0FLNXJDSTtFQUNFLDBCQUFBO0FMOHJDTjs7QUsxckNFO0VBQ0UsMEJBQUE7RUFDQSx5QkFBQTtBTDZyQ0o7O0FLM3JDSTtFQUNFLGlCQUFBO0FMNnJDTjs7QUsxckNJO0VBQ0UseUJBQUE7QUw0ckNOOztBS3hyQ0U7O0VBRUUseUJBQUE7QUwyckNKOztBS3pxQ0k7RUFDRSxpQkFMYztBTGlyQ3BCOztBTWp4Q0U7RUFFRSxpQkFBQTtFQUNBLDBCQUFBO0FObXhDSjs7QThDMW5DRTtFQVhBLHlIQUFBO0E5Q3dvQ0Y7O0E4QzduQ0U7RUFYQSx3SEFBQTtBOUMyb0NGOztBTWp4Q0U7RUFDRSwwQkFBQTtBTm94Q0o7O0FPbHhDRTtFQUNFLGlDQUFBO0FQcXhDSjs7QU9seENFO0VBQ0UsYUFkb0I7QVBteUN4Qjs7QU9seENFO0VBR0UsMEJBQUE7QVBteENKOztBT2h4Q0U7RUFDRSx5QkF4Qm9CO0FQMnlDeEI7O0FPL3dDSTtFQUNFLHlCQUFBO0FQa3hDTjs7QU8vd0NJO0VBQ0UseUJBQUE7QVBpeENOOztBTzl3Q0k7RUFDRSx5QkFBQTtBUGd4Q047O0FPendDTTtFQUNFLHlCQXRDVztBUGt6Q25COztBT3Z3Q007RUFDRSxxQkE1Q1c7QVBxekNuQjs7QU9yd0NJO0VBQ0UsMEJBQUE7QVB1d0NOOztBT2p3Q0U7RUFDRSx1QkFBQTtBUG93Q0o7O0FPL3ZDSTs7RUFDRSxtQkFBQTtBUG13Q047O0FPaHdDSTs7RUFDRSxtQkFBQTtBUG13Q047O0FPaHdDSTs7RUFDRSxtQkFBQTtBUG13Q047O0FRM3lDRTtFQTVDQSx5QkF5Q3dCO0VBeEN4QiwwQkF5Q3dCO0FSa3pDMUI7O0FRejFDRTtFQUNFLDBCQXNDc0I7RUFyQ3RCLFlBQUE7QVIyMUNKOztBUWh6Q007RXNDbUdKLHlIQUFBO0E5Q2d0Q0Y7O0FRL3lDTTtFQUNFLGFBQUE7QVJpekNSOztBUTd5Q0k7RUFDRSxZQUFBO0FSK3lDTjs7QVE1eUNJO0VBQ0UsaUJBQUE7QVI4eUNOOztBUXp5Q0k7RUFuRUYseUJBeUJFO0VBeEJGLFlBdUJ3QjtBUnkxQzFCOztBUTkyQ0U7RUFDRSxZQW9Cc0I7RUFuQnRCLFlBQUE7QVJnM0NKOztBUTExQ0U7RUFWQSwwQ0FEbUI7QVJ3MkNyQjs7QVFqekNJO0VBdkVGLHlCQXlCRTtFQXhCRixZQXVCd0I7QVJvMkMxQjs7QVF6M0NFO0VBQ0UsWUFvQnNCO0VBbkJ0QixZQUFBO0FSMjNDSjs7QVFyMkNFO0VBVkEsMENBRG1CO0FSbTNDckI7O0FReHpDSTtFQTNFRix5QkF5QkU7RUF4QkYsMEJBdUJ3QjtBUisyQzFCOztBUXA0Q0U7RUFDRSwwQkFvQnNCO0VBbkJ0QixZQUFBO0FSczRDSjs7QVFoM0NFO0VBVkEsb0NBRG1CO0FSODNDckI7O0FTOTRDRTtFQUNFLGlCQUFBO0FUaTVDSjs7QVM5NENFOzs7O0VBSUUsbUJBQUE7QVRpNUNKOztBUzk0Q0U7O0VBRUUsd0NBQUE7QVRpNUNKOztBUzk0Q0U7RUFDRSwwQkFBQTtBVGk1Q0o7O0FTOTRDRTtFQUNFLDBCQUFBO0FUaTVDSjs7QVVsMkNFO0VBQ0UseUJBQUE7QVZxMkNKOztBVWgyQ0U7OztFQUdFLDBCQUFBO0FWbTJDSjs7QVVoMkNFO0VBQ0UsK0JBQUE7QVZtMkNKOztBVWgyQ0U7O0VBRUUsMEJBQUE7QVZtMkNKOztBVWgyQ0U7O0VBRUUsMEJBQUE7RUFDQSx5QkFBQTtBVm0yQ0o7O0FVLzRDRTtFQWlESSwwQkEvQmE7QVZpNENuQjs7QVU5MUNFO0VBQ0UsMEJBcENlO0FWcTRDbkI7O0FVOTFDRTtFQU9JLDBCQUFBO0FWMjFDTjs7QVUzNUNFO0VBMkVJLGlDQUFBO0FWbzFDTjs7QVUvNUNFO0VBb0ZNLGlDQUFBO0FWKzBDUjs7QVU3dkNFO0VBQ0Usa0NBOU1BO0FWODhDSjs7QVU3dkNFOztFQUVFLGtDQVZpQjtBVjB3Q3JCOztBVTd2Q0U7O0VBRUUsNkZBQUE7QVZnd0NKOztBVTd2Q0U7O0VBRUUsNEZBQUE7QVZnd0NKOztBVTd2Q0U7O0VBRUUsbUJBeEJjO0FWd3hDbEI7O0FVN3ZDRTs7RUFFRSxtQkE1QnVCO0FWNHhDM0I7O0FVcitDRTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBVncrQ0o7O0FVcitDRTtFQUlJLHdDQUFBO0FWcStDTjs7QVU1OUNFO0VBQ0UsaUNBQUE7QVYrOUNKOztBVTc4Q0U7O0VBU0ksd0NBQUE7QVZ5OENOOztBVTM5Q0U7RUFTQTtJQVNJLHdDQUFBO0VWODhDSjtBQUNGOztBVXQzQ0U7RW9DQ0EsMEhBQUE7RXBDQ0UsdUJBQUE7RUFDQSwwQkFBQTtBVnczQ0o7O0FVdnpDRTtFQUNFLG1DQTlNQTtBVnVnREo7O0FVdHpDRTs7RUFFRSxrQ0FWaUI7QVZrMENyQjs7QVVyekNFOztFQUVFLDhGQUFBO0FWdXpDSjs7QVVwekNFOztFQUVFLDZGQUFBO0FWc3pDSjs7QVVuekNFOztFQUVFLG1CQXhCYztBVjYwQ2xCOztBVWx6Q0U7O0VBRUUsbUJBNUJ1QjtBVmcxQzNCOztBVXpoREU7RUFDRSx5QkFBQTtFQUNBLDBCQUFBO0FWMmhESjs7QVV4aERFO0VBSUkseUNBQUE7QVZ1aEROOztBVTlnREU7RUFDRSwrQ0FBQTtBVmdoREo7O0FVOS9DRTs7RUFTSSx5Q0FBQTtBVnkvQ047O0FVM2dERTtFQVNBO0lBU0kseUNBQUE7RVY2L0NKO0FBQ0Y7O0FVajJDRTtFQUNFLGtDQTlNQTtBVmlqREo7O0FVaDJDRTs7RUFFRSxrQ0FWaUI7QVY0MkNyQjs7QVUvMUNFOztFQUVFLDZGQUFBO0FWaTJDSjs7QVU5MUNFOztFQUVFLDRGQUFBO0FWZzJDSjs7QVU3MUNFOztFQUVFLG1CQXhCYztBVnUzQ2xCOztBVTUxQ0U7O0VBRUUsbUJBNUJ1QjtBVjAzQzNCOztBVW5rREU7RUFDRSx5QkFBQTtFQUNBLFlBQUE7QVZxa0RKOztBVWxrREU7RUFJSSx3Q0FBQTtBVmlrRE47O0FVeGpERTtFQUNFLGlDQUFBO0FWMGpESjs7QVV4aURFOztFQVNJLHdDQUFBO0FWbWlETjs7QVVyakRFO0VBU0E7SUFTSSx3Q0FBQTtFVnVpREo7QUFDRjs7QVVqOENFO0VvQ2JBLDhIQUFBO0E5Q2s5Q0Y7O0FVajhDRTtFQUNFLGNBQUE7QVZvOENKOztBVWw4Q0k7RUFDRSxjQUFBO0FWbzhDTjs7QVVqOENJO0VBQ0UsY0FBQTtBVm04Q047O0FVLzdDRTtFQUNFLDBCQUFBO0FWazhDSjs7QVdqbkRFO0VtQ2lKQSw4SEFBQTtFbkMvSUUsaUJBQUE7RUFDQSwwQkFBQTtBWG9uREo7O0FnRDVuREU7RUFDRSxxQ0FBQTtBaEQrbkRKOztBZ0Q1bkRFO0VBQ0UsdUNBQUE7QWhEK25ESjs7QVk3bkRFO0VBRUUsaUJBQUE7RUFDQSwwQkFBQTtBWituREo7O0E4Q3grQ0U7RUFYQSx5SEFBQTtBOUNzL0NGOztBWS9uREU7RUFDRSxxQ0FBQTtBWmtvREo7O0FpRGxwRE07RXJDb0JGLCtCQUFBO0Faa29ESjs7QVk3bkRFO0VBQ0U7SUFFRSxpQkFBQTtFWituREo7QUFDRjs7QVk1bkRFO0VBQ0UsMEJBQUE7QVo4bkRKOztBWTNuREU7O0VBRUUsMEJBQUE7QVo4bkRKOztBWTNuREU7RUFDRSwwQkFBQTtBWjhuREo7O0FZNW5ESTs7RUFFRSxjQUFBO0FaOG5ETjs7QVlqbURJO0VBQ0UsWUFMZTtBWnltRHJCOztBWWxtRE07RUFDRSxZQVZZO0FaOG1EcEI7O0FhdHBERTtFQUNFLHlCQVpBO0FicXFESjs7QWF0cERFO0VBQ0UseUJBaEJBO0FieXFESjs7QWF0cERFO0VBQ0UsY0FuQm9CO0FiNHFEeEI7O0FhdnBESTtFQUNFLGNBaEJxQjtBYnlxRDNCOztBYXRwREk7RUFDRSxjQW5CbUI7QWIycUR6Qjs7QWFwcERFO0VBQ0UsY0E5QnFCO0FicXJEekI7O0FhcHBERTtFQUNFLHFDQTlCQTtBYnFyREo7O0FhbnBESTtFQUNFLHlCQWhDc0I7QWJzckQ1Qjs7QWFwcERNO0VBQ0UseUJBckNtQjtBYjJyRDNCOztBYW5wRE07RUFDRSx5QkF4Q2lCO0FiNnJEekI7O0FhL29ESTtFQUNFLGNBOUNzQjtBYmdzRDVCOztBYS9vREk7RUFDRSxjQXBEcUI7QWJxc0QzQjs7QWE5b0RJO0VBQ0UsY0F2RG1CO0FidXNEekI7O0FheG9ESTtFQUNFLGNBaEVtQjtBYjJzRHpCOztBYXpvRE07O0VBRUUsY0FwRWlCO0FiK3NEekI7O0Fhdm9ESTs7RUFFRSx5QkExRW1CO0FibXREekI7O0Fhcm9ERTtFQUNFLGNBL0VxQjtBYnV0RHpCOztBY2x1REk7RUFDRSwwQkFOVTtBZDJ1RGhCOztBY2x1REk7RUFDRSwwQkFWVTtBZDh1RGhCOztBY2p1REk7RUFDRSxxQ0FaRjtBZCt1REo7O0FjaHVESTtFb0N6QkYsNEdBQUE7RUFDQSx5QkFBQTtFQUNBLDJCQUFBO0FsRDR2REY7O0FtRHR2REk7RUFDRSxxQ0FKRjtBbkQ2dkRKOztBbUR0dkRJO0VEWkYsNEdBQUE7RUFDQSx5QkFBQTtFQUNBLDJCQUFBO0FsRHF3REY7O0FldnZESTtFQUNFLHFDQVRGO0FmbXdESjs7QWV2dkRJO0VBQ0UscUNBWEY7QWZvd0RKOztBZXR2REk7RUFDRSxxQ0FiRjtBZnF3REo7O0FlcHZETTtFQUNFLDBCQWpCaUI7QWZ1d0R6Qjs7QWVudkRNO0VBQ0UsNkJBQUE7QWZxdkRSOztBZ0Jqd0RJO0VBQ0UsMEJBWEY7QWhCK3dESjs7QWdCandESTtFQUNFLDBCQWJGO0FoQmd4REo7O0FnQi92RE07RUFDRSxjQWpCa0I7QWhCa3hEMUI7O0FnQjl2RE07RUFDRSxjQXBCaUI7QWhCb3hEekI7O0FnQjd2RE07RUFDRSxjQXZCZTtBaEJzeER2Qjs7QWdCenZETTtFQUNFLGNBOUJlO0FoQnl4RHZCOztBZ0J0dkRNO0VBQ0UsMEJBM0NpQjtBaEJteUR6Qjs7QWdCcnZETTtFQUNFLDBCQXRDSjtBaEI2eERKOztBb0QzeURJO0VBQ0UsY0FBQTtBcEQ4eUROOztBb0QzeURJO0VBQ0UsY0FBQTtBcEQ2eUROOztBb0QxeURJO0VBQ0UsY0FBQTtBcEQ0eUROOztBbUJoekRFO0VBQ0UsMEJBQUE7QW5CbXpESjs7QW1CaHpERTs7RUFFRSwwQkFBQTtBbkJtekRKOztBbUJoekRFO0VBQ0Usb0JBQUE7QW5CbXpESjs7QXFEdjBERTtFbEN1QkksMEJBQUE7QW5CbXpETjs7QXFEMTBERTtFbEN1QkksMEJBQUE7QW5CbXpETjs7QXFEdDBERTtFbENtQkksMEJBQUE7QW5Cc3pETjs7QXFEcjBERTtFbENlSSwwQkFBQTtBbkJ5ekROOztBcURsMERFO0VsQ1NJLDBCQUFBO0FuQjR6RE47O0FtQnZ5REU7RUFDRSxvQkFBQTtBbkIweURKOztBbUJ2eURFOztFQUVFLG9CQUFBO0FuQjB5REo7O0FtQnZ5REU7RUFDRSxjQUFBO0FuQjB5REo7O0E4QjExREk7RUFDRSwwQkFBQTtBOUI2MUROOztBOEIxMURJO0VBQ0UsMEJBQUE7QTlCNDFETjs7QThCejFESTtFQUNFLDBCQUFBO0E5QjIxRE47O0E4QngxREk7RUFDRSx5QkFBQTtFQUNBLDBCQUFBO0E5QjAxRE47O0E4Qm4xREk7Ozs7O0VBQ0UsK0JBQUE7QTlCMDFETjs7QThCcjFESTtFQUNFLCtCQUFBO0E5QncxRE47O0FvQnIzREU7RUFFRSxpQkFBQTtBcEJ1M0RKOztBOEM3dERFO0VBWEEsMEhBQUE7QTlDMnVERjs7QW9CdjNERTtFQUNFLHVCQUFBO0VBQ0EsMEJBQUE7QXBCMDNESjs7QW9CdjNETTs7O0VBR0UsMEJBQUE7QXBCeTNEUjs7QW9CcDNERTs7RUFFRSwwQkFBQTtBcEJ1M0RKOztBb0JoM0RJOzs7O0VBQ0UsK0JBQUE7QXBCczNETjs7QXFCbDVERTtFQUNFLGlCQUFBO0FyQnE1REo7O0FxQmw1REU7O0VBRUUsMEJBQUE7QXJCcTVESjs7QXFCbDVERTs7RUFFRSx5Q0FBQTtFQUNBLDJDQUFBO0FyQnE1REo7O0FxQmw1REU7O0VBRUUseUNBQUE7QXJCcTVESjs7QXFCajVESTs7OztFQUlFLGlDQUFBO0FyQm81RE47O0FxQjczREk7RUFDRSxnQkFMSztBckJxNERYOztBc0R0NkRFO0VBQ0UsYUFBQTtBdER5NkRKOztBc0R0NkRFO0VBQ0UseUJBQUE7QXREeTZESjs7QXNEdDZERTtFQUNFLHlCQUFBO0F0RHk2REo7O0FzRHI2REk7RUFDRSxhQUFBO0F0RHc2RE47O0FzRHI2REk7RUFDRSx5QkFBQTtBdER1NkROOztBc0RwNkRJO0VBQ0UseUJBQUE7QXREczZETjs7QXNEajZESTtFQUNFLGFBQUE7QXREbzZETjs7QXNEajZESTtFQUNFLHlCQUFBO0F0RG02RE47O0FzRGg2REk7RUFDRSx5QkFBQTtBdERrNkROOztBdURuOURJO0VBQ0UsZUFBQTtBdkRzOUROOztBdURuOURJO0VBQ0UsZUFBQTtBdkRxOUROOztBdURsOURJO0VBQ0UsZUFBQTtBdkRvOUROOztBc0I3OERFO0VBQ0UsaUNBQUE7QXRCZzlESjs7QXNCcitERTtFQUNFLHFCQUFBO0F0QncrREo7O0FzQnIrREU7O0VBSUUseUJBQUE7QXRCcStESjs7QXNCNytERTtFQUNFLHFCQUFBO0F0QisrREo7O0FzQjUrREU7O0VBSUUseUJBQUE7QXRCNCtESjs7QXNCcC9ERTtFQUNFLHFCQUFBO0F0QnMvREo7O0FzQm4vREU7O0VBSUUseUJBQUE7QXRCbS9ESjs7QXNCbDlETTs7RUFFRSxpQ0FBQTtBdEJvOURSOztBc0JqOURNOztFQUVFLHFDQUFBO0F0Qm05RFI7O0FzQmg5RE07RUFDRSwwQkFBQTtBdEJrOURSOztBc0I1OERJO0VBQ0UsdUJBQUE7QXRCODhETjs7QXVCLy9ERTtFQUNFLDBCQUFBO0F2QmtnRUo7O0F1Qi8vREU7RUFDRSwwQkFBQTtBdkJrZ0VKOztBdUIvL0RFO0VBQ0UsMEJBQUE7QXZCa2dFSjs7QXVCLy9ERTtFQUNFLDBCQUFBO0F2QmtnRUo7O0F1Qi8vREU7RUFDRSxpQkFBQTtBdkJrZ0VKOztBOEMzM0RFO0VBWEEsMEhBQUE7QTlDeTRERjs7QXVCbGdFSTtFQUNFLCtCQUFBO0F2Qm9nRU47O0F1QjkvRE07RUFDRSxjQUFBO0F2QmlnRVI7O0F1QjkvRE07RUFDRSxjQUFBO0F2QmdnRVI7O0F1QjcvRE07RUFDRSxjQUFBO0F2QisvRFI7O0F1QjMvREk7RUFDRSxjQUFBO0F2QjYvRE47O0F1QjEvREk7RUFDRSwwQkFBQTtBdkI0L0ROOztBd0R0aUVFO0VBQ0UseUJBTG1DO0VBTW5DLDBCQUFBO0F4RHlpRUo7O0F3RHRpRUU7RUFDRSx1QkFYd0I7RUFZeEIsMEJBQUE7QXhEeWlFSjs7QXdEdmlFSTtFQUNFLHVCQWIyQjtBeERzakVqQzs7QXdEdGlFSTtFVjZIRiw2SEFBQTtBOUM0NkRGOztBd0RsaUVFO0VBQ0UsMkNBdkJtQjtBeEQ0akV2Qjs7QXdEbmlFSTtFQUNFLDBDQTFCaUI7RUEyQmpCLGtCQUFBO0F4RHFpRU47O0F3RGppRUU7RUFDRSwwQ0FoQ21CO0VBaUNuQixrQkFBQTtBeERvaUVKOztBd0RsaUVJO0VBQ0UsaUJBQUE7RUFDQSwyQ0FyQ2lCO0F4RHlrRXZCOztBd0RoaUVFO0VBUUksb0NBQUE7QXhENGhFTjs7QXdCcmxFSTtFQUNFLHlCQUFBO0F4QndsRU47O0F3QnJsRUk7RUFHRSwwQ0FBQTtBeEJxbEVOOztBd0JsbEVJO0VBR0UseUJBQUE7QXhCa2xFTjs7QXdCL2xFSTtFQUNFLHlCQUFBO0F4QmltRU47O0F3QjlsRUk7RUFHRSx5Q0FBQTtBeEI4bEVOOztBd0IzbEVJO0VBR0UseUJBQUE7QXhCMmxFTjs7QXdCeG1FSTtFQUNFLHlCQUFBO0F4QjBtRU47O0F3QnZtRUk7RUFHRSx5Q0FBQTtBeEJ1bUVOOztBd0JwbUVJO0VBR0UseUJBQUE7QXhCb21FTjs7QXdCL2pFSTtFQUdFLHVCQWhCcUI7QXhCK2tFM0I7O0F3QjNqRUU7RXNCMkZBLHlIQUFBO0V0QnpGRSx5QkFBQTtBeEI4akVKOztBd0IzakVFO0VBQ0UscUNBM0JvQjtBeEJ5bEV4Qjs7QXlCcGxFRTtFQUNFLHFDQWJxQjtBekJvbUV6Qjs7QXlCbm9FRTs7O0VBR0UseUJBQUE7QXpCc29FSjs7QXlCbm9FRTtFQUNFLFlBQUE7QXpCcW9FSjs7QXlCbG9FRTtFQUdFLHdDQURRO0F6Qm1vRVo7O0F5Qi9vRUU7OztFQUdFLHlCQUFBO0F6QmlwRUo7O0F5QjlvRUU7RUFDRSwwQkFBQTtBekJncEVKOztBeUI3b0VFO0VBR0UseUNBRFE7QXpCOG9FWjs7QXlCMXBFRTs7O0VBR0UseUJBQUE7QXpCNHBFSjs7QXlCenBFRTtFQUNFLFlBQUE7QXpCMnBFSjs7QXlCeHBFRTtFQUdFLHdDQURRO0F6QnlwRVo7O0F5QnRtRUk7O0VBQ0UscUNBaEMyQjtBekIwb0VqQzs7QXlCcm1FSTs7O0VBR0UscUNBdkN3QjtBekIrb0U5Qjs7QXlCcG1FTTtFQUNFLHFDQTVDc0I7QXpCa3BFOUI7O0F5QmhtRUk7RUFHRSxxQ0FEUTtBekJrbUVkOztBeUJ2bEVNOztFQUVFLHFDQS9ESjtBekJ3cEVKOztBeUJybEVROztFQUVFLHFDQW5FTjtBekIwcEVKOztBeUJqbEVNO0VBQ0UsaUNBaEZpQjtFQWlGakIsNkJBQUE7QXpCbWxFUjs7QXlCOWtFUTtFQUNFLGlDQXRGdUI7QXpCc3FFakM7O0F5QjdrRVE7RUFDRSxpQ0F6Rm9CO0F6QndxRTlCOztBeUJ6a0VFO0VBQ0UsZ0NBekZBO0F6QnFxRUo7O0F5Qm5rRUU7RUFDRSw2SEFBQTtFQUlBLG1JQUFBO0F6Qm1rRUo7O0F5QnpqRUU7RUFDRSw4SEFBQTtBekI0akVKOztBMEI1c0VJO0VBSUUscUNBQUE7QTFCNHNFTjs7QTBCenNFSTtFQUNFLGVBQUE7QTFCMnNFTjs7QTBCcnNFSTtFQUNFO0lBQ0UsZ0JBQUE7RTFCdXNFTjtBQUNGOztBMEJwc0VJOztFQUlFLDBCQUFBO0ExQm9zRU47O0EwQmpzRUk7RUFHRSxxQ0FBQTtFQUNBLFlBQUE7QTFCaXNFTjs7QTBCOXJFSTs7O0VBR0UseUJBQUE7RUFDQSxZQUFBO0ExQmdzRU47O0EwQjVyRU07RUFDRSwwQkFBQTtBMUI4ckVSOztBMEIzckVNOzs7RUFHRSx5QkFBQTtFQUNBLDBCQUFBO0ExQjZyRVI7O0EwQnhyRU07RUFDRSxZQUFBO0ExQjByRVI7O0EwQnZyRU07OztFQUdFLHlCQUFBO0VBQ0EsWUFBQTtBMUJ5ckVSOztBMEJyckVJO0VBQ0UsNkJBQUE7RUFDQSxjQUFBO0ExQnVyRU47O0EwQnByRUk7RUFDRSwwQkFBQTtBMUJzckVOOztBMEJuckVJO0VBQ0UsY0FBQTtBMUJxckVOOztBMEJqckVFO0VBQ0UsdUJBQUE7QTFCb3JFSjs7QTBCanJFRTtFQUNFLHNDQUFBO0ExQm9yRUo7O0EwQmpyRUU7OztFQUdFLHFDQUFBO0ExQm9yRUo7O0EwQjNvRUk7RUFDRSxZQU5LO0ExQm9wRVg7O0EwQjNvRUk7O0VBRUUsa0JBQUE7QTFCOG9FTjs7QTBCem9FSTtFQUNFLFVBQUE7RUFDQSxhQUFBO0ExQjRvRU47O0EwQnZvRU07RUFDRSxTQUFBO0ExQjBvRVI7O0EwQnJvRUk7RUFDRSxTQUFBO0ExQndvRU47O0F5RDd5RUU7RUFZSSxjQUFBO0F6RHF5RU47O0EyQjd5RUU7O0VBRUUsNENBSmM7QTNCb3pFbEI7O0EyQjV5RUk7O0VBRUUseUNBVlk7RUFXWixtQkFBQTtBM0IreUVOOztBMkIzeUVFO0VBQ0UsMEJBQUE7QTNCOHlFSjs7QTJCNXlFSTtFQUNFLDBCQUFBO0EzQjh5RU47O0EyQjF5RUU7RUFDRSxpQ0FBQTtBM0I2eUVKOztBMkIxeUVFO0VBQ0UsaUNBQUE7QTNCNnlFSjs7QTJCenlFRTs7RUFFRSxtQkFBQTtFQUNBLGdCQUFBO0EzQjR5RUo7O0EyQjl2RU07Ozs7O0VBQ0UsMENBQUE7QTNCcXdFUjs7QTJCaHhFRTtFQUNFLHlCQUFBO0EzQmt4RUo7O0EyQm54RUU7RUFDRSx1QkFBQTtBM0JxeEVKOztBMkI1d0VNOzs7OztFQUNFLDBDQUFBO0EzQmt4RVI7O0EyQjd4RUU7RUFDRSx5QkFBQTtBM0IreEVKOztBMkJoeUVFO0VBQ0UscUNBQUE7QTNCa3lFSjs7QTJCenhFTTs7Ozs7RUFDRSwwQ0FBQTtBM0IreEVSOztBMkIxeUVFO0VBQ0UseUJBQUE7QTNCNHlFSjs7QTJCN3lFRTtFQUNFLHVCQUFBO0EzQit5RUo7O0EyQnR5RU07Ozs7O0VBQ0UsMENBQUE7QTNCNHlFUjs7QTJCanlFRTtFQUNFLHlCQUFBO0EzQm15RUo7O0EyQi94RUU7RUFDRSxZQUFBO0EzQml5RUo7O0EyQi94RUk7RUFDRSwrQkFBQTtBM0JpeUVOOztBMkI1eEVFOzs7Ozs7O0VBSUUsbUJBQUE7QTNCaXlFSjs7QTJCOXhFRTs7O0VBR0UsbUJBQUE7RUFDQSxZQUFBO0EzQmd5RUo7O0EyQjN4RUU7Ozs7O0VBSUUsdUJBQUE7RUFDQSxhQUFBO0EzQjh4RUo7O0EyQjcwRU07Ozs7O0VBQ0UsMENBQUE7QTNCbTFFUjs7QTJCeDBFRTtFQUNFLHlCQUFBO0EzQjAwRUo7O0EyQnQwRUU7RUFDRSwwQkFBQTtBM0J3MEVKOztBMkJ0MEVJO0VBQ0UseUJBQUE7QTNCdzBFTjs7QTJCbjBFRTs7Ozs7OztFQUlFLGlDQUFBO0EzQncwRUo7O0EyQnIwRUU7OztFQUdFLG1CQUFBO0VBQ0EsWUFBQTtBM0J1MEVKOztBMkJsMEVFOzs7OztFQUlFLHVCQUFBO0VBQ0EsYUFBQTtBM0JxMEVKOztBMkJwM0VNOzs7OztFQUNFLDBDQUFBO0EzQjAzRVI7O0EyQi8yRUU7RUFDRSx5QkFBQTtBM0JpM0VKOztBMkI3MkVFO0VBQ0UsWUFBQTtBM0IrMkVKOztBMkI3MkVJO0VBQ0UsK0JBQUE7QTNCKzJFTjs7QTJCMTJFRTs7Ozs7OztFQUlFLG1CQUFBO0EzQisyRUo7O0EyQjUyRUU7OztFQUdFLG1CQUFBO0VBQ0EsWUFBQTtBM0I4MkVKOztBMkJ6MkVFOzs7OztFQUlFLHVCQUFBO0VBQ0EsYUFBQTtBM0I0MkVKOztBNEJ0OEVFO0VBQ0Usc0JBQUE7RUFDQSwwQkFBQTtBNUJ5OEVKOztBNEJ2OEVJO0VBcENGLG1CQUFBO0VBQ0EsWUFBQTtBNUI4K0VGOztBNEJ2OEVJO0VBeENGLG1CQUFBO0VBQ0EsMEJBQUE7QTVCay9FRjs7QTRCdjhFSTtFQTVDRixtQkFBQTtFQUNBLFlBQUE7QTVCcy9FRjs7QTRCbC9FRTs7O0VBR0UsOEJBQUE7QTVCby9FSjs7QTRCai9FRTs7Ozs7RUFLRSxjQUFBO0E1Qm0vRUo7O0E0QmgvRUU7RUFDRSx5QkFBQTtBNUJrL0VKOztBNEIvZ0ZFO0VBQ0UsZ0JBNkVlO0E1QnE4RW5COztBNEJoaEZFO0VBQ0UsWUEwRWU7QTVCeThFbkI7O0E0Qjc3RUk7RUExRkY7SUFDRSxnQkErRWM7RTVCNDhFaEI7O0U0QnpoRkE7SUFDRSxZQTRFYztFNUJnOUVoQjtBQUNGOztBNkJ4aEZFO0VBQ0UsaUNBQUE7QTdCMGhGSjs7QWtDamlGRTtFQUNFLGlCQUFBO0FsQ29pRko7O0FrQ2ppRkU7O0VBRUUsMEJBQUE7QWxDb2lGSjs7QWtDNWdGSTtFQUNFLGdCQUxLO0FsQ29oRlg7O0FpQzlpRkU7RUFHRSwrQkFBQTtFQUNBLG1CQUFBO0VhNklGLDJIQUFBO0E5Q202RUY7O0FpQzNpRkU7RUFDRSxjQUFBO0FqQzhpRko7O0F5Qzk5RUE7RUFDSSx3QkFBQTtBekNpK0VKOztBeUM5OUVBO0VBQ0ksc0JBQUE7QXpDaStFSjs7QXlDOTlFQTtFQUNJLDBCQUFBO0F6Q2krRUo7O0F5Qzk5RUE7RUFDSSx3QkFBQTtBekNpK0VKOztBeUM5OUVBO0VBQ0kscUJBQUE7QXpDaStFSjs7QXlDOTlFQTtFQUNJLGFBQUE7RUFDQSxpQkFBQTtBekNpK0VKOztBeUM5OUVBO0VBQ0ksV0FBQTtFQUNBLFdBQUE7QXpDaStFSjs7QXlDOTlFQTtFQUNJLGFBQUE7RUFDQSxVQUFBO0F6Q2krRUo7O0F5Qzk5RUE7RUFDSSxXQUFBO0VBQ0EsV0FBQTtBekNpK0VKOztBeUM5OUVBO0VBQ0ksVUFBQTtFQUNBLFlBQUE7QXpDaStFSjs7QXlDOTlFQTtFQUNJLGFBQUE7RUFDQSxpQkFBQTtBekNpK0VKOztBeUM5OUVBO0VBQ0ksVUFBQTtFQUNBLFlBQUE7QXpDaStFSjs7QXlDOTlFQTtFQUNJLGNBQUE7QXpDaStFSjs7QXlDOTlFQTtFQUNJLGFBQUE7QXpDaStFSjs7QXlDOTlFQTtFQUNJLHFCQUFBO0VBQ0Esa0NBQUE7VUFBQSwwQkFBQTtFQUNBLDJDQUFBO1VBQUEsbUNBQUE7QXpDaStFSjs7QXlDOTlFQTtFQUNJO0lBQ0ksc0JBQUE7RXpDaStFTjtBQUNGOztBeUNwK0VBO0VBQ0k7SUFDSSxzQkFBQTtFekNpK0VOO0FBQ0Y7O0FBN29GQTtFQUNJLGVBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQ0FBQTtFQUNBLHlCQUFBO0FBK29GSjs7QUE1b0ZBO0VBQ0ksY0FBQTtFQUNBLGVBQUE7QUErb0ZKOztBQTVvRkE7RUFDSSxjQUFBO0FBK29GSjs7QUE1b0ZBO0VBQ0ksYUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUErb0ZKOztBQTNvRkE7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0FBOG9GSjs7QUEzb0ZBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FBOG9GSiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGNvbnRhaW5zIGFsbCBvZiB0aGUgc3R5bGVzIGZvciB0aGUgYmFkZ2Vcbi8vIHJhdGhlciB0aGFuIGp1c3QgdGhlIGNvbG9yL3RoZW1lIGJlY2F1c2Ugb2Zcbi8vIG5vIHN0eWxlIHNoZWV0IHN1cHBvcnQgZm9yIGRpcmVjdGl2ZXMuXG5AdXNlICdzYXNzOmNvbG9yJztcbkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6bWV0YSc7XG5AdXNlICdzYXNzOm1hdGgnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3RoZW1pbmcnO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHknO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHktdXRpbHMnO1xuQHVzZSAnLi4vLi4vY2RrL2ExMXknO1xuXG4kZm9udC1zaXplOiAxMnB4O1xuJGZvbnQtd2VpZ2h0OiA2MDA7XG4kZGVmYXVsdC1zaXplOiAyMnB4ICFkZWZhdWx0O1xuJHNtYWxsLXNpemU6ICRkZWZhdWx0LXNpemUgLSA2O1xuJGxhcmdlLXNpemU6ICRkZWZhdWx0LXNpemUgKyA2O1xuJF9iYWRnZS1zdHJ1Y3R1cmUtZW1pdHRlZDogZmFsc2UgIWRlZmF1bHQ7XG5cbi8vIE1peGluIGZvciBidWlsZGluZyBvZmZzZXQgZ2l2ZW4gZGlmZmVyZW50IHNpemVzXG5AbWl4aW4gX2JhZGdlLXNpemUoJHNpemUpIHtcbiAgLy8gVGhpcyBtaXhpbiBpc24ndCB1c2VkIGluIHRoZSBjb250ZXh0IG9mIGEgdGhlbWUgc28gd2UgY2FuIGRpc2FibGUgdGhlIGFtcGVyc2FuZCBjaGVjay5cbiAgLy8gc3R5bGVsaW50LWRpc2FibGUgbWF0ZXJpYWwvbm8tYW1wZXJzYW5kLWJleW9uZC1zZWxlY3Rvci1zdGFydFxuICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgIHdpZHRoOiAkc2l6ZTtcbiAgICBoZWlnaHQ6ICRzaXplO1xuICAgIGxpbmUtaGVpZ2h0OiAkc2l6ZTtcbiAgfVxuXG4gICYubWF0LWJhZGdlLWFib3ZlIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgdG9wOiBtYXRoLmRpdigtJHNpemUsIDIpO1xuICAgIH1cbiAgfVxuXG4gICYubWF0LWJhZGdlLWJlbG93IHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgYm90dG9tOiBtYXRoLmRpdigtJHNpemUsIDIpO1xuICAgIH1cbiAgfVxuXG4gICYubWF0LWJhZGdlLWJlZm9yZSB7XG4gICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgIGxlZnQ6IC0kc2l6ZTtcbiAgICB9XG4gIH1cblxuICBbZGlyPSdydGwnXSAmLm1hdC1iYWRnZS1iZWZvcmUge1xuICAgIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgICBsZWZ0OiBhdXRvO1xuICAgICAgcmlnaHQ6IC0kc2l6ZTtcbiAgICB9XG4gIH1cblxuICAmLm1hdC1iYWRnZS1hZnRlciB7XG4gICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgIHJpZ2h0OiAtJHNpemU7XG4gICAgfVxuICB9XG5cbiAgW2Rpcj0ncnRsJ10gJi5tYXQtYmFkZ2UtYWZ0ZXIge1xuICAgIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgICByaWdodDogYXV0bztcbiAgICAgIGxlZnQ6IC0kc2l6ZTtcbiAgICB9XG4gIH1cblxuICAmLm1hdC1iYWRnZS1vdmVybGFwIHtcbiAgICAmLm1hdC1iYWRnZS1iZWZvcmUge1xuICAgICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgICAgbGVmdDogbWF0aC5kaXYoLSRzaXplLCAyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBbZGlyPSdydGwnXSAmLm1hdC1iYWRnZS1iZWZvcmUge1xuICAgICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgICAgbGVmdDogYXV0bztcbiAgICAgICAgcmlnaHQ6IG1hdGguZGl2KC0kc2l6ZSwgMik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5tYXQtYmFkZ2UtYWZ0ZXIge1xuICAgICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgICAgcmlnaHQ6IG1hdGguZGl2KC0kc2l6ZSwgMik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgW2Rpcj0ncnRsJ10gJi5tYXQtYmFkZ2UtYWZ0ZXIge1xuICAgICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgICAgcmlnaHQ6IGF1dG87XG4gICAgICAgIGxlZnQ6IG1hdGguZGl2KC0kc2l6ZSwgMik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIHN0eWxlbGludC1lbmFibGVcbn1cblxuLy8gU3RydWN0dXJhbCBzdHlsZXMgZm9yIHRoZSBiYWRnZS4gVGhleSBoYXZlIHRvIGJlIGluY2x1ZGVkIGFzIGEgcGFydCBvZiB0aGUgdGhlbWUsXG4vLyBiZWNhdXNlIHRoZSBiYWRnZSBpcyBhIGRpcmVjdGl2ZSBhbmQgd2UgaGF2ZSBubyBvdGhlciB3YXkgb2YgYXR0YWNoaW5nIHN0eWxlcyB0byBpdC5cbkBtaXhpbiBfYmFkZ2Utc3RydWN0dXJlIHtcbiAgLm1hdC1iYWRnZSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgLy8gVGhlIGJhZGdlIHNob3VsZCBtYWtlIHN1cmUgaXRzIGhvc3QgaXMgb3ZlcmZsb3cgdmlzaWJsZSBzbyB0aGF0IHRoZSBiYWRnZSBjb250ZW50XG4gIC8vIGNhbiBiZSByZW5kZXJlZCBvdXRzaWRlIG9mIHRoZSBlbGVtZW50LiBTb21lIGNvbXBvbmVudHMgc3VjaCBhcyA8bWF0LWljb24+IGV4cGxpY2l0bHlcbiAgLy8gc3R5bGUgYG92ZXJmbG93OiBoaWRkZW5gIHNvIHRoaXMgcmVxdWlyZXMgZXh0cmEgc3BlY2lmaWNpdHkgc28gdGhhdCBpdCBkb2VzIG5vdFxuICAvLyBkZXBlbmQgb24gc3R5bGUgbG9hZCBvcmRlci5cbiAgLm1hdC1iYWRnZS5tYXQtYmFkZ2Uge1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICB9XG5cbiAgLm1hdC1iYWRnZS1oaWRkZW4ge1xuICAgIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyMDBtcyBlYXNlLWluLW91dDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNik7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgLm5nLWFuaW1hdGUtZGlzYWJsZWQgLm1hdC1iYWRnZS1jb250ZW50LFxuICAubWF0LWJhZGdlLWNvbnRlbnQuX21hdC1hbmltYXRpb24tbm9vcGFibGUge1xuICAgIHRyYW5zaXRpb246IG5vbmU7XG4gIH1cblxuICAvLyBUaGUgYWN0aXZlIGNsYXNzIGlzIGFkZGVkIGFmdGVyIHRoZSBlbGVtZW50IGlzIGFkZGVkXG4gIC8vIHNvIGl0IGNhbiBhbmltYXRlIHNjYWxlIHRvIGRlZmF1bHRcbiAgLm1hdC1iYWRnZS1jb250ZW50Lm1hdC1iYWRnZS1hY3RpdmUge1xuICAgIC8vIFNjYWxlIHRvIGBub25lYCBpbnN0ZWFkIG9mIGAxYCB0byBhdm9pZCBibHVycnkgdGV4dCBpbiBzb21lIGJyb3dzZXJzLlxuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgfVxuXG4gIC5tYXQtYmFkZ2Utc21hbGwge1xuICAgIEBpbmNsdWRlIF9iYWRnZS1zaXplKCRzbWFsbC1zaXplKTtcbiAgfVxuXG4gIC5tYXQtYmFkZ2UtbWVkaXVtIHtcbiAgICBAaW5jbHVkZSBfYmFkZ2Utc2l6ZSgkZGVmYXVsdC1zaXplKTtcbiAgfVxuXG4gIC5tYXQtYmFkZ2UtbGFyZ2Uge1xuICAgIEBpbmNsdWRlIF9iYWRnZS1zaXplKCRsYXJnZS1zaXplKTtcbiAgfVxufVxuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRhY2NlbnQ6IG1hcC5nZXQoJGNvbmZpZywgYWNjZW50KTtcbiAgJHdhcm46IG1hcC5nZXQoJGNvbmZpZywgd2Fybik7XG4gICRwcmltYXJ5OiBtYXAuZ2V0KCRjb25maWcsIHByaW1hcnkpO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwcmltYXJ5LCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICBiYWNrZ3JvdW5kOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHByaW1hcnkpO1xuXG4gICAgQGluY2x1ZGUgYTExeS5oaWdoLWNvbnRyYXN0KGFjdGl2ZSwgb2ZmKSB7XG4gICAgICBvdXRsaW5lOiBzb2xpZCAxcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYmFkZ2UtYWNjZW50IHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRhY2NlbnQpO1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYWNjZW50LCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJhZGdlLXdhcm4ge1xuICAgIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCR3YXJuLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkd2Fybik7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1iYWRnZS1kaXNhYmxlZCB7XG4gICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgICRhcHAtYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCAnYmFja2dyb3VuZCcpO1xuICAgICAgJGJhZGdlLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpc2FibGVkLWJ1dHRvbik7XG5cbiAgICAgIC8vIFRoZSBkaXNhYmxlZCBjb2xvciB1c3VhbGx5IGhhcyBzb21lIGtpbmQgb2Ygb3BhY2l0eSwgYnV0IGJlY2F1c2UgdGhlIGJhZGdlIGlzIG92ZXJsYXllZFxuICAgICAgLy8gb24gdG9wIG9mIHNvbWV0aGluZyBlbHNlLCBpdCB3b24ndCBsb29rIGdvb2QgaWYgaXQncyBvcGFxdWUuIElmIGl0IGlzIGEgY29sb3IgKnR5cGUqLFxuICAgICAgLy8gd2UgY29udmVydCBpdCBpbnRvIGEgc29saWQgY29sb3IgYnkgdGFraW5nIHRoZSBvcGFjaXR5IGZyb20gdGhlIHJnYmEgdmFsdWUgYW5kIHVzaW5nXG4gICAgICAvLyB0aGUgdmFsdWUgdG8gZGV0ZXJtaW5lIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBiYWNrZ3JvdW5kIHRvIHB1dCBpbnRvIGZvcmVncm91bmQgd2hlblxuICAgICAgLy8gbWl4aW5nIHRoZSBjb2xvcnMgdG9nZXRoZXIuXG4gICAgICBAaWYgKG1ldGEudHlwZS1vZigkYmFkZ2UtY29sb3IpID09IGNvbG9yIGFuZCBtZXRhLnR5cGUtb2YoJGFwcC1iYWNrZ3JvdW5kKSA9PSBjb2xvcikge1xuICAgICAgICAkYmFkZ2Utb3BhY2l0eTogb3BhY2l0eSgkYmFkZ2UtY29sb3IpO1xuICAgICAgICBiYWNrZ3JvdW5kOiBjb2xvci5taXgoJGFwcC1iYWNrZ3JvdW5kLCByZ2JhKCRiYWRnZS1jb2xvciwgMSksICgxIC0gJGJhZGdlLW9wYWNpdHkpICogMTAwJSk7XG4gICAgICB9XG4gICAgICBAZWxzZSB7XG4gICAgICAgIGJhY2tncm91bmQ6ICRiYWRnZS1jb2xvcjtcbiAgICAgIH1cblxuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGlzYWJsZWQtdGV4dCk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiB0eXBvZ3JhcGh5KCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdHlwb2dyYXBoeS5wcml2YXRlLXR5cG9ncmFwaHktdG8tMjAxNC1jb25maWcoXG4gICAgICB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKSk7XG4gIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgZm9udC13ZWlnaHQ6ICRmb250LXdlaWdodDtcbiAgICBmb250LXNpemU6ICRmb250LXNpemU7XG4gICAgZm9udC1mYW1pbHk6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LWJhZGdlLXNtYWxsIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgLy8gU2V0IHRoZSBmb250IHNpemUgdG8gNzUlIG9mIHRoZSBvcmlnaW5hbC5cbiAgICBmb250LXNpemU6ICRmb250LXNpemUgKiAwLjc1O1xuICB9XG5cbiAgLm1hdC1iYWRnZS1sYXJnZSAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZSAqIDI7XG4gIH1cbn1cblxuQG1peGluIF9kZW5zaXR5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1iYWRnZScpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgLy8gVHJ5IHRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHRpbWVzIHRoYXQgdGhlIHN0cnVjdHVyYWwgc3R5bGVzIGFyZSBlbWl0dGVkLlxuICAgIEBpZiBub3QgJF9iYWRnZS1zdHJ1Y3R1cmUtZW1pdHRlZCB7XG4gICAgICBAaW5jbHVkZSBfYmFkZ2Utc3RydWN0dXJlO1xuXG4gICAgICAvLyBPbmx5IGZsaXAgdGhlIGZsYWcgaWYgdGhlIG1peGluIGlzIGluY2x1ZGVkIGF0IHRoZSB0b3AgbGV2ZWwuIE90aGVyd2lzZSB0aGUgZmlyc3RcbiAgICAgIC8vIGluY2x1c2lvbiBtaWdodCBiZSBpbnNpZGUgb2YgYSB0aGVtZSBjbGFzcyB3aGljaCB3aWxsIGV4Y2x1ZGUgdGhlIHN0cnVjdHVyYWwgc3R5bGVzXG4gICAgICAvLyBmcm9tIGFsbCBvdGhlciB0aGVtZXMuXG4gICAgICBAaWYgbm90ICYge1xuICAgICAgICAkX2JhZGdlLXN0cnVjdHVyZS1lbWl0dGVkOiB0cnVlICFnbG9iYWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAaW1wb3J0IFwiLi4vbmV0Z2lmLXRoZW1lXCI7XG5cbi5hcHAtY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAwIDE2cHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgI0RERERERDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXAtZ2V0KCRuZXRncmlmLWJsdWUsIDYwMCk7O1xufVxuXG4uY2FudmFzIHtcbiAgICB3aWR0aDogMTAwMDBweDtcbiAgICBoZWlnaHQ6IDEwMDAwcHg7XG59XG5cbi5pbm5lciB7XG4gICAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5vdXRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG5cbn1cblxuI3NvdXJjZS1idXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogMTVweDtcbiAgICB0b3A6IDE1cHg7XG59XG5cbiNuZXRncmlmLWljb24ge1xuICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICBoZWlnaHQ6IDUwcHggO1xuICAgIHdpZHRoOiA1MHB4O1xufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAndHlwb2dyYXBoeS11dGlscyc7XG5AdXNlICcuLi90aGVtaW5nL3RoZW1pbmcnO1xuXG4vLy8gRGVmaW5lcyBhIHR5cG9ncmFwaHkgbGV2ZWwgZnJvbSB0aGUgTWF0ZXJpYWwgRGVzaWduIHNwZWMuXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICRmb250LXNpemUgVGhlIGZvbnQtc2l6ZSBmb3IgdGhpcyBsZXZlbC5cbi8vLyBAcGFyYW0ge1N0cmluZyB8IE51bWJlcn0gJGxpbmUtaGVpZ2h0IFRoZSBsaW5lLWhlaWdodCBmb3IgdGhpcyBsZXZlbC5cbi8vLyBAcGFyYW0ge1N0cmluZyB8IE51bWJlcn0gJGZvbnQtd2VpZ2h0IFRoZSBmb250LXdlaWdodCBmb3IgdGhpcyBsZXZlbC5cbi8vLyBAcGFyYW0ge1N0cmluZ30gJGZvbnQtZmFtaWx5IFRoZSBmb250LWZhbWlseSBmb3IgdGhpcyBsZXZlbC5cbi8vLyBAcGFyYW0ge1N0cmluZ30gJGxldHRlci1zcGFjaW5nIFRoZSBsZXR0ZXItc3BhY2luZyBmb3IgdGhpcyBsZXZlbC5cbi8vLyBAcmV0dXJucyB7TWFwfSBBIG1hcCByZXByZXNlbnRpbmcgdGhlIGRlZmluaXRpb24gb2YgdGhpcyB0eXBvZ3JhcGhpYyBsZXZlbC5cbkBmdW5jdGlvbiBkZWZpbmUtdHlwb2dyYXBoeS1sZXZlbChcbiAgJGZvbnQtc2l6ZSxcbiAgJGxpbmUtaGVpZ2h0OiAkZm9udC1zaXplLFxuICAkZm9udC13ZWlnaHQ6IDQwMCxcbiAgJGZvbnQtZmFtaWx5OiBudWxsLFxuICAkbGV0dGVyLXNwYWNpbmc6IG5vcm1hbCkge1xuXG4gIEByZXR1cm4gKFxuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZSxcbiAgICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udC13ZWlnaHQsXG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseSxcbiAgICBsZXR0ZXItc3BhY2luZzogJGxldHRlci1zcGFjaW5nXG4gICk7XG59XG5cbi8vLyBEZWZpbmVzIGEgY29sbGVjdGlvbiBvZiB0eXBvZ3JhcGh5IGxldmVscyB0byBjb25maWd1cmUgdHlwb2dyYXBoeSBmb3IgYW4gYXBwbGljYXRpb24uXG4vLy8gQW55IGxldmVsIG5vdCBzcGVjaWZpZWQgZGVmYXVsdHMgdG8gdGhlIHZhbHVlcyBkZWZpbmVkIGluIHRoZSBNYXRlcmlhbCBEZXNpZ24gc3BlY2lmaWNhdGlvbjpcbi8vLyBodHRwczovL21hdGVyaWFsLmlvL2d1aWRlbGluZXMvc3R5bGUvdHlwb2dyYXBoeS5odG1sLlxuLy8vXG4vLy8gTm90ZSB0aGF0IHRoZSBNYXRlcmlhbCBEZXNpZ24gc3BlY2lmaWNhdGlvbiBkb2VzIG5vdCBkZXNjcmliZSBleHBsaWNpdCBsZXR0ZXItc3BhY2luZyB2YWx1ZXMuXG4vLy8gVGhlIHZhbHVlcyBoZXJlIGNvbWUgZnJvbSByZXZlcnNlIGVuZ2luZWVyaW5nIHRoZSBNYXRlcmlhbCBEZXNpZ24gZXhhbXBsZXMuXG4vLy8gQHBhcmFtIHtTdHJpbmd9ICRmb250LWZhbWlseSBEZWZhdWx0IGZvbnQtZmFtaWx5IGZvciBsZXZlbHMgdGhhdCBkb24ndCBzcGVjaWZ5IGZvbnQtZmFtaWx5LlxuLy8vIEBwYXJhbSB7TWFwfSAkZGlzcGxheS00IENvbmZpZ3VyYXRpb24gZm9yIHRoZSBcImRpc3BsYXktNFwiIHR5cG9ncmFwaGljIGxldmVsLlxuLy8vIEBwYXJhbSB7TWFwfSAkZGlzcGxheS0zIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBcImRpc3BsYXktM1wiIHR5cG9ncmFwaGljIGxldmVsLlxuLy8vIEBwYXJhbSB7TWFwfSAkZGlzcGxheS0yIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBcImRpc3BsYXktMlwiIHR5cG9ncmFwaGljIGxldmVsLlxuLy8vIEBwYXJhbSB7TWFwfSAkZGlzcGxheS0xIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBcImRpc3BsYXktMVwiIHR5cG9ncmFwaGljIGxldmVsLlxuLy8vIEBwYXJhbSB7TWFwfSAkaGVhZGxpbmUgQ29uZmlndXJhdGlvbiBmb3IgdGhlIFwiaGVhZGxpbmVcIiB0eXBvZ3JhcGhpYyBsZXZlbC5cbi8vLyBAcGFyYW0ge01hcH0gJHRpdGxlIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBcInRpdGxlXCIgdHlwb2dyYXBoaWMgbGV2ZWwuXG4vLy8gQHBhcmFtIHtNYXB9ICRzdWJoZWFkaW5nLTIgQ29uZmlndXJhdGlvbiBmb3IgdGhlIFwic3ViaGVhZGluZy0yXCIgdHlwb2dyYXBoaWMgbGV2ZWwuXG4vLy8gQHBhcmFtIHtNYXB9ICRzdWJoZWFkaW5nLTEgQ29uZmlndXJhdGlvbiBmb3IgdGhlIFwic3ViaGVhZGluZy0xXCIgdHlwb2dyYXBoaWMgbGV2ZWwuXG4vLy8gQHBhcmFtIHtNYXB9ICRib2R5LTIgQ29uZmlndXJhdGlvbiBmb3IgdGhlIFwiYm9keS0yXCIgdHlwb2dyYXBoaWMgbGV2ZWwuXG4vLy8gQHBhcmFtIHtNYXB9ICRib2R5LTEgQ29uZmlndXJhdGlvbiBmb3IgdGhlIFwiYm9keS0xXCIgdHlwb2dyYXBoaWMgbGV2ZWwuXG4vLy8gQHBhcmFtIHtNYXB9ICRjYXB0aW9uIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBcImNhcHRpb25cIiB0eXBvZ3JhcGhpYyBsZXZlbC5cbi8vLyBAcGFyYW0ge01hcH0gJGJ1dHRvbiBDb25maWd1cmF0aW9uIGZvciB0aGUgXCJidXR0b25cIiB0eXBvZ3JhcGhpYyBsZXZlbC5cbi8vLyBAcGFyYW0ge01hcH0gJGlucHV0IENvbmZpZ3VyYXRpb24gZm9yIHRoZSBcImlucHV0XCIgdHlwb2dyYXBoaWMgbGV2ZWwuXG4vLy8gQHJldHVybnMge01hcH0gQSB0eXBvZ3JhcGh5IGNvbmZpZyBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuQGZ1bmN0aW9uIGRlZmluZS10eXBvZ3JhcGh5LWNvbmZpZyhcbiAgJGZvbnQtZmFtaWx5OiAgICdSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZicsXG4gICRkaXNwbGF5LTQ6ICAgICBkZWZpbmUtdHlwb2dyYXBoeS1sZXZlbCgxMTJweCwgMTEycHgsIDMwMCwgJGxldHRlci1zcGFjaW5nOiAtMC4wNWVtKSxcbiAgJGRpc3BsYXktMzogICAgIGRlZmluZS10eXBvZ3JhcGh5LWxldmVsKDU2cHgsIDU2cHgsIDQwMCwgJGxldHRlci1zcGFjaW5nOiAtMC4wMmVtKSxcbiAgJGRpc3BsYXktMjogICAgIGRlZmluZS10eXBvZ3JhcGh5LWxldmVsKDQ1cHgsIDQ4cHgsIDQwMCwgJGxldHRlci1zcGFjaW5nOiAtMC4wMDVlbSksXG4gICRkaXNwbGF5LTE6ICAgICBkZWZpbmUtdHlwb2dyYXBoeS1sZXZlbCgzNHB4LCA0MHB4LCA0MDApLFxuICAkaGVhZGxpbmU6ICAgICAgZGVmaW5lLXR5cG9ncmFwaHktbGV2ZWwoMjRweCwgMzJweCwgNDAwKSxcbiAgJHRpdGxlOiAgICAgICAgIGRlZmluZS10eXBvZ3JhcGh5LWxldmVsKDIwcHgsIDMycHgsIDUwMCksXG4gICRzdWJoZWFkaW5nLTI6ICBkZWZpbmUtdHlwb2dyYXBoeS1sZXZlbCgxNnB4LCAyOHB4LCA0MDApLFxuICAkc3ViaGVhZGluZy0xOiAgZGVmaW5lLXR5cG9ncmFwaHktbGV2ZWwoMTVweCwgMjRweCwgNDAwKSxcbiAgJGJvZHktMjogICAgICAgIGRlZmluZS10eXBvZ3JhcGh5LWxldmVsKDE0cHgsIDI0cHgsIDUwMCksXG4gICRib2R5LTE6ICAgICAgICBkZWZpbmUtdHlwb2dyYXBoeS1sZXZlbCgxNHB4LCAyMHB4LCA0MDApLFxuICAkY2FwdGlvbjogICAgICAgZGVmaW5lLXR5cG9ncmFwaHktbGV2ZWwoMTJweCwgMjBweCwgNDAwKSxcbiAgJGJ1dHRvbjogICAgICAgIGRlZmluZS10eXBvZ3JhcGh5LWxldmVsKDE0cHgsIDE0cHgsIDUwMCksXG4gIC8vIExpbmUtaGVpZ2h0IG11c3QgYmUgdW5pdC1sZXNzIGZyYWN0aW9uIG9mIHRoZSBmb250LXNpemUuXG4gICRpbnB1dDogICAgICAgICBkZWZpbmUtdHlwb2dyYXBoeS1sZXZlbChpbmhlcml0LCAxLjEyNSwgNDAwKVxuKSB7XG5cbiAgLy8gRGVjbGFyZSBhbiBpbml0aWFsIG1hcCB3aXRoIGFsbCBvZiB0aGUgbGV2ZWxzLlxuICAkY29uZmlnOiAoXG4gICAgZGlzcGxheS00OiAgICAgICRkaXNwbGF5LTQsXG4gICAgZGlzcGxheS0zOiAgICAgICRkaXNwbGF5LTMsXG4gICAgZGlzcGxheS0yOiAgICAgICRkaXNwbGF5LTIsXG4gICAgZGlzcGxheS0xOiAgICAgICRkaXNwbGF5LTEsXG4gICAgaGVhZGxpbmU6ICAgICAgICRoZWFkbGluZSxcbiAgICB0aXRsZTogICAgICAgICAgJHRpdGxlLFxuICAgIHN1YmhlYWRpbmctMjogICAkc3ViaGVhZGluZy0yLFxuICAgIHN1YmhlYWRpbmctMTogICAkc3ViaGVhZGluZy0xLFxuICAgIGJvZHktMjogICAgICAgICAkYm9keS0yLFxuICAgIGJvZHktMTogICAgICAgICAkYm9keS0xLFxuICAgIGNhcHRpb246ICAgICAgICAkY2FwdGlvbixcbiAgICBidXR0b246ICAgICAgICAgJGJ1dHRvbixcbiAgICBpbnB1dDogICAgICAgICAgJGlucHV0LFxuICApO1xuXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgbGV2ZWxzIGFuZCBzZXQgdGhlIGBmb250LWZhbWlseWAgb2YgdGhlIG9uZXMgdGhhdCBkb24ndCBoYXZlIG9uZSB0byB0aGUgYmFzZS5cbiAgLy8gTm90ZSB0aGF0IFNhc3MgY2FuJ3QgbW9kaWZ5IG1hcHMgaW4gcGxhY2UsIHdoaWNoIG1lYW5zIHRoYXQgd2UgbmVlZCB0byBtZXJnZSBhbmQgcmUtYXNzaWduLlxuICBAZWFjaCAka2V5LCAkbGV2ZWwgaW4gJGNvbmZpZyB7XG4gICAgQGlmIG1hcC5nZXQoJGxldmVsLCBmb250LWZhbWlseSkgPT0gbnVsbCB7XG4gICAgICAkbmV3LWxldmVsOiBtYXAubWVyZ2UoJGxldmVsLCAoZm9udC1mYW1pbHk6ICRmb250LWZhbWlseSkpO1xuICAgICAgJGNvbmZpZzogbWFwLm1lcmdlKCRjb25maWcsICgka2V5OiAkbmV3LWxldmVsKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHRoZSBiYXNlIGZvbnQgZmFtaWx5IHRvIHRoZSBjb25maWcuXG4gIEByZXR1cm4gbWFwLm1lcmdlKCRjb25maWcsIChmb250LWZhbWlseTogJGZvbnQtZmFtaWx5KSk7XG59XG5cbi8vIFdoZXRoZXIgYSBjb25maWcgaXMgZm9yIHRoZSBNYXRlcmlhbCBEZXNpZ24gMjAxOCB0eXBvZ3JhcGh5IHN5c3RlbS5cbkBmdW5jdGlvbiBwcml2YXRlLXR5cG9ncmFwaHktaXMtMjAxOC1jb25maWcoJGNvbmZpZykge1xuICBAcmV0dXJuIG1hcC5nZXQoJGNvbmZpZywgaGVhZGxpbmUtMSkgIT0gbnVsbDtcbn1cblxuLy8gV2hldGhlciBhIGNvbmZpZyBpcyBmb3IgdGhlIE1hdGVyaWFsIERlc2lnbiAyMDE0IHR5cG9ncmFwaHkgc3lzdGVtLlxuQGZ1bmN0aW9uIHByaXZhdGUtdHlwb2dyYXBoeS1pcy0yMDE0LWNvbmZpZygkY29uZmlnKSB7XG4gIEByZXR1cm4gbWFwLmdldCgkY29uZmlnLCBoZWFkbGluZSkgIT0gbnVsbDtcbn1cblxuLy8gR2l2ZW4gYSBjb25maWcgZm9yIGVpdGhlciB0aGUgMjAxNCBvciAyMDE4IE1hdGVyaWFsIERlc2lnbiB0eXBvZ3JhcGh5IHN5c3RlbSxcbi8vIHByb2R1Y2VzIGEgbm9ybWFsaXplZCB0eXBvZ3JhcGh5IGNvbmZpZyBmb3IgdGhlIDIwMTQgTWF0ZXJpYWwgRGVzaWduIHR5cG9ncmFwaHkgc3lzdGVtLlxuLy8gMjAxNCAtIGh0dHBzOi8vbWF0ZXJpYWwuaW8vYXJjaGl2ZS9ndWlkZWxpbmVzL3N0eWxlL3R5cG9ncmFwaHkuaHRtbCN0eXBvZ3JhcGh5LXN0eWxlc1xuLy8gMjAxOCAtIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL3R5cG9ncmFwaHkvdGhlLXR5cGUtc3lzdGVtLmh0bWwjdHlwZS1zY2FsZVxuLy9cbi8vIENvbXBvbmVudHMgdXNpbmcgdGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgbWlncmF0ZWQgdG8gbm9ybWFsaXplIHRvIHRoZSAyMDE4IHN0eWxlIGNvbmZpZyBpbnN0ZWFkLlxuLy8gTmV3IGNvbXBvbmVudHMgc2hvdWxkIG5vdCB1c2UgdGhpcyBmdW5jdGlvbi5cbkBmdW5jdGlvbiBwcml2YXRlLXR5cG9ncmFwaHktdG8tMjAxNC1jb25maWcoJGNvbmZpZykge1xuICBAaWYgJGNvbmZpZyA9PSBudWxsIHtcbiAgICBAcmV0dXJuIG51bGw7XG4gIH1cbiAgQGlmIG5vdCBwcml2YXRlLXR5cG9ncmFwaHktaXMtMjAxNC1jb25maWcoJGNvbmZpZykge1xuICAgICRhcmdzOiAoXG4gICAgICAgIGRpc3BsYXktNDogbWFwLmdldCgkY29uZmlnLCBoZWFkbGluZS0xKSxcbiAgICAgICAgZGlzcGxheS0zOiBtYXAuZ2V0KCRjb25maWcsIGhlYWRsaW5lLTIpLFxuICAgICAgICBkaXNwbGF5LTI6IG1hcC5nZXQoJGNvbmZpZywgaGVhZGxpbmUtMyksXG4gICAgICAgIGRpc3BsYXktMTogbWFwLmdldCgkY29uZmlnLCBoZWFkbGluZS00KSxcbiAgICAgICAgaGVhZGxpbmU6IG1hcC5nZXQoJGNvbmZpZywgaGVhZGxpbmUtNSksXG4gICAgICAgIHRpdGxlOiBtYXAuZ2V0KCRjb25maWcsIGhlYWRsaW5lLTYpLFxuICAgICAgICBzdWJoZWFkaW5nLTI6IG1hcC5nZXQoJGNvbmZpZywgc3VidGl0bGUtMSksXG4gICAgICAgIHN1YmhlYWRpbmctMTogbWFwLmdldCgkY29uZmlnLCBzdWJ0aXRsZS0yKSxcbiAgICAgICAgYm9keS0yOiBtYXAuZ2V0KCRjb25maWcsIGJvZHktMSksXG4gICAgICAgIGJvZHktMTogbWFwLmdldCgkY29uZmlnLCBib2R5LTIpLFxuICAgICAgICBidXR0b246IG1hcC5nZXQoJGNvbmZpZywgYnV0dG9uKSxcbiAgICAgICAgY2FwdGlvbjogbWFwLmdldCgkY29uZmlnLCBjYXB0aW9uKSxcbiAgICApO1xuICAgICRub24tbnVsbC1hcmdzOiAoKTtcbiAgICBAZWFjaCAka2V5LCAkdmFsdWUgaW4gJGFyZ3Mge1xuICAgICAgQGlmICR2YWx1ZSAhPSBudWxsIHtcbiAgICAgICAgJG5vbi1udWxsLWFyZ3M6IG1hcC5tZXJnZSgkbm9uLW51bGwtYXJncywgKCRrZXk6ICR2YWx1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBAcmV0dXJuIGRlZmluZS10eXBvZ3JhcGh5LWNvbmZpZygkbm9uLW51bGwtYXJncy4uLik7XG4gIH1cbiAgQHJldHVybiAkY29uZmlnO1xufVxuXG4vLyBHaXZlbiBhIGNvbmZpZyBmb3IgZWl0aGVyIHRoZSAyMDE0IG9yIDIwMTggTWF0ZXJpYWwgRGVzaWduIHR5cG9ncmFwaHkgc3lzdGVtLFxuLy8gcHJvZHVjZXMgYSBub3JtYWxpemVkIHR5cG9ncmFwaHkgY29uZmlnIGZvciB0aGUgMjAxOCBNYXRlcmlhbCBEZXNpZ24gdHlwb2dyYXBoeSBzeXN0ZW0uXG4vLyAyMDE0IC0gaHR0cHM6Ly9tYXRlcmlhbC5pby9hcmNoaXZlL2d1aWRlbGluZXMvc3R5bGUvdHlwb2dyYXBoeS5odG1sI3R5cG9ncmFwaHktc3R5bGVzXG4vLyAyMDE4IC0gaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vdHlwb2dyYXBoeS90aGUtdHlwZS1zeXN0ZW0uaHRtbCN0eXBlLXNjYWxlXG5AZnVuY3Rpb24gcHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTgtY29uZmlnKCRjb25maWcpIHtcbiAgQGlmICRjb25maWcgPT0gbnVsbCB7XG4gICAgQHJldHVybiBudWxsO1xuICB9XG4gIEBpZiBub3QgcHJpdmF0ZS10eXBvZ3JhcGh5LWlzLTIwMTgtY29uZmlnKCRjb25maWcpIHtcbiAgICBAcmV0dXJuIChcbiAgICAgICAgaGVhZGxpbmUtMTogbWFwLmdldCgkY29uZmlnLCBkaXNwbGF5LTQpLFxuICAgICAgICBoZWFkbGluZS0yOiBtYXAuZ2V0KCRjb25maWcsIGRpc3BsYXktMyksXG4gICAgICAgIGhlYWRsaW5lLTM6IG1hcC5nZXQoJGNvbmZpZywgZGlzcGxheS0yKSxcbiAgICAgICAgaGVhZGxpbmUtNDogbWFwLmdldCgkY29uZmlnLCBkaXNwbGF5LTEpLFxuICAgICAgICBoZWFkbGluZS01OiBtYXAuZ2V0KCRjb25maWcsIGhlYWRsaW5lKSxcbiAgICAgICAgaGVhZGxpbmUtNjogbWFwLmdldCgkY29uZmlnLCB0aXRsZSksXG4gICAgICAgIHN1YnRpdGxlLTE6IG1hcC5nZXQoJGNvbmZpZywgc3ViaGVhZGluZy0yKSxcblxuICAgICAgICAvLyBUaGVzZSBtYXBwaW5ncyBhcmUgb2RkLCBidXQgYm9keS0yIGluIHRoZSAyMDE0IHN5c3RlbSBhY3R1YWxseSBsb29rcyBjbG9zZXIgdG8gc3VidGl0bGUtMlxuICAgICAgICAvLyBpbiB0aGUgMjAxOCBzeXN0ZW0sIGFuZCBzdWJlYWRpbmctMSBpbiB0aGUgMjAxNCBzeXN0ZW0gbG9va3MgbW9yZSBsaWtlIGJvZHktMSBpbiB0aGUgMjAxOFxuICAgICAgICAvLyBzeXN0ZW0uXG4gICAgICAgIHN1YnRpdGxlLTI6IG1hcC5nZXQoJGNvbmZpZywgYm9keS0yKSxcbiAgICAgICAgYm9keS0xOiBtYXAuZ2V0KCRjb25maWcsIHN1YmhlYWRpbmctMSksXG5cbiAgICAgICAgYm9keS0yOiBtYXAuZ2V0KCRjb25maWcsIGJvZHktMSksXG4gICAgICAgIGJ1dHRvbjogbWFwLmdldCgkY29uZmlnLCBidXR0b24pLFxuICAgICAgICBjYXB0aW9uOiBtYXAuZ2V0KCRjb25maWcsIGNhcHRpb24pLFxuICAgICAgICBvdmVybGluZTogaWYobWFwLmdldCgkY29uZmlnLCBvdmVybGluZSksIG1hcC5nZXQoJGNvbmZpZywgb3ZlcmxpbmUpLFxuICAgICAgICAgICAgZGVmaW5lLXR5cG9ncmFwaHktbGV2ZWwoMTJweCwgMzJweCwgNTAwKVxuICAgICAgICApXG4gICAgKTtcbiAgfVxuICBAcmV0dXJuICRjb25maWc7XG59XG5cbi8vLyBFbWl0cyBiYXNlbGluZSB0eXBvZ3JhcGhpYyBzdHlsZXMgYmFzZWQgb24gYSBnaXZlbiBjb25maWcuXG4vLy8gQHBhcmFtIHtNYXB9ICRjb25maWctb3ItdGhlbWUgQSB0eXBvZ3JhcGh5IGNvbmZpZyBmb3IgYW4gZW50aXJlIHRoZW1lLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkc2VsZWN0b3IgQW5jZXN0b3Igc2VsZWN0b3IgdW5kZXIgd2hpY2ggbmF0aXZlIGVsZW1lbnRzLCBzdWNoIGFzIGgxLCB3aWxsXG4vLy8gICAgIGJlIHN0eWxlZC5cbkBtaXhpbiB0eXBvZ3JhcGh5LWhpZXJhcmNoeSgkY29uZmlnLW9yLXRoZW1lLCAkc2VsZWN0b3I6ICcubWF0LXR5cG9ncmFwaHknKSB7XG4gICRjb25maWc6IHByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyh0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKSk7XG5cbiAgLy8gTm90ZSB0aGF0IGl0IHNlZW1zIHJlZHVuZGFudCB0byBwcmVmaXggdGhlIGNsYXNzIHJ1bGVzIHdpdGggdGhlIGAkc2VsZWN0b3JgLCBob3dldmVyIGl0J3NcbiAgLy8gbmVjZXNzYXJ5IGlmIHdlIHdhbnQgdG8gYWxsb3cgcGVvcGxlIHRvIG92ZXJ3cml0ZSB0aGUgdGFnIHNlbGVjdG9ycy4gVGhpcyBpcyBkdWUgdG9cbiAgLy8gc2VsZWN0b3JzIGxpa2UgYCN7JHNlbGVjdG9yfSBoMWAgYmVpbmcgbW9yZSBzcGVjaWZpYyB0aGFuIG9uZXMgbGlrZSBgLm1hdC10aXRsZWAuXG4gIC5tYXQtaDEsXG4gIC5tYXQtaGVhZGxpbmUsXG4gICN7JHNlbGVjdG9yfSAubWF0LWgxLFxuICAjeyRzZWxlY3Rvcn0gLm1hdC1oZWFkbGluZSxcbiAgI3skc2VsZWN0b3J9IGgxIHtcbiAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5LXV0aWxzLnR5cG9ncmFwaHktbGV2ZWwoJGNvbmZpZywgaGVhZGxpbmUpO1xuICAgIG1hcmdpbjogMCAwIDE2cHg7XG4gIH1cblxuICAubWF0LWgyLFxuICAubWF0LXRpdGxlLFxuICAjeyRzZWxlY3Rvcn0gLm1hdC1oMixcbiAgI3skc2VsZWN0b3J9IC5tYXQtdGl0bGUsXG4gICN7JHNlbGVjdG9yfSBoMiB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy50eXBvZ3JhcGh5LWxldmVsKCRjb25maWcsIHRpdGxlKTtcbiAgICBtYXJnaW46IDAgMCAxNnB4O1xuICB9XG5cbiAgLm1hdC1oMyxcbiAgLm1hdC1zdWJoZWFkaW5nLTIsXG4gICN7JHNlbGVjdG9yfSAubWF0LWgzLFxuICAjeyRzZWxlY3Rvcn0gLm1hdC1zdWJoZWFkaW5nLTIsXG4gICN7JHNlbGVjdG9yfSBoMyB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy50eXBvZ3JhcGh5LWxldmVsKCRjb25maWcsIHN1YmhlYWRpbmctMik7XG4gICAgbWFyZ2luOiAwIDAgMTZweDtcbiAgfVxuXG4gIC5tYXQtaDQsXG4gIC5tYXQtc3ViaGVhZGluZy0xLFxuICAjeyRzZWxlY3Rvcn0gLm1hdC1oNCxcbiAgI3skc2VsZWN0b3J9IC5tYXQtc3ViaGVhZGluZy0xLFxuICAjeyRzZWxlY3Rvcn0gaDQge1xuICAgIEBpbmNsdWRlIHR5cG9ncmFwaHktdXRpbHMudHlwb2dyYXBoeS1sZXZlbCgkY29uZmlnLCBzdWJoZWFkaW5nLTEpO1xuICAgIG1hcmdpbjogMCAwIDE2cHg7XG4gIH1cblxuICAvLyBOb3RlOiB0aGUgc3BlYyBkb2Vzbid0IGhhdmUgYW55dGhpbmcgdGhhdCB3b3VsZCBjb3JyZXNwb25kIHRvIGg1IGFuZCBoNiwgYnV0IHdlIGFkZCB0aGVzZSBmb3JcbiAgLy8gY29uc2lzdGVuY3kuIFRoZSBmb250IHNpemVzIGNvbWUgZnJvbSB0aGUgQ2hyb21lIHVzZXIgYWdlbnQgc3R5bGVzIHdoaWNoIGhhdmUgaDUgYXQgMC44M2VtXG4gIC8vIGFuZCBoNiBhdCAwLjY3ZW0uXG4gIC5tYXQtaDUsXG4gICN7JHNlbGVjdG9yfSAubWF0LWg1LFxuICAjeyRzZWxlY3Rvcn0gaDUge1xuICAgIEBpbmNsdWRlIHR5cG9ncmFwaHktdXRpbHMuZm9udC1zaG9ydGhhbmQoXG4gICAgICAgLy8gY2FsYyBpcyB1c2VkIGhlcmUgdG8gc3VwcG9ydCBjc3MgdmFyaWFibGVzXG4gICAgICBjYWxjKCN7dHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgYm9keS0xKX0gKiAwLjgzKSxcbiAgICAgIHR5cG9ncmFwaHktdXRpbHMuZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKSxcbiAgICAgIHR5cG9ncmFwaHktdXRpbHMubGluZS1oZWlnaHQoJGNvbmZpZywgYm9keS0xKSxcbiAgICAgIHR5cG9ncmFwaHktdXRpbHMuZm9udC1mYW1pbHkoJGNvbmZpZywgYm9keS0xKVxuICAgICk7XG5cbiAgICBtYXJnaW46IDAgMCAxMnB4O1xuICB9XG5cbiAgLm1hdC1oNixcbiAgI3skc2VsZWN0b3J9IC5tYXQtaDYsXG4gICN7JHNlbGVjdG9yfSBoNiB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy5mb250LXNob3J0aGFuZChcbiAgICAgICAvLyBjYWxjIGlzIHVzZWQgaGVyZSB0byBzdXBwb3J0IGNzcyB2YXJpYWJsZXNcbiAgICAgIGNhbGMoI3t0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpfSAqIDAuNjcpLFxuICAgICAgdHlwb2dyYXBoeS11dGlscy5mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTEpLFxuICAgICAgdHlwb2dyYXBoeS11dGlscy5saW5lLWhlaWdodCgkY29uZmlnLCBib2R5LTEpLFxuICAgICAgdHlwb2dyYXBoeS11dGlscy5mb250LWZhbWlseSgkY29uZmlnLCBib2R5LTEpXG4gICAgKTtcblxuICAgIG1hcmdpbjogMCAwIDEycHg7XG4gIH1cblxuICAubWF0LWJvZHktc3Ryb25nLFxuICAubWF0LWJvZHktMixcbiAgI3skc2VsZWN0b3J9IC5tYXQtYm9keS1zdHJvbmcsXG4gICN7JHNlbGVjdG9yfSAubWF0LWJvZHktMiB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy50eXBvZ3JhcGh5LWxldmVsKCRjb25maWcsIGJvZHktMik7XG4gIH1cblxuICAubWF0LWJvZHksXG4gIC5tYXQtYm9keS0xLFxuICAjeyRzZWxlY3Rvcn0gLm1hdC1ib2R5LFxuICAjeyRzZWxlY3Rvcn0gLm1hdC1ib2R5LTEsXG4gICN7JHNlbGVjdG9yfSB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy50eXBvZ3JhcGh5LWxldmVsKCRjb25maWcsIGJvZHktMSk7XG5cbiAgICBwIHtcbiAgICAgIG1hcmdpbjogMCAwIDEycHg7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbWFsbCxcbiAgLm1hdC1jYXB0aW9uLFxuICAjeyRzZWxlY3Rvcn0gLm1hdC1zbWFsbCxcbiAgI3skc2VsZWN0b3J9IC5tYXQtY2FwdGlvbiB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy50eXBvZ3JhcGh5LWxldmVsKCRjb25maWcsIGNhcHRpb24pO1xuICB9XG5cbiAgLm1hdC1kaXNwbGF5LTQsXG4gICN7JHNlbGVjdG9yfSAubWF0LWRpc3BsYXktNCB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy50eXBvZ3JhcGh5LWxldmVsKCRjb25maWcsIGRpc3BsYXktNCk7XG4gICAgbWFyZ2luOiAwIDAgNTZweDtcbiAgfVxuXG4gIC5tYXQtZGlzcGxheS0zLFxuICAjeyRzZWxlY3Rvcn0gLm1hdC1kaXNwbGF5LTMge1xuICAgIEBpbmNsdWRlIHR5cG9ncmFwaHktdXRpbHMudHlwb2dyYXBoeS1sZXZlbCgkY29uZmlnLCBkaXNwbGF5LTMpO1xuICAgIG1hcmdpbjogMCAwIDY0cHg7XG4gIH1cblxuICAubWF0LWRpc3BsYXktMixcbiAgI3skc2VsZWN0b3J9IC5tYXQtZGlzcGxheS0yIHtcbiAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5LXV0aWxzLnR5cG9ncmFwaHktbGV2ZWwoJGNvbmZpZywgZGlzcGxheS0yKTtcbiAgICBtYXJnaW46IDAgMCA2NHB4O1xuICB9XG5cbiAgLm1hdC1kaXNwbGF5LTEsXG4gICN7JHNlbGVjdG9yfSAubWF0LWRpc3BsYXktMSB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy50eXBvZ3JhcGh5LWxldmVsKCRjb25maWcsIGRpc3BsYXktMSk7XG4gICAgbWFyZ2luOiAwIDAgNjRweDtcbiAgfVxufVxuIiwiQHVzZSAnc2FzczpsaXN0JztcbkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6bWF0aCc7XG5AdXNlICdzYXNzOm1ldGEnO1xuQHVzZSAnc2FzczpzdHJpbmcnO1xuXG5cbi8vIFV0aWxpdHkgZm9yIGZldGNoaW5nIGEgbmVzdGVkIHZhbHVlIGZyb20gYSB0eXBvZ3JhcGh5IGNvbmZpZy5cbkBmdW5jdGlvbiBfbWF0LWdldC10eXBlLXZhbHVlKCRjb25maWcsICRsZXZlbCwgJG5hbWUpIHtcbiAgQHJldHVybiBtYXAuZ2V0KG1hcC5nZXQoJGNvbmZpZywgJGxldmVsKSwgJG5hbWUpO1xufVxuXG4vLy8gR2V0cyB0aGUgZm9udCBzaXplIGZvciBhIGxldmVsIGluc2lkZSBhIHR5cG9ncmFwaHkgY29uZmlnLlxuLy8vIEBwYXJhbSB7TWFwfSAkY29uZmlnIEEgdHlwb2dyYXBoeSBjb25maWcuXG4vLy8gQHBhcmFtIHtNYXB9ICRsZXZlbCBBIHR5cG9ncmFwaHkgbGV2ZWwuXG5AZnVuY3Rpb24gZm9udC1zaXplKCRjb25maWcsICRsZXZlbCkge1xuICBAcmV0dXJuIF9tYXQtZ2V0LXR5cGUtdmFsdWUoJGNvbmZpZywgJGxldmVsLCBmb250LXNpemUpO1xufVxuXG4vLy8gR2V0cyB0aGUgbGluZSBoZWlnaHQgZm9yIGEgbGV2ZWwgaW5zaWRlIGEgdHlwb2dyYXBoeSBjb25maWcuXG4vLy8gQHBhcmFtIHtNYXB9ICRjb25maWcgQSB0eXBvZ3JhcGh5IGNvbmZpZy5cbi8vLyBAcGFyYW0ge01hcH0gJGxldmVsIEEgdHlwb2dyYXBoeSBsZXZlbC5cbkBmdW5jdGlvbiBsaW5lLWhlaWdodCgkY29uZmlnLCAkbGV2ZWwpIHtcbiAgQHJldHVybiBfbWF0LWdldC10eXBlLXZhbHVlKCRjb25maWcsICRsZXZlbCwgbGluZS1oZWlnaHQpO1xufVxuXG4vLy8gR2V0cyB0aGUgZm9udCB3ZWlnaHQgZm9yIGEgbGV2ZWwgaW5zaWRlIGEgdHlwb2dyYXBoeSBjb25maWcuXG4vLy8gQHBhcmFtIHtNYXB9ICRjb25maWcgQSB0eXBvZ3JhcGh5IGNvbmZpZy5cbi8vLyBAcGFyYW0ge01hcH0gJGxldmVsIEEgdHlwb2dyYXBoeSBsZXZlbC5cbkBmdW5jdGlvbiBmb250LXdlaWdodCgkY29uZmlnLCAkbGV2ZWwpIHtcbiAgQHJldHVybiBfbWF0LWdldC10eXBlLXZhbHVlKCRjb25maWcsICRsZXZlbCwgZm9udC13ZWlnaHQpO1xufVxuXG4vLy8gR2V0cyB0aGUgbGV0dGVyIHNwYWNpbmcgZm9yIGEgbGV2ZWwgaW5zaWRlIGEgdHlwb2dyYXBoeSBjb25maWcuXG4vLy8gQHBhcmFtIHtNYXB9ICRjb25maWcgQSB0eXBvZ3JhcGh5IGNvbmZpZy5cbi8vLyBAcGFyYW0ge01hcH0gJGxldmVsIEEgdHlwb2dyYXBoeSBsZXZlbC5cbkBmdW5jdGlvbiBsZXR0ZXItc3BhY2luZygkY29uZmlnLCAkbGV2ZWwpIHtcbiAgQHJldHVybiBfbWF0LWdldC10eXBlLXZhbHVlKCRjb25maWcsICRsZXZlbCwgbGV0dGVyLXNwYWNpbmcpO1xufVxuXG4vLy8gR2V0cyB0aGUgZm9udC1mYW1pbHkgZnJvbSBhIHR5cG9ncmFwaHkgY29uZmlnIGFuZCByZW1vdmVzIHRoZSBxdW90ZXMgYXJvdW5kIGl0LlxuLy8vIEBwYXJhbSB7TWFwfSAkY29uZmlnIEEgdHlwb2dyYXBoeSBjb25maWcuXG4vLy8gQHBhcmFtIHtNYXB9ICRsZXZlbCBBIHR5cG9ncmFwaHkgbGV2ZWwuXG5AZnVuY3Rpb24gZm9udC1mYW1pbHkoJGNvbmZpZywgJGxldmVsOiBudWxsKSB7XG4gICRmb250LWZhbWlseTogbWFwLmdldCgkY29uZmlnLCBmb250LWZhbWlseSk7XG5cbiAgQGlmICRsZXZlbCAhPSBudWxsIHtcbiAgICAkZm9udC1mYW1pbHk6IF9tYXQtZ2V0LXR5cGUtdmFsdWUoJGNvbmZpZywgJGxldmVsLCBmb250LWZhbWlseSk7XG4gIH1cblxuICAvLyBHdWFyZCBhZ2FpbnN0IHVucXVvdGluZyBub24tc3RyaW5nIHZhbHVlcywgYmVjYXVzZSBpdCdzIGRlcHJlY2F0ZWQuXG4gIEByZXR1cm4gaWYobWV0YS50eXBlLW9mKCRmb250LWZhbWlseSkgPT0gc3RyaW5nLCBzdHJpbmcudW5xdW90ZSgkZm9udC1mYW1pbHkpLCAkZm9udC1mYW1pbHkpO1xufVxuXG4vLy8gT3V0cHV0cyB0aGUgc2hvcnRoYW5kIGBmb250YCBDU1MgcHJvcGVydHksIGJhc2VkIG9uIGEgc2V0IG9mIHR5cG9ncmFwaHkgdmFsdWVzLiBGYWxscyBiYWNrIHRvXG4vLy8gdGhlIGluZGl2aWR1YWwgcHJvcGVydGllcyBpZiBhIHZhbHVlIHRoYXQgaXNuJ3QgYWxsb3dlZCBpbiB0aGUgc2hvcnRoYW5kIGlzIHBhc3NlZCBpbi5cbi8vLyBAcGFyYW0ge1N0cmluZ30gJGZvbnQtc2l6ZSBUaGUgZm9udC1zaXplIHZhbHVlLlxuLy8vIEBwYXJhbSB7U3RyaW5nIHwgTnVtYmVyfSAkZm9udC13ZWlnaHQgVGhlIGZvbnQtd2VpZ2h0IHZhbHVlLlxuLy8vIEBwYXJhbSB7U3RyaW5nIHwgTnVtYmVyfSAkbGluZS1oZWlnaHQgVGhlIGxpbmUtaGVpZ2h0IHZhbHVlLlxuLy8vIEBwYXJhbSB7U3RyaW5nfSAkZm9udC1mYW1pbHkgVGhlIGZvbnQtZmFtaWx5IHZhbHVlLlxuLy8vIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBgZm9udGAgc2hvcnRoYW5kIHZhbHVlIGNvbWJpbmluZyB0aGUgZ2l2ZW4gcGFydHMuXG5AbWl4aW4gZm9udC1zaG9ydGhhbmQoJGZvbnQtc2l6ZSwgJGZvbnQtd2VpZ2h0LCAkbGluZS1oZWlnaHQsICRmb250LWZhbWlseSkge1xuICAvLyBJZiBhbnkgb2YgdGhlIHZhbHVlcyBhcmUgc2V0IHRvIGBpbmhlcml0YCwgd2UgY2FuJ3QgdXNlIHRoZSBzaG9ydGhhbmRcbiAgLy8gc28gd2UgZmFsbCBiYWNrIHRvIHBhc3NpbmcgaW4gdGhlIGluZGl2aWR1YWwgcHJvcGVydGllcy5cbiAgQGlmICgkZm9udC1zaXplID09IGluaGVyaXQgb3JcbiAgICAgICAkZm9udC13ZWlnaHQgPT0gaW5oZXJpdCBvclxuICAgICAgICRsaW5lLWhlaWdodCA9PSBpbmhlcml0IG9yXG4gICAgICAgJGZvbnQtZmFtaWx5ID09IGluaGVyaXQgb3JcbiAgICAgICAkZm9udC1zaXplID09IG51bGwgb3JcbiAgICAgICAkZm9udC13ZWlnaHQgPT0gbnVsbCBvclxuICAgICAgICRsaW5lLWhlaWdodCA9PSBudWxsIG9yXG4gICAgICAgJGZvbnQtZmFtaWx5ID09IG51bGwpIHtcblxuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcbiAgICBmb250LXdlaWdodDogJGZvbnQtd2VpZ2h0O1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQ7XG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcbiAgfVxuICBAZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgc2hvcnRoYW5kIGBmb250YCwgYmVjYXVzZSBpdCdzIHRoZSBsZWFzdCBhbW91bnQgb2YgYnl0ZXMuXG4gICAgZm9udDogJGZvbnQtd2VpZ2h0IGxpc3Quc2xhc2goJGZvbnQtc2l6ZSwgJGxpbmUtaGVpZ2h0KSAkZm9udC1mYW1pbHk7XG4gIH1cbn1cblxuLy8vIEVtaXRzIENTUyBzdHlsZXMgZm9yIHRoZSBnaXZlbiB0eXBvZ3JhcGh5IGxldmVsLlxuLy8vIEBwYXJhbSB7TWFwfSAkY29uZmlnIEEgdHlwb2dyYXBoeSBjb25maWcuXG4vLy8gQHBhcmFtIHtNYXB9ICRsZXZlbCBBIHR5cG9ncmFwaHkgbGV2ZWwuXG5AbWl4aW4gdHlwb2dyYXBoeS1sZXZlbCgkY29uZmlnLCAkbGV2ZWwpIHtcbiAgJGZvbnQtc2l6ZTogZm9udC1zaXplKCRjb25maWcsICRsZXZlbCk7XG4gICRmb250LXdlaWdodDogZm9udC13ZWlnaHQoJGNvbmZpZywgJGxldmVsKTtcbiAgJGxpbmUtaGVpZ2h0OiBsaW5lLWhlaWdodCgkY29uZmlnLCAkbGV2ZWwpO1xuICAkZm9udC1mYW1pbHk6IGZvbnQtZmFtaWx5KCRjb25maWcsICRsZXZlbCk7XG5cbiAgQGluY2x1ZGUgZm9udC1zaG9ydGhhbmQoJGZvbnQtc2l6ZSwgJGZvbnQtd2VpZ2h0LCAkbGluZS1oZWlnaHQsICRmb250LWZhbWlseSk7XG4gIGxldHRlci1zcGFjaW5nOiBsZXR0ZXItc3BhY2luZygkY29uZmlnLCAkbGV2ZWwpO1xufVxuXG4vLy8gQ29lcmNlIGEgdmFsdWUgdG8gYGVtYCBpZiBpdCBpcyBhIHVuaXRsZXNzIG51bWJlciwgb3RoZXJ3aXNlIHJldHVybnNcbi8vLyB0aGUgdmFsdWUgcHJvdmlkZWQuXG5AZnVuY3Rpb24gcHJpdmF0ZS1jb2VyY2UtdW5pdGxlc3MtdG8tZW0oJHZhbHVlKSB7XG4gIEByZXR1cm4gaWYobWF0aC5pcy11bml0bGVzcygkdmFsdWUpLCAxZW0gKiAkdmFsdWUsICR2YWx1ZSk7XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9jb3JlL3N0eWxlL3ByaXZhdGUnO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHknO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHktdXRpbHMnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3RoZW1pbmcnO1xuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LWJvdHRvbS1zaGVldC1jb250YWluZXIge1xuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1lbGV2YXRpb24oMTYsICRjb25maWcpO1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgZGlhbG9nKTtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LWJvdHRvbS1zaGVldC1jb250YWluZXIge1xuICAgIEBpbmNsdWRlIHR5cG9ncmFwaHktdXRpbHMudHlwb2dyYXBoeS1sZXZlbCgkY29uZmlnLCBib2R5LTEpO1xuICB9XG59XG5cbkBtaXhpbiBfZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtYm90dG9tLXNoZWV0Jykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6bWV0YSc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3N0eWxlL3ByaXZhdGUnO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHknO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHktdXRpbHMnO1xuXG4kX3JpcHBsZS1vcGFjaXR5OiAwLjE7XG5cbi8vIEFwcGxpZXMgYSBmb2N1cyBzdHlsZSB0byBhbiBtYXQtYnV0dG9uIGVsZW1lbnQgZm9yIGVhY2ggb2YgdGhlIHN1cHBvcnRlZCBwYWxldHRlcy5cbkBtaXhpbiBfZm9jdXMtb3ZlcmxheS1jb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJHByaW1hcnk6IG1hcC5nZXQoJGNvbmZpZywgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC5nZXQoJGNvbmZpZywgYWNjZW50KTtcbiAgJHdhcm46IG1hcC5nZXQoJGNvbmZpZywgd2Fybik7XG5cbiAgJi5tYXQtcHJpbWFyeSAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHByaW1hcnkpO1xuICB9XG5cbiAgJi5tYXQtYWNjZW50IC5tYXQtYnV0dG9uLWZvY3VzLW92ZXJsYXkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYWNjZW50KTtcbiAgfVxuXG4gICYubWF0LXdhcm4gLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCR3YXJuKTtcbiAgfVxuXG4gICYubWF0LWJ1dHRvbi1kaXNhYmxlZCAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxufVxuXG4vLyBBcHBsaWVzIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIGZvciBhIHJpcHBsZS4gSWYgdGhlIHZhbHVlIHByb3ZpZGVkIGlzIG5vdCBhIFNhc3MgY29sb3IsXG4vLyB3ZSBhc3N1bWUgdGhhdCB3ZSd2ZSBiZWVuIGdpdmVuIGEgQ1NTIHZhcmlhYmxlLiBTaW5jZSB3ZSBjYW4ndCBwZXJmb3JtIGFscGhhLWJsZW5kaW5nXG4vLyBvbiBhIENTUyB2YXJpYWJsZSwgd2UgaW5zdGVhZCBhZGQgdGhlIG9wYWNpdHkgZGlyZWN0bHkgdG8gdGhlIHJpcHBsZSBlbGVtZW50LlxuQG1peGluIF9yaXBwbGUtYmFja2dyb3VuZCgkcGFsZXR0ZSwgJGh1ZSwgJG9wYWNpdHkpIHtcbiAgJGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcGFsZXR0ZSwgJGh1ZSwgJG9wYWNpdHkpO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjtcbiAgQGlmIChtZXRhLnR5cGUtb2YoJGJhY2tncm91bmQtY29sb3IpICE9IGNvbG9yKSB7XG4gICAgb3BhY2l0eTogJG9wYWNpdHk7XG4gIH1cbn1cblxuQG1peGluIF9yaXBwbGUtY29sb3IoJHRoZW1lLCAkaHVlLCAkb3BhY2l0eTogJF9yaXBwbGUtb3BhY2l0eSkge1xuICAkcHJpbWFyeTogbWFwLmdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAuZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC5nZXQoJHRoZW1lLCB3YXJuKTtcblxuICAmLm1hdC1wcmltYXJ5IC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgIEBpbmNsdWRlIF9yaXBwbGUtYmFja2dyb3VuZCgkcHJpbWFyeSwgJGh1ZSwgJG9wYWNpdHkpO1xuICB9XG5cbiAgJi5tYXQtYWNjZW50IC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgIEBpbmNsdWRlIF9yaXBwbGUtYmFja2dyb3VuZCgkYWNjZW50LCAkaHVlLCAkb3BhY2l0eSk7XG4gIH1cblxuICAmLm1hdC13YXJuIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgIEBpbmNsdWRlIF9yaXBwbGUtYmFja2dyb3VuZCgkd2FybiwgJGh1ZSwgJG9wYWNpdHkpO1xuICB9XG59XG5cbi8vIEFwcGxpZXMgYSBwcm9wZXJ0eSB0byBhbiBtYXQtYnV0dG9uIGVsZW1lbnQgZm9yIGVhY2ggb2YgdGhlIHN1cHBvcnRlZCBwYWxldHRlcy5cbkBtaXhpbiBfdGhlbWUtcHJvcGVydHkoJHRoZW1lLCAkcHJvcGVydHksICRodWUpIHtcbiAgJHByaW1hcnk6IG1hcC5nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAuZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgJi5tYXQtcHJpbWFyeSB7XG4gICAgI3skcHJvcGVydHl9OiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHByaW1hcnksICRodWUpO1xuICB9XG4gICYubWF0LWFjY2VudCB7XG4gICAgI3skcHJvcGVydHl9OiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGFjY2VudCwgJGh1ZSk7XG4gIH1cbiAgJi5tYXQtd2FybiB7XG4gICAgI3skcHJvcGVydHl9OiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHdhcm4sICRodWUpO1xuICB9XG5cbiAgJi5tYXQtcHJpbWFyeSwgJi5tYXQtYWNjZW50LCAmLm1hdC13YXJuLCAmLm1hdC1idXR0b24tZGlzYWJsZWQge1xuICAgICYubWF0LWJ1dHRvbi1kaXNhYmxlZCB7XG4gICAgICAkcGFsZXR0ZTogaWYoJHByb3BlcnR5ID09ICdjb2xvcicsICRmb3JlZ3JvdW5kLCAkYmFja2dyb3VuZCk7XG4gICAgICAjeyRwcm9wZXJ0eX06IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcGFsZXR0ZSwgZGlzYWJsZWQtYnV0dG9uKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtYnV0dG9uLCAubWF0LWljb24tYnV0dG9uLCAubWF0LXN0cm9rZWQtYnV0dG9uIHtcbiAgICAvLyBCdXR0b25zIHdpdGhvdXQgYSBiYWNrZ3JvdW5kIGNvbG9yIHNob3VsZCBpbmhlcml0IHRoZSBmb250IGNvbG9yLiBUaGlzIGlzIG5lY2Vzc2FyeSB0b1xuICAgIC8vIGVuc3VyZSB0aGF0IHRoZSBidXR0b24gaXMgcmVhZGFibGUgb24gY3VzdG9tIGJhY2tncm91bmQgY29sb3JzLiBJdCdzIHdyb25nIHRvIGFsd2F5cyBhc3N1bWVcbiAgICAvLyB0aGF0IHRob3NlIGJ1dHRvbnMgYXJlIGFsd2F5cyBwbGFjZWQgaW5zaWRlIG9mIGNvbnRhaW5lcnMgd2l0aCB0aGUgZGVmYXVsdCBiYWNrZ3JvdW5kXG4gICAgLy8gY29sb3Igb2YgdGhlIHRoZW1lIChlLmcuIHRoZW1lZCB0b29sYmFycykuXG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cbiAgICBAaW5jbHVkZSBfdGhlbWUtcHJvcGVydHkoJGNvbmZpZywgJ2NvbG9yJywgdGV4dCk7XG4gICAgQGluY2x1ZGUgX2ZvY3VzLW92ZXJsYXktY29sb3IoJGNvbmZpZyk7XG5cbiAgICAvLyBTZXR1cCB0aGUgcmlwcGxlIGNvbG9yIHRvIGJlIGJhc2VkIG9uIHRoZSB0ZXh0IGNvbG9yLiBUaGlzIGVuc3VyZXMgdGhhdCB0aGUgcmlwcGxlc1xuICAgIC8vIGFyZSBtYXRjaGluZyB3aXRoIHRoZSBjdXJyZW50IHRoZW1lIHBhbGV0dGUgYW5kIGFyZSBpbiBjb250cmFzdCB0byB0aGUgYmFja2dyb3VuZCBjb2xvclxuICAgIC8vIChlLmcgaW4gdGhlbWVkIHRvb2xiYXJzKS5cbiAgICAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgIG9wYWNpdHk6ICRfcmlwcGxlLW9wYWNpdHk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheSB7XG4gICAgYmFja2dyb3VuZDogbWFwLmdldCgkZm9yZWdyb3VuZCwgYmFzZSk7XG4gIH1cblxuICAvLyBOb3RlOiB0aGlzIG5lZWRzIGEgYml0IGV4dHJhIHNwZWNpZmljaXR5LCBiZWNhdXNlIHdlJ3JlIG5vdCBndWFyYW50ZWVkIHRoZSBpbmNsdXNpb25cbiAgLy8gb3JkZXIgb2YgdGhlIHRoZW1lIHN0eWxlcyBhbmQgdGhlIGJ1dHRvbiByZXNldCBtYXkgZW5kIHVwIHJlc2V0dGluZyB0aGlzIGFzIHdlbGwuXG4gIC5tYXQtc3Ryb2tlZC1idXR0b246bm90KC5tYXQtYnV0dG9uLWRpc2FibGVkKSB7XG4gICAgYm9yZGVyLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1mbGF0LWJ1dHRvbiwgLm1hdC1yYWlzZWQtYnV0dG9uLCAubWF0LWZhYiwgLm1hdC1taW5pLWZhYiB7XG4gICAgLy8gRGVmYXVsdCBmb250IGFuZCBiYWNrZ3JvdW5kIGNvbG9yIHdoZW4gbm90IHVzaW5nIGFueSBjb2xvciBwYWxldHRlLlxuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgcmFpc2VkLWJ1dHRvbik7XG5cbiAgICBAaW5jbHVkZSBfdGhlbWUtcHJvcGVydHkoJGNvbmZpZywgJ2NvbG9yJywgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgQGluY2x1ZGUgX3RoZW1lLXByb3BlcnR5KCRjb25maWcsICdiYWNrZ3JvdW5kLWNvbG9yJywgZGVmYXVsdCk7XG4gICAgQGluY2x1ZGUgX3JpcHBsZS1jb2xvcigkY29uZmlnLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgfVxuXG4gIC5tYXQtc3Ryb2tlZC1idXR0b24sIC5tYXQtZmxhdC1idXR0b24ge1xuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMCwgJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LXJhaXNlZC1idXR0b24ge1xuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMiwgJGNvbmZpZyk7XG5cbiAgICAmOm5vdCgubWF0LWJ1dHRvbi1kaXNhYmxlZCk6YWN0aXZlIHtcbiAgICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oOCwgJGNvbmZpZyk7XG4gICAgfVxuXG4gICAgJi5tYXQtYnV0dG9uLWRpc2FibGVkIHtcbiAgICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMCwgJGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mYWIsIC5tYXQtbWluaS1mYWIge1xuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oNiwgJGNvbmZpZyk7XG5cbiAgICAmOm5vdCgubWF0LWJ1dHRvbi1kaXNhYmxlZCk6YWN0aXZlIHtcbiAgICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMTIsICRjb25maWcpO1xuICAgIH1cblxuICAgICYubWF0LWJ1dHRvbi1kaXNhYmxlZCB7XG4gICAgICBAaW5jbHVkZSBwcml2YXRlLnByaXZhdGUtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKDAsICRjb25maWcpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LWJ1dHRvbiwgLm1hdC1yYWlzZWQtYnV0dG9uLCAubWF0LWljb24tYnV0dG9uLCAubWF0LXN0cm9rZWQtYnV0dG9uLFxuICAubWF0LWZsYXQtYnV0dG9uLCAubWF0LWZhYiwgLm1hdC1taW5pLWZhYiB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtZmFtaWx5KCRjb25maWcsIGJ1dHRvbik7XG4gICAgICBzaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBidXR0b24pO1xuICAgICAgd2VpZ2h0OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtd2VpZ2h0KCRjb25maWcsIGJ1dHRvbik7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBfZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtYnV0dG9uJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvcHJpdmF0ZSc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5AdXNlICcuLi9jb3JlL2RlbnNpdHkvcHJpdmF0ZS9jb21wYXRpYmlsaXR5JztcbkB1c2UgJy4vYnV0dG9uLXRvZ2dsZS12YXJpYWJsZXMnO1xuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcbiAgJGRpdmlkZXItY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gICR0aGVtZS1kaXZpZGVyLWNvbG9yOiBtYXAuZ2V0KCRmb3JlZ3JvdW5kLCBkaXZpZGVyKTtcblxuICAvLyBCeSBkZWZhdWx0IHRoZSB0aGVtZSB1c3VhbGx5IGhhcyBhbiByZ2JhIGNvbG9yIGZvciB0aGUgZGl2aWRlcnMsIHdoaWNoIGNhblxuICAvLyBzdGFjayB1cCB3aXRoIHRoZSBiYWNrZ3JvdW5kIG9mIGEgYnV0dG9uIHRvZ2dsZS4gVGhpcyBjYW4gY2F1c2UgdGhlIGJvcmRlclxuICAvLyBvZiBhIHNlbGVjdGVkIHRvZ2dsZSB0byBsb29rIGRpZmZlcmVudCBmcm9tIGFuIGRlc2VsZWN0ZWQgb25lLiBXZSB1c2UgYSBzb2xpZFxuICAvLyBjb2xvciB0byBlbnN1cmUgdGhhdCB0aGUgYm9yZGVyIGFsd2F5cyBzdGF5cyB0aGUgc2FtZS5cbiAgJGRpdmlkZXItY29sb3I6IGlmKHR5cGUtb2YoJHRoZW1lLWRpdmlkZXItY29sb3IpID09IGNvbG9yLFxuICAgIHRoZW1pbmcucHJpdmF0ZS1yZ2JhLXRvLWhleCgkdGhlbWUtZGl2aWRlci1jb2xvciwgbWFwLmdldCgkYmFja2dyb3VuZCwgY2FyZCkpLFxuICAgICR0aGVtZS1kaXZpZGVyLWNvbG9yXG4gICk7XG5cbiAgLm1hdC1idXR0b24tdG9nZ2xlLXN0YW5kYWxvbmUsXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCB7XG4gICAgQGluY2x1ZGUgcHJpdmF0ZS5wcml2YXRlLXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbigyLCAkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1zdGFuZGFsb25lLm1hdC1idXR0b24tdG9nZ2xlLWFwcGVhcmFuY2Utc3RhbmRhcmQsXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cC1hcHBlYXJhbmNlLXN0YW5kYXJkIHtcbiAgICAmOm5vdChbY2xhc3MqPSdtYXQtZWxldmF0aW9uLXonXSkge1xuICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUge1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGhpbnQtdGV4dCk7XG5cbiAgICAubWF0LWJ1dHRvbi10b2dnbGUtZm9jdXMtb3ZlcmxheSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIGZvY3VzZWQtYnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUtYXBwZWFyYW5jZS1zdGFuZGFyZCB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgdGV4dCk7XG4gICAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCBjYXJkKTtcblxuICAgIC5tYXQtYnV0dG9uLXRvZ2dsZS1mb2N1cy1vdmVybGF5IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgZm9jdXNlZC1idXR0b24sIDEpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cC1hcHBlYXJhbmNlLXN0YW5kYXJkIC5tYXQtYnV0dG9uLXRvZ2dsZSArIC5tYXQtYnV0dG9uLXRvZ2dsZSB7XG4gICAgYm9yZGVyLWxlZnQ6IHNvbGlkIDFweCAkZGl2aWRlci1jb2xvcjtcbiAgfVxuXG4gIFtkaXI9J3J0bCddIC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cC1hcHBlYXJhbmNlLXN0YW5kYXJkIC5tYXQtYnV0dG9uLXRvZ2dsZSArIC5tYXQtYnV0dG9uLXRvZ2dsZSB7XG4gICAgYm9yZGVyLWxlZnQ6IG5vbmU7XG4gICAgYm9yZGVyLXJpZ2h0OiBzb2xpZCAxcHggJGRpdmlkZXItY29sb3I7XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAtYXBwZWFyYW5jZS1zdGFuZGFyZC5tYXQtYnV0dG9uLXRvZ2dsZS12ZXJ0aWNhbCB7XG4gICAgLm1hdC1idXR0b24tdG9nZ2xlICsgLm1hdC1idXR0b24tdG9nZ2xlIHtcbiAgICAgIGJvcmRlci1sZWZ0OiBub25lO1xuICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgYm9yZGVyLXRvcDogc29saWQgMXB4ICRkaXZpZGVyLWNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1jaGVja2VkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIHNlbGVjdGVkLWJ1dHRvbik7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuXG4gICAgJi5tYXQtYnV0dG9uLXRvZ2dsZS1hcHBlYXJhbmNlLXN0YW5kYXJkIHtcbiAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1kaXNhYmxlZCB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGlzYWJsZWQtYnV0dG9uKTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIGRpc2FibGVkLWJ1dHRvbi10b2dnbGUpO1xuXG4gICAgJi5tYXQtYnV0dG9uLXRvZ2dsZS1hcHBlYXJhbmNlLXN0YW5kYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgY2FyZCk7XG4gICAgfVxuXG4gICAgJi5tYXQtYnV0dG9uLXRvZ2dsZS1jaGVja2VkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgc2VsZWN0ZWQtZGlzYWJsZWQtYnV0dG9uKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUtc3RhbmRhbG9uZS5tYXQtYnV0dG9uLXRvZ2dsZS1hcHBlYXJhbmNlLXN0YW5kYXJkLFxuICAubWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAtYXBwZWFyYW5jZS1zdGFuZGFyZCB7XG4gICAgYm9yZGVyOiBzb2xpZCAxcHggJGRpdmlkZXItY29sb3I7XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC1idXR0b24tdG9nZ2xlIHtcbiAgICBmb250LWZhbWlseTogdHlwb2dyYXBoeS11dGlscy5mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxufVxuXG5AbWl4aW4gZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRkZW5zaXR5LXNjYWxlOiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJHN0YW5kYXJkLWhlaWdodDogY29tcGF0aWJpbGl0eS5wcml2YXRlLWRlbnNpdHktcHJvcC12YWx1ZShcbiAgICAgIGJ1dHRvbi10b2dnbGUtdmFyaWFibGVzLiRzdGFuZGFyZC1kZW5zaXR5LWNvbmZpZywgJGRlbnNpdHktc2NhbGUsIGhlaWdodCk7XG5cbiAgQGluY2x1ZGUgY29tcGF0aWJpbGl0eS5wcml2YXRlLWRlbnNpdHktbGVnYWN5LWNvbXBhdGliaWxpdHkoKSB7XG4gICAgLm1hdC1idXR0b24tdG9nZ2xlLWFwcGVhcmFuY2Utc3RhbmRhcmQgLm1hdC1idXR0b24tdG9nZ2xlLWxhYmVsLWNvbnRlbnQge1xuICAgICAgbGluZS1oZWlnaHQ6ICRzdGFuZGFyZC1oZWlnaHQ7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1idXR0b24tdG9nZ2xlJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3RoZW1pbmcnO1xuQHVzZSAnLi4vY29yZS9zdHlsZS9wcml2YXRlJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcblxuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LWNhcmQge1xuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMSwgJGNvbmZpZyk7XG4gICAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgIC8vIE5lZWRzIGV4dHJhIHNwZWNpZmljaXR5IHRvIGJlIGFibGUgdG8gb3ZlcnJpZGUgdGhlIGVsZXZhdGlvbiBzZWxlY3RvcnMuXG4gICAgJi5tYXQtY2FyZC1mbGF0IHtcbiAgICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMCwgJGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1jYXJkLXN1YnRpdGxlIHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC1jYXJkIHtcbiAgICBmb250LWZhbWlseTogdHlwb2dyYXBoeS11dGlscy5mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtY2FyZC10aXRsZSB7XG4gICAgZm9udDoge1xuICAgICAgc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgaGVhZGxpbmUpO1xuICAgICAgd2VpZ2h0OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtd2VpZ2h0KCRjb25maWcsIHRpdGxlKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSB7XG4gICAgZm9udC1zaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCB0aXRsZSk7XG4gIH1cblxuICAubWF0LWNhcmQtc3VidGl0bGUsXG4gIC5tYXQtY2FyZC1jb250ZW50IHtcbiAgICBmb250LXNpemU6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1zaXplKCRjb25maWcsIGJvZHktMSk7XG4gIH1cbn1cblxuQG1peGluIF9kZW5zaXR5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1jYXJkJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcblxuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAuZ2V0KCRjb25maWcsIGlzLWRhcmspO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG5cbiAgLy8gVGhlIGNvbG9yIG9mIHRoZSBjaGVja2JveCdzIGNoZWNrbWFyayAvIG1peGVkbWFyay5cbiAgJGNoZWNrYm94LW1hcmstY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgYmFja2dyb3VuZCk7XG5cbiAgLy8gTk9URSh0cmF2aXNrYXVmbWFuKTogV2hpbGUgdGhlIHNwZWMgY2FsbHMgZm9yIHRyYW5zbHVjZW50IGJsYWNrcy93aGl0ZXMgZm9yIGRpc2FibGVkIGNvbG9ycyxcbiAgLy8gdGhpcyBkb2VzIG5vdCB3b3JrIHdlbGwgd2l0aCBlbGVtZW50cyBsYXllcmVkIG9uIHRvcCBvZiBvbmUgYW5vdGhlci4gVG8gZ2V0IGFyb3VuZCB0aGlzIHdlXG4gIC8vIGJsZW5kIHRoZSBjb2xvcnMgdG9nZXRoZXIgYmFzZWQgb24gdGhlIGJhc2UgY29sb3IgYW5kIHRoZSB0aGVtZSBiYWNrZ3JvdW5kLlxuICAkd2hpdGUtMzBwY3Qtb3BhY2l0eS1vbi1kYXJrOiAjNjg2ODY4O1xuICAkYmxhY2stMjZwY3Qtb3BhY2l0eS1vbi1saWdodDogI2IwYjBiMDtcbiAgJGRpc2FibGVkLWNvbG9yOiBpZigkaXMtZGFyay10aGVtZSwgJHdoaXRlLTMwcGN0LW9wYWNpdHktb24tZGFyaywgJGJsYWNrLTI2cGN0LW9wYWNpdHktb24tbGlnaHQpO1xuXG4gIC5tYXQtY2hlY2tib3gtZnJhbWUge1xuICAgIGJvcmRlci1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LWNoZWNrYm94LWNoZWNrbWFyayB7XG4gICAgZmlsbDogJGNoZWNrYm94LW1hcmstY29sb3I7XG4gIH1cblxuICAubWF0LWNoZWNrYm94LWNoZWNrbWFyay1wYXRoIHtcbiAgICAvLyAhaW1wb3J0YW50IGlzIG5lZWRlZCBoZXJlIGJlY2F1c2UgYSBzdHJva2UgbXVzdCBiZSBzZXQgYXMgYW5cbiAgICAvLyBhdHRyaWJ1dGUgb24gdGhlIFNWRyBpbiBvcmRlciBmb3IgbGluZSBhbmltYXRpb24gdG8gd29yayBwcm9wZXJseS5cbiAgICBzdHJva2U6ICRjaGVja2JveC1tYXJrLWNvbG9yICFpbXBvcnRhbnQ7XG4gIH1cblxuICAubWF0LWNoZWNrYm94LW1peGVkbWFyayB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNoZWNrYm94LW1hcmstY29sb3I7XG4gIH1cblxuICAubWF0LWNoZWNrYm94LWluZGV0ZXJtaW5hdGUsIC5tYXQtY2hlY2tib3gtY2hlY2tlZCB7XG4gICAgJi5tYXQtcHJpbWFyeSAubWF0LWNoZWNrYm94LWJhY2tncm91bmQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQgLm1hdC1jaGVja2JveC1iYWNrZ3JvdW5kIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHdhcm4pO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2hlY2tib3gtZGlzYWJsZWQge1xuICAgICYubWF0LWNoZWNrYm94LWNoZWNrZWQsXG4gICAgJi5tYXQtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZSB7XG4gICAgICAubWF0LWNoZWNrYm94LWJhY2tncm91bmQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGlzYWJsZWQtY29sb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjpub3QoLm1hdC1jaGVja2JveC1jaGVja2VkKSB7XG4gICAgICAubWF0LWNoZWNrYm94LWZyYW1lIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAkZGlzYWJsZWQtY29sb3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm1hdC1jaGVja2JveC1sYWJlbCB7XG4gICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU3dpdGNoIHRoaXMgdG8gYSBzb2xpZCBjb2xvciBzaW5jZSB3ZSdyZSB1c2luZyBgb3BhY2l0eWBcbiAgLy8gdG8gY29udHJvbCBob3cgb3BhcXVlIHRoZSByaXBwbGUgc2hvdWxkIGJlLlxuICAubWF0LWNoZWNrYm94IC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hcC5nZXQobWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKSwgYmFzZSk7XG4gIH1cblxuICAubWF0LWNoZWNrYm94LWNoZWNrZWQ6bm90KC5tYXQtY2hlY2tib3gtZGlzYWJsZWQpLFxuICAubWF0LWNoZWNrYm94OmFjdGl2ZTpub3QoLm1hdC1jaGVja2JveC1kaXNhYmxlZCkge1xuICAgICYubWF0LXByaW1hcnkgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgICBiYWNrZ3JvdW5kOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHByaW1hcnkpO1xuICAgIH1cblxuICAgICYubWF0LWFjY2VudCAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgICAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCR3YXJuKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC1jaGVja2JveCB7XG4gICAgZm9udC1mYW1pbHk6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAvLyBUT0RPKGthcmEpOiBSZW1vdmUgdGhpcyBzdHlsZSB3aGVuIGZpeGluZyB2ZXJ0aWNhbCBiYXNlbGluZVxuICAubWF0LWNoZWNrYm94LWxheW91dCAubWF0LWNoZWNrYm94LWxhYmVsIHtcbiAgICBsaW5lLWhlaWdodDogdHlwb2dyYXBoeS11dGlscy5saW5lLWhlaWdodCgkY29uZmlnLCBib2R5LTIpO1xuICB9XG59XG5cbkBtaXhpbiBfZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtY2hlY2tib3gnKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBfZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2FzczptZXRhJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvcHJpdmF0ZSc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5cbiRjaGlwLXJlbW92ZS1mb250LXNpemU6IDE4cHg7XG5cbkBtaXhpbiBfZWxlbWVudC1jb2xvcigkZm9yZWdyb3VuZCwgJGJhY2tncm91bmQpIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQ7XG4gIGNvbG9yOiAkZm9yZWdyb3VuZDtcblxuICAubWF0LWNoaXAtcmVtb3ZlIHtcbiAgICBjb2xvcjogJGZvcmVncm91bmQ7XG4gICAgb3BhY2l0eTogMC40O1xuICB9XG59XG5cblxuLy8gQXBwbGllcyB0aGUgYmFja2dyb3VuZCBjb2xvciBmb3IgYSByaXBwbGUgZWxlbWVudC5cbi8vIElmIHRoZSBjb2xvciB2YWx1ZSBwcm92aWRlZCBpcyBub3QgYSBTYXNzIGNvbG9yLFxuLy8gd2UgYXNzdW1lIHRoYXQgd2UndmUgYmVlbiBnaXZlbiBhIENTUyB2YXJpYWJsZS5cbi8vIFNpbmNlIHdlIGNhbid0IHBlcmZvcm0gYWxwaGEtYmxlbmRpbmcgb24gYSBDU1MgdmFyaWFibGUsXG4vLyB3ZSBpbnN0ZWFkIGFkZCB0aGUgb3BhY2l0eSBkaXJlY3RseSB0byB0aGUgcmlwcGxlIGVsZW1lbnQuXG5AbWl4aW4gX3JpcHBsZS1iYWNrZ3JvdW5kKCRwYWxldHRlLCAkZGVmYXVsdC1jb250cmFzdCwgJG9wYWNpdHkpIHtcbiAgJGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcGFsZXR0ZSwgJGRlZmF1bHQtY29udHJhc3QsICRvcGFjaXR5KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I7XG4gIEBpZiAobWV0YS50eXBlLW9mKCRiYWNrZ3JvdW5kLWNvbG9yKSAhPSBjb2xvcikge1xuICAgIG9wYWNpdHk6ICRvcGFjaXR5O1xuICB9XG59XG5cbkBtaXhpbiBfcGFsZXR0ZS1zdHlsZXMoJHBhbGV0dGUpIHtcbiAgQGluY2x1ZGUgX2VsZW1lbnQtY29sb3IodGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwYWxldHRlLCBkZWZhdWx0LWNvbnRyYXN0KSxcbiAgICB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHBhbGV0dGUpKTtcblxuICAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICBAaW5jbHVkZSBfcmlwcGxlLWJhY2tncm91bmQoJHBhbGV0dGUsIGRlZmF1bHQtY29udHJhc3QsIDAuMSk7XG4gIH1cbn1cblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkaXMtZGFyay10aGVtZTogbWFwLmdldCgkY29uZmlnLCBpcy1kYXJrKTtcbiAgJHByaW1hcnk6IG1hcC5nZXQoJGNvbmZpZywgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC5nZXQoJGNvbmZpZywgYWNjZW50KTtcbiAgJHdhcm46IG1hcC5nZXQoJGNvbmZpZywgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcblxuICAkdW5zZWxlY3RlZC1iYWNrZ3JvdW5kOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIHVuc2VsZWN0ZWQtY2hpcCk7XG4gICR1bnNlbGVjdGVkLWZvcmVncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgdGV4dCk7XG5cbiAgLm1hdC1jaGlwLm1hdC1zdGFuZGFyZC1jaGlwIHtcbiAgICBAaW5jbHVkZSBfZWxlbWVudC1jb2xvcigkdW5zZWxlY3RlZC1mb3JlZ3JvdW5kLCAkdW5zZWxlY3RlZC1iYWNrZ3JvdW5kKTtcblxuICAgICY6bm90KC5tYXQtY2hpcC1kaXNhYmxlZCkge1xuICAgICAgJjphY3RpdmUge1xuICAgICAgICBAaW5jbHVkZSBwcml2YXRlLnByaXZhdGUtdGhlbWUtZWxldmF0aW9uKDMsICRjb25maWcpO1xuICAgICAgfVxuXG4gICAgICAubWF0LWNoaXAtcmVtb3ZlOmhvdmVyIHtcbiAgICAgICAgb3BhY2l0eTogMC41NDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLm1hdC1jaGlwLWRpc2FibGVkIHtcbiAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICB9XG5cbiAgICAmOjphZnRlciB7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRmb3JlZ3JvdW5kLCBiYXNlKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWNoaXAubWF0LXN0YW5kYXJkLWNoaXAubWF0LWNoaXAtc2VsZWN0ZWQge1xuICAgICYubWF0LXByaW1hcnkge1xuICAgICAgQGluY2x1ZGUgX3BhbGV0dGUtc3R5bGVzKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIEBpbmNsdWRlIF9wYWxldHRlLXN0eWxlcygkd2Fybik7XG4gICAgfVxuXG4gICAgJi5tYXQtYWNjZW50IHtcbiAgICAgIEBpbmNsdWRlIF9wYWxldHRlLXN0eWxlcygkYWNjZW50KTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC1jaGlwIHtcbiAgICBmb250LXNpemU6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1zaXplKCRjb25maWcsIGJvZHktMik7XG4gICAgZm9udC13ZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMuZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0yKTtcblxuICAgIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29uLFxuICAgIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24ge1xuICAgICAgZm9udC1zaXplOiAkY2hpcC1yZW1vdmUtZm9udC1zaXplO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LWNoaXBzJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cblxuXG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtdGFibGUge1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgJ2NhcmQnKTtcbiAgfVxuXG4gIC5tYXQtdGFibGUgdGhlYWQsIC5tYXQtdGFibGUgdGJvZHksIC5tYXQtdGFibGUgdGZvb3QsXG4gIG1hdC1oZWFkZXItcm93LCBtYXQtcm93LCBtYXQtZm9vdGVyLXJvdyxcbiAgW21hdC1oZWFkZXItcm93XSwgW21hdC1yb3ddLCBbbWF0LWZvb3Rlci1yb3ddLFxuICAubWF0LXRhYmxlLXN0aWNreSB7XG4gICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgfVxuXG4gIG1hdC1yb3csIG1hdC1oZWFkZXItcm93LCBtYXQtZm9vdGVyLXJvdyxcbiAgdGgubWF0LWhlYWRlci1jZWxsLCB0ZC5tYXQtY2VsbCwgdGQubWF0LWZvb3Rlci1jZWxsIHtcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1oZWFkZXItY2VsbCB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICB9XG5cbiAgLm1hdC1jZWxsLCAubWF0LWZvb3Rlci1jZWxsIHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LXRhYmxlIHtcbiAgICBmb250LWZhbWlseTogdHlwb2dyYXBoeS11dGlscy5mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtaGVhZGVyLWNlbGwge1xuICAgIGZvbnQtc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbik7XG4gICAgZm9udC13ZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMuZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0yKTtcbiAgfVxuXG4gIC5tYXQtY2VsbCwgLm1hdC1mb290ZXItY2VsbCB7XG4gICAgZm9udC1zaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpO1xuICB9XG59XG5cbkBtaXhpbiBfZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtdGFibGUnKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBfZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2Fzczpjb2xvcic7XG5AdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOm1hdGgnO1xuQHVzZSAnc2FzczptZXRhJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvcHJpdmF0ZSc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5cblxuJHNlbGVjdGVkLXRvZGF5LWJveC1zaGFkb3ctd2lkdGg6IDFweDtcbiRzZWxlY3RlZC1mYWRlLWFtb3VudDogMC42O1xuJHJhbmdlLWZhZGUtYW1vdW50OiAwLjI7XG4kdG9kYXktZmFkZS1hbW91bnQ6IDAuMjtcbiRjYWxlbmRhci1ib2R5LWZvbnQtc2l6ZTogMTNweCAhZGVmYXVsdDtcbiRjYWxlbmRhci13ZWVrZGF5LXRhYmxlLWZvbnQtc2l6ZTogMTFweCAhZGVmYXVsdDtcblxuQG1peGluIF9jb2xvcigkcGFsZXR0ZSkge1xuICBAaW5jbHVkZSBkYXRlLXJhbmdlLWNvbG9ycyhcbiAgICB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHBhbGV0dGUsIGRlZmF1bHQsICRyYW5nZS1mYWRlLWFtb3VudCkpO1xuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwYWxldHRlKTtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwYWxldHRlLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1kaXNhYmxlZCA+IC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCB7XG4gICAgJGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcGFsZXR0ZSk7XG5cbiAgICBAaWYgKG1ldGEudHlwZS1vZigkYmFja2dyb3VuZCkgPT0gY29sb3IpIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLmFkanVzdCgkYmFja2dyb3VuZCwgJGFscGhhOiAtJHNlbGVjdGVkLWZhZGUtYW1vdW50KTtcbiAgICB9XG4gICAgQGVsc2Uge1xuICAgICAgLy8gSWYgd2UgY291bGRuJ3QgcmVzb2x2ZSB0byBiYWNrZ3JvdW5kIHRvIGEgY29sb3IgKGUuZy4gaXQncyBhIENTUyB2YXJpYWJsZSksXG4gICAgICAvLyBmYWxsIGJhY2sgdG8gZmFkaW5nIHRoZSBjb250ZW50IG91dCB2aWEgYG9wYWNpdHlgLlxuICAgICAgb3BhY2l0eTogJHRvZGF5LWZhZGUtYW1vdW50O1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keS10b2RheS5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCB7XG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAwIDAgJHNlbGVjdGVkLXRvZGF5LWJveC1zaGFkb3ctd2lkdGhcbiAgICAgICAgICAgICAgICB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHBhbGV0dGUsIGRlZmF1bHQtY29udHJhc3QpO1xuICB9XG5cbiAgLmNkay1rZXlib2FyZC1mb2N1c2VkIC5tYXQtY2FsZW5kYXItYm9keS1hY3RpdmUsXG4gIC5jZGstcHJvZ3JhbS1mb2N1c2VkIC5tYXQtY2FsZW5kYXItYm9keS1hY3RpdmUge1xuICAgIEBpbmNsdWRlIF9oaWdobGlnaHRlZC1jZWxsKCRwYWxldHRlKTtcbiAgfVxuXG4gIEBtZWRpYSAoaG92ZXI6IGhvdmVyKSB7XG4gICAgLm1hdC1jYWxlbmRhci1ib2R5LWNlbGw6bm90KC5tYXQtY2FsZW5kYXItYm9keS1kaXNhYmxlZCk6aG92ZXIge1xuICAgICAgQGluY2x1ZGUgX2hpZ2hsaWdodGVkLWNlbGwoJHBhbGV0dGUpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBVdGlsaXR5IG1peGluIHRvIHRhcmdldCBjZWxscyB0aGF0IGFyZW4ndCBzZWxlY3RlZC4gVXNlZCB0byBtYWtlIHNlbGVjdG9yIGVhc2llciB0byBmb2xsb3cuXG5AbWl4aW4gX3Vuc2VsZWN0ZWQtY2VsbCB7XG4gICY6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCk6bm90KC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWlkZW50aWNhbCkge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbi8vIFN0eWxlcyBmb3IgYSBoaWdobGlnaHRlZCBjYWxlbmRhciBjZWxsIChlLmcuIGhvdmVyZWQgb3IgZm9jdXNlZCkuXG5AbWl4aW4gX2hpZ2hsaWdodGVkLWNlbGwoJHBhbGV0dGUpIHtcbiAgJiA+IC5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQge1xuICAgIEBpbmNsdWRlIF91bnNlbGVjdGVkLWNlbGwge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwYWxldHRlLCAwLjMpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcbiAgJGRpc2FibGVkLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuXG4gIC5tYXQtY2FsZW5kYXItYXJyb3cge1xuICAgIGZpbGw6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgaWNvbik7XG4gIH1cblxuICAvLyBUaGUgcHJldi9uZXh0IGJ1dHRvbnMgbmVlZCBhIGJpdCBtb3JlIHNwZWNpZmljaXR5IHRvXG4gIC8vIGF2b2lkIGJlaW5nIG92ZXJ3cml0dGVuIGJ5IHRoZSAubWF0LWljb24tYnV0dG9uLlxuICAubWF0LWRhdGVwaWNrZXItdG9nZ2xlLFxuICAubWF0LWRhdGVwaWNrZXItY29udGVudCAubWF0LWNhbGVuZGFyLW5leHQtYnV0dG9uLFxuICAubWF0LWRhdGVwaWNrZXItY29udGVudCAubWF0LWNhbGVuZGFyLXByZXZpb3VzLWJ1dHRvbiB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgaWNvbik7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLXRhYmxlLWhlYWRlci1kaXZpZGVyOjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBkaXZpZGVyKTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyLFxuICAubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwge1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQsXG4gIC5tYXQtZGF0ZS1yYW5nZS1pbnB1dC1zZXBhcmF0b3Ige1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQgPiAubWF0LWNhbGVuZGFyLWJvZHktY2VsbC1jb250ZW50IHtcbiAgICBAaW5jbHVkZSBfdW5zZWxlY3RlZC1jZWxsIHtcbiAgICAgIGNvbG9yOiAkZGlzYWJsZWQtY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWRpc2FibGVkIC5tYXQtZGF0ZS1yYW5nZS1pbnB1dC1zZXBhcmF0b3Ige1xuICAgIGNvbG9yOiAkZGlzYWJsZWQtY29sb3I7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktaW4tcHJldmlldyB7XG4gICAgJGRpdmlkZXItY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG5cbiAgICBAaWYgbWV0YS50eXBlLW9mKCRkaXZpZGVyLWNvbG9yKSA9PSBjb2xvciB7XG4gICAgICAvLyBUaGUgZGl2aWRlciBjb2xvciBpcyBzZXQgdW5kZXIgdGhlIGFzc3VtcHRpb24gdGhhdCBpdCdsbCBiZSB1c2VkXG4gICAgICAvLyBmb3IgYSBzb2xpZCBib3JkZXIsIGJ1dCBiZWNhdXNlIHdlJ3JlIHVzaW5nIGEgZGFzaGVkIGJvcmRlciBmb3IgdGhlXG4gICAgICAvLyBwcmV2aWV3IHJhbmdlLCB3ZSBuZWVkIHRvIGJ1bXAgaXRzIG9wYWNpdHkgdG8gZW5zdXJlIHRoYXQgaXQncyB2aXNpYmxlLlxuICAgICAgY29sb3I6IHJnYmEoJGRpdmlkZXItY29sb3IsIG1hdGgubWluKG9wYWNpdHkoJGRpdmlkZXItY29sb3IpICogMiwgMSkpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICBjb2xvcjogJGRpdmlkZXItY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1jYWxlbmRhci1ib2R5LXRvZGF5IHtcbiAgICBAaW5jbHVkZSBfdW5zZWxlY3RlZC1jZWxsIHtcbiAgICAgIC8vIE5vdGU6IHRob3VnaCBpdCdzIG5vdCB0ZXh0LCB0aGUgYm9yZGVyIGlzIGEgaGludCBhYm91dCB0aGUgZmFjdCB0aGF0IHRoaXMgaXMgdG9kYXkncyBkYXRlLFxuICAgICAgLy8gc28gd2UgdXNlIHRoZSBoaW50IGNvbG9yLlxuICAgICAgYm9yZGVyLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGhpbnQtdGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1jYWxlbmRhci1ib2R5LWRpc2FibGVkID4gLm1hdC1jYWxlbmRhci1ib2R5LXRvZGF5IHtcbiAgICBAaW5jbHVkZSBfdW5zZWxlY3RlZC1jZWxsIHtcbiAgICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBoaW50LXRleHQpO1xuXG4gICAgICBAaWYgKG1ldGEudHlwZS1vZigkY29sb3IpID09IGNvbG9yKSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogY29sb3IuYWRqdXN0KCRjb2xvciwgJGFscGhhOiAtJHRvZGF5LWZhZGUtYW1vdW50KTtcbiAgICAgIH1cbiAgICAgIEBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlIGNvbG9yIGRpZG4ndCByZXNvbHZlIHRvIGEgY29sb3IgdmFsdWUsIGJ1dCBzb21ldGhpbmcgbGlrZSBhIENTUyB2YXJpYWJsZSwgd2UgY2FuJ3RcbiAgICAgICAgLy8gZmFkZSBpdCBvdXQgc28gd2UgZmFsbCBiYWNrIHRvIHJlZHVjaW5nIHRoZSBlbGVtZW50IG9wYWNpdHkuIE5vdGUgdGhhdCB3ZSBkb24ndCB1c2UgdGhlXG4gICAgICAgIC8vICRtYXQtZGF0ZXBpY2tlci10b2RheS1mYWRlLWFtb3VudCwgYmVjYXVzZSBoaW50IHRleHQgdXN1YWxseSBoYXMgc29tZSBvcGFjaXR5IGFwcGxpZWRcbiAgICAgICAgLy8gdG8gaXQgYWxyZWFkeSBhbmQgd2UgZG9uJ3Qgd2FudCB0aGVtIHRvIHN0YWNrIG9uIHRvcCBvZiBlYWNoIG90aGVyLlxuICAgICAgICBvcGFjaXR5OiAwLjU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQGluY2x1ZGUgX2NvbG9yKG1hcC5nZXQoJGNvbmZpZywgcHJpbWFyeSkpO1xuXG4gIC5tYXQtZGF0ZXBpY2tlci1jb250ZW50IHtcbiAgICBAaW5jbHVkZSBwcml2YXRlLnByaXZhdGUtdGhlbWUtZWxldmF0aW9uKDQsICRjb25maWcpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgY2FyZCk7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgdGV4dCk7XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgQGluY2x1ZGUgX2NvbG9yKG1hcC5nZXQoJGNvbmZpZywgYWNjZW50KSk7XG4gICAgfVxuXG4gICAgJi5tYXQtd2FybiB7XG4gICAgICBAaW5jbHVkZSBfY29sb3IobWFwLmdldCgkY29uZmlnLCB3YXJuKSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQtdG91Y2gge1xuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1lbGV2YXRpb24oMjQsICRjb25maWcpO1xuICB9XG5cbiAgLm1hdC1kYXRlcGlja2VyLXRvZ2dsZS1hY3RpdmUge1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUobWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KSwgdGV4dCk7XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZShtYXAuZ2V0KCRjb25maWcsIGFjY2VudCksIHRleHQpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZShtYXAuZ2V0KCRjb25maWcsIHdhcm4pLCB0ZXh0KTtcbiAgICB9XG4gIH1cblxuICAubWF0LWRhdGUtcmFuZ2UtaW5wdXQtaW5uZXJbZGlzYWJsZWRdIHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC10ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LWNhbGVuZGFyIHtcbiAgICBmb250LWZhbWlseTogdHlwb2dyYXBoeS11dGlscy5mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keSB7XG4gICAgZm9udC1zaXplOiAkY2FsZW5kYXItYm9keS1mb250LXNpemU7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsXG4gIC5tYXQtY2FsZW5kYXItcGVyaW9kLWJ1dHRvbiB7XG4gICAgZm9udDoge1xuICAgICAgc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgYnV0dG9uKTtcbiAgICAgIHdlaWdodDogdHlwb2dyYXBoeS11dGlscy5mb250LXdlaWdodCgkY29uZmlnLCBidXR0b24pO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyIHRoIHtcbiAgICBmb250OiB7XG4gICAgICBzaXplOiAkY2FsZW5kYXItd2Vla2RheS10YWJsZS1mb250LXNpemU7XG4gICAgICB3ZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMuZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGRhdGUtcmFuZ2UtY29sb3JzKFxuICAkcmFuZ2UtY29sb3IsXG4gICRjb21wYXJpc29uLWNvbG9yOiByZ2JhKCNmOWFiMDAsICRyYW5nZS1mYWRlLWFtb3VudCksXG4gICRvdmVybGFwLWNvbG9yOiAjYThkYWI1LFxuICAkb3ZlcmxhcC1zZWxlY3RlZC1jb2xvcjogY29sb3IuYWRqdXN0KCRvdmVybGFwLWNvbG9yLCAkbGlnaHRuZXNzOiAtMzAlKSkge1xuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1pbi1yYW5nZTo6YmVmb3JlIHtcbiAgICBiYWNrZ3JvdW5kOiAkcmFuZ2UtY29sb3I7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwsXG4gIC5tYXQtY2FsZW5kYXItYm9keS1pbi1jb21wYXJpc29uLXJhbmdlOjpiZWZvcmUge1xuICAgIGJhY2tncm91bmQ6ICRjb21wYXJpc29uLWNvbG9yO1xuICB9XG5cbiAgLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24tYnJpZGdlLXN0YXJ0OjpiZWZvcmUsXG4gIFtkaXI9J3J0bCddIC5tYXQtY2FsZW5kYXItYm9keS1jb21wYXJpc29uLWJyaWRnZS1lbmQ6OmJlZm9yZSB7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAkcmFuZ2UtY29sb3IgNTAlLCAkY29tcGFyaXNvbi1jb2xvciA1MCUpO1xuICB9XG5cbiAgLm1hdC1jYWxlbmRhci1ib2R5LWNvbXBhcmlzb24tYnJpZGdlLWVuZDo6YmVmb3JlLFxuICBbZGlyPSdydGwnXSAubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1icmlkZ2Utc3RhcnQ6OmJlZm9yZSB7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGxlZnQsICRyYW5nZS1jb2xvciA1MCUsICRjb21wYXJpc29uLWNvbG9yIDUwJSk7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktaW4tcmFuZ2UgPiAubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwsXG4gIC5tYXQtY2FsZW5kYXItYm9keS1pbi1jb21wYXJpc29uLXJhbmdlLm1hdC1jYWxlbmRhci1ib2R5LWluLXJhbmdlOjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogJG92ZXJsYXAtY29sb3I7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktY29tcGFyaXNvbi1pZGVudGljYWwubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQsXG4gIC5tYXQtY2FsZW5kYXItYm9keS1pbi1jb21wYXJpc29uLXJhbmdlID4gLm1hdC1jYWxlbmRhci1ib2R5LXNlbGVjdGVkIHtcbiAgICBiYWNrZ3JvdW5kOiAkb3ZlcmxhcC1zZWxlY3RlZC1jb2xvcjtcbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LWRhdGVwaWNrZXInKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBfZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnLi4vY29yZS9zdHlsZS9wcml2YXRlJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcblxuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LWRpYWxvZy1jb250YWluZXIge1xuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1lbGV2YXRpb24oMjQsICRjb25maWcpO1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgZGlhbG9nKTtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LWRpYWxvZy10aXRsZSB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy50eXBvZ3JhcGh5LWxldmVsKCRjb25maWcsIHRpdGxlKTtcbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LWRpYWxvZycpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9jb3JlL2RlbnNpdHkvcHJpdmF0ZS9jb21wYXRpYmlsaXR5JztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvcHJpdmF0ZSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5AdXNlICcuL2V4cGFuc2lvbi12YXJpYWJsZXMnO1xuQHVzZSAnLi9leHBhbnNpb24tbWl4aW5zJztcblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWwge1xuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMiwgJGNvbmZpZyk7XG4gICAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxuXG4gIC5tYXQtYWN0aW9uLXJvdyB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBkaXZpZGVyKTtcbiAgfVxuXG4gIEBpbmNsdWRlIGV4cGFuc2lvbi1taXhpbnMucHJpdmF0ZS1leHBhbnNpb24tZm9jdXMge1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgaG92ZXIpO1xuICB9XG5cbiAgLy8gRGlzYWJsZSB0aGUgaG92ZXIgb24gdG91Y2ggZGV2aWNlcyBzaW5jZSBpdCBjYW4gYXBwZWFyIGxpa2UgaXQgaXMgc3R1Y2suIFdlIGNhbid0IHVzZVxuICAvLyBgQG1lZGlhIChob3ZlcilgIGFib3ZlLCBiZWNhdXNlIHRoZSBkZXNrdG9wIHN1cHBvcnQgYnJvd3NlciBzdXBwb3J0IGlzbid0IGdyZWF0LlxuICBAbWVkaWEgKGhvdmVyOiBub25lKSB7XG4gICAgLm1hdC1leHBhbnNpb24tcGFuZWw6bm90KC5tYXQtZXhwYW5kZWQpOm5vdChbYXJpYS1kaXNhYmxlZD0ndHJ1ZSddKVxuICAgICAgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgY2FyZCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLXRpdGxlIHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxuXG4gIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci1kZXNjcmlwdGlvbixcbiAgLm1hdC1leHBhbnNpb24taW5kaWNhdG9yOjphZnRlciB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICB9XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyW2FyaWEtZGlzYWJsZWQ9J3RydWUnXSB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGlzYWJsZWQtYnV0dG9uKTtcblxuICAgIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci10aXRsZSxcbiAgICAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItZGVzY3JpcHRpb24ge1xuICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiB0eXBvZ3JhcGh5KCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdHlwb2dyYXBoeS5wcml2YXRlLXR5cG9ncmFwaHktdG8tMjAxNC1jb25maWcoXG4gICAgICB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKSk7XG4gIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtZmFtaWx5KCRjb25maWcsIHN1YmhlYWRpbmctMSk7XG4gICAgICBzaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBzdWJoZWFkaW5nLTEpO1xuICAgICAgd2VpZ2h0OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtd2VpZ2h0KCRjb25maWcsIHN1YmhlYWRpbmctMSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudCB7XG4gICAgQGluY2x1ZGUgdHlwb2dyYXBoeS11dGlscy50eXBvZ3JhcGh5LWxldmVsKCRjb25maWcsIGJvZHktMSk7XG4gIH1cbn1cblxuQG1peGluIGRlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkZGVuc2l0eS1zY2FsZTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRleHBhbmRlZC1oZWlnaHQ6IGNvbXBhdGliaWxpdHkucHJpdmF0ZS1kZW5zaXR5LXByb3AtdmFsdWUoXG4gICAgICAgIGV4cGFuc2lvbi12YXJpYWJsZXMuJGhlYWRlci1kZW5zaXR5LWNvbmZpZywgJGRlbnNpdHktc2NhbGUsIGV4cGFuZGVkLWhlaWdodCk7XG4gICRjb2xsYXBzZWQtaGVpZ2h0OiBjb21wYXRpYmlsaXR5LnByaXZhdGUtZGVuc2l0eS1wcm9wLXZhbHVlKFxuICAgICAgZXhwYW5zaW9uLXZhcmlhYmxlcy4kaGVhZGVyLWRlbnNpdHktY29uZmlnLCAkZGVuc2l0eS1zY2FsZSwgY29sbGFwc2VkLWhlaWdodCk7XG5cbiAgQGluY2x1ZGUgY29tcGF0aWJpbGl0eS5wcml2YXRlLWRlbnNpdHktbGVnYWN5LWNvbXBhdGliaWxpdHkoKSB7XG4gICAgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyIHtcbiAgICAgIGhlaWdodDogJGNvbGxhcHNlZC1oZWlnaHQ7XG5cbiAgICAgICYubWF0LWV4cGFuZGVkIHtcbiAgICAgICAgaGVpZ2h0OiAkZXhwYW5kZWQtaGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtZXhwYW5zaW9uJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2FzczptYXRoJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcblxuQHVzZSAnLi9mb3JtLWZpZWxkLWZpbGwtdGhlbWUuc2Nzcyc7XG5AdXNlICcuL2Zvcm0tZmllbGQtbGVnYWN5LXRoZW1lLnNjc3MnO1xuQHVzZSAnLi9mb3JtLWZpZWxkLW91dGxpbmUtdGhlbWUuc2Nzcyc7XG5AdXNlICcuL2Zvcm0tZmllbGQtc3RhbmRhcmQtdGhlbWUuc2Nzcyc7XG5cbi8vIENvbG9yIHN0eWxlcyB0aGF0IGFwcGx5IHRvIGFsbCBhcHBlYXJhbmNlcyBvZiB0aGUgZm9ybS1maWVsZC5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJHByaW1hcnk6IG1hcC5nZXQoJGNvbmZpZywgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC5nZXQoJGNvbmZpZywgYWNjZW50KTtcbiAgJHdhcm46IG1hcC5nZXQoJGNvbmZpZywgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC5nZXQoJGNvbmZpZywgaXMtZGFyayk7XG5cbiAgLy8gTGFiZWwgY29sb3JzLiBSZXF1aXJlZCBpcyB1c2VkIGZvciB0aGUgYCpgIHN0YXIgc2hvd24gaW4gdGhlIGxhYmVsLlxuICAkbGFiZWwtY29sb3I6XG4gICAgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCwgaWYoJGlzLWRhcmstdGhlbWUsIDAuNywgMC42KSk7XG4gICRmb2N1c2VkLWxhYmVsLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHByaW1hcnksIHRleHQpO1xuICAkcmVxdWlyZWQtbGFiZWwtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYWNjZW50LCB0ZXh0KTtcblxuICAvLyBVbmRlcmxpbmUgY29sb3JzLlxuICAkdW5kZXJsaW5lLWNvbG9yLWJhc2U6XG4gICAgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMSwgMC44NykpO1xuICAkdW5kZXJsaW5lLWNvbG9yLWFjY2VudDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRhY2NlbnQsIHRleHQpO1xuICAkdW5kZXJsaW5lLWNvbG9yLXdhcm46IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkd2FybiwgdGV4dCk7XG4gICR1bmRlcmxpbmUtZm9jdXNlZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwcmltYXJ5LCB0ZXh0KTtcblxuICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgIGNvbG9yOiAkbGFiZWwtY29sb3I7XG4gIH1cblxuICAubWF0LWhpbnQge1xuICAgIGNvbG9yOiAkbGFiZWwtY29sb3I7XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICBjb2xvcjogJGZvY3VzZWQtbGFiZWwtY29sb3I7XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgY29sb3I6ICR1bmRlcmxpbmUtY29sb3ItYWNjZW50O1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgY29sb3I6ICR1bmRlcmxpbmUtY29sb3Itd2FybjtcbiAgICB9XG4gIH1cblxuICAubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLXJlcXVpcmVkLW1hcmtlciB7XG4gICAgY29sb3I6ICRyZXF1aXJlZC1sYWJlbC1jb2xvcjtcbiAgfVxuXG4gIC5tYXQtZm9ybS1maWVsZC1yaXBwbGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR1bmRlcmxpbmUtY29sb3ItYmFzZTtcbiAgfVxuXG4gIC5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCB7XG4gICAgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdW5kZXJsaW5lLWZvY3VzZWQtY29sb3I7XG5cbiAgICAgICYubWF0LWFjY2VudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR1bmRlcmxpbmUtY29sb3ItYWNjZW50O1xuICAgICAgfVxuXG4gICAgICAmLm1hdC13YXJuIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvci13YXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5tYXQtZm9ybS1maWVsZC10eXBlLW1hdC1uYXRpdmUtc2VsZWN0Lm1hdC1mb2N1c2VkOm5vdCgubWF0LWZvcm0tZmllbGQtaW52YWxpZCkge1xuICAgIC5tYXQtZm9ybS1maWVsZC1pbmZpeDo6YWZ0ZXIge1xuICAgICAgY29sb3I6ICR1bmRlcmxpbmUtZm9jdXNlZC1jb2xvcjtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQgLm1hdC1mb3JtLWZpZWxkLWluZml4OjphZnRlciB7XG4gICAgICBjb2xvcjogJHVuZGVybGluZS1jb2xvci1hY2NlbnQ7XG4gICAgfVxuXG4gICAgJi5tYXQtd2FybiAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVyIHtcbiAgICAgIGNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLXdhcm47XG4gICAgfVxuICB9XG5cbiAgLy8gU3R5bGluZyBmb3IgdGhlIGVycm9yIHN0YXRlIG9mIHRoZSBmb3JtIGZpZWxkLiBOb3RlIHRoYXQgd2hpbGUgdGhlIHNhbWUgY2FuIGJlXG4gIC8vIGFjaGlldmVkIHdpdGggdGhlIG5nLSogY2xhc3Nlcywgd2UgdXNlIHRoaXMgYXBwcm9hY2ggaW4gb3JkZXIgdG8gZW5zdXJlIHRoYXQgdGhlIHNhbWVcbiAgLy8gbG9naWMgaXMgdXNlZCB0byBzdHlsZSB0aGUgZXJyb3Igc3RhdGUgYW5kIHRvIHNob3cgdGhlIGVycm9yIG1lc3NhZ2VzLlxuICAubWF0LWZvcm0tZmllbGQubWF0LWZvcm0tZmllbGQtaW52YWxpZCB7XG4gICAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICAgIGNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLXdhcm47XG5cbiAgICAgICYubWF0LWFjY2VudCxcbiAgICAgIC5tYXQtZm9ybS1maWVsZC1yZXF1aXJlZC1tYXJrZXIge1xuICAgICAgICBjb2xvcjogJHVuZGVybGluZS1jb2xvci13YXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC1yaXBwbGUsXG4gICAgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZS5tYXQtYWNjZW50IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR1bmRlcmxpbmUtY29sb3Itd2FybjtcbiAgICB9XG4gIH1cblxuICAubWF0LWVycm9yIHtcbiAgICBjb2xvcjogJHVuZGVybGluZS1jb2xvci13YXJuO1xuICB9XG5cbiAgQGluY2x1ZGUgZm9ybS1maWVsZC1sZWdhY3ktdGhlbWUubGVnYWN5LWNvbG9yKCRjb25maWcpO1xuICBAaW5jbHVkZSBmb3JtLWZpZWxkLXN0YW5kYXJkLXRoZW1lLnN0YW5kYXJkLWNvbG9yKCRjb25maWcpO1xuICBAaW5jbHVkZSBmb3JtLWZpZWxkLWZpbGwtdGhlbWUuZmlsbC1jb2xvcigkY29uZmlnKTtcbiAgQGluY2x1ZGUgZm9ybS1maWVsZC1vdXRsaW5lLXRoZW1lLm91dGxpbmUtY29sb3IoJGNvbmZpZyk7XG59XG5cbi8vIFVzZWQgdG8gbWFrZSBpbnN0YW5jZXMgb2YgdGhlIF9tYXQtZm9ybS1maWVsZC1sYWJlbC1mbG9hdGluZyBtaXhpbiBuZWdsaWdpYmx5IGRpZmZlcmVudCxcbi8vIGFuZCBwcmV2ZW50IEdvb2dsZSdzIENTUyBPcHRpbWl6ZXIgZnJvbSBjb2xsYXBzaW5nIHRoZSBkZWNsYXJhdGlvbnMuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2Ugc29tZVxuLy8gb2YgdGhlIHNlbGVjdG9ycyBjb250YWluIHBzZXVkby1jbGFzc2VzIG5vdCByZWNvZ25pemVkIGluIGFsbCBicm93c2Vycy4gSWYgYSBicm93c2VyIGVuY291bnRlcnNcbi8vIGFuIHVua25vd24gcHNldWRvLWNsYXNzIGl0IHdpbGwgZGlzY2FyZCB0aGUgZW50aXJlIHJ1bGUgc2V0LlxuJGRlZHVwZTogMDtcblxuLy8gQXBwbGllcyBhIGZsb2F0aW5nIGxhYmVsIGFib3ZlIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wgaXRzZWxmLlxuQG1peGluIF9sYWJlbC1mbG9hdGluZygkZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtJGluZml4LW1hcmdpbi10b3AgLSAkaW5maXgtcGFkZGluZyArICRkZWR1cGUpXG4gICAgICAgICAgICAgc2NhbGUoJGZvbnQtc2NhbGUpO1xuICB3aWR0aDogbWF0aC5kaXYoMTAwJSwgJGZvbnQtc2NhbGUpICsgJGRlZHVwZTtcblxuICAkZGVkdXBlOiAkZGVkdXBlICsgMC4wMDAwMSAhZ2xvYmFsO1xufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAvLyBUaGUgdW5pdC1sZXNzIGxpbmUtaGVpZ2h0IGZyb20gdGhlIGZvbnQgY29uZmlnLlxuICAkbGluZS1oZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMubGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuXG4gIC8vIFRoZSBhbW91bnQgdG8gc2NhbGUgdGhlIGZvbnQgZm9yIHRoZSBmbG9hdGluZyBsYWJlbCBhbmQgc3Vic2NyaXB0LlxuICAkc3Vic2NyaXB0LWZvbnQtc2NhbGU6IDAuNzU7XG4gIC8vIFRoZSBhbW91bnQgdG8gc2NhbGUgdGhlIGZvbnQgZm9yIHRoZSBwcmVmaXggYW5kIHN1ZmZpeCBpY29ucy5cbiAgJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNjYWxlOiAxLjU7XG5cbiAgLy8gVGhlIHBhZGRpbmcgb24gdGhlIGluZml4LiBNb2NrcyBzaG93IGhhbGYgb2YgdGhlIHRleHQgc2l6ZS5cbiAgJGluZml4LXBhZGRpbmc6IDAuNWVtO1xuICAvLyBUaGUgbWFyZ2luIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtaW5maXggdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLlxuICAvLyBJZiB0aGUgbGluZS1oZWlnaHQgaXMgZ2l2ZW4gYXMgYSB1bml0bGVzcyBudW1iZXIsIGNvZXJjZSBpdCB0byBgZW1gLlxuICAkaW5maXgtbWFyZ2luLXRvcDogJHN1YnNjcmlwdC1mb250LXNjYWxlICpcbiAgICAgIHR5cG9ncmFwaHktdXRpbHMucHJpdmF0ZS1jb2VyY2UtdW5pdGxlc3MtdG8tZW0oJGxpbmUtaGVpZ2h0KTtcbiAgLy8gRm9udCBzaXplIHRvIHVzZSBmb3IgdGhlIGxhYmVsIGFuZCBzdWJzY3JpcHQgdGV4dC5cbiAgJHN1YnNjcmlwdC1mb250LXNpemU6ICRzdWJzY3JpcHQtZm9udC1zY2FsZSAqIDEwMCU7XG4gIC8vIEZvbnQgc2l6ZSB0byB1c2UgZm9yIHRoZSBmb3IgdGhlIHByZWZpeCBhbmQgc3VmZml4IGljb25zLlxuICAkcHJlZml4LXN1ZmZpeC1pY29uLWZvbnQtc2l6ZTogJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNjYWxlICogMTAwJTtcbiAgLy8gVGhlIHNwYWNlIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgLm1hdC1mb3JtLWZpZWxkLWZsZXggYXJlYSBhbmQgdGhlIHN1YnNjcmlwdCB3cmFwcGVyLlxuICAvLyBNb2NrcyBzaG93IGhhbGYgb2YgdGhlIHRleHQgc2l6ZSwgYnV0IHRoaXMgbWFyZ2luIGlzIGFwcGxpZWQgdG8gYW4gZWxlbWVudCB3aXRoIHRoZSBzdWJzY3JpcHRcbiAgLy8gdGV4dCBmb250IHNpemUsIHNvIHdlIG5lZWQgdG8gZGl2aWRlIGJ5IHRoZSBzY2FsZSBmYWN0b3IgdG8gbWFrZSBpdCBoYWxmIG9mIHRoZSBvcmlnaW5hbCB0ZXh0XG4gIC8vIHNpemUuXG4gICRzdWJzY3JpcHQtbWFyZ2luLXRvcDogbWF0aC5kaXYoMC41ZW0sICRzdWJzY3JpcHQtZm9udC1zY2FsZSk7XG4gIC8vIFRoZSBwYWRkaW5nIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtd3JhcHBlciB0byByZXNlcnZlIHNwYWNlIGZvciB0aGUgc3Vic2NyaXB0LCBzaW5jZSBpdCdzXG4gIC8vIGFic29sdXRlbHkgcG9zaXRpb25lZC4gVGhpcyBpcyBhIGNvbWJpbmF0aW9uIG9mIHRoZSBzdWJzY3JpcHQncyBtYXJnaW4gYW5kIGxpbmUtaGVpZ2h0LCBidXQgd2VcbiAgLy8gbmVlZCB0byBtdWx0aXBseSBieSB0aGUgc3Vic2NyaXB0IGZvbnQgc2NhbGUgZmFjdG9yIHNpbmNlIHRoZSB3cmFwcGVyIGhhcyBhIGxhcmdlciBmb250IHNpemUuXG4gICR3cmFwcGVyLXBhZGRpbmctYm90dG9tOiAoJHN1YnNjcmlwdC1tYXJnaW4tdG9wICsgJGxpbmUtaGVpZ2h0KSAqICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcblxuICAubWF0LWZvcm0tZmllbGQge1xuICAgIEBpbmNsdWRlIHR5cG9ncmFwaHktdXRpbHMudHlwb2dyYXBoeS1sZXZlbCgkY29uZmlnLCBpbnB1dCk7XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XG4gICAgcGFkZGluZy1ib3R0b206ICR3cmFwcGVyLXBhZGRpbmctYm90dG9tO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXByZWZpeCxcbiAgLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCB7XG4gICAgLy8gQWxsb3cgaWNvbnMgaW4gYSBwcmVmaXggb3Igc3VmZml4IHRvIGFkYXB0IHRvIHRoZSBjb3JyZWN0IHNpemUuXG4gICAgLm1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNpemU7XG4gICAgICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIEFsbG93IGljb24gYnV0dG9ucyBpbiBhIHByZWZpeCBvciBzdWZmaXggdG8gYWRhcHQgdG8gdGhlIGNvcnJlY3Qgc2l6ZS5cbiAgICAubWF0LWljb24tYnV0dG9uIHtcbiAgICAgIGhlaWdodDogJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNjYWxlICogMWVtO1xuICAgICAgd2lkdGg6ICRwcmVmaXgtc3VmZml4LWljb24tZm9udC1zY2FsZSAqIDFlbTtcblxuICAgICAgLm1hdC1pY29uIHtcbiAgICAgICAgaGVpZ2h0OiB0eXBvZ3JhcGh5LXV0aWxzLnByaXZhdGUtY29lcmNlLXVuaXRsZXNzLXRvLWVtKCRsaW5lLWhlaWdodCk7XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICBwYWRkaW5nOiAkaW5maXgtcGFkZGluZyAwO1xuICAgIC8vIFRocm93cyBvZmYgdGhlIGJhc2VsaW5lIGlmIHdlIGRvIGl0IGFzIGEgcmVhbCBtYXJnaW4sIHNvIHdlIGRvIGl0IGFzIGEgYm9yZGVyIGluc3RlYWQuXG4gICAgYm9yZGVyLXRvcDogJGluZml4LW1hcmdpbi10b3Agc29saWQgdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IHtcbiAgICAmLm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWwsXG4gICAgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgQGluY2x1ZGUgX2xhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgfVxuXG4gICAgLy8gU2VydmVyLXNpZGUgcmVuZGVyZWQgbWF0SW5wdXQgd2l0aCBhIGxhYmVsIGF0dHJpYnV0ZSBidXQgbGFiZWwgbm90IHNob3duXG4gICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlclxuICAgICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgQGluY2x1ZGUgX2xhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIge1xuICAgIHRvcDogLSRpbmZpeC1tYXJnaW4tdG9wO1xuICAgIHBhZGRpbmctdG9wOiAkaW5maXgtbWFyZ2luLXRvcDtcbiAgfVxuXG4gIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgdG9wOiAkaW5maXgtbWFyZ2luLXRvcCArICRpbmZpeC1wYWRkaW5nO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZSB7XG4gICAgLy8gV2Ugd2FudCB0aGUgdW5kZXJsaW5lIHRvIHN0YXJ0IGF0IHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQgYm94LCBub3QgdGhlIHBhZGRpbmcgYm94LFxuICAgIC8vIHNvIHdlIG1vdmUgaXQgdXAgYnkgdGhlIHBhZGRpbmcgYW1vdW50LlxuICAgIGJvdHRvbTogJHdyYXBwZXItcGFkZGluZy1ib3R0b207XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xuICAgIGZvbnQtc2l6ZTogJHN1YnNjcmlwdC1mb250LXNpemU7XG4gICAgbWFyZ2luLXRvcDogJHN1YnNjcmlwdC1tYXJnaW4tdG9wO1xuXG4gICAgLy8gV2Ugd2FudCB0aGUgc3Vic2NyaXB0IHRvIHN0YXJ0IGF0IHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQgYm94LCBub3QgdGhlIHBhZGRpbmcgYm94LFxuICAgIC8vIHNvIHdlIG1vdmUgaXQgdXAgYnkgdGhlIHBhZGRpbmcgYW1vdW50IChhZGp1c3RlZCBmb3IgdGhlIHNtYWxsZXIgZm9udCBzaXplKTtcbiAgICB0b3A6IGNhbGMoMTAwJSAtICN7bWF0aC5kaXYoJHdyYXBwZXItcGFkZGluZy1ib3R0b20sICRzdWJzY3JpcHQtZm9udC1zY2FsZSl9KTtcbiAgfVxuXG4gIEBpbmNsdWRlIGZvcm0tZmllbGQtbGVnYWN5LXRoZW1lLmxlZ2FjeS10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBmb3JtLWZpZWxkLXN0YW5kYXJkLXRoZW1lLnN0YW5kYXJkLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIGZvcm0tZmllbGQtZmlsbC10aGVtZS5maWxsLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIGZvcm0tZmllbGQtb3V0bGluZS10aGVtZS5vdXRsaW5lLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG59XG5cbkBtaXhpbiBkZW5zaXR5KCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGRlbnNpdHktc2NhbGU6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICBAaW5jbHVkZSBmb3JtLWZpZWxkLWxlZ2FjeS10aGVtZS5wcml2YXRlLWZvcm0tZmllbGQtbGVnYWN5LWRlbnNpdHkoJGRlbnNpdHktc2NhbGUpO1xuICBAaW5jbHVkZSBmb3JtLWZpZWxkLXN0YW5kYXJkLXRoZW1lLnByaXZhdGUtZm9ybS1maWVsZC1zdGFuZGFyZC1kZW5zaXR5KCRkZW5zaXR5LXNjYWxlKTtcbiAgQGluY2x1ZGUgZm9ybS1maWVsZC1maWxsLXRoZW1lLnByaXZhdGUtZm9ybS1maWVsZC1maWxsLWRlbnNpdHkoJGRlbnNpdHktc2NhbGUpO1xuICBAaW5jbHVkZSBmb3JtLWZpZWxkLW91dGxpbmUtdGhlbWUucHJpdmF0ZS1mb3JtLWZpZWxkLW91dGxpbmUtZGVuc2l0eSgkZGVuc2l0eS1zY2FsZSk7XG59XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1mb3JtLWZpZWxkJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2FzczptYXRoJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvZm9ybS1jb21tb24nO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHknO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHktdXRpbHMnO1xuXG5cbi8vIFRoZW1lIHN0eWxlcyB0aGF0IG9ubHkgYXBwbHkgdG8gdGhlIGxlZ2FjeSBhcHBlYXJhbmNlIG9mIHRoZSBmb3JtLWZpZWxkLlxuXG5AbWl4aW4gbGVnYWN5LWNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC5nZXQoJGNvbmZpZywgaXMtZGFyayk7XG5cbiAgJGxhYmVsLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgJHVuZGVybGluZS1jb2xvcjpcbiAgICB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpdmlkZXIsIGlmKCRpcy1kYXJrLXRoZW1lLCAwLjcsIDAuNDIpKTtcblxuICAubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kge1xuICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICBjb2xvcjogJGxhYmVsLWNvbG9yO1xuICAgIH1cblxuICAgIC5tYXQtaGludCB7XG4gICAgICBjb2xvcjogJGxhYmVsLWNvbG9yO1xuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvcjtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWRpc2FibGVkIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgQGluY2x1ZGUgZm9ybS1jb21tb24ucHJpdmF0ZS1jb250cm9sLWRpc2FibGVkLXVuZGVybGluZSgkdW5kZXJsaW5lLWNvbG9yKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gVXNlZCB0byBtYWtlIGluc3RhbmNlcyBvZiB0aGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nIG1peGluIG5lZ2xpZ2libHkgZGlmZmVyZW50LFxuLy8gYW5kIHByZXZlbnQgR29vZ2xlJ3MgQ1NTIE9wdGltaXplciBmcm9tIGNvbGxhcHNpbmcgdGhlIGRlY2xhcmF0aW9ucy4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBzb21lXG4vLyBvZiB0aGUgc2VsZWN0b3JzIGNvbnRhaW4gcHNldWRvLWNsYXNzZXMgbm90IHJlY29nbml6ZWQgaW4gYWxsIGJyb3dzZXJzLiBJZiBhIGJyb3dzZXIgZW5jb3VudGVyc1xuLy8gYW4gdW5rbm93biBwc2V1ZG8tY2xhc3MgaXQgd2lsbCBkaXNjYXJkIHRoZSBlbnRpcmUgcnVsZSBzZXQuXG4kbGVnYWN5LWRlZHVwZTogMDtcblxuLy8gQXBwbGllcyBhIGZsb2F0aW5nIGxhYmVsIGFib3ZlIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wgaXRzZWxmLlxuQG1peGluIF9sYWJlbC1mbG9hdGluZygkZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKSB7XG4gIC8vIFdlIHVzZSBwZXJzcGVjdGl2ZSB0byBmaXggdGhlIHRleHQgYmx1cnJpbmVzcyBhcyBkZXNjcmliZWQgaGVyZTpcbiAgLy8gaHR0cDovL3d3dy51c2VyYWdlbnRtYW4uY29tL2Jsb2cvMjAxNC8wNS8wNC9maXhpbmctdHlwb2dyYXBoeS1pbnNpZGUtb2YtMi1kLWNzcy10cmFuc2Zvcm1zL1xuICAvLyBUaGlzIHJlc3VsdHMgaW4gYSBzbWFsbCBqaXR0ZXIgYWZ0ZXIgdGhlIGxhYmVsIGZsb2F0cyBvbiBGaXJlZm94LCB3aGljaCB0aGVcbiAgLy8gdHJhbnNsYXRlWiBmaXhlcy5cbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0kaW5maXgtbWFyZ2luLXRvcCAtICRpbmZpeC1wYWRkaW5nKSBzY2FsZSgkZm9udC1zY2FsZSkgcGVyc3BlY3RpdmUoMTAwcHgpXG4gIHRyYW5zbGF0ZVooMC4wMDFweCArICRsZWdhY3ktZGVkdXBlKTtcbiAgd2lkdGg6IG1hdGguZGl2KDEwMCUsICRmb250LXNjYWxlKSArICRsZWdhY3ktZGVkdXBlO1xuXG4gICRsZWdhY3ktZGVkdXBlOiAkbGVnYWN5LWRlZHVwZSArIDAuMDAwMDEgIWdsb2JhbDtcbn1cblxuLy8gU2FtZSBhcyBtaXhpbiBhYm92ZSwgYnV0IG9taXRzIHRoZSB0cmFuc2xhdGVaIGZvciBwcmludGluZyBwdXJwb3Nlcy5cbkBtaXhpbiBfbGFiZWwtZmxvYXRpbmctcHJpbnQoJGZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCkge1xuICAvLyBUaGlzIHJlc3VsdHMgaW4gYSBzbWFsbCBqaXR0ZXIgYWZ0ZXIgdGhlIGxhYmVsIGZsb2F0cyBvbiBGaXJlZm94LCB3aGljaCB0aGVcbiAgLy8gdHJhbnNsYXRlWiBmaXhlcy5cbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0kaW5maXgtbWFyZ2luLXRvcCAtICRpbmZpeC1wYWRkaW5nICsgJGxlZ2FjeS1kZWR1cGUpXG4gICAgICAgICAgICAgICAgICBzY2FsZSgkZm9udC1zY2FsZSk7XG4gIC8vIFRoZSB0cmlja3MgYWJvdmUgdXNlZCB0byBzbW9vdGggb3V0IHRoZSBhbmltYXRpb24gb24gY2hyb21lIGFuZCBmaXJlZm94IGFjdHVhbGx5IG1ha2UgdGhpbmdzXG4gIC8vIHdvcnNlIG9uIElFLCBzbyB3ZSBkb24ndCBpbmNsdWRlIHRoZW0gaW4gdGhlIElFIHZlcnNpb24uXG4gICRsZWdhY3ktZGVkdXBlOiAkbGVnYWN5LWRlZHVwZSArIDAuMDAwMDEgIWdsb2JhbDtcbn1cblxuQG1peGluIGxlZ2FjeS10eXBvZ3JhcGh5KCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdHlwb2dyYXBoeS5wcml2YXRlLXR5cG9ncmFwaHktdG8tMjAxNC1jb25maWcoXG4gICAgICB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKSk7XG4gIC8vIFRoZSB1bml0LWxlc3MgbGluZS1oZWlnaHQgZnJvbSB0aGUgZm9udCBjb25maWcuXG4gICRsaW5lLWhlaWdodDogdHlwb2dyYXBoeS11dGlscy5saW5lLWhlaWdodCgkY29uZmlnLCBpbnB1dCk7XG4gIC8vIFRoZSBhbW91bnQgdG8gc2NhbGUgdGhlIGZvbnQgZm9yIHRoZSBmbG9hdGluZyBsYWJlbCBhbmQgc3Vic2NyaXB0LlxuICAkc3Vic2NyaXB0LWZvbnQtc2NhbGU6IDAuNzU7XG4gIC8vIFRoZSBhbW91bnQgb2Ygc3BhY2UgYmV0d2VlbiB0aGUgdG9wIG9mIHRoZSBsaW5lIGFuZCB0aGUgdG9wIG9mIHRoZSBhY3R1YWwgdGV4dFxuICAvLyAoYXMgYSBmcmFjdGlvbiBvZiB0aGUgZm9udC1zaXplKS5cbiAgJGxpbmUtc3BhY2luZzogbWF0aC5kaXYoJGxpbmUtaGVpZ2h0IC0gMSwgMik7XG4gIC8vIFRoZSBwYWRkaW5nIG9uIHRoZSBpbmZpeC4gTW9ja3Mgc2hvdyBoYWxmIG9mIHRoZSB0ZXh0IHNpemUsIGJ1dCBzZWVtIHRvIG1lYXN1cmUgZnJvbSB0aGUgZWRnZVxuICAvLyBvZiB0aGUgdGV4dCBpdHNlbGYsIG5vdCB0aGUgZWRnZSBvZiB0aGUgbGluZTsgdGhlcmVmb3JlIHdlIHN1YnRyYWN0IG9mZiB0aGUgbGluZSBzcGFjaW5nLlxuICAkaW5maXgtcGFkZGluZzogMC41ZW0gLSAkbGluZS1zcGFjaW5nO1xuICAvLyBUaGUgbWFyZ2luIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtaW5maXggdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLlxuICAvLyBJZiB0aGUgbGluZS1oZWlnaHQgaXMgZ2l2ZW4gYXMgYSB1bml0bGVzcyBudW1iZXIsIGNvZXJjZSBpdCB0byBgZW1gLlxuICAkaW5maXgtbWFyZ2luLXRvcDpcbiAgICAgICRzdWJzY3JpcHQtZm9udC1zY2FsZSAqIHR5cG9ncmFwaHktdXRpbHMucHJpdmF0ZS1jb2VyY2UtdW5pdGxlc3MtdG8tZW0oJGxpbmUtaGVpZ2h0KTtcbiAgLy8gVGhlIHNwYWNlIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgLm1hdC1mb3JtLWZpZWxkLWZsZXggYXJlYSBhbmQgdGhlIHN1YnNjcmlwdCB3cmFwcGVyLlxuICAvLyBNb2NrcyBzaG93IGhhbGYgb2YgdGhlIHRleHQgc2l6ZSwgYnV0IHRoaXMgbWFyZ2luIGlzIGFwcGxpZWQgdG8gYW4gZWxlbWVudCB3aXRoIHRoZSBzdWJzY3JpcHRcbiAgLy8gdGV4dCBmb250IHNpemUsIHNvIHdlIG5lZWQgdG8gZGl2aWRlIGJ5IHRoZSBzY2FsZSBmYWN0b3IgdG8gbWFrZSBpdCBoYWxmIG9mIHRoZSBvcmlnaW5hbCB0ZXh0XG4gIC8vIHNpemUuIFdlIGFnYWluIG5lZWQgdG8gc3VidHJhY3Qgb2ZmIHRoZSBsaW5lIHNwYWNpbmcgc2luY2UgdGhlIG1vY2tzIG1lYXN1cmUgdG8gdGhlIGVkZ2Ugb2YgdGhlXG4gIC8vIHRleHQsIG5vdCB0aGUgIGVkZ2Ugb2YgdGhlIGxpbmUuXG4gICRzdWJzY3JpcHQtbWFyZ2luLXRvcDogbWF0aC5kaXYoMC41ZW0sICRzdWJzY3JpcHQtZm9udC1zY2FsZSkgLSAoJGxpbmUtc3BhY2luZyAqIDIpO1xuICAvLyBUaGUgcGFkZGluZyBhcHBsaWVkIHRvIHRoZSBmb3JtLWZpZWxkLXdyYXBwZXIgdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIHN1YnNjcmlwdCwgc2luY2UgaXQnc1xuICAvLyBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQuIFRoaXMgaXMgYSBjb21iaW5hdGlvbiBvZiB0aGUgc3Vic2NyaXB0J3MgbWFyZ2luIGFuZCBsaW5lLWhlaWdodCwgYnV0IHdlXG4gIC8vIG5lZWQgdG8gbXVsdGlwbHkgYnkgdGhlIHN1YnNjcmlwdCBmb250IHNjYWxlIGZhY3RvciBzaW5jZSB0aGUgd3JhcHBlciBoYXMgYSBsYXJnZXIgZm9udCBzaXplLlxuICAkd3JhcHBlci1wYWRkaW5nLWJvdHRvbTogKCRzdWJzY3JpcHQtbWFyZ2luLXRvcCArICRsaW5lLWhlaWdodCkgKiAkc3Vic2NyaXB0LWZvbnQtc2NhbGU7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IHtcbiAgICAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogJHdyYXBwZXItcGFkZGluZy1ib3R0b207XG4gICAgfVxuXG4gICAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICAgIHBhZGRpbmc6ICRpbmZpeC1wYWRkaW5nIDA7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQge1xuICAgICAgJi5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuICAgICAgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbGFiZWwtZmxvYXRpbmcoXG4gICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZywgJGluZml4LW1hcmdpbi10b3ApO1xuICAgICAgfVxuXG4gICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIHdpbGwgcmVseSBvbiBBdXRvZmlsbE1vbml0b3IgaW5zdGVhZC5cbiAgICAgIC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlclxuICAgICAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICAgICAgQGluY2x1ZGUgX2xhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAgICRzdWJzY3JpcHQtZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VydmVyLXNpZGUgcmVuZGVyZWQgbWF0SW5wdXQgd2l0aCBhIGxhYmVsIGF0dHJpYnV0ZSBidXQgbGFiZWwgbm90IHNob3duXG4gICAgICAvLyAodXNlZCBhcyBhIHB1cmUgQ1NTIHN0YW5kLWluIGZvciBtYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQpLlxuICAgICAgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pICsgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXJcbiAgICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgIEBpbmNsdWRlIF9sYWJlbC1mbG9hdGluZyhcbiAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICAgIHRvcDogJGluZml4LW1hcmdpbi10b3AgKyAkaW5maXgtcGFkZGluZztcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIHtcbiAgICAgIC8vIFdlIHdhbnQgdGhlIHVuZGVybGluZSB0byBzdGFydCBhdCB0aGUgZW5kIG9mIHRoZSBjb250ZW50IGJveCwgbm90IHRoZSBwYWRkaW5nIGJveCxcbiAgICAgIC8vIHNvIHdlIG1vdmUgaXQgdXAgYnkgdGhlIHBhZGRpbmcgYW1vdW50LlxuICAgICAgYm90dG9tOiAkd3JhcHBlci1wYWRkaW5nLWJvdHRvbTtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xuICAgICAgbWFyZ2luLXRvcDogJHN1YnNjcmlwdC1tYXJnaW4tdG9wO1xuXG4gICAgICAvLyBXZSB3YW50IHRoZSBzdWJzY3JpcHQgdG8gc3RhcnQgYXQgdGhlIGVuZCBvZiB0aGUgY29udGVudCBib3gsIG5vdCB0aGUgcGFkZGluZyBib3gsXG4gICAgICAvLyBzbyB3ZSBtb3ZlIGl0IHVwIGJ5IHRoZSBwYWRkaW5nIGFtb3VudCAoYWRqdXN0ZWQgZm9yIHRoZSBzbWFsbGVyIGZvbnQgc2l6ZSk7XG4gICAgICB0b3A6IGNhbGMoMTAwJSAtICN7bWF0aC5kaXYoJHdyYXBwZXItcGFkZGluZy1ib3R0b20sICRzdWJzY3JpcHQtZm9udC1zY2FsZSl9KTtcbiAgICB9XG4gIH1cblxuICAvLyB0cmFuc2xhdGVaIGNhdXNlcyB0aGUgbGFiZWwgdG8gbm90IGFwcGVhciB3aGlsZSBwcmludGluZywgc28gd2Ugb3ZlcnJpZGUgaXQgdG8gbm90XG4gIC8vIGFwcGx5IHRyYW5zbGF0ZVogd2hpbGUgcHJpbnRpbmdcbiAgQG1lZGlhIHByaW50IHtcbiAgICAubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kge1xuICAgICAgJi5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQge1xuICAgICAgICAmLm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWwsXG4gICAgICAgIC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzICsgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICAgICAgICBAaW5jbHVkZSBfbGFiZWwtZmxvYXRpbmctcHJpbnQoXG4gICAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIHdpbGwgcmVseSBvbiBBdXRvZmlsbE1vbml0b3IgaW5zdGVhZC5cbiAgICAgICAgLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2w6LXdlYmtpdC1hdXRvZmlsbCArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgICAgQGluY2x1ZGUgX2xhYmVsLWZsb2F0aW5nLXByaW50KFxuICAgICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZywgJGluZml4LW1hcmdpbi10b3ApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VydmVyLXNpZGUgcmVuZGVyZWQgbWF0SW5wdXQgd2l0aCBhIGxhYmVsIGF0dHJpYnV0ZSBidXQgbGFiZWwgbm90IHNob3duXG4gICAgICAgIC8vICh1c2VkIGFzIGEgcHVyZSBDU1Mgc3RhbmQtaW4gZm9yIG1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCkuXG4gICAgICAgIC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgICAgQGluY2x1ZGUgX2xhYmVsLWZsb2F0aW5nLXByaW50KFxuICAgICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZywgJGluZml4LW1hcmdpbi10b3ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBwcml2YXRlLWZvcm0tZmllbGQtbGVnYWN5LWRlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIGxlZ2FjeS10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1mb3JtLWZpZWxkLWxlZ2FjeScpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGxlZ2FjeS1jb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBwcml2YXRlLWZvcm0tZmllbGQtbGVnYWN5LWRlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBsZWdhY3ktdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOm1hdGgnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3RoZW1pbmcnO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHknO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHktdXRpbHMnO1xuXG5cbi8vIFRoZW1lIHN0eWxlcyB0aGF0IG9ubHkgYXBwbHkgdG8gdGhlIGZpbGwgYXBwZWFyYW5jZSBvZiB0aGUgZm9ybS1maWVsZC5cblxuQG1peGluIGZpbGwtY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuICAkaXMtZGFyay10aGVtZTogbWFwLmdldCgkY29uZmlnLCBpcy1kYXJrKTtcblxuICAkZmlsbC1iYWNrZ3JvdW5kOlxuICAgIHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgYmFzZSwgaWYoJGlzLWRhcmstdGhlbWUsIDAuMSwgMC4wNCkpO1xuICAkZmlsbC1kaXNhYmxlZC1iYWNrZ3JvdW5kOlxuICAgIHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgYmFzZSwgaWYoJGlzLWRhcmstdGhlbWUsIDAuMDUsIDAuMDIpKTtcbiAgJHVuZGVybGluZS1jb2xvcjpcbiAgICB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpdmlkZXIsIGlmKCRpcy1kYXJrLXRoZW1lLCAwLjUsIDAuNDIpKTtcbiAgJGxhYmVsLWRpc2FibGVkLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuXG4gIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwge1xuICAgIC5tYXQtZm9ybS1maWVsZC1mbGV4IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmaWxsLWJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCAubWF0LWZvcm0tZmllbGQtZmxleCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZmlsbC1kaXNhYmxlZC1iYWNrZ3JvdW5kO1xuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmU6OmJlZm9yZSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yO1xuICAgIH1cblxuICAgICYubWF0LWZvcm0tZmllbGQtZGlzYWJsZWQge1xuICAgICAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICAgICAgY29sb3I6ICRsYWJlbC1kaXNhYmxlZC1jb2xvcjtcbiAgICAgIH1cblxuICAgICAgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZTo6YmVmb3JlIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFVzZWQgdG8gbWFrZSBpbnN0YW5jZXMgb2YgdGhlIF9tYXQtZm9ybS1maWVsZC1sYWJlbC1mbG9hdGluZyBtaXhpbiBuZWdsaWdpYmx5IGRpZmZlcmVudCxcbi8vIGFuZCBwcmV2ZW50IEdvb2dsZSdzIENTUyBPcHRpbWl6ZXIgZnJvbSBjb2xsYXBzaW5nIHRoZSBkZWNsYXJhdGlvbnMuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2Ugc29tZVxuLy8gb2YgdGhlIHNlbGVjdG9ycyBjb250YWluIHBzZXVkby1jbGFzc2VzIG5vdCByZWNvZ25pemVkIGluIGFsbCBicm93c2Vycy4gSWYgYSBicm93c2VyIGVuY291bnRlcnNcbi8vIGFuIHVua25vd24gcHNldWRvLWNsYXNzIGl0IHdpbGwgZGlzY2FyZCB0aGUgZW50aXJlIHJ1bGUgc2V0LlxuJGZpbGwtZGVkdXBlOiAwO1xuXG4vLyBBcHBsaWVzIGEgZmxvYXRpbmcgbGFiZWwgYWJvdmUgdGhlIGZvcm0gZmllbGQgY29udHJvbCBpdHNlbGYuXG5AbWl4aW4gX2xhYmVsLWZsb2F0aW5nKCRmb250LXNjYWxlLCAkaW5maXgtcGFkZGluZywgJGluZml4LW1hcmdpbi10b3ApIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0kaW5maXgtbWFyZ2luLXRvcCAtICRpbmZpeC1wYWRkaW5nICsgJGZpbGwtZGVkdXBlKVxuICAgICAgICAgICAgIHNjYWxlKCRmb250LXNjYWxlKTtcbiAgd2lkdGg6IG1hdGguZGl2KDEwMCUsICRmb250LXNjYWxlKSArICRmaWxsLWRlZHVwZTtcblxuICAkZmlsbC1kZWR1cGU6ICRmaWxsLWRlZHVwZSArIDAuMDAwMDEgIWdsb2JhbDtcbn1cblxuQG1peGluIGZpbGwtdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAvLyBUaGUgdW5pdC1sZXNzIGxpbmUtaGVpZ2h0IGZyb20gdGhlIGZvbnQgY29uZmlnLlxuICAkbGluZS1oZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMubGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwgYW5kIHN1YnNjcmlwdC5cbiAgJHN1YnNjcmlwdC1mb250LXNjYWxlOiAwLjc1O1xuICAvLyBUaGUgcGFkZGluZyBvbiB0b3Agb2YgdGhlIGluZml4LlxuICAkaW5maXgtcGFkZGluZy10b3A6IDAuMjVlbTtcbiAgLy8gVGhlIHBhZGRpbmcgYmVsb3cgdGhlIGluZml4LlxuICAkaW5maXgtcGFkZGluZy1ib3R0b206IDAuNzVlbTtcbiAgLy8gVGhlIG1hcmdpbiBhcHBsaWVkIHRvIHRoZSBmb3JtLWZpZWxkLWluZml4IHRvIHJlc2VydmUgc3BhY2UgZm9yIHRoZSBmbG9hdGluZyBsYWJlbC5cbiAgJGluZml4LW1hcmdpbi10b3A6XG4gICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUgKiB0eXBvZ3JhcGh5LXV0aWxzLnByaXZhdGUtY29lcmNlLXVuaXRsZXNzLXRvLWVtKCRsaW5lLWhlaWdodCk7XG4gIC8vIFRoZSBhbW91bnQgd2Ugb2Zmc2V0IHRoZSBsYWJlbCBmcm9tIHRoZSBpbnB1dCB0ZXh0IGluIHRoZSBmaWxsIGFwcGVhcmFuY2UuXG4gICRmaWxsLWFwcGVhcmFuY2UtbGFiZWwtb2Zmc2V0OiAtMC41ZW07XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCB7XG4gICAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICAgIHBhZGRpbmc6ICRpbmZpeC1wYWRkaW5nLXRvcCAwICRpbmZpeC1wYWRkaW5nLWJvdHRvbSAwO1xuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICB0b3A6ICRpbmZpeC1tYXJnaW4tdG9wICsgJGluZml4LXBhZGRpbmctdG9wO1xuICAgICAgbWFyZ2luLXRvcDogJGZpbGwtYXBwZWFyYW5jZS1sYWJlbC1vZmZzZXQ7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQge1xuICAgICAgJi5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuICAgICAgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbGFiZWwtZmxvYXRpbmcoXG4gICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZy10b3AgKyAkZmlsbC1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldCxcbiAgICAgICAgICAgICAgICAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlcnZlci1zaWRlIHJlbmRlcmVkIG1hdElucHV0IHdpdGggYSBsYWJlbCBhdHRyaWJ1dGUgYnV0IGxhYmVsIG5vdCBzaG93blxuICAgICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAgIC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbGFiZWwtZmxvYXRpbmcoXG4gICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZy10b3AgKyAkZmlsbC1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldCxcbiAgICAgICAgICAgICAgICAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBwcml2YXRlLWZvcm0tZmllbGQtZmlsbC1kZW5zaXR5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiBmaWxsLXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LWZvcm0tZmllbGQtZmlsbCcpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGZpbGwtY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgcHJpdmF0ZS1mb3JtLWZpZWxkLWZpbGwtZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGZpbGwtdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOm1hdGgnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3RoZW1pbmcnO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHknO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHktdXRpbHMnO1xuXG5cbi8vIFRoZW1lIHN0eWxlcyB0aGF0IG9ubHkgYXBwbHkgdG8gdGhlIG91dGxpbmUgYXBwZWFyYW5jZSBvZiB0aGUgZm9ybS1maWVsZC5cblxuQG1peGluIG91dGxpbmUtY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRwcmltYXJ5OiBtYXAuZ2V0KCRjb25maWcsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAuZ2V0KCRjb25maWcsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAuZ2V0KCRjb25maWcsIHdhcm4pO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC5nZXQoJGNvbmZpZywgaXMtZGFyayk7XG5cbiAgJGxhYmVsLWRpc2FibGVkLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICAkb3V0bGluZS1jb2xvcjpcbiAgICB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpdmlkZXIsIGlmKCRpcy1kYXJrLXRoZW1lLCAwLjMsIDAuMTIpKTtcbiAgJG91dGxpbmUtY29sb3ItaG92ZXI6XG4gICAgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMSwgMC44NykpO1xuICAkb3V0bGluZS1jb2xvci1wcmltYXJ5OiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHByaW1hcnkpO1xuICAkb3V0bGluZS1jb2xvci1hY2NlbnQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYWNjZW50KTtcbiAgJG91dGxpbmUtY29sb3Itd2FybjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCR3YXJuKTtcbiAgJG91dGxpbmUtY29sb3ItZGlzYWJsZWQ6XG4gICAgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC4xNSwgMC4wNikpO1xuXG4gIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUge1xuICAgIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5lIHtcbiAgICAgIGNvbG9yOiAkb3V0bGluZS1jb2xvcjtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGljayB7XG4gICAgICBjb2xvcjogJG91dGxpbmUtY29sb3ItaG92ZXI7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9jdXNlZCB7XG4gICAgICAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGljayB7XG4gICAgICAgIGNvbG9yOiAkb3V0bGluZS1jb2xvci1wcmltYXJ5O1xuICAgICAgfVxuXG4gICAgICAmLm1hdC1hY2NlbnQgLm1hdC1mb3JtLWZpZWxkLW91dGxpbmUtdGhpY2sge1xuICAgICAgICBjb2xvcjogJG91dGxpbmUtY29sb3ItYWNjZW50O1xuICAgICAgfVxuXG4gICAgICAmLm1hdC13YXJuIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5lLXRoaWNrIHtcbiAgICAgICAgY29sb3I6ICRvdXRsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2xhc3MgcmVwZWF0ZWQgc28gdGhhdCBydWxlIGlzIHNwZWNpZmljIGVub3VnaCB0byBvdmVycmlkZSBmb2N1c2VkIGFjY2VudCBjb2xvciBjYXNlLlxuICAgICYubWF0LWZvcm0tZmllbGQtaW52YWxpZC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkIHtcbiAgICAgIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5lLXRoaWNrIHtcbiAgICAgICAgY29sb3I6ICRvdXRsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCB7XG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBjb2xvcjogJGxhYmVsLWRpc2FibGVkLWNvbG9yO1xuICAgICAgfVxuXG4gICAgICAubWF0LWZvcm0tZmllbGQtb3V0bGluZSB7XG4gICAgICAgIGNvbG9yOiAkb3V0bGluZS1jb2xvci1kaXNhYmxlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gVXNlZCB0byBtYWtlIGluc3RhbmNlcyBvZiB0aGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nIG1peGluIG5lZ2xpZ2libHkgZGlmZmVyZW50LFxuLy8gYW5kIHByZXZlbnQgR29vZ2xlJ3MgQ1NTIE9wdGltaXplciBmcm9tIGNvbGxhcHNpbmcgdGhlIGRlY2xhcmF0aW9ucy4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBzb21lXG4vLyBvZiB0aGUgc2VsZWN0b3JzIGNvbnRhaW4gcHNldWRvLWNsYXNzZXMgbm90IHJlY29nbml6ZWQgaW4gYWxsIGJyb3dzZXJzLiBJZiBhIGJyb3dzZXIgZW5jb3VudGVyc1xuLy8gYW4gdW5rbm93biBwc2V1ZG8tY2xhc3MgaXQgd2lsbCBkaXNjYXJkIHRoZSBlbnRpcmUgcnVsZSBzZXQuXG4kb3V0bGluZS1kZWR1cGU6IDA7XG5cbi8vIEFwcGxpZXMgYSBmbG9hdGluZyBsYWJlbCBhYm92ZSB0aGUgZm9ybSBmaWVsZCBjb250cm9sIGl0c2VsZi5cbkBtaXhpbiBfbGFiZWwtZmxvYXRpbmcoJGZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCkge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLSRpbmZpeC1tYXJnaW4tdG9wIC0gJGluZml4LXBhZGRpbmcgKyAkb3V0bGluZS1kZWR1cGUpXG4gIHNjYWxlKCRmb250LXNjYWxlKTtcbiAgd2lkdGg6IG1hdGguZGl2KDEwMCUsICRmb250LXNjYWxlKSArICRvdXRsaW5lLWRlZHVwZTtcblxuICAkb3V0bGluZS1kZWR1cGU6ICRvdXRsaW5lLWRlZHVwZSArIDAuMDAwMDEgIWdsb2JhbDtcbn1cblxuQG1peGluIG91dGxpbmUtdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAvLyBUaGUgdW5pdC1sZXNzIGxpbmUtaGVpZ2h0IGZyb20gdGhlIGZvbnQgY29uZmlnLlxuICAkbGluZS1oZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMubGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwgYW5kIHN1YnNjcmlwdC5cbiAgJHN1YnNjcmlwdC1mb250LXNjYWxlOiAwLjc1O1xuICAvLyBUaGUgcGFkZGluZyBhYm92ZSBhbmQgYmVsb3cgdGhlIGluZml4LlxuICAkaW5maXgtcGFkZGluZzogMWVtO1xuICAvLyBUaGUgbWFyZ2luIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtaW5maXggdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLlxuICAkaW5maXgtbWFyZ2luLXRvcDpcbiAgICAgICRzdWJzY3JpcHQtZm9udC1zY2FsZSAqIHR5cG9ncmFwaHktdXRpbHMucHJpdmF0ZS1jb2VyY2UtdW5pdGxlc3MtdG8tZW0oJGxpbmUtaGVpZ2h0KTtcbiAgLy8gVGhlIHNwYWNlIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgLm1hdC1mb3JtLWZpZWxkLWZsZXggYXJlYSBhbmQgdGhlIHN1YnNjcmlwdCB3cmFwcGVyLlxuICAvLyBNb2NrcyBzaG93IGhhbGYgb2YgdGhlIHRleHQgc2l6ZSwgYnV0IHRoaXMgbWFyZ2luIGlzIGFwcGxpZWQgdG8gYW4gZWxlbWVudCB3aXRoIHRoZSBzdWJzY3JpcHRcbiAgLy8gdGV4dCBmb250IHNpemUsIHNvIHdlIG5lZWQgdG8gZGl2aWRlIGJ5IHRoZSBzY2FsZSBmYWN0b3IgdG8gbWFrZSBpdCBoYWxmIG9mIHRoZSBvcmlnaW5hbCB0ZXh0XG4gIC8vIHNpemUuXG4gICRzdWJzY3JpcHQtbWFyZ2luLXRvcDogbWF0aC5kaXYoMC41ZW0sICRzdWJzY3JpcHQtZm9udC1zY2FsZSk7XG4gIC8vIFRoZSBwYWRkaW5nIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtd3JhcHBlciB0byByZXNlcnZlIHNwYWNlIGZvciB0aGUgc3Vic2NyaXB0LCBzaW5jZSBpdCdzXG4gIC8vIGFic29sdXRlbHkgcG9zaXRpb25lZC4gVGhpcyBpcyBhIGNvbWJpbmF0aW9uIG9mIHRoZSBzdWJzY3JpcHQncyBtYXJnaW4gYW5kIGxpbmUtaGVpZ2h0LCBidXQgd2VcbiAgLy8gbmVlZCB0byBtdWx0aXBseSBieSB0aGUgc3Vic2NyaXB0IGZvbnQgc2NhbGUgZmFjdG9yIHNpbmNlIHRoZSB3cmFwcGVyIGhhcyBhIGxhcmdlciBmb250IHNpemUuXG4gICR3cmFwcGVyLXBhZGRpbmctYm90dG9tOiAoJHN1YnNjcmlwdC1tYXJnaW4tdG9wICsgJGxpbmUtaGVpZ2h0KSAqICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcbiAgLy8gVGhlIGFtb3VudCB3ZSBvZmZzZXQgdGhlIGxhYmVsIGZyb20gdGhlIGlucHV0IHRleHQgaW4gdGhlIG91dGxpbmUgYXBwZWFyYW5jZS5cbiAgJG91dGxpbmUtYXBwZWFyYW5jZS1sYWJlbC1vZmZzZXQ6IC0wLjI1ZW07XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSB7XG4gICAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICAgIHBhZGRpbmc6ICRpbmZpeC1wYWRkaW5nIDAgJGluZml4LXBhZGRpbmcgMDtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgdG9wOiAkaW5maXgtbWFyZ2luLXRvcCArICRpbmZpeC1wYWRkaW5nO1xuICAgICAgbWFyZ2luLXRvcDogJG91dGxpbmUtYXBwZWFyYW5jZS1sYWJlbC1vZmZzZXQ7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQge1xuICAgICAgJi5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuICAgICAgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbGFiZWwtZmxvYXRpbmcoXG4gICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZyArICRvdXRsaW5lLWFwcGVhcmFuY2UtbGFiZWwtb2Zmc2V0LFxuICAgICAgICAgICAgICAgICRpbmZpeC1tYXJnaW4tdG9wKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VydmVyLXNpZGUgcmVuZGVyZWQgbWF0SW5wdXQgd2l0aCBhIGxhYmVsIGF0dHJpYnV0ZSBidXQgbGFiZWwgbm90IHNob3duXG4gICAgICAvLyAodXNlZCBhcyBhIHB1cmUgQ1NTIHN0YW5kLWluIGZvciBtYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQpLlxuICAgICAgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pICsgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXJcbiAgICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgIEBpbmNsdWRlIF9sYWJlbC1mbG9hdGluZyhcbiAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nICsgJG91dGxpbmUtYXBwZWFyYW5jZS1sYWJlbC1vZmZzZXQsXG4gICAgICAgICAgICAgICAgJGluZml4LW1hcmdpbi10b3ApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gcHJpdmF0ZS1mb3JtLWZpZWxkLW91dGxpbmUtZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gb3V0bGluZS10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1mb3JtLWZpZWxkLW91dGxpbmUnKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBvdXRsaW5lLWNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHByaXZhdGUtZm9ybS1maWVsZC1vdXRsaW5lLWRlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBvdXRsaW5lLXR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuXG4iLCJAdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5AdXNlICcuLi9jb3JlL3N0eWxlL2xpc3QtY29tbW9uJztcblxuXG4vLyBJbmNsdWRlIHRoaXMgZW1wdHkgbWl4aW4gZm9yIGNvbnNpc3RlbmN5IHdpdGggdGhlIG90aGVyIGNvbXBvbmVudHMuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC1ncmlkLXRpbGUtaGVhZGVyLFxuICAubWF0LWdyaWQtdGlsZS1mb290ZXIge1xuICAgIEBpbmNsdWRlIGxpc3QtY29tbW9uLmJhc2UodHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbikpO1xuICAgIGZvbnQtc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgYm9keS0xKTtcbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LWdyaWQtbGlzdCcpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBUaGlzIG1peGluIHdpbGwgZW5zdXJlIHRoYXQgbGluZXMgdGhhdCBvdmVyZmxvdyB0aGUgY29udGFpbmVyIHdpbGwgaGlkZSB0aGUgb3ZlcmZsb3cgYW5kXG4vLyB0cnVuY2F0ZSBuZWF0bHkgd2l0aCBhbiBlbGxpcHNpcy5cbkBtaXhpbiB0cnVuY2F0ZS1saW5lKCkge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbn1cblxuLy8gTWl4aW4gdG8gcHJvdmlkZSBhbGwgbWF0LWxpbmUgc3R5bGVzLCBjaGFuZ2luZyBzZWNvbmRhcnkgZm9udCBzaXplIGJhc2VkIG9uIHdoZXRoZXIgdGhlIGxpc3Rcbi8vIGlzIGluIGRlbnNlIG1vZGUuXG5AbWl4aW4gYmFzZSgkc2Vjb25kYXJ5LWZvbnQtc2l6ZSkge1xuICAubWF0LWxpbmUge1xuICAgIEBpbmNsdWRlIHRydW5jYXRlLWxpbmUoKTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgLy8gYWxsIGxpbmVzIGJ1dCB0aGUgdG9wIGxpbmUgc2hvdWxkIGhhdmUgc21hbGxlciB0ZXh0XG4gICAgJjpudGgtY2hpbGQobisyKSB7XG4gICAgICBmb250LXNpemU6ICRzZWNvbmRhcnktZm9udC1zaXplO1xuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIG1peGluIG5vcm1hbGl6ZXMgZGVmYXVsdCBlbGVtZW50IHN0eWxlcywgZS5nLiBmb250IHdlaWdodCBmb3IgaGVhZGluZyB0ZXh0LlxuQG1peGluIG5vcm1hbGl6ZS10ZXh0KCkge1xuICAmID4gKiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gIH1cbn1cblxuLy8gVGhpcyBtaXhpbiBwcm92aWRlcyBiYXNlIHN0eWxlcyBmb3IgdGhlIHdyYXBwZXIgYXJvdW5kIG1hdC1saW5lIGVsZW1lbnRzIGluIGEgbGlzdC5cbkBtaXhpbiB3cmFwcGVyLWJhc2UoKSB7XG4gIEBpbmNsdWRlIG5vcm1hbGl6ZS10ZXh0KCk7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZmxleDogYXV0bztcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAvLyBNdXN0IHJlbW92ZSB3cmFwcGVyIHdoZW4gbGluZXMgYXJlIGVtcHR5IG9yIGl0IHRha2VzIHVwIGhvcml6b250YWxcbiAgLy8gc3BhY2UgYW5kIHB1c2hlcyBvdGhlciBlbGVtZW50cyB0byB0aGUgcmlnaHQuXG4gICY6ZW1wdHkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6bWF0aCc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvcGFsZXR0ZSc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3N0eWxlL2Zvcm0tY29tbW9uJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvdmVuZG9yLXByZWZpeGVzJztcblxuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRwcmltYXJ5OiBtYXAuZ2V0KCRjb25maWcsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAuZ2V0KCRjb25maWcsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAuZ2V0KCRjb25maWcsIHdhcm4pO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LWZvcm0tZmllbGQtdHlwZS1tYXQtbmF0aXZlLXNlbGVjdCAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVyIHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LWlucHV0LWVsZW1lbnQ6ZGlzYWJsZWQsXG4gIC5tYXQtZm9ybS1maWVsZC10eXBlLW1hdC1uYXRpdmUtc2VsZWN0Lm1hdC1mb3JtLWZpZWxkLWRpc2FibGVkIC5tYXQtZm9ybS1maWVsZC1pbmZpeDo6YWZ0ZXIge1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICB9XG5cbiAgLm1hdC1pbnB1dC1lbGVtZW50IHtcbiAgICBjYXJldC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwcmltYXJ5LCB0ZXh0KTtcblxuICAgIEBpbmNsdWRlIHZlbmRvci1wcmVmaXhlcy5pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICBjb2xvcjogZm9ybS1jb21tb24ucHJpdmF0ZS1jb250cm9sLXBsYWNlaG9sZGVyLWNvbG9yKCRjb25maWcpO1xuICAgIH1cblxuICAgIC8vIE9uIGRhcmsgdGhlbWVzIHdlIHNldCB0aGUgbmF0aXZlIGBzZWxlY3RgIGNvbG9yIHRvIHNvbWUgc2hhZGUgb2Ygd2hpdGUsXG4gICAgLy8gaG93ZXZlciB0aGUgY29sb3IgcHJvcGFnYXRlcyB0byBhbGwgb2YgdGhlIGBvcHRpb25gIGVsZW1lbnRzLCB3aGljaCBhcmVcbiAgICAvLyBhbHdheXMgb24gYSB3aGl0ZSBiYWNrZ3JvdW5kIGluc2lkZSB0aGUgZHJvcGRvd24sIGNhdXNpbmcgdGhlbSB0byBibGVuZCBpbi5cbiAgICAvLyBTaW5jZSB3ZSBjYW4ndCBjaGFuZ2UgYmFja2dyb3VuZCBvZiB0aGUgZHJvcGRvd24sIHdlIG5lZWQgdG8gZXhwbGljaXRseVxuICAgIC8vIHJlc2V0IHRoZSBjb2xvciBvZiB0aGUgb3B0aW9ucyB0byBzb21ldGhpbmcgZGFyay5cbiAgICBAaWYgKG1hcC5nZXQoJGNvbmZpZywgaXMtZGFyaykpIHtcbiAgICAgICY6bm90KC5tYXQtbmF0aXZlLXNlbGVjdC1pbmxpbmUpIHtcbiAgICAgICAgb3B0aW9uIHtcbiAgICAgICAgICBjb2xvcjogcGFsZXR0ZS4kZGFyay1wcmltYXJ5LXRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb246ZGlzYWJsZWQge1xuICAgICAgICAgIGNvbG9yOiBwYWxldHRlLiRkYXJrLWRpc2FibGVkLXRleHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQubWF0LWFjY2VudCAubWF0LWlucHV0LWVsZW1lbnQge1xuICAgIGNhcmV0LWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGFjY2VudCwgdGV4dCk7XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQubWF0LXdhcm4gLm1hdC1pbnB1dC1lbGVtZW50LFxuICAubWF0LWZvcm0tZmllbGQtaW52YWxpZCAubWF0LWlucHV0LWVsZW1lbnQge1xuICAgIGNhcmV0LWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHdhcm4sIHRleHQpO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXR5cGUtbWF0LW5hdGl2ZS1zZWxlY3QubWF0LWZvcm0tZmllbGQtaW52YWxpZCAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVyIHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCR3YXJuLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAvLyBUaGUgdW5pdC1sZXNzIGxpbmUtaGVpZ2h0IGZyb20gdGhlIGZvbnQgY29uZmlnLlxuICAkbGluZS1oZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMubGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuXG4gIC8vIFRoZSBhbW91bnQgb2Ygc3BhY2UgYmV0d2VlbiB0aGUgdG9wIG9mIHRoZSBsaW5lIGFuZCB0aGUgdG9wIG9mIHRoZSBhY3R1YWwgdGV4dFxuICAvLyAoYXMgYSBmcmFjdGlvbiBvZiB0aGUgZm9udC1zaXplKS5cbiAgJGxpbmUtc3BhY2luZzogbWF0aC5kaXYoJGxpbmUtaGVpZ2h0IC0gMSwgMik7XG5cbiAgLy8gPGlucHV0PiBlbGVtZW50cyBzZWVtIHRvIGhhdmUgdGhlaXIgaGVpZ2h0IHNldCBzbGlnaHRseSB0b28gbGFyZ2Ugb24gU2FmYXJpIGNhdXNpbmcgdGhlIHRleHQgdG9cbiAgLy8gYmUgbWlzYWxpZ25lZCB3LnIudC4gdGhlIHBsYWNlaG9sZGVyLiBBZGRpbmcgdGhpcyBtYXJnaW4gY29ycmVjdHMgaXQuXG4gIGlucHV0Lm1hdC1pbnB1dC1lbGVtZW50IHtcbiAgICBtYXJnaW4tdG9wOiB0eXBvZ3JhcGh5LXV0aWxzLnByaXZhdGUtY29lcmNlLXVuaXRsZXNzLXRvLWVtKC0kbGluZS1zcGFjaW5nKTtcbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LWlucHV0Jykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvcHJpdmF0ZSc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5cblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1tZW51LXBhbmVsIHtcbiAgICBAaW5jbHVkZSBwcml2YXRlLnByaXZhdGUtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKDQsICRjb25maWcpO1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgJ2NhcmQnKTtcbiAgfVxuXG4gIC5tYXQtbWVudS1pdGVtIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCAndGV4dCcpO1xuXG4gICAgJltkaXNhYmxlZF0ge1xuICAgICAgJixcbiAgICAgIC5tYXQtbWVudS1zdWJtZW51LWljb24sXG4gICAgICAubWF0LWljb24tbm8tY29sb3Ige1xuICAgICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCAnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWF0LW1lbnUtaXRlbSAubWF0LWljb24tbm8tY29sb3IsXG4gIC5tYXQtbWVudS1zdWJtZW51LWljb24ge1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsICdpY29uJyk7XG4gIH1cblxuICAubWF0LW1lbnUtaXRlbTpob3ZlcixcbiAgLm1hdC1tZW51LWl0ZW0uY2RrLXByb2dyYW0tZm9jdXNlZCxcbiAgLm1hdC1tZW51LWl0ZW0uY2RrLWtleWJvYXJkLWZvY3VzZWQsXG4gIC5tYXQtbWVudS1pdGVtLWhpZ2hsaWdodGVkIHtcbiAgICAmOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgICBiYWNrZ3JvdW5kOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsICdob3ZlcicpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LW1lbnUtaXRlbSB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtZmFtaWx5KCRjb25maWcsIGJvZHktMSk7XG4gICAgICBzaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpO1xuICAgICAgd2VpZ2h0OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtd2VpZ2h0KCRjb25maWcsIGJvZHktMSk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBfZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtbWVudScpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG5cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcbkB1c2UgJy4uL2NvcmUvZGVuc2l0eS9wcml2YXRlL2NvbXBhdGliaWxpdHknO1xuQHVzZSAnLi9wYWdpbmF0b3ItdmFyaWFibGVzJztcblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG5cbiAgLm1hdC1wYWdpbmF0b3Ige1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgJ2NhcmQnKTtcbiAgfVxuXG4gIC5tYXQtcGFnaW5hdG9yLFxuICAubWF0LXBhZ2luYXRvci1wYWdlLXNpemUgLm1hdC1zZWxlY3QtdHJpZ2dlciB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICB9XG5cbiAgLm1hdC1wYWdpbmF0b3ItZGVjcmVtZW50LFxuICAubWF0LXBhZ2luYXRvci1pbmNyZW1lbnQge1xuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsICdpY29uJyk7XG4gICAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCAnaWNvbicpO1xuICB9XG5cbiAgLm1hdC1wYWdpbmF0b3ItZmlyc3QsXG4gIC5tYXQtcGFnaW5hdG9yLWxhc3Qge1xuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsICdpY29uJyk7XG4gIH1cblxuICAubWF0LWljb24tYnV0dG9uW2Rpc2FibGVkXSB7XG4gICAgLm1hdC1wYWdpbmF0b3ItZGVjcmVtZW50LFxuICAgIC5tYXQtcGFnaW5hdG9yLWluY3JlbWVudCxcbiAgICAubWF0LXBhZ2luYXRvci1maXJzdCxcbiAgICAubWF0LXBhZ2luYXRvci1sYXN0IHtcbiAgICAgIGJvcmRlci1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCAnZGlzYWJsZWQnKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC1wYWdpbmF0b3IsXG4gIC5tYXQtcGFnaW5hdG9yLXBhZ2Utc2l6ZSAubWF0LXNlbGVjdC10cmlnZ2VyIHtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1mYW1pbHkoJGNvbmZpZywgY2FwdGlvbik7XG4gICAgICBzaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBjYXB0aW9uKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGRlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkZGVuc2l0eS1zY2FsZTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRoZWlnaHQ6IGNvbXBhdGliaWxpdHkucHJpdmF0ZS1kZW5zaXR5LXByb3AtdmFsdWUocGFnaW5hdG9yLXZhcmlhYmxlcy4kZGVuc2l0eS1jb25maWcsXG4gICAgJGRlbnNpdHktc2NhbGUsIGhlaWdodCk7XG5cbiAgQGluY2x1ZGUgY29tcGF0aWJpbGl0eS5wcml2YXRlLWRlbnNpdHktbGVnYWN5LWNvbXBhdGliaWxpdHkoKSB7XG4gICAgLm1hdC1wYWdpbmF0b3ItY29udGFpbmVyIHtcbiAgICAgIG1pbi1oZWlnaHQ6ICRoZWlnaHQ7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1wYWdpbmF0b3InKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBkZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5cbkBtaXhpbiBfY29sb3IoJHBhbGV0dGUpIHtcbiAgJi5tYXQtcmFkaW8tY2hlY2tlZCAubWF0LXJhZGlvLW91dGVyLWNpcmNsZSB7XG4gICAgYm9yZGVyLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHBhbGV0dGUpO1xuICB9XG5cbiAgLm1hdC1yYWRpby1pbm5lci1jaXJjbGUsXG4gIC5tYXQtcmFkaW8tcmlwcGxlIC5tYXQtcmlwcGxlLWVsZW1lbnQ6bm90KC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUpLFxuICAmLm1hdC1yYWRpby1jaGVja2VkIC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUsXG4gICY6YWN0aXZlIC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcGFsZXR0ZSk7XG4gIH1cbn1cblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtcmFkaW8tb3V0ZXItY2lyY2xlIHtcbiAgICBib3JkZXItY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICB9XG5cbiAgLm1hdC1yYWRpby1idXR0b24ge1xuICAgICYubWF0LXByaW1hcnkge1xuICAgICAgQGluY2x1ZGUgX2NvbG9yKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgQGluY2x1ZGUgX2NvbG9yKCRhY2NlbnQpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgQGluY2x1ZGUgX2NvbG9yKCR3YXJuKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIG5lZWRzIGV4dHJhIHNwZWNpZmljaXR5LCBiZWNhdXNlIHRoZSBjbGFzc2VzIGFib3ZlIGFyZSBjb21iaW5lZFxuICAgIC8vIChlLmcuIGAubWF0LXJhZGlvLWJ1dHRvbi5tYXQtYWNjZW50YCkgd2hpY2ggaW5jcmVhc2VzIHRoZWlyIHNwZWNpZmljaXR5IGEgbG90LlxuICAgIC8vIFRPRE86IGNvbnNpZGVyIG1ha2luZyB0aGUgc2VsZWN0b3JzIGludG8gZGVzY2VuZGFudHMgKGAubWF0LXByaW1hcnkgLm1hdC1yYWRpby1idXR0b25gKS5cbiAgICAmLm1hdC1yYWRpby1kaXNhYmxlZCB7XG4gICAgICAmLm1hdC1yYWRpby1jaGVja2VkIC5tYXQtcmFkaW8tb3V0ZXItY2lyY2xlLFxuICAgICAgLm1hdC1yYWRpby1vdXRlci1jaXJjbGUge1xuICAgICAgICBib3JkZXItY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGlzYWJsZWQpO1xuICAgICAgfVxuXG4gICAgICAubWF0LXJhZGlvLXJpcHBsZSAubWF0LXJpcHBsZS1lbGVtZW50LFxuICAgICAgLm1hdC1yYWRpby1pbm5lci1jaXJjbGUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpc2FibGVkKTtcbiAgICAgIH1cblxuICAgICAgLm1hdC1yYWRpby1sYWJlbC1jb250ZW50IHtcbiAgICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGlzYWJsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN3aXRjaCB0aGlzIHRvIGEgc29saWQgY29sb3Igc2luY2Ugd2UncmUgdXNpbmcgYG9wYWNpdHlgXG4gICAgLy8gdG8gY29udHJvbCBob3cgb3BhcXVlIHRoZSByaXBwbGUgc2hvdWxkIGJlLlxuICAgIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWFwLmdldCgkZm9yZWdyb3VuZCwgYmFzZSk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiB0eXBvZ3JhcGh5KCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdHlwb2dyYXBoeS5wcml2YXRlLXR5cG9ncmFwaHktdG8tMjAxNC1jb25maWcoXG4gICAgICB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKSk7XG4gIC5tYXQtcmFkaW8tYnV0dG9uIHtcbiAgICBmb250LWZhbWlseTogdHlwb2dyYXBoeS11dGlscy5mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LXJhZGlvJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvcHJpdmF0ZSc7XG5AdXNlICcuLi9jb3JlL3N0eWxlL2Zvcm0tY29tbW9uJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcblxuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcbiAgJHByaW1hcnk6IG1hcC5nZXQoJGNvbmZpZywgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC5nZXQoJGNvbmZpZywgYWNjZW50KTtcbiAgJHdhcm46IG1hcC5nZXQoJGNvbmZpZywgd2Fybik7XG5cbiAgLm1hdC1zZWxlY3QtdmFsdWUge1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC1zZWxlY3QtcGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiBmb3JtLWNvbW1vbi5wcml2YXRlLWNvbnRyb2wtcGxhY2Vob2xkZXItY29sb3IoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LXNlbGVjdC1kaXNhYmxlZCAubWF0LXNlbGVjdC12YWx1ZSB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGlzYWJsZWQtdGV4dCk7XG4gIH1cblxuICAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICB9XG5cbiAgLm1hdC1zZWxlY3QtcGFuZWwge1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgY2FyZCk7XG4gICAgQGluY2x1ZGUgcHJpdmF0ZS5wcml2YXRlLXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbig0LCAkY29uZmlnKTtcblxuICAgIC5tYXQtb3B0aW9uLm1hdC1zZWxlY3RlZDpub3QoLm1hdC1vcHRpb24tbXVsdGlwbGUpIHtcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgaG92ZXIsIDAuMTIpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtZm9ybS1maWVsZCB7XG4gICAgJi5tYXQtZm9jdXNlZCB7XG4gICAgICAmLm1hdC1wcmltYXJ5IC5tYXQtc2VsZWN0LWFycm93IHtcbiAgICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcHJpbWFyeSwgdGV4dCk7XG4gICAgICB9XG5cbiAgICAgICYubWF0LWFjY2VudCAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGFjY2VudCwgdGV4dCk7XG4gICAgICB9XG5cbiAgICAgICYubWF0LXdhcm4gLm1hdC1zZWxlY3QtYXJyb3cge1xuICAgICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCR3YXJuLCB0ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAubWF0LXNlbGVjdC5tYXQtc2VsZWN0LWludmFsaWQgLm1hdC1zZWxlY3QtYXJyb3cge1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkd2FybiwgdGV4dCk7XG4gICAgfVxuXG4gICAgLm1hdC1zZWxlY3QubWF0LXNlbGVjdC1kaXNhYmxlZCAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC10ZXh0KTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLy8gVGhlIHVuaXQtbGVzcyBsaW5lLWhlaWdodCBmcm9tIHRoZSBmb250IGNvbmZpZy5cbiAgJGxpbmUtaGVpZ2h0OiB0eXBvZ3JhcGh5LXV0aWxzLmxpbmUtaGVpZ2h0KCRjb25maWcsIGlucHV0KTtcblxuICAubWF0LXNlbGVjdCB7XG4gICAgZm9udC1mYW1pbHk6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LXNlbGVjdC10cmlnZ2VyIHtcbiAgICBoZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMucHJpdmF0ZS1jb2VyY2UtdW5pdGxlc3MtdG8tZW0oJGxpbmUtaGVpZ2h0KTtcbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LXNlbGVjdCcpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9jb3JlL3N0eWxlL3ByaXZhdGUnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3BhbGV0dGUnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3RoZW1pbmcnO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHknO1xuQHVzZSAnLi4vY29yZS90eXBvZ3JhcGh5L3R5cG9ncmFwaHktdXRpbHMnO1xuXG5AbWl4aW4gX2NoZWNrZWQtY29sb3IoJHBhbGV0dGUsICR0aHVtYi1jaGVja2VkLWh1ZSkge1xuICAmLm1hdC1jaGVja2VkIHtcbiAgICAubWF0LXNsaWRlLXRvZ2dsZS10aHVtYiB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHBhbGV0dGUsICR0aHVtYi1jaGVja2VkLWh1ZSk7XG4gICAgfVxuXG4gICAgLm1hdC1zbGlkZS10b2dnbGUtYmFyIHtcbiAgICAgIC8vIE9wYWNpdHkgaXMgZGV0ZXJtaW5lZCBmcm9tIHRoZSBzcGVjcyBmb3IgdGhlIHNlbGVjdGlvbiBjb250cm9scy5cbiAgICAgIC8vIFNlZTogaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vY29tcG9uZW50cy9zZWxlY3Rpb24tY29udHJvbHMuaHRtbCNzcGVjc1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwYWxldHRlLCAkdGh1bWItY2hlY2tlZC1odWUsIDAuNTQpO1xuICAgIH1cblxuICAgIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgICAgLy8gU2V0IG5vIG9wYWNpdHkgZm9yIHRoZSByaXBwbGVzIGJlY2F1c2UgdGhlIHJpcHBsZSBvcGFjaXR5IHdpbGwgYmUgYWRqdXN0ZWQgZHluYW1pY2FsbHlcbiAgICAgIC8vIGJhc2VkIG9uIHRoZSB0eXBlIG9mIGludGVyYWN0aW9uIHdpdGggdGhlIHNsaWRlLXRvZ2dsZSAoZS5nLiBmb3IgaG92ZXIsIGZvY3VzKVxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwYWxldHRlLCAkdGh1bWItY2hlY2tlZC1odWUpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRpcy1kYXJrOiBtYXAuZ2V0KCRjb25maWcsIGlzLWRhcmspO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gIC8vIENvbG9yIGh1ZXMgYXJlIGJhc2VkIG9uIHRoZSBzcGVjcyB3aGljaCBicmllZmx5IHNob3cgdGhlIGh1ZXMgdGhhdCBhcmUgYXBwbGllZCB0byBhIHN3aXRjaC5cbiAgLy8gVGhlIDIwMTggc3BlY3Mgbm8gbG9uZ2VyIGRlc2NyaWJlIGhvdyBkYXJrIHN3aXRjaGVzIHNob3VsZCBsb29rIGxpa2UuIER1ZSB0byB0aGUgbGFjayBvZlxuICAvLyBpbmZvcm1hdGlvbiBmb3IgZGFyayB0aGVtZWQgc3dpdGNoZXMsIHdlIHBhcnRpYWxseSBrZWVwIHRoZSBvbGQgYmVoYXZpb3IgdGhhdCBpcyBiYXNlZCBvblxuICAvLyB0aGUgcHJldmlvdXMgc3BlY2lmaWNhdGlvbnMuIEZvciB0aGUgY2hlY2tlZCBjb2xvciB3ZSBhbHdheXMgdXNlIHRoZSBgZGVmYXVsdGAgaHVlIGJlY2F1c2VcbiAgLy8gdGhhdCBmb2xsb3dzIE1EQyBhbmQgYWxzbyBtYWtlcyBpdCBlYXNpZXIgZm9yIHBlb3BsZSB0byBjcmVhdGUgYSBjdXN0b20gdGhlbWUgd2l0aG91dCBuZWVkaW5nXG4gIC8vIHRvIHNwZWNpZnkgZWFjaCBodWUgaW5kaXZpZHVhbGx5LlxuICAkdGh1bWItdW5jaGVja2VkLWh1ZTogaWYoJGlzLWRhcmssIDQwMCwgNTApO1xuICAkdGh1bWItY2hlY2tlZC1odWU6IGRlZmF1bHQ7XG5cbiAgJGJhci11bmNoZWNrZWQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGlzYWJsZWQpO1xuICAkcmlwcGxlLXVuY2hlY2tlZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBiYXNlKTtcblxuICAubWF0LXNsaWRlLXRvZ2dsZSB7XG4gICAgQGluY2x1ZGUgX2NoZWNrZWQtY29sb3IoJGFjY2VudCwgJHRodW1iLWNoZWNrZWQtaHVlKTtcblxuICAgICYubWF0LXByaW1hcnkge1xuICAgICAgQGluY2x1ZGUgX2NoZWNrZWQtY29sb3IoJHByaW1hcnksICR0aHVtYi1jaGVja2VkLWh1ZSk7XG4gICAgfVxuXG4gICAgJi5tYXQtd2FybiB7XG4gICAgICBAaW5jbHVkZSBfY2hlY2tlZC1jb2xvcigkd2FybiwgJHRodW1iLWNoZWNrZWQtaHVlKTtcbiAgICB9XG5cbiAgICAmOm5vdCgubWF0LWNoZWNrZWQpIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgICAgLy8gU2V0IG5vIG9wYWNpdHkgZm9yIHRoZSByaXBwbGVzIGJlY2F1c2UgdGhlIHJpcHBsZSBvcGFjaXR5IHdpbGwgYmUgYWRqdXN0ZWQgZHluYW1pY2FsbHlcbiAgICAgIC8vIGJhc2VkIG9uIHRoZSB0eXBlIG9mIGludGVyYWN0aW9uIHdpdGggdGhlIHNsaWRlLXRvZ2dsZSAoZS5nLiBmb3IgaG92ZXIsIGZvY3VzKVxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHJpcHBsZS11bmNoZWNrZWQtY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbGlkZS10b2dnbGUtdGh1bWIge1xuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1lbGV2YXRpb24oMSwgJGNvbmZpZyk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKHBhbGV0dGUuJGdyZXktcGFsZXR0ZSwgJHRodW1iLXVuY2hlY2tlZC1odWUpO1xuICB9XG5cbiAgLm1hdC1zbGlkZS10b2dnbGUtYmFyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFyLXVuY2hlY2tlZC1jb2xvcjtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LXNsaWRlLXRvZ2dsZS1jb250ZW50IHtcbiAgICBmb250LWZhbWlseTogdHlwb2dyYXBoeS11dGlscy5mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LXNsaWRlLXRvZ2dsZScpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG5cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJ3Nhc3M6bWV0YSc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5cbkBtaXhpbiBfaW5uZXItY29udGVudC10aGVtZSgkcGFsZXR0ZSkge1xuICAubWF0LXNsaWRlci10cmFjay1maWxsLFxuICAubWF0LXNsaWRlci10aHVtYixcbiAgLm1hdC1zbGlkZXItdGh1bWItbGFiZWwge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcGFsZXR0ZSk7XG4gIH1cblxuICAubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0IHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwYWxldHRlLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgfVxuXG4gIC5tYXQtc2xpZGVyLWZvY3VzLXJpbmcge1xuICAgICRvcGFjaXR5OiAwLjI7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHBhbGV0dGUsIGRlZmF1bHQsICRvcGFjaXR5KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3I7XG5cbiAgICAvLyBgbWF0LWNvbG9yYCB1c2VzIGByZ2JhYCBmb3IgdGhlIG9wYWNpdHkgd2hpY2ggd29uJ3Qgd29yayB3aXRoXG4gICAgLy8gQ1NTIHZhcmlhYmxlcyBzbyB3ZSBuZWVkIHRvIHVzZSBgb3BhY2l0eWAgYXMgYSBmYWxsYmFjay5cbiAgICBAaWYgKG1ldGEudHlwZS1vZigkY29sb3IpICE9IGNvbG9yKSB7XG4gICAgICBvcGFjaXR5OiAkb3BhY2l0eTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gICRtYXQtc2xpZGVyLW9mZi1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBzbGlkZXItb2ZmKTtcbiAgJG1hdC1zbGlkZXItb2ZmLWZvY3VzZWQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgc2xpZGVyLW9mZi1hY3RpdmUpO1xuICAkbWF0LXNsaWRlci1kaXNhYmxlZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBzbGlkZXItb2ZmKTtcbiAgJG1hdC1zbGlkZXItbGFiZWxlZC1taW4tdmFsdWUtdGh1bWItY29sb3I6XG4gICAgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBzbGlkZXItbWluKTtcbiAgJG1hdC1zbGlkZXItbGFiZWxlZC1taW4tdmFsdWUtdGh1bWItbGFiZWwtY29sb3I6XG4gICAgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBzbGlkZXItb2ZmKTtcbiAgJG1hdC1zbGlkZXItdGljay1vcGFjaXR5OiAwLjc7XG4gICRtYXQtc2xpZGVyLXRpY2stY29sb3I6XG4gICAgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBiYXNlLCAkbWF0LXNsaWRlci10aWNrLW9wYWNpdHkpO1xuICAkbWF0LXNsaWRlci10aWNrLXNpemU6IDJweDtcblxuICAubWF0LXNsaWRlci10cmFjay1iYWNrZ3JvdW5kIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1vZmYtY29sb3I7XG4gIH1cblxuICAubWF0LXNsaWRlciB7XG4gICAgJi5tYXQtcHJpbWFyeSB7XG4gICAgICBAaW5jbHVkZSBfaW5uZXItY29udGVudC10aGVtZSgkcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgJi5tYXQtYWNjZW50IHtcbiAgICAgIEBpbmNsdWRlIF9pbm5lci1jb250ZW50LXRoZW1lKCRhY2NlbnQpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgQGluY2x1ZGUgX2lubmVyLWNvbnRlbnQtdGhlbWUoJHdhcm4pO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtc2xpZGVyOmhvdmVyLFxuICAubWF0LXNsaWRlci5jZGstZm9jdXNlZCB7XG4gICAgLm1hdC1zbGlkZXItdHJhY2stYmFja2dyb3VuZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1vZmYtZm9jdXNlZC1jb2xvcjtcbiAgICB9XG4gIH1cblxuICAubWF0LXNsaWRlci5tYXQtc2xpZGVyLWRpc2FibGVkIHtcbiAgICAubWF0LXNsaWRlci10cmFjay1iYWNrZ3JvdW5kLFxuICAgIC5tYXQtc2xpZGVyLXRyYWNrLWZpbGwsXG4gICAgLm1hdC1zbGlkZXItdGh1bWIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG1hdC1zbGlkZXItZGlzYWJsZWQtY29sb3I7XG4gICAgfVxuXG4gICAgJjpob3ZlciB7XG4gICAgICAubWF0LXNsaWRlci10cmFjay1iYWNrZ3JvdW5kIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG1hdC1zbGlkZXItZGlzYWJsZWQtY29sb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbGlkZXIubWF0LXNsaWRlci1taW4tdmFsdWUge1xuICAgIC5tYXQtc2xpZGVyLWZvY3VzLXJpbmcge1xuICAgICAgJG9wYWNpdHk6IDAuMTI7XG4gICAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgYmFzZSwgJG9wYWNpdHkpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yO1xuXG4gICAgICAvLyBgbWF0LWNvbG9yYCB1c2VzIGByZ2JhYCBmb3IgdGhlIG9wYWNpdHkgd2hpY2ggd29uJ3Qgd29yayB3aXRoXG4gICAgICAvLyBDU1MgdmFyaWFibGVzIHNvIHdlIG5lZWQgdG8gdXNlIGBvcGFjaXR5YCBhcyBhIGZhbGxiYWNrLlxuICAgICAgQGlmIChtZXRhLnR5cGUtb2YoJGNvbG9yKSAhPSBjb2xvcikge1xuICAgICAgICBvcGFjaXR5OiAkb3BhY2l0eTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZyB7XG4gICAgICAubWF0LXNsaWRlci10aHVtYixcbiAgICAgIC5tYXQtc2xpZGVyLXRodW1iLWxhYmVsIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG1hdC1zbGlkZXItbGFiZWxlZC1taW4tdmFsdWUtdGh1bWItY29sb3I7XG4gICAgICB9XG5cbiAgICAgICYuY2RrLWZvY3VzZWQge1xuICAgICAgICAubWF0LXNsaWRlci10aHVtYixcbiAgICAgICAgLm1hdC1zbGlkZXItdGh1bWItbGFiZWwge1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRtYXQtc2xpZGVyLWxhYmVsZWQtbWluLXZhbHVlLXRodW1iLWxhYmVsLWNvbG9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjpub3QoLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtc2hvd2luZykge1xuICAgICAgLm1hdC1zbGlkZXItdGh1bWIge1xuICAgICAgICBib3JkZXItY29sb3I6ICRtYXQtc2xpZGVyLW9mZi1jb2xvcjtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgICY6aG92ZXIsXG4gICAgICAmLmNkay1mb2N1c2VkIHtcbiAgICAgICAgLm1hdC1zbGlkZXItdGh1bWIge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogJG1hdC1zbGlkZXItb2ZmLWZvY3VzZWQtY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICAmLm1hdC1zbGlkZXItZGlzYWJsZWQgLm1hdC1zbGlkZXItdGh1bWIge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogJG1hdC1zbGlkZXItZGlzYWJsZWQtY29sb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWF0LXNsaWRlci1oYXMtdGlja3MgLm1hdC1zbGlkZXItd3JhcHBlcjo6YWZ0ZXIge1xuICAgIGJvcmRlci1jb2xvcjogJG1hdC1zbGlkZXItdGljay1jb2xvcjtcblxuICAgIC8vIGBtYXQtY29sb3JgIHVzZXMgYHJnYmFgIGZvciB0aGUgb3BhY2l0eSB3aGljaCB3b24ndCB3b3JrIHdpdGhcbiAgICAvLyBDU1MgdmFyaWFibGVzIHNvIHdlIG5lZWQgdG8gdXNlIGBvcGFjaXR5YCBhcyBhIGZhbGxiYWNrLlxuICAgIEBpZiAobWV0YS50eXBlLW9mKCRtYXQtc2xpZGVyLXRpY2stY29sb3IpICE9IGNvbG9yKSB7XG4gICAgICBvcGFjaXR5OiAkbWF0LXNsaWRlci10aWNrLW9wYWNpdHk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbGlkZXItaG9yaXpvbnRhbCAubWF0LXNsaWRlci10aWNrcyB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogcmVwZWF0aW5nLWxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJG1hdC1zbGlkZXItdGljay1jb2xvcixcbiAgICAgICAgJG1hdC1zbGlkZXItdGljay1jb2xvciAkbWF0LXNsaWRlci10aWNrLXNpemUsIHRyYW5zcGFyZW50IDAsIHRyYW5zcGFyZW50KTtcbiAgICAvLyBGaXJlZm94IGRvZXNuJ3QgZHJhdyB0aGUgZ3JhZGllbnQgY29ycmVjdGx5IHdpdGggJ3RvIHJpZ2h0J1xuICAgIC8vIChzZWUgaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTMxNDMxOSkuXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW1vei1yZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KDAuMDAwMWRlZywgJG1hdC1zbGlkZXItdGljay1jb2xvcixcbiAgICAgICAgJG1hdC1zbGlkZXItdGljay1jb2xvciAkbWF0LXNsaWRlci10aWNrLXNpemUsIHRyYW5zcGFyZW50IDAsIHRyYW5zcGFyZW50KTtcblxuICAgIC8vIGBtYXQtY29sb3JgIHVzZXMgYHJnYmFgIGZvciB0aGUgb3BhY2l0eSB3aGljaCB3b24ndCB3b3JrIHdpdGhcbiAgICAvLyBDU1MgdmFyaWFibGVzIHNvIHdlIG5lZWQgdG8gdXNlIGBvcGFjaXR5YCBhcyBhIGZhbGxiYWNrLlxuICAgIEBpZiAobWV0YS50eXBlLW9mKCRtYXQtc2xpZGVyLXRpY2stY29sb3IpICE9IGNvbG9yKSB7XG4gICAgICBvcGFjaXR5OiAkbWF0LXNsaWRlci10aWNrLW9wYWNpdHk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbGlkZXItdmVydGljYWwgLm1hdC1zbGlkZXItdGlja3Mge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAkbWF0LXNsaWRlci10aWNrLWNvbG9yLFxuICAgICAgICAkbWF0LXNsaWRlci10aWNrLWNvbG9yICRtYXQtc2xpZGVyLXRpY2stc2l6ZSwgdHJhbnNwYXJlbnQgMCwgdHJhbnNwYXJlbnQpO1xuXG4gICAgLy8gYG1hdC1jb2xvcmAgdXNlcyBgcmdiYWAgZm9yIHRoZSBvcGFjaXR5IHdoaWNoIHdvbid0IHdvcmsgd2l0aFxuICAgIC8vIENTUyB2YXJpYWJsZXMgc28gd2UgbmVlZCB0byB1c2UgYG9wYWNpdHlgIGFzIGEgZmFsbGJhY2suXG4gICAgQGlmIChtZXRhLnR5cGUtb2YoJG1hdC1zbGlkZXItdGljay1jb2xvcikgIT0gY29sb3IpIHtcbiAgICAgIG9wYWNpdHk6ICRtYXQtc2xpZGVyLXRpY2stb3BhY2l0eTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtdGV4dCB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtZmFtaWx5KCRjb25maWcpO1xuICAgICAgc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbik7XG4gICAgICB3ZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMuZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0yKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIF9kZW5zaXR5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1zbGlkZXInKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBfZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2FzczptYXRoJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcbkB1c2UgJy4uL2NvcmUvZGVuc2l0eS9wcml2YXRlL2NvbXBhdGliaWxpdHknO1xuQHVzZSAnLi9zdGVwcGVyLXZhcmlhYmxlcyc7XG5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcblxuICAubWF0LXN0ZXAtaGVhZGVyIHtcbiAgICAmLmNkay1rZXlib2FyZC1mb2N1c2VkLFxuICAgICYuY2RrLXByb2dyYW0tZm9jdXNlZCxcbiAgICAmOmhvdmVyOm5vdChbYXJpYS1kaXNhYmxlZF0pLFxuICAgICY6aG92ZXJbYXJpYS1kaXNhYmxlZD0nZmFsc2UnXSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIGhvdmVyKTtcbiAgICB9XG5cbiAgICAmOmhvdmVyW2FyaWEtZGlzYWJsZWQ9J3RydWUnXSB7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgfVxuXG4gICAgLy8gT24gdG91Y2ggZGV2aWNlcyB0aGUgOmhvdmVyIHN0YXRlIHdpbGwgbGluZ2VyIG9uIHRoZSBlbGVtZW50IGFmdGVyIGEgdGFwLlxuICAgIC8vIFJlc2V0IGl0IHZpYSBgQG1lZGlhYCBhZnRlciB0aGUgZGVjbGFyYXRpb24sIGJlY2F1c2UgdGhlIG1lZGlhIHF1ZXJ5IGlzbid0XG4gICAgLy8gc3VwcG9ydGVkIGJ5IGFsbCBicm93c2VycyB5ZXQuXG4gICAgQG1lZGlhIChob3Zlcjogbm9uZSkge1xuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm1hdC1zdGVwLWxhYmVsLFxuICAgIC5tYXQtc3RlcC1vcHRpb25hbCB7XG4gICAgICAvLyBUT0RPKGpvc2VwaHBlcnJvdHQpOiBVcGRhdGUgdG8gdXNpbmcgYSBjb3JyZWN0ZWQgZGlzYWJsZWQtdGV4dCBjb250cmFzdFxuICAgICAgLy8gaW5zdGVhZCBvZiBzZWNvbmRhcnktdGV4dC5cbiAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgICB9XG5cbiAgICAubWF0LXN0ZXAtaWNvbiB7XG4gICAgICAvLyBUT0RPKGpvc2VwaHBlcnJvdHQpOiBVcGRhdGUgdG8gdXNpbmcgYSBjb3JyZWN0ZWQgZGlzYWJsZWQtdGV4dCBjb250cmFzdFxuICAgICAgLy8gaW5zdGVhZCBvZiBzZWNvbmRhcnktdGV4dC5cbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcHJpbWFyeSwgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgfVxuXG4gICAgLm1hdC1zdGVwLWljb24tc2VsZWN0ZWQsXG4gICAgLm1hdC1zdGVwLWljb24tc3RhdGUtZG9uZSxcbiAgICAubWF0LXN0ZXAtaWNvbi1zdGF0ZS1lZGl0IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcHJpbWFyeSk7XG4gICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwcmltYXJ5LCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgLm1hdC1zdGVwLWljb24ge1xuICAgICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRhY2NlbnQsIGRlZmF1bHQtY29udHJhc3QpO1xuICAgICAgfVxuXG4gICAgICAubWF0LXN0ZXAtaWNvbi1zZWxlY3RlZCxcbiAgICAgIC5tYXQtc3RlcC1pY29uLXN0YXRlLWRvbmUsXG4gICAgICAubWF0LXN0ZXAtaWNvbi1zdGF0ZS1lZGl0IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRhY2NlbnQpO1xuICAgICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRhY2NlbnQsIGRlZmF1bHQtY29udHJhc3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgLm1hdC1zdGVwLWljb24ge1xuICAgICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCR3YXJuLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICAgIH1cblxuICAgICAgLm1hdC1zdGVwLWljb24tc2VsZWN0ZWQsXG4gICAgICAubWF0LXN0ZXAtaWNvbi1zdGF0ZS1kb25lLFxuICAgICAgLm1hdC1zdGVwLWljb24tc3RhdGUtZWRpdCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkd2Fybik7XG4gICAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHdhcm4sIGRlZmF1bHQtY29udHJhc3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5tYXQtc3RlcC1pY29uLXN0YXRlLWVycm9yIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkd2FybiwgdGV4dCk7XG4gICAgfVxuXG4gICAgLm1hdC1zdGVwLWxhYmVsLm1hdC1zdGVwLWxhYmVsLWFjdGl2ZSB7XG4gICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAubWF0LXN0ZXAtbGFiZWwubWF0LXN0ZXAtbGFiZWwtZXJyb3Ige1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkd2FybiwgdGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zdGVwcGVyLWhvcml6b250YWwsIC5tYXQtc3RlcHBlci12ZXJ0aWNhbCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgfVxuXG4gIC5tYXQtc3RlcHBlci12ZXJ0aWNhbC1saW5lOjpiZWZvcmUge1xuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1ob3Jpem9udGFsLXN0ZXBwZXItaGVhZGVyOjpiZWZvcmUsXG4gIC5tYXQtaG9yaXpvbnRhbC1zdGVwcGVyLWhlYWRlcjo6YWZ0ZXIsXG4gIC5tYXQtc3RlcHBlci1ob3Jpem9udGFsLWxpbmUge1xuICAgIGJvcmRlci10b3AtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC1zdGVwcGVyLXZlcnRpY2FsLCAubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCB7XG4gICAgZm9udC1mYW1pbHk6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LXN0ZXAtbGFiZWwge1xuICAgIGZvbnQ6IHtcbiAgICAgIHNpemU6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1zaXplKCRjb25maWcsIGJvZHktMSk7XG4gICAgICB3ZWlnaHQ6IHR5cG9ncmFwaHktdXRpbHMuZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKTtcbiAgICB9O1xuICB9XG5cbiAgLm1hdC1zdGVwLXN1Yi1sYWJlbC1lcnJvciB7XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgfVxuXG4gIC5tYXQtc3RlcC1sYWJlbC1lcnJvciB7XG4gICAgZm9udC1zaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTIpO1xuICB9XG5cbiAgLm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVkIHtcbiAgICBmb250OiB7XG4gICAgICBzaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTIpO1xuICAgICAgd2VpZ2h0OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtd2VpZ2h0KCRjb25maWcsIGJvZHktMik7XG4gICAgfTtcbiAgfVxufVxuXG5AbWl4aW4gZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRkZW5zaXR5LXNjYWxlOiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGhlaWdodDogY29tcGF0aWJpbGl0eS5wcml2YXRlLWRlbnNpdHktcHJvcC12YWx1ZShzdGVwcGVyLXZhcmlhYmxlcy4kZGVuc2l0eS1jb25maWcsXG4gICAgJGRlbnNpdHktc2NhbGUsIGhlaWdodCk7XG4gICR2ZXJ0aWNhbC1wYWRkaW5nOiBtYXRoLmRpdigkaGVpZ2h0IC0gc3RlcHBlci12YXJpYWJsZXMuJGxhYmVsLWhlYWRlci1oZWlnaHQsIDIpO1xuXG4gIEBpbmNsdWRlIGNvbXBhdGliaWxpdHkucHJpdmF0ZS1kZW5zaXR5LWxlZ2FjeS1jb21wYXRpYmlsaXR5KCkge1xuICAgIC5tYXQtaG9yaXpvbnRhbC1zdGVwcGVyLWhlYWRlciB7XG4gICAgICBoZWlnaHQ6ICRoZWlnaHQ7XG4gICAgfVxuXG4gICAgLm1hdC1zdGVwcGVyLWxhYmVsLXBvc2l0aW9uLWJvdHRvbSAubWF0LWhvcml6b250YWwtc3RlcHBlci1oZWFkZXIsXG4gICAgLm1hdC12ZXJ0aWNhbC1zdGVwcGVyLWhlYWRlciB7XG4gICAgICBwYWRkaW5nOiAkdmVydGljYWwtcGFkZGluZyBzdGVwcGVyLXZhcmlhYmxlcy4kc2lkZS1nYXA7XG4gICAgfVxuXG4gICAgLy8gRW5zdXJlcyB0aGF0IHRoZSB2ZXJ0aWNhbCBsaW5lcyBmb3IgdGhlIHN0ZXAgY29udGVudCBleGNlZWQgaW50byB0aGUgc3RlcFxuICAgIC8vIGhlYWRlcnMgd2l0aCBhIGdpdmVuIGRpc3RhbmNlIChgJG1hdC1zdGVwcGVyLWxpbmUtZ2FwYCkgdG8gdGhlIHN0ZXAgaWNvbi5cbiAgICAubWF0LXN0ZXBwZXItdmVydGljYWwtbGluZTo6YmVmb3JlIHtcbiAgICAgIHRvcDogc3RlcHBlci12YXJpYWJsZXMuJGxpbmUtZ2FwIC0gJHZlcnRpY2FsLXBhZGRpbmc7XG4gICAgICBib3R0b206IHN0ZXBwZXItdmFyaWFibGVzLiRsaW5lLWdhcCAtICR2ZXJ0aWNhbC1wYWRkaW5nO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZXMgdGhhdCB0aGUgaG9yaXpvbnRhbCBsaW5lcyBmb3IgdGhlIHN0ZXAgaGVhZGVyIGFyZSBjZW50ZXJlZCB2ZXJ0aWNhbGx5LlxuICAgIC5tYXQtc3RlcHBlci1sYWJlbC1wb3NpdGlvbi1ib3R0b20gLm1hdC1ob3Jpem9udGFsLXN0ZXBwZXItaGVhZGVyIHtcbiAgICAgICY6OmFmdGVyLCAmOjpiZWZvcmUge1xuICAgICAgICB0b3A6ICR2ZXJ0aWNhbC1wYWRkaW5nICsgbWF0aC5kaXYoc3RlcHBlci12YXJpYWJsZXMuJGxhYmVsLWhlYWRlci1oZWlnaHQsIDIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVuc3VyZXMgdGhhdCB0aGUgaG9yaXpvbnRhbCBsaW5lIGZvciB0aGUgc3RlcCBjb250ZW50IGlzIGFsaWduZWQgY2VudGVyZWQgdmVydGljYWxseS5cbiAgICAubWF0LXN0ZXBwZXItbGFiZWwtcG9zaXRpb24tYm90dG9tIC5tYXQtc3RlcHBlci1ob3Jpem9udGFsLWxpbmUge1xuICAgICAgdG9wOiAkdmVydGljYWwtcGFkZGluZyArIG1hdGguZGl2KHN0ZXBwZXItdmFyaWFibGVzLiRsYWJlbC1oZWFkZXItaGVpZ2h0LCAyKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LXN0ZXBwZXInKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBkZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJHByaW1hcnk6IG1hcC5nZXQoJGNvbmZpZywgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC5nZXQoJGNvbmZpZywgYWNjZW50KTtcbiAgJHdhcm46IG1hcC5nZXQoJGNvbmZpZywgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcbiAgJGhlYWRlci1ib3JkZXI6IDFweCBzb2xpZCB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuXG4gIC5tYXQtdGFiLW5hdi1iYXIsXG4gIC5tYXQtdGFiLWhlYWRlciB7XG4gICAgYm9yZGVyLWJvdHRvbTogJGhlYWRlci1ib3JkZXI7XG4gIH1cblxuICAubWF0LXRhYi1ncm91cC1pbnZlcnRlZC1oZWFkZXIge1xuICAgIC5tYXQtdGFiLW5hdi1iYXIsXG4gICAgLm1hdC10YWItaGVhZGVyIHtcbiAgICAgIGJvcmRlci10b3A6ICRoZWFkZXItYm9yZGVyO1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAubWF0LXRhYi1sYWJlbCwgLm1hdC10YWItbGluayB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgdGV4dCk7XG5cbiAgICAmLm1hdC10YWItZGlzYWJsZWQge1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGlzYWJsZWQtdGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiB7XG4gICAgYm9yZGVyLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiB7XG4gICAgYm9yZGVyLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGhlYWRlciBib3JkZXIgd2hlbiB0aGVyZSBpcyBhIGJhY2tncm91bmQgY29sb3JcbiAgLm1hdC10YWItZ3JvdXBbY2xhc3MqPSdtYXQtYmFja2dyb3VuZC0nXSA+IC5tYXQtdGFiLWhlYWRlcixcbiAgLm1hdC10YWItbmF2LWJhcltjbGFzcyo9J21hdC1iYWNrZ3JvdW5kLSddIHtcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gIH1cblxuICAubWF0LXRhYi1ncm91cCwgLm1hdC10YWItbmF2LWJhciB7XG4gICAgJHRoZW1lLWNvbG9yczogKFxuICAgICAgcHJpbWFyeTogJHByaW1hcnksXG4gICAgICBhY2NlbnQ6ICRhY2NlbnQsXG4gICAgICB3YXJuOiAkd2FyblxuICAgICk7XG5cbiAgICBAZWFjaCAkbmFtZSwgJGNvbG9yIGluICR0aGVtZS1jb2xvcnMge1xuICAgICAgLy8gU2V0IHRoZSBmb3JlZ3JvdW5kIGNvbG9yIG9mIHRoZSB0YWJzXG4gICAgICAmLm1hdC0jeyRuYW1lfSB7XG4gICAgICAgIEBpbmNsdWRlIF9sYWJlbC1mb2N1cy1jb2xvcigkY29sb3IpO1xuICAgICAgICBAaW5jbHVkZSBfaW5rLWJhci1jb2xvcigkY29sb3IpO1xuXG4gICAgICAgIC8vIE92ZXJyaWRlIGluayBiYXIgd2hlbiBiYWNrZ3JvdW5kIGNvbG9yIGlzIHRoZSBzYW1lXG4gICAgICAgICYubWF0LWJhY2tncm91bmQtI3skbmFtZX0ge1xuICAgICAgICAgID4gLm1hdC10YWItaGVhZGVyLCA+IC5tYXQtdGFiLWxpbmstY29udGFpbmVyIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIF9pbmstYmFyLWNvbG9yKCRjb2xvciwgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgQGVhY2ggJG5hbWUsICRjb2xvciBpbiAkdGhlbWUtY29sb3JzIHtcbiAgICAgIC8vIFNldCBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSB0YWJzIGFuZCBvdmVycmlkZSBmb2N1cyBjb2xvclxuICAgICAgJi5tYXQtYmFja2dyb3VuZC0jeyRuYW1lfSB7XG4gICAgICAgIEBpbmNsdWRlIF9sYWJlbC1mb2N1cy1jb2xvcigkY29sb3IpO1xuICAgICAgICBAaW5jbHVkZSBfdGFicy1iYWNrZ3JvdW5kKCRjb2xvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBfaW5rLWJhci1jb2xvcigkY29sb3IsICRodWU6IGRlZmF1bHQpIHtcbiAgLm1hdC1pbmstYmFyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGNvbG9yLCAkaHVlKTtcbiAgfVxufVxuXG5AbWl4aW4gX2xhYmVsLWZvY3VzLWNvbG9yKCR0YWItZm9jdXMtY29sb3IpIHtcbiAgLm1hdC10YWItbGFiZWwsXG4gIC5tYXQtdGFiLWxpbmsge1xuICAgICYuY2RrLWtleWJvYXJkLWZvY3VzZWQsXG4gICAgJi5jZGstcHJvZ3JhbS1mb2N1c2VkIHtcbiAgICAgICY6bm90KC5tYXQtdGFiLWRpc2FibGVkKSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkdGFiLWZvY3VzLWNvbG9yLCBsaWdodGVyLCAwLjMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gX3RhYnMtYmFja2dyb3VuZCgkYmFja2dyb3VuZC1jb2xvcikge1xuICAvLyBOb3RlIHRoYXQgdGhlc2Ugc2VsZWN0b3JzIHRhcmdldCBkaXJlY3QgZGVzY2VuZGFudHMgc29cbiAgLy8gdGhhdCB0aGUgc3R5bGVzIGRvbid0IGFwcGx5IHRvIGFueSBuZXN0ZWQgdGFiIGdyb3Vwcy5cblxuICAvLyBTZXQgYmFja2dyb3VuZCBjb2xvciBmb3IgdGhlIHRhYiBncm91cFxuICA+IC5tYXQtdGFiLWhlYWRlciwgPiAubWF0LXRhYi1saW5rLWNvbnRhaW5lciwgPiAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLWNvbG9yKTtcbiAgfVxuXG4gIC8vIFNldCBsYWJlbHMgdG8gY29udHJhc3QgYWdhaW5zdCBiYWNrZ3JvdW5kXG4gID4gLm1hdC10YWItaGVhZGVyIC5tYXQtdGFiLWxhYmVsLCA+IC5tYXQtdGFiLWxpbmstY29udGFpbmVyIC5tYXQtdGFiLWxpbmsge1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQtY29sb3IsIGRlZmF1bHQtY29udHJhc3QpO1xuXG4gICAgJi5tYXQtdGFiLWRpc2FibGVkIHtcbiAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQtY29sb3IsIGRlZmF1bHQtY29udHJhc3QsIDAuNCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IHBhZ2luYXRpb24gY2hldnJvbnMgdG8gY29udHJhc3QgYmFja2dyb3VuZFxuICA+IC5tYXQtdGFiLWhlYWRlciAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uLFxuICA+IC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24sXG4gID4gLm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC1mb2N1cy1pbmRpY2F0b3I6OmJlZm9yZSxcbiAgPiAubWF0LXRhYi1oZWFkZXIgLm1hdC1mb2N1cy1pbmRpY2F0b3I6OmJlZm9yZSB7XG4gICAgYm9yZGVyLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQtY29sb3IsIGRlZmF1bHQtY29udHJhc3QpO1xuICB9XG5cbiAgPiAubWF0LXRhYi1oZWFkZXIgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbixcbiAgPiAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1kaXNhYmxlZCAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbi1jaGV2cm9uIHtcbiAgICAvLyBTZXQgdGhlIGNvbG9yIG9wYWNpdHkgdmlhIGBvcGFjaXR5YCwgcmF0aGVyIHRoYW4gYHJnYmFgLCBiZWNhdXNlIGl0IG1heSBiZSBhIENTUyB2YXJpYWJsZS5cbiAgICBib3JkZXItY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZC1jb2xvciwgZGVmYXVsdC1jb250cmFzdCwgMSk7XG4gICAgb3BhY2l0eTogMC40O1xuICB9XG5cbiAgLy8gU2V0IHJpcHBsZXMgY29sb3IgdG8gYmUgdGhlIGNvbnRyYXN0IGNvbG9yIG9mIHRoZSBuZXcgYmFja2dyb3VuZC4gT3RoZXJ3aXNlIHRoZSByaXBwbGVcbiAgLy8gY29sb3Igd2lsbCBiZSBiYXNlZCBvbiB0aGUgYXBwIGJhY2tncm91bmQgY29sb3IuXG4gID4gLm1hdC10YWItaGVhZGVyIC5tYXQtcmlwcGxlLWVsZW1lbnQsXG4gID4gLm1hdC10YWItbGluay1jb250YWluZXIgLm1hdC1yaXBwbGUtZWxlbWVudCxcbiAgPiAubWF0LXRhYi1oZWFkZXItcGFnaW5hdGlvbiAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAvLyBTZXQgdGhlIGNvbG9yIG9wYWNpdHkgdmlhIGBvcGFjaXR5YCwgcmF0aGVyIHRoYW4gYHJnYmFgLCBiZWNhdXNlIGl0IG1heSBiZSBhIENTUyB2YXJpYWJsZS5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQtY29sb3IsIGRlZmF1bHQtY29udHJhc3QsIDEpO1xuICAgIG9wYWNpdHk6IDAuMTI7XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC10YWItZ3JvdXAge1xuICAgIGZvbnQtZmFtaWx5OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtZmFtaWx5KCRjb25maWcpO1xuICB9XG5cbiAgLm1hdC10YWItbGFiZWwsIC5tYXQtdGFiLWxpbmsge1xuICAgIGZvbnQ6IHtcbiAgICAgIGZhbWlseTogdHlwb2dyYXBoeS11dGlscy5mb250LWZhbWlseSgkY29uZmlnLCBidXR0b24pO1xuICAgICAgc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgYnV0dG9uKTtcbiAgICAgIHdlaWdodDogdHlwb2dyYXBoeS11dGlscy5mb250LXdlaWdodCgkY29uZmlnLCBidXR0b24pO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LXRhYnMnKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBfZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnLi4vY29yZS9kZW5zaXR5L3ByaXZhdGUvY29tcGF0aWJpbGl0eSc7XG5AdXNlICcuLi9jb3JlL3N0eWxlL3ZhcmlhYmxlcyc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi9jb3JlL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5AdXNlICcuL3Rvb2xiYXItdmFyaWFibGVzJztcblxuQG1peGluIF9oZWlnaHQoJGhlaWdodCkge1xuICAubWF0LXRvb2xiYXItbXVsdGlwbGUtcm93cyB7XG4gICAgbWluLWhlaWdodDogJGhlaWdodDtcbiAgfVxuICAubWF0LXRvb2xiYXItcm93LCAubWF0LXRvb2xiYXItc2luZ2xlLXJvdyB7XG4gICAgaGVpZ2h0OiAkaGVpZ2h0O1xuICB9XG59XG5cbkBtaXhpbiBfcGFsZXR0ZS1zdHlsZXMoJHBhbGV0dGUpIHtcbiAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwYWxldHRlKTtcbiAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcGFsZXR0ZSwgZGVmYXVsdC1jb250cmFzdCk7XG59XG5cbkBtaXhpbiBfZm9ybS1maWVsZC1vdmVycmlkZXMge1xuICAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lLFxuICAubWF0LWZvcm0tZmllbGQtcmlwcGxlLFxuICAubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuICAubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuICAubWF0LXNlbGVjdC12YWx1ZSxcbiAgLm1hdC1zZWxlY3QtYXJyb3csXG4gIC5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gIH1cblxuICAubWF0LWlucHV0LWVsZW1lbnQge1xuICAgIGNhcmV0LWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gIH1cbn1cblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtdG9vbGJhciB7XG4gICAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCBhcHAtYmFyKTtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgICYubWF0LXByaW1hcnkge1xuICAgICAgQGluY2x1ZGUgX3BhbGV0dGUtc3R5bGVzKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgQGluY2x1ZGUgX3BhbGV0dGUtc3R5bGVzKCRhY2NlbnQpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgQGluY2x1ZGUgX3BhbGV0dGUtc3R5bGVzKCR3YXJuKTtcbiAgICB9XG5cbiAgICBAaW5jbHVkZSBfZm9ybS1maWVsZC1vdmVycmlkZXM7XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgLm1hdC10b29sYmFyLFxuICAubWF0LXRvb2xiYXIgaDEsXG4gIC5tYXQtdG9vbGJhciBoMixcbiAgLm1hdC10b29sYmFyIGgzLFxuICAubWF0LXRvb2xiYXIgaDQsXG4gIC5tYXQtdG9vbGJhciBoNSxcbiAgLm1hdC10b29sYmFyIGg2IHtcbiAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5LXV0aWxzLnR5cG9ncmFwaHktbGV2ZWwoJGNvbmZpZywgdGl0bGUpO1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG5AbWl4aW4gZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRkZW5zaXR5LXNjYWxlOiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGhlaWdodC1kZXNrdG9wOiBjb21wYXRpYmlsaXR5LnByaXZhdGUtZGVuc2l0eS1wcm9wLXZhbHVlKFxuICAgICAgdG9vbGJhci12YXJpYWJsZXMuJGRlc2t0b3AtZGVuc2l0eS1jb25maWcsICRkZW5zaXR5LXNjYWxlLCBoZWlnaHQpO1xuICAkaGVpZ2h0LW1vYmlsZTogY29tcGF0aWJpbGl0eS5wcml2YXRlLWRlbnNpdHktcHJvcC12YWx1ZShcbiAgICAgIHRvb2xiYXItdmFyaWFibGVzLiRtb2JpbGUtZGVuc2l0eS1jb25maWcsICRkZW5zaXR5LXNjYWxlLCBoZWlnaHQpO1xuXG4gIEBpbmNsdWRlIGNvbXBhdGliaWxpdHkucHJpdmF0ZS1kZW5zaXR5LWxlZ2FjeS1jb21wYXRpYmlsaXR5KCkge1xuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBoZWlnaHQgZm9yIHRoZSB0b29sYmFyLlxuICAgIEBpbmNsdWRlIF9oZWlnaHQoJGhlaWdodC1kZXNrdG9wKTtcblxuICAgIC8vIEFzIHBlciBzcGVjcywgdG9vbGJhcnMgc2hvdWxkIGhhdmUgYSBkaWZmZXJlbnQgaGVpZ2h0IGluIG1vYmlsZSBkZXZpY2VzLiBUaGlzIGhhcyBiZWVuXG4gICAgLy8gc3BlY2lmaWVkIGluIHRoZSBvbGQgZ3VpZGVsaW5lcyBhbmQgaXMgc3RpbGwgb2JzZXJ2YWJsZSBpbiB0aGUgbmV3IHNwZWNpZmljYXRpb25zIGJ5XG4gICAgLy8gbG9va2luZyBhdCB0aGUgc3BlYyBpbWFnZXMuIFNlZTogaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vY29tcG9uZW50cy9hcHAtYmFycy10b3AuaHRtbCNhbmF0b215XG4gICAgQG1lZGlhICh2YXJpYWJsZXMuJHhzbWFsbCkge1xuICAgICAgQGluY2x1ZGUgX2hlaWdodCgkaGVpZ2h0LW1vYmlsZSk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC10b29sYmFyJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2FzczptYXRoJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcblxuJHRhcmdldC1oZWlnaHQ6IDIycHg7XG4kZm9udC1zaXplOiAxMHB4O1xuJHZlcnRpY2FsLXBhZGRpbmc6IG1hdGguZGl2KCR0YXJnZXQtaGVpZ2h0IC0gJGZvbnQtc2l6ZSwgMik7XG5cbiRoYW5kc2V0LXRhcmdldC1oZWlnaHQ6IDMwcHg7XG4kaGFuZHNldC1mb250LXNpemU6IDE0cHg7XG4kaGFuZHNldC12ZXJ0aWNhbC1wYWRkaW5nOiBtYXRoLmRpdigkaGFuZHNldC10YXJnZXQtaGVpZ2h0IC0gJGhhbmRzZXQtZm9udC1zaXplLCAyKTtcblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcblxuICAubWF0LXRvb2x0aXAge1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgdG9vbHRpcCwgMC45KTtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LXRvb2x0aXAge1xuICAgIGZvbnQtZmFtaWx5OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtZmFtaWx5KCRjb25maWcpO1xuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcbiAgICBwYWRkaW5nLXRvcDogJHZlcnRpY2FsLXBhZGRpbmc7XG4gICAgcGFkZGluZy1ib3R0b206ICR2ZXJ0aWNhbC1wYWRkaW5nO1xuICB9XG5cbiAgLm1hdC10b29sdGlwLWhhbmRzZXQge1xuICAgIGZvbnQtc2l6ZTogJGhhbmRzZXQtZm9udC1zaXplO1xuICAgIHBhZGRpbmctdG9wOiAkaGFuZHNldC12ZXJ0aWNhbC1wYWRkaW5nO1xuICAgIHBhZGRpbmctYm90dG9tOiAkaGFuZHNldC12ZXJ0aWNhbC1wYWRkaW5nO1xuICB9XG59XG5cbkBtaXhpbiBfZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtdG9vbHRpcCcpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG5cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvbGlzdC1jb21tb24nO1xuXG5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtbGlzdC1iYXNlIHtcbiAgICAubWF0LWxpc3QtaXRlbSB7XG4gICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIH1cblxuICAgIC5tYXQtc3ViaGVhZGVyIHtcbiAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgICB9XG5cbiAgICAubWF0LWxpc3QtaXRlbS1kaXNhYmxlZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIGRpc2FibGVkLWxpc3Qtb3B0aW9uKTtcbiAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtbGlzdC1vcHRpb24sXG4gIC5tYXQtbmF2LWxpc3QgLm1hdC1saXN0LWl0ZW0sXG4gIC5tYXQtYWN0aW9uLWxpc3QgLm1hdC1saXN0LWl0ZW0ge1xuICAgICY6aG92ZXIsICY6Zm9jdXMge1xuICAgICAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCAnaG92ZXInKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWxpc3Qtc2luZ2xlLXNlbGVjdGVkLW9wdGlvbiB7XG4gICAgJiwgJjpob3ZlciwgJjpmb2N1cyB7XG4gICAgICBiYWNrZ3JvdW5kOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIGhvdmVyLCAwLjEyKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0eXBvZ3JhcGh5LnByaXZhdGUtdHlwb2dyYXBoeS10by0yMDE0LWNvbmZpZyhcbiAgICAgIHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCRjb25maWctb3ItdGhlbWUpKTtcbiAgJGZvbnQtZmFtaWx5OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtZmFtaWx5KCRjb25maWcpO1xuXG4gIC5tYXQtbGlzdC1pdGVtIHtcbiAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xuICB9XG5cbiAgLm1hdC1saXN0LW9wdGlvbiB7XG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcbiAgfVxuXG4gIC8vIERlZmF1bHQgbGlzdFxuICAubWF0LWxpc3QtYmFzZSB7XG4gICAgLm1hdC1saXN0LWl0ZW0ge1xuICAgICAgZm9udC1zaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBzdWJoZWFkaW5nLTIpO1xuICAgICAgQGluY2x1ZGUgbGlzdC1jb21tb24uYmFzZSh0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpKTtcbiAgICB9XG5cbiAgICAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgICAgIGZvbnQtc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgc3ViaGVhZGluZy0yKTtcbiAgICAgIEBpbmNsdWRlIGxpc3QtY29tbW9uLmJhc2UodHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgYm9keS0xKSk7XG4gICAgfVxuXG4gICAgLm1hdC1zdWJoZWFkZXIge1xuICAgICAgZm9udC1mYW1pbHk6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1mYW1pbHkoJGNvbmZpZywgYm9keS0yKTtcbiAgICAgIGZvbnQtc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgYm9keS0yKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtd2VpZ2h0KCRjb25maWcsIGJvZHktMik7XG4gICAgfVxuICB9XG5cbiAgLy8gRGVuc2UgbGlzdFxuICAubWF0LWxpc3QtYmFzZVtkZW5zZV0ge1xuICAgIC5tYXQtbGlzdC1pdGVtIHtcbiAgICAgIGZvbnQtc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbik7XG4gICAgICBAaW5jbHVkZSBsaXN0LWNvbW1vbi5iYXNlKHR5cG9ncmFwaHktdXRpbHMuZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pKTtcbiAgICB9XG5cbiAgICAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgICAgIGZvbnQtc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbik7XG4gICAgICBAaW5jbHVkZSBsaXN0LWNvbW1vbi5iYXNlKHR5cG9ncmFwaHktdXRpbHMuZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pKTtcbiAgICB9XG5cbiAgICAubWF0LXN1YmhlYWRlciB7XG4gICAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xuICAgICAgZm9udC1zaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBjYXB0aW9uKTtcbiAgICAgIGZvbnQtd2VpZ2h0OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtd2VpZ2h0KCRjb25maWcsIGJvZHktMik7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBfZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtbGlzdCcpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi90aGVtaW5nL3RoZW1pbmcnO1xuQHVzZSAnLi4vdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL3R5cG9ncmFwaHkvdHlwb2dyYXBoeS11dGlscyc7XG5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcblxuICAubWF0LW9wdGlvbiB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgdGV4dCk7XG5cbiAgICAmOmhvdmVyOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCksXG4gICAgJjpmb2N1czpub3QoLm1hdC1vcHRpb24tZGlzYWJsZWQpIHtcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgaG92ZXIpO1xuICAgIH1cblxuICAgIC8vIEluIG11bHRpcGxlIG1vZGUgdGhlcmUgaXMgYSBjaGVja2JveCB0byBzaG93IHRoYXQgdGhlIG9wdGlvbiBpcyBzZWxlY3RlZC5cbiAgICAmLm1hdC1zZWxlY3RlZDpub3QoLm1hdC1vcHRpb24tbXVsdGlwbGUpOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgICAgYmFja2dyb3VuZDogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCBob3Zlcik7XG4gICAgfVxuXG4gICAgJi5tYXQtYWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgaG92ZXIpO1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgdGV4dCk7XG4gICAgfVxuXG4gICAgJi5tYXQtb3B0aW9uLWRpc2FibGVkIHtcbiAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGhpbnQtdGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1wcmltYXJ5IC5tYXQtb3B0aW9uLm1hdC1zZWxlY3RlZDpub3QoLm1hdC1vcHRpb24tZGlzYWJsZWQpIHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwcmltYXJ5LCB0ZXh0KTtcbiAgfVxuXG4gIC5tYXQtYWNjZW50IC5tYXQtb3B0aW9uLm1hdC1zZWxlY3RlZDpub3QoLm1hdC1vcHRpb24tZGlzYWJsZWQpIHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRhY2NlbnQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC13YXJuIC5tYXQtb3B0aW9uLm1hdC1zZWxlY3RlZDpub3QoLm1hdC1vcHRpb24tZGlzYWJsZWQpIHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCR3YXJuLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LW9wdGlvbiB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtZmFtaWx5KCRjb25maWcpO1xuICAgICAgc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgc3ViaGVhZGluZy0yKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIF9kZW5zaXR5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1vcHRpb24nKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBfZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnLi4vdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL3R5cG9ncmFwaHkvdHlwb2dyYXBoeSc7XG5AdXNlICcuLi90eXBvZ3JhcGh5L3R5cG9ncmFwaHktdXRpbHMnO1xuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtb3B0Z3JvdXAtbGFiZWwge1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtb3B0Z3JvdXAtZGlzYWJsZWQgLm1hdC1vcHRncm91cC1sYWJlbCB7XG4gICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgaGludC10ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LW9wdGdyb3VwLWxhYmVsIHtcbiAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5LXV0aWxzLnR5cG9ncmFwaHktbGV2ZWwoJGNvbmZpZywgYm9keS0yKTtcbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LW9wdGdyb3VwJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy9wYWxldHRlJztcbkB1c2UgJy4uL2NvcmUvc3R5bGUvcHJpdmF0ZSc7XG5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC5nZXQoJGNvbmZpZywgaXMtZGFyayk7XG4gICRhY2NlbnQ6IG1hcC5nZXQoJGNvbmZpZywgYWNjZW50KTtcblxuICAubWF0LXNuYWNrLWJhci1jb250YWluZXIge1xuICAgIC8vIFVzZSB0aGUgcHJpbWFyeSB0ZXh0IG9uIHRoZSBkYXJrIHRoZW1lLCBldmVuIHRob3VnaCB0aGUgbGlnaHRlciBvbmUgdXNlc1xuICAgIC8vIGEgc2Vjb25kYXJ5LCBiZWNhdXNlIHRoZSBjb250cmFzdCBvbiB0aGUgbGlnaHQgcHJpbWFyeSB0ZXh0IGlzIHBvb3IuXG4gICAgY29sb3I6IGlmKCRpcy1kYXJrLXRoZW1lLCBwYWxldHRlLiRkYXJrLXByaW1hcnktdGV4dCwgcGFsZXR0ZS4kbGlnaHQtc2Vjb25kYXJ5LXRleHQpO1xuICAgIGJhY2tncm91bmQ6IGlmKCRpcy1kYXJrLXRoZW1lLCBtYXAuZ2V0KHBhbGV0dGUuJGdyZXktcGFsZXR0ZSwgNTApLCAjMzIzMjMyKTtcblxuICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1lbGV2YXRpb24oNiwgJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LXNpbXBsZS1zbmFja2Jhci1hY3Rpb24ge1xuICAgIGNvbG9yOiBpZigkaXMtZGFyay10aGVtZSwgaW5oZXJpdCwgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRhY2NlbnQsIHRleHQpKTtcbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHR5cG9ncmFwaHkucHJpdmF0ZS10eXBvZ3JhcGh5LXRvLTIwMTQtY29uZmlnKFxuICAgICAgdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJGNvbmZpZy1vci10aGVtZSkpO1xuICAubWF0LXNpbXBsZS1zbmFja2JhciB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtZmFtaWx5KCRjb25maWcsIGJvZHktMSk7XG4gICAgICBzaXplOiB0eXBvZ3JhcGh5LXV0aWxzLmZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbiB7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiBpbmhlcml0O1xuICAgICAgc2l6ZTogaW5oZXJpdDtcbiAgICAgIHdlaWdodDogdHlwb2dyYXBoeS11dGlscy5mb250LXdlaWdodCgkY29uZmlnLCBidXR0b24pO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LXNuYWNrLWJhcicpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9jb3JlL2RlbnNpdHkvcHJpdmF0ZS9jb21wYXRpYmlsaXR5JztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5JztcbkB1c2UgJy4uL2NvcmUvdHlwb2dyYXBoeS90eXBvZ3JhcGh5LXV0aWxzJztcbkB1c2UgJy4vdHJlZS12YXJpYWJsZXMnO1xuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LXRyZWUge1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgJ2NhcmQnKTtcbiAgfVxuXG4gIC5tYXQtdHJlZS1ub2RlLFxuICAubWF0LW5lc3RlZC10cmVlLW5vZGUge1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG59XG5cbkBtaXhpbiB0eXBvZ3JhcGh5KCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdHlwb2dyYXBoeS5wcml2YXRlLXR5cG9ncmFwaHktdG8tMjAxNC1jb25maWcoXG4gICAgICB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKSk7XG4gIC5tYXQtdHJlZSB7XG4gICAgZm9udC1mYW1pbHk6IHR5cG9ncmFwaHktdXRpbHMuZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LXRyZWUtbm9kZSxcbiAgLm1hdC1uZXN0ZWQtdHJlZS1ub2RlIHtcbiAgICBmb250LXdlaWdodDogdHlwb2dyYXBoeS11dGlscy5mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTEpO1xuICAgIGZvbnQtc2l6ZTogdHlwb2dyYXBoeS11dGlscy5mb250LXNpemUoJGNvbmZpZywgYm9keS0xKTtcbiAgfVxufVxuXG5AbWl4aW4gZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRkZW5zaXR5LXNjYWxlOiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGhlaWdodDogY29tcGF0aWJpbGl0eS5wcml2YXRlLWRlbnNpdHktcHJvcC12YWx1ZSh0cmVlLXZhcmlhYmxlcy4kZGVuc2l0eS1jb25maWcsXG4gICAgJGRlbnNpdHktc2NhbGUsIGhlaWdodCk7XG5cbiAgQGluY2x1ZGUgY29tcGF0aWJpbGl0eS5wcml2YXRlLWRlbnNpdHktbGVnYWN5LWNvbXBhdGliaWxpdHkoKSB7XG4gICAgLm1hdC10cmVlLW5vZGUge1xuICAgICAgbWluLWhlaWdodDogJGhlaWdodDtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LXRyZWUnKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBkZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG5cbiIsIkB1c2UgJy4uLy4uLy4uL2Nkay9hMTF5JztcblxuQG1peGluIHJpcHBsZSgpIHtcbiAgLy8gVGhlIGhvc3QgZWxlbWVudCBvZiBhbiBtYXQtcmlwcGxlIGRpcmVjdGl2ZSBzaG91bGQgYWx3YXlzIGhhdmUgYSBwb3NpdGlvbiBvZiBcImFic29sdXRlXCIgb3JcbiAgLy8gXCJyZWxhdGl2ZVwiIHNvIHRoYXQgdGhlIHJpcHBsZXMgaW5zaWRlIGFyZSBjb3JyZWN0bHkgcG9zaXRpb25lZCByZWxhdGl2ZWx5IHRvIHRoZSBjb250YWluZXIuXG4gIC5tYXQtcmlwcGxlIHtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgLy8gQnkgZGVmYXVsdCwgZXZlcnkgcmlwcGxlIGNvbnRhaW5lciBzaG91bGQgaGF2ZSBwb3NpdGlvbjogcmVsYXRpdmUgaW4gZmF2b3Igb2YgY3JlYXRpbmcgYW5cbiAgICAvLyBlYXN5IEFQSSBmb3IgZGV2ZWxvcGVycyB1c2luZyB0aGUgTWF0UmlwcGxlIGRpcmVjdGl2ZS5cbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAvLyBQcm9tb3RlIGNvbnRhaW5lcnMgdGhhdCBoYXZlIHJpcHBsZXMgdG8gYSBuZXcgbGF5ZXIuIFdlIHdhbnQgdG8gdGFyZ2V0IGA6bm90KDplbXB0eSlgLFxuICAgIC8vIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCBhbGwgcmlwcGxlIGNvbnRhaW5lcnMgdG8gaGF2ZSB0aGVpciBvd24gbGF5ZXIgc2luY2UgdGhleSdyZSB1c2VkIGluIGFcbiAgICAvLyBsb3Qgb2YgcGxhY2VzIGFuZCB0aGUgbGF5ZXIgaXMgb25seSByZWxldmFudCB3aGlsZSBhbmltYXRpbmcuIE5vdGUgdGhhdCBpZGVhbGx5IHdlJ2QgdXNlXG4gICAgLy8gdGhlIGBjb250YWluYCBwcm9wZXJ0eSBoZXJlIChzZWUgIzEzMTc1KSwgYmVjYXVzZSBgOmVtcHR5YCBjYW4gYmUgYnJva2VuIGJ5IGhhdmluZyBleHRyYVxuICAgIC8vIHRleHQgaW5zaWRlIHRoZSBlbGVtZW50LCBidXQgaXQgaXNuJ3QgdmVyeSB3ZWxsIHN1cHBvcnRlZCB5ZXQuXG4gICAgJjpub3QoOmVtcHR5KSB7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1yaXBwbGUubWF0LXJpcHBsZS11bmJvdW5kZWQge1xuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICB9XG5cbiAgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcblxuICAgIHRyYW5zaXRpb246IG9wYWNpdHksIHRyYW5zZm9ybSAwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcblxuICAgIC8vIEluIGhpZ2ggY29udHJhc3QgbW9kZSB0aGUgcmlwcGxlIGlzIG9wYXF1ZSwgY2F1c2luZyBpdCB0byBvYnN0cnVjdCB0aGUgY29udGVudC5cbiAgICBAaW5jbHVkZSBhMTF5LmhpZ2gtY29udHJhc3QoYWN0aXZlLCBvZmYpIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG59XG4iLCIvLy8gRW1pdHMgYSBDU1MgY2xhc3MsIGAuY2RrLXZpc3VhbGx5LWhpZGRlbmAuIFRoaXMgY2xhc3MgY2FuIGJlIGFwcGxpZWQgdG8gYW4gZWxlbWVudFxuLy8vIHRvIG1ha2UgdGhhdCBlbGVtZW50IHZpc3VhbGx5IGhpZGRlbiB3aGlsZSByZW1haW5pbmcgYXZhaWxhYmxlIHRvIGFzc2lzdGl2ZSB0ZWNobm9sb2d5LlxuQG1peGluIGExMXktdmlzdWFsbHktaGlkZGVuKCkge1xuICAuY2RrLXZpc3VhbGx5LWhpZGRlbiB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGNsaXA6IHJlY3QoMCAwIDAgMCk7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgbWFyZ2luOiAtMXB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcGFkZGluZzogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDFweDtcblxuICAgIC8vIFRoaXMgd29ya3MgYXJvdW5kIGEgQ2hyb21lIGJ1ZyB0aGF0IGNhbiBjYXVzZSB0aGUgdGFiIHRvIGNyYXNoIHdoZW4gbGFyZ2UgYW1vdW50cyBvZlxuICAgIC8vIG5vbi1FbmdsaXNoIHRleHQgZ2V0IHdyYXBwZWQ6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTEyMDE0NDRcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gICAgLy8gQXZvaWQgYnJvd3NlcnMgcmVuZGVyaW5nIHRoZSBmb2N1cyByaW5nIGluIHNvbWUgY2FzZXMuXG4gICAgb3V0bGluZTogMDtcblxuICAgIC8vIEF2b2lkIHNvbWUgY2FzZXMgd2hlcmUgdGhlIGJyb3dzZXIgd2lsbCBzdGlsbCByZW5kZXIgdGhlIG5hdGl2ZSBjb250cm9scyAoc2VlICM5MDQ5KS5cbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuXG4gICAgLy8gV2UgbmVlZCBhdCBsZWFzdCBvbmUgb2YgdG9wL2JvdHRvbS9sZWZ0L3JpZ2h0IGluIG9yZGVyIHRvIHByZXZlbnQgY2FzZXMgd2hlcmUgdGhlXG4gICAgLy8gYWJzb2x1dGUtcG9zaXRpb25lZCBlbGVtZW50IGlzIHB1c2hlZCBkb3duIGFuZCBjYW4gYWZmZWN0IHNjcm9sbGluZyAoc2VlICMyNDU5NykuXG4gICAgLy8gYGxlZnRgIHdhcyBjaG9zZW4gaGVyZSwgYmVjYXVzZSBpdCdzIHRoZSBsZWFzdCBsaWtlbHkgdG8gYnJlYWsgb3ZlcnJpZGVzIHdoZXJlIHRoZVxuICAgIC8vIGVsZW1lbnQgbWlnaHQgaGF2ZSBiZWVuIHBvc2l0aW9uZWQgKGUuZy4gYG1hdC1jaGVja2JveGApLlxuICAgIGxlZnQ6IDA7XG5cbiAgICBbZGlyPSdydGwnXSAmIHtcbiAgICAgIGxlZnQ6IGF1dG87XG4gICAgICByaWdodDogMDtcbiAgICB9XG4gIH1cbn1cblxuLy8vIEBkZXByZWNhdGVkIFVzZSBgYTExeS12aXN1YWxseS1oaWRkZW5gLlxuQG1peGluIGExMXkoKSB7XG4gIEBpbmNsdWRlIGExMXktdmlzdWFsbHktaGlkZGVuO1xufVxuXG4vLy8gRW1pdHMgdGhlIG1peGluJ3MgY29udGVudCBuZXN0ZWQgdW5kZXIgYCRzZWxlY3Rvci1jb250ZXh0YCBpZiBgJHNlbGVjdG9yLWNvbnRleHRgXG4vLy8gaXMgbm9uLWVtcHR5LlxuLy8vIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3Rvci1jb250ZXh0IFRoZSBzZWxlY3RvciB1bmRlciB3aGljaCB0byBuZXN0IHRoZSBtaXhpbidzIGNvbnRlbnQuXG5AbWl4aW4gX29wdGlvbmFsbHktbmVzdC1jb250ZW50KCRzZWxlY3Rvci1jb250ZXh0KSB7XG4gIEBpZiAoJHNlbGVjdG9yLWNvbnRleHQgPT0gJycpIHtcbiAgICBAY29udGVudDtcbiAgfVxuICBAZWxzZSB7XG4gICAgI3skc2VsZWN0b3ItY29udGV4dH0ge1xuICAgICAgQGNvbnRlbnQ7XG4gICAgfVxuICB9XG59XG5cbi8vLyBBcHBsaWVzIHN0eWxlcyBmb3IgdXNlcnMgaW4gaGlnaCBjb250cmFzdCBtb2RlLiBOb3RlIHRoYXQgdGhpcyBvbmx5IGFwcGxpZXNcbi8vLyB0byBNaWNyb3NvZnQgYnJvd3NlcnMuIENocm9tZSBjYW4gYmUgaW5jbHVkZWQgYnkgY2hlY2tpbmcgZm9yIHRoZSBgaHRtbFtoY11gXG4vLy8gYXR0cmlidXRlLCBob3dldmVyIENocm9tZSBoYW5kbGVzIGhpZ2ggY29udHJhc3QgZGlmZmVyZW50bHkuXG4vLy9cbi8vLyBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0IFR5cGUgb2YgaGlnaCBjb250cmFzdCBzZXR0aW5nIHRvIHRhcmdldC4gRGVmYXVsdHMgdG8gYGFjdGl2ZWAsIGNhbiBiZVxuLy8vICAgICBgd2hpdGUtb24tYmxhY2tgIG9yIGBibGFjay1vbi13aGl0ZWAuXG4vLy8gQHBhcmFtIHtTdHJpbmd9IGVuY2Fwc3VsYXRpb24gV2hldGhlciB0byBlbWl0IHN0eWxlcyBmb3IgdmlldyBlbmNhcHN1bGF0aW9uLiBWYWx1ZXMgYXJlOlxuLy8vICAgICAqIGBvbmAgLSB3b3JrcyBmb3IgYEVtdWxhdGVkYCwgYE5hdGl2ZWAsIGFuZCBgU2hhZG93RG9tYFxuLy8vICAgICAqIGBvZmZgIC0gd29ya3MgZm9yIGBOb25lYFxuLy8vICAgICAqIGBhbnlgIC0gd29ya3MgZm9yIGFsbCBlbmNhcHN1bGF0aW9uIG1vZGVzIGJ5IGVtaXR0aW5nIHRoZSBDU1MgdHdpY2UgKGRlZmF1bHQpLlxuQG1peGluIGhpZ2gtY29udHJhc3QoJHRhcmdldDogYWN0aXZlLCAkZW5jYXBzdWxhdGlvbjogJ2FueScpIHtcbiAgQGlmICgkdGFyZ2V0ICE9ICdhY3RpdmUnIGFuZCAkdGFyZ2V0ICE9ICdibGFjay1vbi13aGl0ZScgYW5kICR0YXJnZXQgIT0gJ3doaXRlLW9uLWJsYWNrJykge1xuICAgIEBlcnJvciAnVW5rbm93biBjZGstaGlnaC1jb250cmFzdCB2YWx1ZSBcIiN7JHRhcmdldH1cIiBwcm92aWRlZC4gJyArXG4gICAgICAgICAgICdBbGxvd2VkIHZhbHVlcyBhcmUgXCJhY3RpdmVcIiwgXCJibGFjay1vbi13aGl0ZVwiLCBhbmQgXCJ3aGl0ZS1vbi1ibGFja1wiJztcbiAgfVxuXG4gIEBpZiAoJGVuY2Fwc3VsYXRpb24gIT0gJ29uJyBhbmQgJGVuY2Fwc3VsYXRpb24gIT0gJ29mZicgYW5kICRlbmNhcHN1bGF0aW9uICE9ICdhbnknKSB7XG4gICAgQGVycm9yICdVbmtub3duIGNkay1oaWdoLWNvbnRyYXN0IGVuY2Fwc3VsYXRpb24gXCIjeyRlbmNhcHN1bGF0aW9ufVwiIHByb3ZpZGVkLiAnICtcbiAgICAgICAgICAgJ0FsbG93ZWQgdmFsdWVzIGFyZSBcIm9uXCIsIFwib2ZmXCIsIGFuZCBcImFueVwiJztcbiAgfVxuXG4gIC8vIElmIHRoZSBzZWxlY3RvciBjb250ZXh0IGhhcyBtdWx0aXBsZSBwYXJ0cywgc3VjaCBhcyBgLnNlY3Rpb24sIC5yZWdpb25gLCBqdXN0IGRvaW5nXG4gIC8vIGAuY2RrLWhpZ2gtY29udHJhc3QteHh4ICN7Jn1gIHdpbGwgb25seSBhcHBseSB0aGUgcGFyZW50IHNlbGVjdG9yIHRvIHRoZSBmaXJzdCBwYXJ0IG9mIHRoZVxuICAvLyBjb250ZXh0LiBXZSBhZGRyZXNzIHRoaXMgYnkgbmVzdGluZyB0aGUgc2VsZWN0b3IgY29udGV4dCB1bmRlciAuY2RrLWhpZ2gtY29udHJhc3QuXG4gIEBhdC1yb290IHtcbiAgICAkc2VsZWN0b3ItY29udGV4dDogI3smfTtcblxuICAgIEBpZiAoJGVuY2Fwc3VsYXRpb24gIT0gJ29uJykge1xuICAgICAgLy8gTm90ZSB0aGF0IGlmIHRoaXMgc2VsZWN0b3IgaXMgdXBkYXRlZCwgdGhlIHNhbWUgY2hhbmdlIGhhcyB0byBiZSBtYWRlIGluc2lkZVxuICAgICAgLy8gYF9vdmVybGF5LnNjc3NgIHdoaWNoIGNhbid0IGRlcGVuZCBvbiB0aGlzIG1peGluIGR1ZSB0byBzb21lIGluZnJhc3RydWN0dXJlIGxpbWl0YXRpb25zLlxuICAgICAgLmNkay1oaWdoLWNvbnRyYXN0LSN7JHRhcmdldH0ge1xuICAgICAgICBAaW5jbHVkZSBfb3B0aW9uYWxseS1uZXN0LWNvbnRlbnQoJHNlbGVjdG9yLWNvbnRleHQpIHtcbiAgICAgICAgICBAY29udGVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIEBpZiAoJGVuY2Fwc3VsYXRpb24gIT0gJ29mZicpIHtcbiAgICAgIC5jZGstaGlnaC1jb250cmFzdC0jeyR0YXJnZXR9IDpob3N0IHtcbiAgICAgICAgQGluY2x1ZGUgX29wdGlvbmFsbHktbmVzdC1jb250ZW50KCRzZWxlY3Rvci1jb250ZXh0KSB7XG4gICAgICAgICAgQGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIi8vIFdlIHdhbnQgb3ZlcmxheXMgdG8gYWx3YXlzIGFwcGVhciBvdmVyIHVzZXIgY29udGVudCwgc28gc2V0IGEgYmFzZWxpbmVcbi8vIHZlcnkgaGlnaCB6LWluZGV4IGZvciB0aGUgb3ZlcmxheSBjb250YWluZXIsIHdoaWNoIGlzIHdoZXJlIHdlIGNyZWF0ZSB0aGUgbmV3XG4vLyBzdGFja2luZyBjb250ZXh0IGZvciBhbGwgb3ZlcmxheXMuXG4kb3ZlcmxheS1jb250YWluZXItei1pbmRleDogMTAwMCAhZGVmYXVsdDtcbiRvdmVybGF5LXotaW5kZXg6IDEwMDAgIWRlZmF1bHQ7XG4kb3ZlcmxheS1iYWNrZHJvcC16LWluZGV4OiAxMDAwICFkZWZhdWx0O1xuXG4vLyBCYWNrZ3JvdW5kIGNvbG9yIGZvciBhbGwgb2YgdGhlIGJhY2tkcm9wc1xuJG92ZXJsYXktYmFja2Ryb3AtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMikgIWRlZmF1bHQ7XG5cbi8vIERlZmF1bHQgYmFja2Ryb3AgYW5pbWF0aW9uIGlzIGJhc2VkIG9uIHRoZSBNYXRlcmlhbCBEZXNpZ24gc3dpZnQtZWFzZS1vdXQuXG4kYmFja2Ryb3AtYW5pbWF0aW9uLWR1cmF0aW9uOiA0MDBtcyAhZGVmYXVsdDtcbiRiYWNrZHJvcC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKSAhZGVmYXVsdDtcblxuLy8vIEVtaXRzIHN0cnVjdHVyYWwgc3R5bGVzIHJlcXVpcmVkIGZvciBjZGsvb3ZlcmxheSB0byBmdW5jdGlvbi5cbkBtaXhpbiBvdmVybGF5KCkge1xuICAuY2RrLW92ZXJsYXktY29udGFpbmVyLCAuY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIge1xuICAgIC8vIERpc2FibGUgZXZlbnRzIGZyb20gYmVpbmcgY2FwdHVyZWQgb24gdGhlIG92ZXJsYXkgY29udGFpbmVyLlxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuXG4gICAgLy8gVGhlIGNvbnRhaW5lciBzaG91bGQgYmUgdGhlIHNpemUgb2YgdGhlIHZpZXdwb3J0LlxuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC8vIFRoZSBvdmVybGF5LWNvbnRhaW5lciBpcyBhbiBpbnZpc2libGUgZWxlbWVudCB3aGljaCBjb250YWlucyBhbGwgaW5kaXZpZHVhbCBvdmVybGF5cy5cbiAgLmNkay1vdmVybGF5LWNvbnRhaW5lciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6ICRvdmVybGF5LWNvbnRhaW5lci16LWluZGV4O1xuXG4gICAgJjplbXB0eSB7XG4gICAgICAvLyBIaWRlIHRoZSBlbGVtZW50IHdoZW4gaXQgZG9lc24ndCBoYXZlIGFueSBjaGlsZCBub2Rlcy4gVGhpcyBkb2Vzbid0XG4gICAgICAvLyBpbmNsdWRlIG92ZXJsYXlzIHRoYXQgaGF2ZSBiZWVuIGRldGFjaGVkLCByYXRoZXIgdGhhbiBkaXNwb3NlZC5cbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG5cbiAgLy8gV2UgdXNlIGFuIGV4dHJhIHdyYXBwZXIgZWxlbWVudCBpbiBvcmRlciB0byB1c2UgbWFrZSB0aGUgb3ZlcmxheSBpdHNlbGYgYSBmbGV4IGl0ZW0uXG4gIC8vIFRoaXMgbWFrZXMgY2VudGVyaW5nIHRoZSBvdmVybGF5IGVhc3kgd2l0aG91dCBydW5uaW5nIGludG8gdGhlIHN1YnBpeGVsIHJlbmRlcmluZ1xuICAvLyBwcm9ibGVtcyB0aWVkIHRvIHVzaW5nIGB0cmFuc2Zvcm1gIGFuZCB3aXRob3V0IGludGVyZmVyaW5nIHdpdGggdGhlIG90aGVyIHBvc2l0aW9uXG4gIC8vIHN0cmF0ZWdpZXMuXG4gIC5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgei1pbmRleDogJG92ZXJsYXktei1pbmRleDtcbiAgfVxuXG4gIC8vIEEgc2luZ2xlIG92ZXJsYXkgcGFuZS5cbiAgLmNkay1vdmVybGF5LXBhbmUge1xuICAgIC8vIE5vdGU6IGl0J3MgaW1wb3J0YW50IGZvciB0aGlzIG9uZSB0byBzdGFydCBvZmYgYGFic29sdXRlYCxcbiAgICAvLyBpbiBvcmRlciBmb3IgdXMgdG8gYmUgYWJsZSB0byBtZWFzdXJlIGl0IGNvcnJlY3RseS5cbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICB6LWluZGV4OiAkb3ZlcmxheS16LWluZGV4O1xuXG4gICAgLy8gRm9yIGNvbm5lY3RlZC1wb3NpdGlvbiBvdmVybGF5cywgd2Ugc2V0IGBkaXNwbGF5OiBmbGV4YCBpblxuICAgIC8vIG9yZGVyIHRvIGZvcmNlIGBtYXgtd2lkdGhgIGFuZCBgbWF4LWhlaWdodGAgdG8gdGFrZSBlZmZlY3QuXG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgbWF4LWhlaWdodDogMTAwJTtcbiAgfVxuXG4gIC5jZGstb3ZlcmxheS1iYWNrZHJvcCB7XG4gICAgLy8gVE9ETyhqZWxib3Vybik6IHJldXNlIHNpZGVuYXYgZnVsbHNjcmVlbiBtaXhpbi5cbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuXG4gICAgei1pbmRleDogJG92ZXJsYXktYmFja2Ryb3Atei1pbmRleDtcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgJGJhY2tkcm9wLWFuaW1hdGlvbi1kdXJhdGlvbiAkYmFja2Ryb3AtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjtcbiAgICBvcGFjaXR5OiAwO1xuXG4gICAgJi5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5nIHtcbiAgICAgIG9wYWNpdHk6IDE7XG5cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBjYW4ndCBpbXBvcnQgYW5kIHVzZSB0aGUgYGhpZ2gtY29udHJhc3RgIG1peGluIGZyb20gYF9hMTF5LnNjc3NgLCBiZWNhdXNlXG4gICAgICAvLyB0aGlzIGZpbGUgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIHRvcC1sZXZlbCBgY2RrYCBwYWNrYWdlIHdoZW4gcHV0dGluZyB0b2dldGhlciB0aGUgZmlsZXNcbiAgICAgIC8vIGZvciBucG0uIEFueSByZWxhdGl2ZSBpbXBvcnQgcGF0aHMgd2UgdXNlIGhlcmUgd2lsbCBiZWNvbWUgaW52YWxpZCBvbmNlIHRoZSBmaWxlIGlzIGNvcGllZC5cbiAgICAgIC5jZGstaGlnaC1jb250cmFzdC1hY3RpdmUgJiB7XG4gICAgICAgIC8vIEluIGhpZ2ggY29udHJhc3QgbW9kZSB0aGUgcmdiYSBiYWNrZ3JvdW5kIHdpbGwgYmVjb21lIHNvbGlkXG4gICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gZmFsbCBiYWNrIHRvIG1ha2luZyBpdCBvcGFxdWUgdXNpbmcgYG9wYWNpdHlgLlxuICAgICAgICBvcGFjaXR5OiAwLjY7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLmNkay1vdmVybGF5LWRhcmstYmFja2Ryb3Age1xuICAgIGJhY2tncm91bmQ6ICRvdmVybGF5LWJhY2tkcm9wLWNvbG9yO1xuICB9XG5cbiAgLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wIHtcbiAgICAvLyBEZWZpbmUgYSB0cmFuc2l0aW9uIG9uIHRoZSB2aXNpYmlsaXR5IHNvIHRoYXQgdGhlIGB0cmFuc2l0aW9uZW5kYCBldmVudCBjYW4gZmlyZSBpbW1lZGlhdGVseS5cbiAgICB0cmFuc2l0aW9uOiB2aXNpYmlsaXR5IDFtcyBsaW5lYXIsIG9wYWNpdHkgMW1zIGxpbmVhcjtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgb3BhY2l0eTogMTtcblxuICAgIC8vIE5vdGU6IGFzIG9mIEZpcmVmb3ggNTcsIGhhdmluZyB0aGUgYmFja2Ryb3AgYmUgYGJhY2tncm91bmQ6IG5vbmVgIHdpbGwgcHJldmVudCBpdCBmcm9tXG4gICAgLy8gY2FwdHVyaW5nIHRoZSB1c2VyJ3MgbW91c2Ugc2Nyb2xsIGV2ZW50cy4gU2luY2Ugd2UgYWxzbyBjYW4ndCB1c2Ugc29tZXRoaW5nIGxpa2VcbiAgICAvLyBgcmdiYSgwLCAwLCAwLCAwKWAsIHdlIHdvcmsgYXJvdW5kIHRoZSBpbmNvbnNpc3RlbmN5IGJ5IG5vdCBzZXR0aW5nIHRoZSBiYWNrZ3JvdW5kIGF0XG4gICAgLy8gYWxsIGFuZCB1c2luZyBgb3BhY2l0eWAgdG8gbWFrZSB0aGUgZWxlbWVudCB0cmFuc3BhcmVudC5cbiAgICAmLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmcge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgfVxuICB9XG5cbiAgLy8gT3ZlcmxheSBwYXJlbnQgZWxlbWVudCB1c2VkIHdpdGggdGhlIGNvbm5lY3RlZCBwb3NpdGlvbiBzdHJhdGVneS4gVXNlZCB0byBjb25zdHJhaW4gdGhlXG4gIC8vIG92ZXJsYXkgZWxlbWVudCdzIHNpemUgdG8gZml0IHdpdGhpbiB0aGUgdmlld3BvcnQuXG4gIC5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgei1pbmRleDogJG92ZXJsYXktei1pbmRleDtcblxuICAgIC8vIFdlIHVzZSBgZGlzcGxheTogZmxleGAgb24gdGhpcyBlbGVtZW50IGV4Y2x1c2l2ZWx5IGZvciBjZW50ZXJpbmcgY29ubmVjdGVkIG92ZXJsYXlzLlxuICAgIC8vIFdoZW4gKm5vdCogY2VudGVyaW5nLCBhIHRvcC9sZWZ0L2JvdHRvbS9yaWdodCB3aWxsIGJlIHNldCB3aGljaCBvdmVycmlkZXMgdGhlIG5vcm1hbFxuICAgIC8vIGZsZXggbGF5b3V0LlxuICAgIGRpc3BsYXk6IGZsZXg7XG5cbiAgICAvLyBXZSB1c2UgdGhlIGBjb2x1bW5gIGRpcmVjdGlvbiBoZXJlIHRvIGF2b2lkIHNvbWUgZmxleGJveCBpc3N1ZXMgaW4gRWRnZVxuICAgIC8vIHdoZW4gdXNpbmcgdGhlIFwiZ3JvdyBhZnRlciBvcGVuXCIgb3B0aW9ucy5cbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gICAgLy8gQWRkIHNvbWUgZGltZW5zaW9ucyBzbyB0aGUgZWxlbWVudCBoYXMgYW4gYGlubmVyVGV4dGAgd2hpY2ggc29tZSBwZW9wbGUgZGVwZW5kIG9uIGluIHRlc3RzLlxuICAgIG1pbi13aWR0aDogMXB4O1xuICAgIG1pbi1oZWlnaHQ6IDFweDtcbiAgfVxuXG4gIC8vIFVzZWQgd2hlbiBkaXNhYmxpbmcgZ2xvYmFsIHNjcm9sbGluZy5cbiAgLmNkay1nbG9iYWwtc2Nyb2xsYmxvY2sge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcblxuICAgIC8vIE5lY2Vzc2FyeSBmb3IgdGhlIGNvbnRlbnQgbm90IHRvIGxvc2UgaXRzIHdpZHRoLiBOb3RlIHRoYXQgd2UncmUgdXNpbmcgMTAwJSwgaW5zdGVhZCBvZlxuICAgIC8vIDEwMHZ3LCBiZWNhdXNlIDEwMHZ3IGluY2x1ZGVzIHRoZSB3aWR0aCBwbHVzIHRoZSBzY3JvbGxiYXIsIHdoZXJlYXMgMTAwJSBpcyB0aGUgd2lkdGhcbiAgICAvLyB0aGF0IHRoZSBlbGVtZW50IGhhZCBiZWZvcmUgd2UgbWFkZSBpdCBgZml4ZWRgLlxuICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgLy8gTm90ZTogdGhpcyB3aWxsIGFsd2F5cyBhZGQgYSBzY3JvbGxiYXIgdG8gd2hhdGV2ZXIgZWxlbWVudCBpdCBpcyBvbiwgd2hpY2ggY2FuXG4gICAgLy8gcG90ZW50aWFsbHkgcmVzdWx0IGluIGRvdWJsZSBzY3JvbGxiYXJzLiBJdCBzaG91bGRuJ3QgYmUgYW4gaXNzdWUsIGJlY2F1c2Ugd2Ugd29uJ3RcbiAgICAvLyBibG9jayBzY3JvbGxpbmcgb24gYSBwYWdlIHRoYXQgZG9lc24ndCBoYXZlIGEgc2Nyb2xsYmFyIGluIHRoZSBmaXJzdCBwbGFjZS5cbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIH1cbn1cbiIsIi8vIFN0cnVjdHVyYWwgc3R5bGVzIGZvciB0aGUgYXV0b3NpemUgdGV4dCBmaWVsZHMuXG5AbWl4aW4gdGV4dC1maWVsZC1hdXRvc2l6ZSgpIHtcbiAgLy8gUmVtb3ZlIHRoZSByZXNpemUgaGFuZGxlIG9uIGF1dG9zaXppbmcgdGV4dGFyZWFzLCBiZWNhdXNlIHdoYXRldmVyIGhlaWdodFxuICAvLyB0aGUgdXNlciByZXNpemVkIHRvIHdpbGwgYmUgb3ZlcndyaXR0ZW4gb25jZSB0aGV5IHN0YXJ0IHR5cGluZyBhZ2Fpbi5cbiAgdGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplIHtcbiAgICByZXNpemU6IG5vbmU7XG4gIH1cblxuICAvLyBUaGlzIGNsYXNzIGlzIHRlbXBvcmFyaWx5IGFwcGxpZWQgdG8gdGhlIHRleHRhcmVhIHdoZW4gaXQgaXMgYmVpbmcgbWVhc3VyZWQuIEl0IGlzIGltbWVkaWF0ZWx5XG4gIC8vIHJlbW92ZWQgd2hlbiBtZWFzdXJpbmcgaXMgY29tcGxldGUuIFdlIHVzZSBgIWltcG9ydGFudGAgcnVsZXMgaGVyZSB0byBtYWtlIHN1cmUgdXNlci1zcGVjaWZpZWRcbiAgLy8gcnVsZXMgZG8gbm90IGludGVyZmVyZSB3aXRoIHRoZSBtZWFzdXJlbWVudC5cbiAgdGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplLW1lYXN1cmluZyB7XG4gICAgQGluY2x1ZGUgX2F1dG9zaXplLW1lYXN1cmluZy1iYXNlO1xuICAgIGhlaWdodDogYXV0byAhaW1wb3J0YW50O1xuICAgIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgfVxuXG4gIC8vIFNpbWlsYXIgdG8gdGhlIGBjZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5nYCBjbGFzcywgYnV0IG9ubHkgYXBwbGllZCBvbiBGaXJlZm94LiBXZSBuZWVkXG4gIC8vIHRvIHVzZSB0aGlzIGNsYXNzLCBiZWNhdXNlIEZpcmVmb3ggaGFzIGEgYnVnIHdoZXJlIGNoYW5naW5nIHRoZSBgb3ZlcmZsb3dgIGJyZWFrcyB0aGUgdXNlcidzXG4gIC8vIGFiaWxpdHkgdG8gdW5kby9yZWRvIHdoYXQgdGhleSB3ZXJlIHR5cGluZyAoc2VlICMxNjYyOSkuIFRoaXMgY2xhc3MgaXMgb25seSBzY29wZWQgdG8gRmlyZWZveCxcbiAgLy8gYmVjYXVzZSB0aGUgbWVhc3VyZW1lbnRzIHRoZXJlIGRvbid0IHNlZW0gdG8gYmUgYWZmZWN0ZWQgYnkgdGhlIGBoZWlnaHQ6IDBgLCB3aGVyZWFzIG9uIG90aGVyXG4gIC8vIGJyb3dzZXJzIHRoZXkgYXJlLCBlLmcuIENocm9tZSBkZXRlY3RzIGxvbmdlciB0ZXh0IGFuZCBJRSBkb2VzJ3QgcmVzaXplIGJhY2sgdG8gbm9ybWFsLlxuICAvLyBJZGVudGljYWwgaXNzdWUgcmVwb3J0OiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD00NDg3ODRcbiAgdGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplLW1lYXN1cmluZy1maXJlZm94IHtcbiAgICBAaW5jbHVkZSBfYXV0b3NpemUtbWVhc3VyaW5nLWJhc2U7XG4gICAgaGVpZ2h0OiAwICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuLy8gQ29yZSBzdHlsZXMgdGhhdCBlbmFibGUgbW9uaXRvcmluZyBhdXRvZmlsbCBzdGF0ZSBvZiB0ZXh0IGZpZWxkcy5cbkBtaXhpbiB0ZXh0LWZpZWxkLWF1dG9maWxsKCkge1xuICAvLyBLZXlmcmFtZXMgdGhhdCBhcHBseSBubyBzdHlsZXMsIGJ1dCBhbGxvdyB1cyB0byBtb25pdG9yIHdoZW4gYW4gdGV4dCBmaWVsZCBiZWNvbWVzIGF1dG9maWxsZWRcbiAgLy8gYnkgd2F0Y2hpbmcgZm9yIHRoZSBhbmltYXRpb24gZXZlbnRzIHRoYXQgYXJlIGZpcmVkIHdoZW4gdGhleSBzdGFydC4gTm90ZTogdGhlIC8qISovIGNvbW1lbnQgaXNcbiAgLy8gbmVlZGVkIHRvIHByZXZlbnQgTGliU2FzcyBmcm9tIHN0cmlwcGluZyB0aGUga2V5ZnJhbWVzIG91dC5cbiAgLy8gQmFzZWQgb246IGh0dHBzOi8vbWVkaXVtLmNvbS9AYnJ1bm4vZGV0ZWN0aW5nLWF1dG9maWxsZWQtZmllbGRzLWluLWphdmFzY3JpcHQtYWVkNTk4ZDI1ZGE3XG4gIEBrZXlmcmFtZXMgY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnQgey8qISovfVxuICBAa2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZCB7LyohKi99XG5cbiAgLmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDotd2Via2l0LWF1dG9maWxsIHtcbiAgICAvLyBTaW5jZSBDaHJvbWUgODAgd2UgbmVlZCBhIDFtcyBkZWxheSwgb3IgdGhlIGFuaW1hdGlvbnN0YXJ0IGV2ZW50IHdvbid0IGZpcmUuXG4gICAgYW5pbWF0aW9uOiBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydCAwcyAxbXM7XG4gIH1cblxuICAuY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtbW9uaXRvcmVkOm5vdCg6LXdlYmtpdC1hdXRvZmlsbCkge1xuICAgIC8vIFNpbmNlIENocm9tZSA4MCB3ZSBuZWVkIGEgMW1zIGRlbGF5LCBvciB0aGUgYW5pbWF0aW9uc3RhcnQgZXZlbnQgd29uJ3QgZmlyZS5cbiAgICBhbmltYXRpb246IGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZCAwcyAxbXM7XG4gIH1cbn1cblxuQG1peGluIF9hdXRvc2l6ZS1tZWFzdXJpbmctYmFzZSB7XG4gIC8vIEhhdmluZyAycHggdG9wIGFuZCBib3R0b20gcGFkZGluZyBzZWVtcyB0byBmaXggYSBidWcgd2hlcmUgQ2hyb21lIGdldHMgYW4gaW5jb3JyZWN0XG4gIC8vIG1lYXN1cmVtZW50LiBXZSBqdXN0IGhhdmUgdG8gYWNjb3VudCBmb3IgaXQgbGF0ZXIgYW5kIHN1YnRyYWN0IGl0IG9mZiB0aGUgZmluYWwgcmVzdWx0LlxuICBwYWRkaW5nOiAycHggMCAhaW1wb3J0YW50O1xuICBib3gtc2l6aW5nOiBjb250ZW50LWJveCAhaW1wb3J0YW50O1xufVxuXG4vLyBVc2VkIHRvIGdlbmVyYXRlIFVJRHMgZm9yIGtleWZyYW1lcyB1c2VkIHRvIGNoYW5nZSB0aGUgdGV4dCBmaWVsZCBhdXRvZmlsbCBzdHlsZXMuXG4kYXV0b2ZpbGwtY29sb3ItZnJhbWUtY291bnQ6IDA7XG5cbi8vIE1peGluIHVzZWQgdG8gYXBwbHkgY3VzdG9tIGJhY2tncm91bmQgYW5kIGZvcmVncm91bmQgY29sb3JzIHRvIGFuIGF1dG9maWxsZWQgdGV4dCBmaWVsZC5cbi8vIEJhc2VkIG9uOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNzgxNTQ5L1xuLy8gcmVtb3ZpbmctaW5wdXQtYmFja2dyb3VuZC1jb2xvdXItZm9yLWNocm9tZS1hdXRvY29tcGxldGUjYW5zd2VyLTM3NDMyMjYwXG5AbWl4aW4gdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvcigkYmFja2dyb3VuZCwgJGZvcmVncm91bmQ6JycpIHtcbiAgQGtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci0jeyRhdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudH0ge1xuICAgIHRvIHtcbiAgICAgIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICAgICAgQGlmICRmb3JlZ3JvdW5kICE9ICcnIHsgY29sb3I6ICRmb3JlZ3JvdW5kOyB9XG4gICAgfVxuICB9XG5cbiAgJjotd2Via2l0LWF1dG9maWxsIHtcbiAgICBhbmltYXRpb246IGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWNvbG9yLSN7JGF1dG9maWxsLWNvbG9yLWZyYW1lLWNvdW50fSBib3RoO1xuICB9XG5cbiAgJi5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbCB7XG4gICAgLy8gU2luY2UgQ2hyb21lIDgwIHdlIG5lZWQgYSAxbXMgZGVsYXkgZm9yIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0LCBvciB0aGUgYW5pbWF0aW9uc3RhcnRcbiAgICAvLyBldmVudCB3b24ndCBmaXJlLlxuICAgIGFuaW1hdGlvbjogY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnQgMHMgMW1zLFxuICAgICAgICAgICAgICAgY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtY29sb3ItI3skYXV0b2ZpbGwtY29sb3ItZnJhbWUtY291bnR9IGJvdGg7XG4gIH1cblxuICAkYXV0b2ZpbGwtY29sb3ItZnJhbWUtY291bnQ6ICRhdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudCArIDEgIWdsb2JhbDtcbn1cblxuLy8gQGRlcHJlY2F0ZWQgVXNlIGBhdXRvc2l6ZWAgYW5kIGBhdXRvZmlsbGAgaW5zdGVhZC5cbkBtaXhpbiB0ZXh0LWZpZWxkIHtcbiAgQGluY2x1ZGUgdGV4dC1maWVsZC1hdXRvc2l6ZSgpO1xuICBAaW5jbHVkZSB0ZXh0LWZpZWxkLWF1dG9maWxsKCk7XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9zdHlsZS9sYXlvdXQtY29tbW9uJztcblxuLy8vIE1peGluIHRoYXQgdHVybnMgb24gc3Ryb25nIGZvY3VzIGluZGljYXRvcnMuXG4vLy9cbi8vLyBAZXhhbXBsZVxuLy8vICAgLm15LWFwcCB7XG4vLy8gICAgIEBpbmNsdWRlIG1hdC1zdHJvbmctZm9jdXMtaW5kaWNhdG9ycygkY29uZmlnKTtcbi8vLyAgIH1cbkBtaXhpbiBzdHJvbmctZm9jdXMtaW5kaWNhdG9ycygkY29uZmlnOiAoKSkge1xuICAvLyBEZWZhdWx0IGZvY3VzIGluZGljYXRvciBjb25maWcuXG4gICRkZWZhdWx0LWNvbmZpZzogKFxuICAgIGJvcmRlci1zdHlsZTogc29saWQsXG4gICAgYm9yZGVyLXdpZHRoOiAzcHgsXG4gICAgYm9yZGVyLXJhZGl1czogNHB4LFxuICApO1xuXG4gIC8vIE1lcmdlIGRlZmF1bHQgY29uZmlnIHdpdGggdXNlciBjb25maWcuXG4gICRjb25maWc6IG1hcC5tZXJnZSgkZGVmYXVsdC1jb25maWcsICRjb25maWcpO1xuICAkYm9yZGVyLXN0eWxlOiBtYXAuZ2V0KCRjb25maWcsIGJvcmRlci1zdHlsZSk7XG4gICRib3JkZXItd2lkdGg6IG1hcC5nZXQoJGNvbmZpZywgYm9yZGVyLXdpZHRoKTtcbiAgJGJvcmRlci1yYWRpdXM6IG1hcC5nZXQoJGNvbmZpZywgYm9yZGVyLXJhZGl1cyk7XG5cbiAgLy8gQmFzZSBzdHlsZXMgZm9yIGZvY3VzIGluZGljYXRvcnMuXG4gIC5tYXQtZm9jdXMtaW5kaWNhdG9yOjpiZWZvcmUge1xuICAgIEBpbmNsdWRlIGxheW91dC1jb21tb24uZmlsbCgpO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgYm9yZGVyOiAkYm9yZGVyLXdpZHRoICRib3JkZXItc3R5bGUgdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogJGJvcmRlci1yYWRpdXM7XG5cbiAgICAuY2RrLWhpZ2gtY29udHJhc3QtYWN0aXZlICYge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAvLyBCeSBkZWZhdWx0LCBhbGwgZm9jdXMgaW5kaWNhdG9ycyBhcmUgZmx1c2ggd2l0aCB0aGUgYm91bmRpbmcgYm94IG9mIHRoZWlyXG4gIC8vIGhvc3QgZWxlbWVudC4gRm9yIHBhcnRpY3VsYXIgZWxlbWVudHMgKGxpc3RlZCBiZWxvdyksIGRlZmF1bHQgaW5zZXQvb2Zmc2V0XG4gIC8vIHZhbHVlcyBhcmUgbmVjZXNzYXJ5IHRvIGVuc3VyZSB0aGF0IHRoZSBmb2N1cyBpbmRpY2F0b3IgaXMgc3VmZmljaWVudGx5XG4gIC8vIGNvbnRyYXN0aXZlIGFuZCByZW5kZXJzIGFwcHJvcHJpYXRlbHkuXG5cbiAgLm1hdC1mb2N1cy1pbmRpY2F0b3IubWF0LWZsYXQtYnV0dG9uOjpiZWZvcmUsXG4gIC5tYXQtZm9jdXMtaW5kaWNhdG9yLm1hdC1yYWlzZWQtYnV0dG9uOjpiZWZvcmUsXG4gIC5tYXQtZm9jdXMtaW5kaWNhdG9yLm1hdC1mYWI6OmJlZm9yZSxcbiAgLm1hdC1mb2N1cy1pbmRpY2F0b3IubWF0LW1pbmktZmFiOjpiZWZvcmUsXG4gIC5tYXQtZm9jdXMtaW5kaWNhdG9yLm1hdC1jaGlwOjpiZWZvcmUsXG4gIC5tYXQtZm9jdXMtaW5kaWNhdG9yLm1hdC1zb3J0LWhlYWRlci1jb250YWluZXI6OmJlZm9yZSB7XG4gICAgbWFyZ2luOiAtKCRib3JkZXItd2lkdGggKyAycHgpO1xuICB9XG5cbiAgLm1hdC1mb2N1cy1pbmRpY2F0b3IubWF0LXN0cm9rZWQtYnV0dG9uOjpiZWZvcmUsXG4gIC5tYXQtZm9jdXMtaW5kaWNhdG9yLm1hdC1jYWxlbmRhci1ib2R5LWNlbGwtY29udGVudDo6YmVmb3JlIHtcbiAgICBtYXJnaW46IC0oJGJvcmRlci13aWR0aCArIDNweCk7XG4gIH1cblxuICAubWF0LWZvY3VzLWluZGljYXRvci5tYXQtdGFiLWxpbms6OmJlZm9yZSxcbiAgLm1hdC1mb2N1cy1pbmRpY2F0b3IubWF0LXRhYi1sYWJlbDo6YmVmb3JlIHtcbiAgICBtYXJnaW46IDVweDtcbiAgfVxuXG4gIC8vIFJlbmRlciB0aGUgZm9jdXMgaW5kaWNhdG9yIG9uIGZvY3VzLiBEZWZpbmluZyBhIHBzZXVkbyBlbGVtZW50J3NcbiAgLy8gY29udGVudCB3aWxsIGNhdXNlIGl0IHRvIHJlbmRlci5cblxuICAvLyBDaGVja2JveGVzLCByYWRpb3MsIGFuZCBzbGlkZSB0b2dnbGVzIHJlbmRlciBmb2N1cyBpbmRpY2F0b3JzIHdoZW4gdGhlXG4gIC8vIGFzc29jaWF0ZWQgdmlzdWFsbHktaGlkZGVuIGlucHV0IGlzIGZvY3VzZWQuXG4gIC5tYXQtY2hlY2tib3gtaW5wdXQ6Zm9jdXMgfiAubWF0LWZvY3VzLWluZGljYXRvcjo6YmVmb3JlLFxuICAubWF0LXJhZGlvLWlucHV0OmZvY3VzIH4gLm1hdC1mb2N1cy1pbmRpY2F0b3I6OmJlZm9yZSxcbiAgLm1hdC1zbGlkZS10b2dnbGUtaW5wdXQ6Zm9jdXMgfiAubWF0LXNsaWRlLXRvZ2dsZS10aHVtYi1jb250YWluZXIgLm1hdC1mb2N1cy1pbmRpY2F0b3I6OmJlZm9yZSxcblxuICAvLyBGb3Igb3B0aW9ucywgcmVuZGVyIHRoZSBmb2N1cyBpbmRpY2F0b3Igd2hlbiB0aGUgY2xhc3MgLm1hdC1hY3RpdmVcbiAgLy8gaXMgcHJlc2VudC5cbiAgLm1hdC1mb2N1cy1pbmRpY2F0b3IubWF0LW9wdGlvbi5tYXQtYWN0aXZlOjpiZWZvcmUsXG5cbiAgLy8gRm9yIGNhbGVuZGFyIGNlbGxzLCByZW5kZXIgdGhlIGZvY3VzIGluZGljYXRvciB3aGVuIHRoZSBwYXJlbnQgY2VsbCBpc1xuICAvLyBmb2N1c2VkLlxuICAubWF0LWNhbGVuZGFyLWJvZHktY2VsbDpmb2N1cyAubWF0LWZvY3VzLWluZGljYXRvcjo6YmVmb3JlLFxuXG4gIC8vIFN0ZXBwZXIgaGVhZGVycyBoYXZlIHRoZSBmb2N1cyBpbmRpY2F0b3IgYXMgYSBkZXNjZW5kYW50LFxuICAvLyBiZWNhdXNlIGA6OmJlZm9yZWAgaXMgdXNlZCBmb3Igb3RoZXIgc3R5bGluZy5cbiAgLm1hdC1zdGVwLWhlYWRlcjpmb2N1cyAubWF0LWZvY3VzLWluZGljYXRvcjo6YmVmb3JlLFxuXG4gIC8vIEZvciBhbGwgb3RoZXIgY29tcG9uZW50cywgcmVuZGVyIHRoZSBmb2N1cyBpbmRpY2F0b3Igb24gZm9jdXMuXG4gIC5tYXQtZm9jdXMtaW5kaWNhdG9yOmZvY3VzOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICB9XG59XG5cbi8vIE1peGluIHRoYXQgZW5zdXJlcyBmb2N1cyBpbmRpY2F0b3IgaG9zdCBlbGVtZW50cyBhcmUgcG9zaXRpb25lZCBzbyB0aGF0IHRoZSBmb2N1cyBpbmRpY2F0b3Jcbi8vIHBzZXVkbyBlbGVtZW50IHdpdGhpbiBpcyBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIHRoZSBob3N0LiBQcml2YXRlIG1peGluIGluY2x1ZGVkIHdpdGhpblxuLy8gYG1hdC1jb3JlYC5cbkBtaXhpbiBwcml2YXRlLXN0cm9uZy1mb2N1cy1pbmRpY2F0b3JzLXBvc2l0aW9uaW5nKCkge1xuICAubWF0LWZvY3VzLWluZGljYXRvciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG59XG4iLCJAdXNlICcuLi8uLi9jZGsvb3ZlcmxheSc7XG5AdXNlICcuLi8uLi9jZGsvYTExeSc7XG5AdXNlICcuLi8uLi9jZGsvdGV4dC1maWVsZCc7XG5cbi8vIENvcmUgc3R5bGVzIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgbWF0ZXJpYWwgZGVzaWduIHRyZWF0bWVudHMgdG8gYW55IGVsZW1lbnQuXG5AdXNlICcuL3JpcHBsZS9yaXBwbGUnO1xuQHVzZSAnLi9mb2N1cy1pbmRpY2F0b3JzL2ZvY3VzLWluZGljYXRvcnMnO1xuQHVzZSAnLi90eXBvZ3JhcGh5L2FsbC10eXBvZ3JhcGh5JztcblxuLy8gTWl4aW4gdGhhdCByZW5kZXJzIGFsbCBvZiB0aGUgY29yZSBzdHlsZXMgdGhhdCBhcmUgbm90IHRoZW1lLWRlcGVuZGVudC5cbkBtaXhpbiBjb3JlKCR0eXBvZ3JhcGh5LWNvbmZpZzogbnVsbCkge1xuICBAaW5jbHVkZSBhbGwtdHlwb2dyYXBoeS5hbGwtY29tcG9uZW50LXR5cG9ncmFwaGllcygkdHlwb2dyYXBoeS1jb25maWcpO1xuICBAaW5jbHVkZSByaXBwbGUucmlwcGxlKCk7XG4gIEBpbmNsdWRlIGExMXkuYTExeS12aXN1YWxseS1oaWRkZW4oKTtcbiAgQGluY2x1ZGUgb3ZlcmxheS5vdmVybGF5KCk7XG4gIEBpbmNsdWRlIHRleHQtZmllbGQudGV4dC1maWVsZC1hdXRvc2l6ZSgpO1xuICBAaW5jbHVkZSB0ZXh0LWZpZWxkLnRleHQtZmllbGQtYXV0b2ZpbGwoKTtcblxuICBAaW5jbHVkZSBmb2N1cy1pbmRpY2F0b3JzLnByaXZhdGUtc3Ryb25nLWZvY3VzLWluZGljYXRvcnMtcG9zaXRpb25pbmcoKTtcbiAgQGluY2x1ZGUgX21kYy1jb3JlKCk7XG59XG5cbi8vIE1peGluIHRoYXQgcmVuZGVycyBhbGwgb2YgdGhlIGNvcmUgTURDIHN0eWxlcy4gUHJpdmF0ZSBtaXhpbiBpbmNsdWRlZCB3aXRoIGBtYXQtY29yZWAuXG5AbWl4aW4gX21kYy1jb3JlKCkge1xuICBAaW5jbHVkZSBfbWRjLXN0cm9uZy1mb2N1cy1pbmRpY2F0b3JzLXBvc2l0aW9uaW5nKCk7XG59XG5cbi8vIE1peGluIHRoYXQgZW5zdXJlcyBmb2N1cyBpbmRpY2F0b3IgaG9zdCBlbGVtZW50cyBhcmUgcG9zaXRpb25lZCBzbyB0aGF0IHRoZSBmb2N1cyBpbmRpY2F0b3Jcbi8vIHBzZXVkbyBlbGVtZW50IHdpdGhpbiBpcyBwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIHRoZSBob3N0LiBQcml2YXRlIG1peGluIGluY2x1ZGVkIHdpdGhpblxuLy8gYF9tYXQtbWRjLWNvcmVgLlxuQG1peGluIF9tZGMtc3Ryb25nLWZvY3VzLWluZGljYXRvcnMtcG9zaXRpb25pbmcoKSB7XG4gIC5tYXQtbWRjLWZvY3VzLWluZGljYXRvciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG59XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvdGhlbWluZyc7XG5cbiR0eXBvZ3JhcGh5OiBtYXQtdHlwb2dyYXBoeS1jb25maWcoXG4gICAgJGZvbnQtZmFtaWx5OiBSb2JvdG8sXG4gICAgJGhlYWRsaW5lOiBtYXQtdHlwb2dyYXBoeS1sZXZlbCgzMnB4LCA0OHB4LCA3MDApXG4pO1xuQGluY2x1ZGUgbWF0LWNvcmUoKTtcblxuJG5ldGdyaWYtYmx1ZTogKFxuICAgIDUwOiAjZTJlYWYwLFxuICAgIDEwMDogI2I3YzlkOSxcbiAgICAyMDA6ICM4N2E2YzAsXG4gICAgMzAwOiAjNTc4MmE3LFxuICAgIDQwMDogIzMzNjc5NCxcbiAgICA1MDA6ICMwZjRjODEsXG4gICAgNjAwOiAjMGQ0NTc5LFxuICAgIDcwMDogIzBiM2M2ZSxcbiAgICA4MDA6ICMwODMzNjQsXG4gICAgOTAwOiAjMDQyNDUxLFxuICAgIEExMDA6ICNmZmQxODAsXG4gICAgQTIwMDogI2ZmYWI0MCxcbiAgICBBNDAwOiAjZmY5MTAwLFxuICAgIEE3MDA6ICNmZjZkMDAsXG4gICAgY29udHJhc3Q6IChcbiAgICAgICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAgICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgICAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAgICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICAgICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgICAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICAgICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgICAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAgICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgICAgICBBNzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgKVxuKTtcblxuJG5ldGdyaWYtZ3JleTogKFxuICAgIDUwOiAjRUVFRkYwLFxuICAgIDEwMDogI0Q1RDdEOSxcbiAgICAyMDA6ICNCQUJDQzAsXG4gICAgMzAwOiAjOUVBMUE3LFxuICAgIDQwMDogIzg5OEM5NCxcbiAgICA1MDA6ICM3NDc4ODEsXG4gICAgNjAwOiAjNkM3MDc5LFxuICAgIDcwMDogIzYxNjU2RSxcbiAgICA4MDA6ICM1NzVCNjQsXG4gICAgOTAwOiAjNDQ0ODUxLFxuICAgIEExMDA6ICNCM0NBRkIsXG4gICAgQTIwMDogIzgzQTdGOSxcbiAgICBBNDAwOiAjNEE4MkZGLFxuICAgIEE3MDA6ICMzMDcwRkYsXG4gICAgY29udHJhc3Q6IChcbiAgICAgICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAgICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgICAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAgICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICAgICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgICAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICAgICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgICAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAgICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICAgICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICApXG4pO1xuXG4kbmV0Z3JpZi1wcmltYXJ5OiBtYXQtcGFsZXR0ZSgkbmV0Z3JpZi1ibHVlKTtcbiRuZXRncmlmLWFjY2VudDogbWF0LXBhbGV0dGUoJG5ldGdyaWYtYmx1ZSwgQTIwMCwgQTEwMCwgQTQwMCk7XG4kbmV0Z3JpZi13YXJuOiBtYXQtcGFsZXR0ZSgkbWF0LXJlZCk7XG5cbiRuZXRncmlmLXRoZW1lOiBtYXQtbGlnaHQtdGhlbWUoJG5ldGdyaWYtcHJpbWFyeSwgJG5ldGdyaWYtYWNjZW50LCAkbmV0Z3JpZi13YXJuKTtcblxuYm9keSB7XG4gICAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRsaWdodC1wcmltYXJ5LXRleHQ7XG4gICAgfVxuXG4gICAgOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICAgIHdpZHRoOiA3cHg7XG4gICAgICAgIGhlaWdodDogN3B4O1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbGlnaHQtcHJpbWFyeS10ZXh0O1xuICAgIH1cblxuICAgIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAwIDZweCByZ2JhKDAsIDAsIDAsIC4zKTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzgyQTVERDtcbiAgICB9XG59XG5cbkBpbmNsdWRlIGFuZ3VsYXItbWF0ZXJpYWwtdGhlbWUoJG5ldGdyaWYtdGhlbWUpO1xuXG4uc3ZnLWluYWN0aXZlLXN0cm9rZSB7XG4gICAgc3Ryb2tlOiBibGFjayAhaW1wb3J0YW50O1xufVxuXG4uc3ZnLWluYWN0aXZlLWZpbGwge1xuICAgIGZpbGw6IGJsYWNrICFpbXBvcnRhbnQ7XG59XG5cbi5zdmctYWN0aXZlLXN0cm9rZSB7XG4gICAgc3Ryb2tlOiBtYXAtZ2V0KCRuZXRncmlmLWJsdWUsIEEyMDApICFpbXBvcnRhbnQ7XG59XG5cbi5zdmctYWN0aXZlLWZpbGwge1xuICAgIGZpbGw6IG1hcC1nZXQoJG5ldGdyaWYtYmx1ZSwgQTIwMCkgIWltcG9ydGFudDtcbn1cblxuLnN2Zy1pbnZpc2libGUtZmlsbCB7XG4gICAgZmlsbDogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4uc3ZnLXRyYW5zaXRpb24tZW5hYmxlZCB7XG4gICAgc3Ryb2tlOiBncmVlbjtcbiAgICBmaWxsOiB5ZWxsb3dncmVlbjtcbn1cblxuLnN2Zy10cmFuc2l0aW9uLWRpc2FibGVkIHtcbiAgICBzdHJva2U6IHJlZDtcbiAgICBmaWxsOiB3aGl0ZTtcbn1cblxuLnN2Zy10cmFuc2l0aW9uLWZpcmluZyB7XG4gICAgc3Ryb2tlOiBncmVlbjtcbiAgICBmaWxsOiBub25lO1xufVxuXG4uc3ZnLWZpcmUtYXJyb3ctY2FuY2VsLWFjdGl2ZSB7XG4gICAgZmlsbDogY29yYWw7XG4gICAgc3Ryb2tlOiByZWQ7XG59XG5cbi5zdmctZmlyZS1hcnJvdy1jYW5jZWwtaW5hY3RpdmUge1xuICAgIGZpbGw6IG5vbmU7XG4gICAgc3Ryb2tlOiBub25lO1xufVxuXG4uc3ZnLWZpcmUtYXJyb3ctZmluaXNoLWFjdGl2ZSB7XG4gICAgc3Ryb2tlOiBncmVlbjtcbiAgICBmaWxsOiB5ZWxsb3dncmVlbjtcbn1cblxuLnN2Zy1maXJlLWFycm93LWZpbmlzaC1pbmFjdGl2ZSB7XG4gICAgZmlsbDogbm9uZTtcbiAgICBzdHJva2U6IG5vbmU7XG59XG5cbi5zdmctaWNvbi1hY3RpdmUge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uc3ZnLWljb24taW5hY3RpdmUge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5wYXRoIHtcbiAgICBzdHJva2UtZGFzaGFycmF5OiAyIDU7XG4gICAgYW5pbWF0aW9uOiBkYXNoIDEwcyBsaW5lYXI7XG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgZGFzaCB7XG4gICAgdG8ge1xuICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogNDAwO1xuICAgIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbi8vIENvbG9yIHBhbGV0dGVzIGZyb20gdGhlIE1hdGVyaWFsIERlc2lnbiBzcGVjLlxuLy8gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL2NvbG9yL1xuLy9cbi8vIENvbnRyYXN0IGNvbG9ycyBhcmUgaGFyZC1jb2RlZCBiZWNhdXNlIGl0IGlzIHRvbyBkaWZmaWN1bHQgKHByb2JhYmx5IGltcG9zc2libGUpIHRvXG4vLyBjYWxjdWxhdGUgdGhlbS4gVGhlc2UgY29udHJhc3QgY29sb3JzIGFyZSBwdWxsZWQgZnJvbSB0aGUgcHVibGljIE1hdGVyaWFsIERlc2lnbiBzcGVjIHN3YXRjaGVzLlxuLy8gV2hpbGUgdGhlIGNvbnRyYXN0IGNvbG9ycyBpbiB0aGUgc3BlYyBhcmUgbm90IHByZXNjcmlwdGl2ZSwgd2UgdXNlIHRoZW0gZm9yIGNvbnZlbmllbmNlLlxuXG5cbi8vIEBkZXByZWNhdGVkIHJlbmFtZWQgdG8gJGRhcmstcHJpbWFyeS10ZXh0LlxuLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuJGJsYWNrLTg3LW9wYWNpdHk6IHJnYmEoYmxhY2ssIDAuODcpO1xuLy8gQGRlcHJlY2F0ZWQgcmVuYW1lZCB0byAkbGlnaHQtcHJpbWFyeS10ZXh0LlxuLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuJHdoaXRlLTg3LW9wYWNpdHk6IHJnYmEod2hpdGUsIDAuODcpO1xuLy8gQGRlcHJlY2F0ZWQgdXNlICRkYXJrLVtzZWNvbmRhcnktdGV4dCxkaXNhYmxlZC10ZXh0LGRpdmlkZXJzLGZvY3VzZWRdIGluc3RlYWQuXG4vLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wXG4kYmxhY2stMTItb3BhY2l0eTogcmdiYShibGFjaywgMC4xMik7XG4vLyBAZGVwcmVjYXRlZCB1c2UgJGxpZ2h0LVtzZWNvbmRhcnktdGV4dCxkaXNhYmxlZC10ZXh0LGRpdmlkZXJzLGZvY3VzZWRdIGluc3RlYWQuXG4vLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wXG4kd2hpdGUtMTItb3BhY2l0eTogcmdiYSh3aGl0ZSwgMC4xMik7XG4vLyBAZGVwcmVjYXRlZCB1c2UgJGRhcmstW3NlY29uZGFyeS10ZXh0LGRpc2FibGVkLXRleHQsZGl2aWRlcnMsZm9jdXNlZF0gaW5zdGVhZC5cbi8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiRibGFjay02LW9wYWNpdHk6IHJnYmEoYmxhY2ssIDAuMDYpO1xuLy8gQGRlcHJlY2F0ZWQgdXNlICRsaWdodC1bc2Vjb25kYXJ5LXRleHQsZGlzYWJsZWQtdGV4dCxkaXZpZGVycyxmb2N1c2VkXSBpbnN0ZWFkLlxuLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuJHdoaXRlLTYtb3BhY2l0eTogcmdiYSh3aGl0ZSwgMC4wNik7XG5cbiRkYXJrLXByaW1hcnktdGV4dDogcmdiYShibGFjaywgMC44Nyk7XG4kZGFyay1zZWNvbmRhcnktdGV4dDogcmdiYShibGFjaywgMC41NCk7XG4kZGFyay1kaXNhYmxlZC10ZXh0OiByZ2JhKGJsYWNrLCAwLjM4KTtcbiRkYXJrLWRpdmlkZXJzOiByZ2JhKGJsYWNrLCAwLjEyKTtcbiRkYXJrLWZvY3VzZWQ6IHJnYmEoYmxhY2ssIDAuMTIpO1xuJGxpZ2h0LXByaW1hcnktdGV4dDogd2hpdGU7XG4kbGlnaHQtc2Vjb25kYXJ5LXRleHQ6IHJnYmEod2hpdGUsIDAuNyk7XG4kbGlnaHQtZGlzYWJsZWQtdGV4dDogcmdiYSh3aGl0ZSwgMC41KTtcbiRsaWdodC1kaXZpZGVyczogcmdiYSh3aGl0ZSwgMC4xMik7XG4kbGlnaHQtZm9jdXNlZDogcmdiYSh3aGl0ZSwgMC4xMik7XG5cbiRyZWQtcGFsZXR0ZTogKFxuICA1MDogI2ZmZWJlZSxcbiAgMTAwOiAjZmZjZGQyLFxuICAyMDA6ICNlZjlhOWEsXG4gIDMwMDogI2U1NzM3MyxcbiAgNDAwOiAjZWY1MzUwLFxuICA1MDA6ICNmNDQzMzYsXG4gIDYwMDogI2U1MzkzNSxcbiAgNzAwOiAjZDMyZjJmLFxuICA4MDA6ICNjNjI4MjgsXG4gIDkwMDogI2I3MWMxYyxcbiAgQTEwMDogI2ZmOGE4MCxcbiAgQTIwMDogI2ZmNTI1MixcbiAgQTQwMDogI2ZmMTc0NCxcbiAgQTcwMDogI2Q1MDAwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kcGluay1wYWxldHRlOiAoXG4gIDUwOiAjZmNlNGVjLFxuICAxMDA6ICNmOGJiZDAsXG4gIDIwMDogI2Y0OGZiMSxcbiAgMzAwOiAjZjA2MjkyLFxuICA0MDA6ICNlYzQwN2EsXG4gIDUwMDogI2U5MWU2MyxcbiAgNjAwOiAjZDgxYjYwLFxuICA3MDA6ICNjMjE4NWIsXG4gIDgwMDogI2FkMTQ1NyxcbiAgOTAwOiAjODgwZTRmLFxuICBBMTAwOiAjZmY4MGFiLFxuICBBMjAwOiAjZmY0MDgxLFxuICBBNDAwOiAjZjUwMDU3LFxuICBBNzAwOiAjYzUxMTYyLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbiRwdXJwbGUtcGFsZXR0ZTogKFxuICA1MDogI2YzZTVmNSxcbiAgMTAwOiAjZTFiZWU3LFxuICAyMDA6ICNjZTkzZDgsXG4gIDMwMDogI2JhNjhjOCxcbiAgNDAwOiAjYWI0N2JjLFxuICA1MDA6ICM5YzI3YjAsXG4gIDYwMDogIzhlMjRhYSxcbiAgNzAwOiAjN2IxZmEyLFxuICA4MDA6ICM2YTFiOWEsXG4gIDkwMDogIzRhMTQ4YyxcbiAgQTEwMDogI2VhODBmYyxcbiAgQTIwMDogI2UwNDBmYixcbiAgQTQwMDogI2Q1MDBmOSxcbiAgQTcwMDogI2FhMDBmZixcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbiRkZWVwLXB1cnBsZS1wYWxldHRlOiAoXG4gIDUwOiAjZWRlN2Y2LFxuICAxMDA6ICNkMWM0ZTksXG4gIDIwMDogI2IzOWRkYixcbiAgMzAwOiAjOTU3NWNkLFxuICA0MDA6ICM3ZTU3YzIsXG4gIDUwMDogIzY3M2FiNyxcbiAgNjAwOiAjNWUzNWIxLFxuICA3MDA6ICM1MTJkYTgsXG4gIDgwMDogIzQ1MjdhMCxcbiAgOTAwOiAjMzExYjkyLFxuICBBMTAwOiAjYjM4OGZmLFxuICBBMjAwOiAjN2M0ZGZmLFxuICBBNDAwOiAjNjUxZmZmLFxuICBBNzAwOiAjNjIwMGVhLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJGluZGlnby1wYWxldHRlOiAoXG4gIDUwOiAjZThlYWY2LFxuICAxMDA6ICNjNWNhZTksXG4gIDIwMDogIzlmYThkYSxcbiAgMzAwOiAjNzk4NmNiLFxuICA0MDA6ICM1YzZiYzAsXG4gIDUwMDogIzNmNTFiNSxcbiAgNjAwOiAjMzk0OWFiLFxuICA3MDA6ICMzMDNmOWYsXG4gIDgwMDogIzI4MzU5MyxcbiAgOTAwOiAjMWEyMzdlLFxuICBBMTAwOiAjOGM5ZWZmLFxuICBBMjAwOiAjNTM2ZGZlLFxuICBBNDAwOiAjM2Q1YWZlLFxuICBBNzAwOiAjMzA0ZmZlLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJGJsdWUtcGFsZXR0ZTogKFxuICA1MDogI2UzZjJmZCxcbiAgMTAwOiAjYmJkZWZiLFxuICAyMDA6ICM5MGNhZjksXG4gIDMwMDogIzY0YjVmNixcbiAgNDAwOiAjNDJhNWY1LFxuICA1MDA6ICMyMTk2ZjMsXG4gIDYwMDogIzFlODhlNSxcbiAgNzAwOiAjMTk3NmQyLFxuICA4MDA6ICMxNTY1YzAsXG4gIDkwMDogIzBkNDdhMSxcbiAgQTEwMDogIzgyYjFmZixcbiAgQTIwMDogIzQ0OGFmZixcbiAgQTQwMDogIzI5NzlmZixcbiAgQTcwMDogIzI5NjJmZixcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbGlnaHQtYmx1ZS1wYWxldHRlOiAoXG4gIDUwOiAjZTFmNWZlLFxuICAxMDA6ICNiM2U1ZmMsXG4gIDIwMDogIzgxZDRmYSxcbiAgMzAwOiAjNGZjM2Y3LFxuICA0MDA6ICMyOWI2ZjYsXG4gIDUwMDogIzAzYTlmNCxcbiAgNjAwOiAjMDM5YmU1LFxuICA3MDA6ICMwMjg4ZDEsXG4gIDgwMDogIzAyNzdiZCxcbiAgOTAwOiAjMDE1NzliLFxuICBBMTAwOiAjODBkOGZmLFxuICBBMjAwOiAjNDBjNGZmLFxuICBBNDAwOiAjMDBiMGZmLFxuICBBNzAwOiAjMDA5MWVhLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kY3lhbi1wYWxldHRlOiAoXG4gIDUwOiAjZTBmN2ZhLFxuICAxMDA6ICNiMmViZjIsXG4gIDIwMDogIzgwZGVlYSxcbiAgMzAwOiAjNGRkMGUxLFxuICA0MDA6ICMyNmM2ZGEsXG4gIDUwMDogIzAwYmNkNCxcbiAgNjAwOiAjMDBhY2MxLFxuICA3MDA6ICMwMDk3YTcsXG4gIDgwMDogIzAwODM4ZixcbiAgOTAwOiAjMDA2MDY0LFxuICBBMTAwOiAjODRmZmZmLFxuICBBMjAwOiAjMThmZmZmLFxuICBBNDAwOiAjMDBlNWZmLFxuICBBNzAwOiAjMDBiOGQ0LFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbiR0ZWFsLXBhbGV0dGU6IChcbiAgNTA6ICNlMGYyZjEsXG4gIDEwMDogI2IyZGZkYixcbiAgMjAwOiAjODBjYmM0LFxuICAzMDA6ICM0ZGI2YWMsXG4gIDQwMDogIzI2YTY5YSxcbiAgNTAwOiAjMDA5Njg4LFxuICA2MDA6ICMwMDg5N2IsXG4gIDcwMDogIzAwNzk2YixcbiAgODAwOiAjMDA2OTVjLFxuICA5MDA6ICMwMDRkNDAsXG4gIEExMDA6ICNhN2ZmZWIsXG4gIEEyMDA6ICM2NGZmZGEsXG4gIEE0MDA6ICMxZGU5YjYsXG4gIEE3MDA6ICMwMGJmYTUsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJGdyZWVuLXBhbGV0dGU6IChcbiAgNTA6ICNlOGY1ZTksXG4gIDEwMDogI2M4ZTZjOSxcbiAgMjAwOiAjYTVkNmE3LFxuICAzMDA6ICM4MWM3ODQsXG4gIDQwMDogIzY2YmI2YSxcbiAgNTAwOiAjNGNhZjUwLFxuICA2MDA6ICM0M2EwNDcsXG4gIDcwMDogIzM4OGUzYyxcbiAgODAwOiAjMmU3ZDMyLFxuICA5MDA6ICMxYjVlMjAsXG4gIEExMDA6ICNiOWY2Y2EsXG4gIEEyMDA6ICM2OWYwYWUsXG4gIEE0MDA6ICMwMGU2NzYsXG4gIEE3MDA6ICMwMGM4NTMsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbGlnaHQtZ3JlZW4tcGFsZXR0ZTogKFxuICA1MDogI2YxZjhlOSxcbiAgMTAwOiAjZGNlZGM4LFxuICAyMDA6ICNjNWUxYTUsXG4gIDMwMDogI2FlZDU4MSxcbiAgNDAwOiAjOWNjYzY1LFxuICA1MDA6ICM4YmMzNGEsXG4gIDYwMDogIzdjYjM0MixcbiAgNzAwOiAjNjg5ZjM4LFxuICA4MDA6ICM1NThiMmYsXG4gIDkwMDogIzMzNjkxZSxcbiAgQTEwMDogI2NjZmY5MCxcbiAgQTIwMDogI2IyZmY1OSxcbiAgQTQwMDogIzc2ZmYwMyxcbiAgQTcwMDogIzY0ZGQxNyxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJGxpbWUtcGFsZXR0ZTogKFxuICA1MDogI2Y5ZmJlNyxcbiAgMTAwOiAjZjBmNGMzLFxuICAyMDA6ICNlNmVlOWMsXG4gIDMwMDogI2RjZTc3NSxcbiAgNDAwOiAjZDRlMTU3LFxuICA1MDA6ICNjZGRjMzksXG4gIDYwMDogI2MwY2EzMyxcbiAgNzAwOiAjYWZiNDJiLFxuICA4MDA6ICM5ZTlkMjQsXG4gIDkwMDogIzgyNzcxNyxcbiAgQTEwMDogI2Y0ZmY4MSxcbiAgQTIwMDogI2VlZmY0MSxcbiAgQTQwMDogI2M2ZmYwMCxcbiAgQTcwMDogI2FlZWEwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbiR5ZWxsb3ctcGFsZXR0ZTogKFxuICA1MDogI2ZmZmRlNyxcbiAgMTAwOiAjZmZmOWM0LFxuICAyMDA6ICNmZmY1OWQsXG4gIDMwMDogI2ZmZjE3NixcbiAgNDAwOiAjZmZlZTU4LFxuICA1MDA6ICNmZmViM2IsXG4gIDYwMDogI2ZkZDgzNSxcbiAgNzAwOiAjZmJjMDJkLFxuICA4MDA6ICNmOWE4MjUsXG4gIDkwMDogI2Y1N2YxNyxcbiAgQTEwMDogI2ZmZmY4ZCxcbiAgQTIwMDogI2ZmZmYwMCxcbiAgQTQwMDogI2ZmZWEwMCxcbiAgQTcwMDogI2ZmZDYwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJGFtYmVyLXBhbGV0dGU6IChcbiAgNTA6ICNmZmY4ZTEsXG4gIDEwMDogI2ZmZWNiMyxcbiAgMjAwOiAjZmZlMDgyLFxuICAzMDA6ICNmZmQ1NGYsXG4gIDQwMDogI2ZmY2EyOCxcbiAgNTAwOiAjZmZjMTA3LFxuICA2MDA6ICNmZmIzMDAsXG4gIDcwMDogI2ZmYTAwMCxcbiAgODAwOiAjZmY4ZjAwLFxuICA5MDA6ICNmZjZmMDAsXG4gIEExMDA6ICNmZmU1N2YsXG4gIEEyMDA6ICNmZmQ3NDAsXG4gIEE0MDA6ICNmZmM0MDAsXG4gIEE3MDA6ICNmZmFiMDAsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbiRvcmFuZ2UtcGFsZXR0ZTogKFxuICA1MDogI2ZmZjNlMCxcbiAgMTAwOiAjZmZlMGIyLFxuICAyMDA6ICNmZmNjODAsXG4gIDMwMDogI2ZmYjc0ZCxcbiAgNDAwOiAjZmZhNzI2LFxuICA1MDA6ICNmZjk4MDAsXG4gIDYwMDogI2ZiOGMwMCxcbiAgNzAwOiAjZjU3YzAwLFxuICA4MDA6ICNlZjZjMDAsXG4gIDkwMDogI2U2NTEwMCxcbiAgQTEwMDogI2ZmZDE4MCxcbiAgQTIwMDogI2ZmYWI0MCxcbiAgQTQwMDogI2ZmOTEwMCxcbiAgQTcwMDogI2ZmNmQwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogYmxhY2ssXG4gIClcbik7XG5cbiRkZWVwLW9yYW5nZS1wYWxldHRlOiAoXG4gIDUwOiAjZmJlOWU3LFxuICAxMDA6ICNmZmNjYmMsXG4gIDIwMDogI2ZmYWI5MSxcbiAgMzAwOiAjZmY4YTY1LFxuICA0MDA6ICNmZjcwNDMsXG4gIDUwMDogI2ZmNTcyMixcbiAgNjAwOiAjZjQ1MTFlLFxuICA3MDA6ICNlNjRhMTksXG4gIDgwMDogI2Q4NDMxNSxcbiAgOTAwOiAjYmYzNjBjLFxuICBBMTAwOiAjZmY5ZTgwLFxuICBBMjAwOiAjZmY2ZTQwLFxuICBBNDAwOiAjZmYzZDAwLFxuICBBNzAwOiAjZGQyYzAwLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJGJyb3duLXBhbGV0dGU6IChcbiAgNTA6ICNlZmViZTksXG4gIDEwMDogI2Q3Y2NjOCxcbiAgMjAwOiAjYmNhYWE0LFxuICAzMDA6ICNhMTg4N2YsXG4gIDQwMDogIzhkNmU2MyxcbiAgNTAwOiAjNzk1NTQ4LFxuICA2MDA6ICM2ZDRjNDEsXG4gIDcwMDogIzVkNDAzNyxcbiAgODAwOiAjNGUzNDJlLFxuICA5MDA6ICMzZTI3MjMsXG4gIEExMDA6ICNkN2NjYzgsXG4gIEEyMDA6ICNiY2FhYTQsXG4gIEE0MDA6ICM4ZDZlNjMsXG4gIEE3MDA6ICM1ZDQwMzcsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbiRncmV5LXBhbGV0dGU6IChcbiAgNTA6ICNmYWZhZmEsXG4gIDEwMDogI2Y1ZjVmNSxcbiAgMjAwOiAjZWVlZWVlLFxuICAzMDA6ICNlMGUwZTAsXG4gIDQwMDogI2JkYmRiZCxcbiAgNTAwOiAjOWU5ZTllLFxuICA2MDA6ICM3NTc1NzUsXG4gIDcwMDogIzYxNjE2MSxcbiAgODAwOiAjNDI0MjQyLFxuICA5MDA6ICMyMTIxMjEsXG4gIEExMDA6ICNmZmZmZmYsXG4gIEEyMDA6ICNlZWVlZWUsXG4gIEE0MDA6ICNiZGJkYmQsXG4gIEE3MDA6ICM2MTYxNjEsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuLy8gQWxpYXMgZm9yIGFsdGVybmF0ZSBzcGVsbGluZy5cbiRncmF5LXBhbGV0dGU6ICRncmV5LXBhbGV0dGU7XG5cbiRibHVlLWdyZXktcGFsZXR0ZTogKFxuICA1MDogI2VjZWZmMSxcbiAgMTAwOiAjY2ZkOGRjLFxuICAyMDA6ICNiMGJlYzUsXG4gIDMwMDogIzkwYTRhZSxcbiAgNDAwOiAjNzg5MDljLFxuICA1MDA6ICM2MDdkOGIsXG4gIDYwMDogIzU0NmU3YSxcbiAgNzAwOiAjNDU1YTY0LFxuICA4MDA6ICMzNzQ3NGYsXG4gIDkwMDogIzI2MzIzOCxcbiAgQTEwMDogI2NmZDhkYyxcbiAgQTIwMDogI2IwYmVjNSxcbiAgQTQwMDogIzc4OTA5YyxcbiAgQTcwMDogIzQ1NWE2NCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4vLyBBbGlhcyBmb3IgYWx0ZXJuYXRlIHNwZWxsaW5nLlxuJGJsdWUtZ3JheS1wYWxldHRlOiAkYmx1ZS1ncmV5LXBhbGV0dGU7XG5cblxuLy8gQmFja2dyb3VuZCBwYWxldHRlIGZvciBsaWdodCB0aGVtZXMuXG4kbGlnaHQtdGhlbWUtYmFja2dyb3VuZC1wYWxldHRlOiAoXG4gIHN0YXR1cy1iYXI6IG1hcC5nZXQoJGdyZXktcGFsZXR0ZSwgMzAwKSxcbiAgYXBwLWJhcjogICAgbWFwLmdldCgkZ3JleS1wYWxldHRlLCAxMDApLFxuICBiYWNrZ3JvdW5kOiBtYXAuZ2V0KCRncmV5LXBhbGV0dGUsIDUwKSxcbiAgaG92ZXI6ICAgICAgcmdiYShibGFjaywgMC4wNCksIC8vIFRPRE8oa2FyYSk6IGNoZWNrIHN0eWxlIHdpdGggTWF0ZXJpYWwgRGVzaWduIFVYXG4gIGNhcmQ6ICAgICAgIHdoaXRlLFxuICBkaWFsb2c6ICAgICB3aGl0ZSxcbiAgZGlzYWJsZWQtYnV0dG9uOiByZ2JhKGJsYWNrLCAwLjEyKSxcbiAgcmFpc2VkLWJ1dHRvbjogd2hpdGUsXG4gIGZvY3VzZWQtYnV0dG9uOiAkZGFyay1mb2N1c2VkLFxuICBzZWxlY3RlZC1idXR0b246IG1hcC5nZXQoJGdyZXktcGFsZXR0ZSwgMzAwKSxcbiAgc2VsZWN0ZWQtZGlzYWJsZWQtYnV0dG9uOiBtYXAuZ2V0KCRncmV5LXBhbGV0dGUsIDQwMCksXG4gIGRpc2FibGVkLWJ1dHRvbi10b2dnbGU6IG1hcC5nZXQoJGdyZXktcGFsZXR0ZSwgMjAwKSxcbiAgdW5zZWxlY3RlZC1jaGlwOiBtYXAuZ2V0KCRncmV5LXBhbGV0dGUsIDMwMCksXG4gIGRpc2FibGVkLWxpc3Qtb3B0aW9uOiBtYXAuZ2V0KCRncmV5LXBhbGV0dGUsIDIwMCksXG4gIHRvb2x0aXA6IG1hcC5nZXQoJGdyZXktcGFsZXR0ZSwgNzAwKSxcbik7XG5cbi8vIEJhY2tncm91bmQgcGFsZXR0ZSBmb3IgZGFyayB0aGVtZXMuXG4kZGFyay10aGVtZS1iYWNrZ3JvdW5kLXBhbGV0dGU6IChcbiAgc3RhdHVzLWJhcjogYmxhY2ssXG4gIGFwcC1iYXI6ICAgIG1hcC5nZXQoJGdyZXktcGFsZXR0ZSwgOTAwKSxcbiAgYmFja2dyb3VuZDogIzMwMzAzMCxcbiAgaG92ZXI6ICAgICAgcmdiYSh3aGl0ZSwgMC4wNCksIC8vIFRPRE8oa2FyYSk6IGNoZWNrIHN0eWxlIHdpdGggTWF0ZXJpYWwgRGVzaWduIFVYXG4gIGNhcmQ6ICAgICAgIG1hcC5nZXQoJGdyZXktcGFsZXR0ZSwgODAwKSxcbiAgZGlhbG9nOiAgICAgbWFwLmdldCgkZ3JleS1wYWxldHRlLCA4MDApLFxuICBkaXNhYmxlZC1idXR0b246IHJnYmEod2hpdGUsIDAuMTIpLFxuICByYWlzZWQtYnV0dG9uOiBtYXAuZ2V0KCRncmV5LXBhbGV0dGUsIDgwMCksXG4gIGZvY3VzZWQtYnV0dG9uOiAkbGlnaHQtZm9jdXNlZCxcbiAgc2VsZWN0ZWQtYnV0dG9uOiBtYXAuZ2V0KCRncmV5LXBhbGV0dGUsIDkwMCksXG4gIHNlbGVjdGVkLWRpc2FibGVkLWJ1dHRvbjogbWFwLmdldCgkZ3JleS1wYWxldHRlLCA4MDApLFxuICBkaXNhYmxlZC1idXR0b24tdG9nZ2xlOiBibGFjayxcbiAgdW5zZWxlY3RlZC1jaGlwOiBtYXAuZ2V0KCRncmV5LXBhbGV0dGUsIDcwMCksXG4gIGRpc2FibGVkLWxpc3Qtb3B0aW9uOiByZ2JhKHdoaXRlLCAwLjEyKSxcbiAgdG9vbHRpcDogbWFwLmdldCgkZ3JleS1wYWxldHRlLCA3MDApLFxuKTtcblxuLy8gRm9yZWdyb3VuZCBwYWxldHRlIGZvciBsaWdodCB0aGVtZXMuXG4kbGlnaHQtdGhlbWUtZm9yZWdyb3VuZC1wYWxldHRlOiAoXG4gIGJhc2U6ICAgICAgICAgICAgICBibGFjayxcbiAgZGl2aWRlcjogICAgICAgICAgICRkYXJrLWRpdmlkZXJzLFxuICBkaXZpZGVyczogICAgICAgICAgJGRhcmstZGl2aWRlcnMsXG4gIGRpc2FibGVkOiAgICAgICAgICAkZGFyay1kaXNhYmxlZC10ZXh0LFxuICBkaXNhYmxlZC1idXR0b246ICAgcmdiYShibGFjaywgMC4yNiksXG4gIGRpc2FibGVkLXRleHQ6ICAgICAkZGFyay1kaXNhYmxlZC10ZXh0LFxuICBlbGV2YXRpb246ICAgICAgICAgYmxhY2ssXG4gIGhpbnQtdGV4dDogICAgICAgICAkZGFyay1kaXNhYmxlZC10ZXh0LFxuICBzZWNvbmRhcnktdGV4dDogICAgJGRhcmstc2Vjb25kYXJ5LXRleHQsXG4gIGljb246ICAgICAgICAgICAgICByZ2JhKGJsYWNrLCAwLjU0KSxcbiAgaWNvbnM6ICAgICAgICAgICAgIHJnYmEoYmxhY2ssIDAuNTQpLFxuICB0ZXh0OiAgICAgICAgICAgICAgcmdiYShibGFjaywgMC44NyksXG4gIHNsaWRlci1taW46ICAgICAgICByZ2JhKGJsYWNrLCAwLjg3KSxcbiAgc2xpZGVyLW9mZjogICAgICAgIHJnYmEoYmxhY2ssIDAuMjYpLFxuICBzbGlkZXItb2ZmLWFjdGl2ZTogcmdiYShibGFjaywgMC4zOCksXG4pO1xuXG4vLyBGb3JlZ3JvdW5kIHBhbGV0dGUgZm9yIGRhcmsgdGhlbWVzLlxuJGRhcmstdGhlbWUtZm9yZWdyb3VuZC1wYWxldHRlOiAoXG4gIGJhc2U6ICAgICAgICAgICAgICB3aGl0ZSxcbiAgZGl2aWRlcjogICAgICAgICAgICRsaWdodC1kaXZpZGVycyxcbiAgZGl2aWRlcnM6ICAgICAgICAgICRsaWdodC1kaXZpZGVycyxcbiAgZGlzYWJsZWQ6ICAgICAgICAgICRsaWdodC1kaXNhYmxlZC10ZXh0LFxuICBkaXNhYmxlZC1idXR0b246ICAgcmdiYSh3aGl0ZSwgMC4zKSxcbiAgZGlzYWJsZWQtdGV4dDogICAgICRsaWdodC1kaXNhYmxlZC10ZXh0LFxuICBlbGV2YXRpb246ICAgICAgICAgYmxhY2ssXG4gIGhpbnQtdGV4dDogICAgICAgICAkbGlnaHQtZGlzYWJsZWQtdGV4dCxcbiAgc2Vjb25kYXJ5LXRleHQ6ICAgICRsaWdodC1zZWNvbmRhcnktdGV4dCxcbiAgaWNvbjogICAgICAgICAgICAgIHdoaXRlLFxuICBpY29uczogICAgICAgICAgICAgd2hpdGUsXG4gIHRleHQ6ICAgICAgICAgICAgICB3aGl0ZSxcbiAgc2xpZGVyLW1pbjogICAgICAgIHdoaXRlLFxuICBzbGlkZXItb2ZmOiAgICAgICAgcmdiYSh3aGl0ZSwgMC4zKSxcbiAgc2xpZGVyLW9mZi1hY3RpdmU6IHJnYmEod2hpdGUsIDAuMyksXG4pO1xuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2FzczptZXRhJztcbkB1c2UgJy4uL3RoZW1pbmcvdGhlbWluZyc7XG5cbi8vIENvbG9ycyBmb3IgdGhlIHJpcHBsZSBlbGVtZW50cy5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG4gICRmb3JlZ3JvdW5kLWJhc2U6IG1hcC5nZXQoJGZvcmVncm91bmQsIGJhc2UpO1xuICAkY29sb3Itb3BhY2l0eTogMC4xO1xuXG4gIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgIC8vIElmIHRoZSByaXBwbGUgY29sb3IgaXMgcmVzb2x2ZXMgdG8gYSBjb2xvciAqdHlwZSosIHdlIGNhbiB1c2UgaXQgZGlyZWN0bHksIG90aGVyd2lzZVxuICAgIC8vIChlLmcuIGl0IHJlc29sdmVzIHRvIGEgQ1NTIHZhcmlhYmxlKSB3ZSBmYWxsIGJhY2sgdG8gdXNpbmcgdGhlIGNvbG9yIGFuZCBzZXR0aW5nIGFuIG9wYWNpdHkuXG4gICAgQGlmIChtZXRhLnR5cGUtb2YoJGZvcmVncm91bmQtYmFzZSkgPT0gY29sb3IpIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoJGZvcmVncm91bmQtYmFzZSwgJGNvbG9yLW9wYWNpdHkpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZm9yZWdyb3VuZC1iYXNlO1xuICAgICAgb3BhY2l0eTogJGNvbG9yLW9wYWNpdHk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1yaXBwbGUnKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJy4uLy4uL3RoZW1pbmcvdGhlbWluZyc7XG5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC5nZXQoJGNvbmZpZywgaXMtZGFyayk7XG4gICRwcmltYXJ5OiBtYXAuZ2V0KCRjb25maWcsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAuZ2V0KCRjb25maWcsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAuZ2V0KCRjb25maWcsIHdhcm4pO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcblxuICAvLyBOT1RFKHRyYXZpc2thdWZtYW4pOiBXaGlsZSB0aGUgc3BlYyBjYWxscyBmb3IgdHJhbnNsdWNlbnQgYmxhY2tzL3doaXRlcyBmb3IgZGlzYWJsZWQgY29sb3JzLFxuICAvLyB0aGlzIGRvZXMgbm90IHdvcmsgd2VsbCB3aXRoIGVsZW1lbnRzIGxheWVyZWQgb24gdG9wIG9mIG9uZSBhbm90aGVyLiBUbyBnZXQgYXJvdW5kIHRoaXMgd2VcbiAgLy8gYmxlbmQgdGhlIGNvbG9ycyB0b2dldGhlciBiYXNlZCBvbiB0aGUgYmFzZSBjb2xvciBhbmQgdGhlIHRoZW1lIGJhY2tncm91bmQuXG4gICR3aGl0ZS0zMHBjdC1vcGFjaXR5LW9uLWRhcms6ICM2ODY4Njg7XG4gICRibGFjay0yNnBjdC1vcGFjaXR5LW9uLWxpZ2h0OiAjYjBiMGIwO1xuICAkZGlzYWJsZWQtY29sb3I6IGlmKCRpcy1kYXJrLXRoZW1lLCAkd2hpdGUtMzBwY3Qtb3BhY2l0eS1vbi1kYXJrLCAkYmxhY2stMjZwY3Qtb3BhY2l0eS1vbi1saWdodCk7XG4gICRjb2xvcmVkLWJveC1zZWxlY3RvcjogJy5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsIC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUnO1xuXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94IHtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCksIHNlY29uZGFyeS10ZXh0KTtcblxuICAgICY6OmFmdGVyIHtcbiAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIGJhY2tncm91bmQpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94LWRpc2FibGVkIHtcbiAgICBjb2xvcjogJGRpc2FibGVkLWNvbG9yO1xuICB9XG5cbiAgLm1hdC1wcmltYXJ5IC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsXG4gIC5tYXQtcHJpbWFyeSAubWF0LXBzZXVkby1jaGVja2JveC1pbmRldGVybWluYXRlIHtcbiAgICBiYWNrZ3JvdW5kOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUobWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KSk7XG4gIH1cblxuICAvLyBEZWZhdWx0IHRvIHRoZSBhY2NlbnQgY29sb3IuIE5vdGUgdGhhdCB0aGUgcHNldWRvIGNoZWNrYm94ZXMgYXJlIG1lYW50IHRvIGluaGVyaXQgdGhlXG4gIC8vIHRoZW1lIGZyb20gdGhlaXIgcGFyZW50LCByYXRoZXIgdGhhbiBpbXBsZW1lbnRpbmcgdGhlaXIgb3duIHRoZW1pbmcsIHdoaWNoIGlzIHdoeSB3ZVxuICAvLyBkb24ndCBhdHRhY2ggdG8gdGhlIGBtYXQtKmAgY2xhc3Nlcy4gQWxzbyBub3RlIHRoYXQgdGhpcyBuZWVkcyB0byBiZSBiZWxvdyBgLm1hdC1wcmltYXJ5YFxuICAvLyBpbiBvcmRlciB0byBhbGxvdyBmb3IgdGhlIGNvbG9yIHRvIGJlIG92ZXJ3cml0dGVuIGlmIHRoZSBjaGVja2JveCBpcyBpbnNpZGUgYSBwYXJlbnQgdGhhdFxuICAvLyBoYXMgYG1hdC1hY2NlbnRgIGFuZCBpcyBwbGFjZWQgaW5zaWRlIGFub3RoZXIgcGFyZW50IHRoYXQgaGFzIGBtYXQtcHJpbWFyeWAuXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUsXG4gIC5tYXQtYWNjZW50IC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsXG4gIC5tYXQtYWNjZW50IC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUge1xuICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZShtYXAuZ2V0KCRjb25maWcsIGFjY2VudCkpO1xuICB9XG5cbiAgLm1hdC13YXJuIC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsXG4gIC5tYXQtd2FybiAubWF0LXBzZXVkby1jaGVja2JveC1pbmRldGVybWluYXRlIHtcbiAgICBiYWNrZ3JvdW5kOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUobWFwLmdldCgkY29uZmlnLCB3YXJuKSk7XG4gIH1cblxuICAubWF0LXBzZXVkby1jaGVja2JveC1jaGVja2VkLFxuICAubWF0LXBzZXVkby1jaGVja2JveC1pbmRldGVybWluYXRlIHtcbiAgICAmLm1hdC1wc2V1ZG8tY2hlY2tib3gtZGlzYWJsZWQge1xuICAgICAgYmFja2dyb3VuZDogJGRpc2FibGVkLWNvbG9yO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LXBzZXVkby1jaGVja2JveCcpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICd0aGVtaW5nL3RoZW1pbmcnO1xuQHVzZSAnLi9zdHlsZS9wcml2YXRlJztcbkB1c2UgJy4vcmlwcGxlL3JpcHBsZS10aGVtZSc7XG5AdXNlICcuL29wdGlvbi9vcHRpb24tdGhlbWUnO1xuQHVzZSAnLi9vcHRpb24vb3B0Z3JvdXAtdGhlbWUnO1xuQHVzZSAnLi9zZWxlY3Rpb24vcHNldWRvLWNoZWNrYm94L3BzZXVkby1jaGVja2JveC10aGVtZSc7XG5AdXNlICcuL3N0eWxlL2VsZXZhdGlvbic7XG5cblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAvLyBXcmFwcGVyIGVsZW1lbnQgdGhhdCBwcm92aWRlcyB0aGUgdGhlbWUgYmFja2dyb3VuZCB3aGVuIHRoZSB1c2VyJ3MgY29udGVudCBpc24ndFxuICAvLyBpbnNpZGUgb2YgYSBgbWF0LXNpZGVuYXYtY29udGFpbmVyYC4gTm90ZSB0aGF0IHdlIG5lZWQgdG8gZXhjbHVkZSB0aGUgYW1wZXJzYW5kXG4gIC8vIHNlbGVjdG9yIGluIGNhc2UgdGhlIG1peGluIGlzIGluY2x1ZGVkIGF0IHRoZSB0b3AgbGV2ZWwuXG4gIC5tYXQtYXBwLWJhY2tncm91bmQje2lmKCYsICcsICYubWF0LWFwcC1iYWNrZ3JvdW5kJywgJycpfSB7XG4gICAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIGJhY2tncm91bmQpO1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLy8gUHJvdmlkZXMgZXh0ZXJuYWwgQ1NTIGNsYXNzZXMgZm9yIGVhY2ggZWxldmF0aW9uIHZhbHVlLiBFYWNoIENTUyBjbGFzcyBpcyBmb3JtYXR0ZWQgYXNcbiAgLy8gYG1hdC1lbGV2YXRpb24teiR6VmFsdWVgIHdoZXJlIGAkelZhbHVlYCBjb3JyZXNwb25kcyB0byB0aGUgei1zcGFjZSB0byB3aGljaCB0aGUgZWxlbWVudCBpc1xuICAvLyBlbGV2YXRlZC5cbiAgQGZvciAkelZhbHVlIGZyb20gMCB0aHJvdWdoIDI0IHtcbiAgICAuI3tlbGV2YXRpb24uJHByZWZpeH0jeyR6VmFsdWV9IHtcbiAgICAgIEBpbmNsdWRlIHByaXZhdGUucHJpdmF0ZS10aGVtZS1lbGV2YXRpb24oJHpWYWx1ZSwgJGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgLy8gTWFya2VyIHRoYXQgaXMgdXNlZCB0byBkZXRlcm1pbmUgd2hldGhlciB0aGUgdXNlciBoYXMgYWRkZWQgYSB0aGVtZSB0byB0aGVpciBwYWdlLlxuICBAYXQtcm9vdCB7XG4gICAgLm1hdC10aGVtZS1sb2FkZWQtbWFya2VyIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbi8vIE1peGluIHRoYXQgcmVuZGVycyBhbGwgb2YgdGhlIGNvcmUgc3R5bGVzIHRoYXQgZGVwZW5kIG9uIHRoZSB0aGVtZS5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIC8vIFdyYXAgdGhlIHN1Yi10aGVtZSBpbmNsdWRlcyBpbiB0aGUgZHVwbGljYXRlIHRoZW1lIHN0eWxlcyBtaXhpbi4gVGhpcyBlbnN1cmVzIHRoYXRcbiAgLy8gdGhlcmUgd29uJ3QgYmUgbXVsdGlwbGUgd2FybmluZ3MuIGUuZy4gaWYgYG1hdC1jb3JlLXRoZW1lYCByZXBvcnRzIGEgd2FybmluZywgdGhlblxuICAvLyB0aGUgaW1wb3J0ZWQgdGhlbWVzIChzdWNoIGFzIGBtYXQtcmlwcGxlLXRoZW1lYCkgc2hvdWxkIG5vdCByZXBvcnQgYWdhaW4uXG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1jb3JlJykge1xuICAgIEBpbmNsdWRlIHJpcHBsZS10aGVtZS50aGVtZSgkdGhlbWUpO1xuICAgIEBpbmNsdWRlIG9wdGlvbi10aGVtZS50aGVtZSgkdGhlbWUpO1xuICAgIEBpbmNsdWRlIG9wdGdyb3VwLXRoZW1lLnRoZW1lKCR0aGVtZSk7XG4gICAgQGluY2x1ZGUgcHNldWRvLWNoZWNrYm94LXRoZW1lLnRoZW1lKCR0aGVtZSk7XG5cbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2FzczptYXRoJztcbkB1c2UgJ3Nhc3M6bWV0YSc7XG5AdXNlICd2YXJpYWJsZXMnO1xuXG5cbi8vIEEgY29sbGVjdGlvbiBvZiBtaXhpbnMgYW5kIENTUyBjbGFzc2VzIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgZWxldmF0aW9uIHRvIGEgbWF0ZXJpYWxcbi8vIGVsZW1lbnQuXG4vLyBTZWU6IGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL2Vudmlyb25tZW50L2VsZXZhdGlvbi5odG1sXG4vLyBFeGFtcGxlczpcbi8vXG4vL1xuLy8gLm1hdC1mb28ge1xuLy8gICBAaW5jbHVkZSAkbWF0LWVsZXZhdGlvbigyKTtcbi8vXG4vLyAgICY6YWN0aXZlIHtcbi8vICAgICBAaW5jbHVkZSAkbWF0LWVsZXZhdGlvbig4KTtcbi8vICAgfVxuLy8gfVxuLy9cbi8vIDxkaXYgaWQ9XCJleHRlcm5hbC1jYXJkXCIgY2xhc3M9XCJtYXQtZWxldmF0aW9uLXoyXCI+PHA+U29tZSBjb250ZW50PC9wPjwvZGl2PlxuLy9cbi8vIEZvciBhbiBleHBsYW5hdGlvbiBvZiB0aGUgZGVzaWduIGJlaGluZCBob3cgZWxldmF0aW9uIGlzIGltcGxlbWVudGVkLCBzZWUgdGhlIGRlc2lnbiBkb2MgYXRcbi8vIGh0dHBzOi8vZ29vLmdsL0txMGs5Wi5cblxuLy8gQ29sb3JzIGZvciB1bWJyYSwgcGVudW1icmEsIGFuZCBhbWJpZW50IHNoYWRvd3MuIEFzIGRlc2NyaWJlZCBpbiB0aGUgZGVzaWduIGRvYywgZWFjaCBlbGV2YXRpb25cbi8vIGxldmVsIGlzIGNyZWF0ZWQgdXNpbmcgYSBzZXQgb2YgMyBzaGFkb3cgdmFsdWVzLCBvbmUgZm9yIHVtYnJhICh0aGUgc2hhZG93IHJlcHJlc2VudGluZyB0aGVcbi8vIHNwYWNlIGNvbXBsZXRlbHkgb2JzY3VyZWQgYnkgYW4gb2JqZWN0IHJlbGF0aXZlIHRvIGl0cyBsaWdodCBzb3VyY2UpLCBvbmUgZm9yIHBlbnVtYnJhICh0aGVcbi8vIHNwYWNlIHBhcnRpYWxseSBvYnNjdXJlZCBieSBhbiBvYmplY3QpLCBhbmQgb25lIGZvciBhbWJpZW50ICh0aGUgc3BhY2Ugd2hpY2ggY29udGFpbnMgdGhlIG9iamVjdFxuLy8gaXRzZWxmKS4gRm9yIGEgZnVydGhlciBleHBsYW5hdGlvbiBvZiB0aGVzZSB0ZXJtcyBhbmQgdGhlaXIgbWVhbmluZ3MsIHNlZVxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVW1icmEsX3BlbnVtYnJhX2FuZF9hbnR1bWJyYS5cblxuLy8gTWFwcyBmb3IgdGhlIGRpZmZlcmVudCBzaGFkb3cgc2V0cyBhbmQgdGhlaXIgdmFsdWVzIHdpdGhpbiBlYWNoIHotc3BhY2UuIFRoZXNlIHZhbHVlcyB3ZXJlXG4vLyBjcmVhdGVkIGJ5IHRha2luZyBhIGZldyByZWZlcmVuY2Ugc2hhZG93IHNldHMgY3JlYXRlZCBieSBHb29nbGUncyBEZXNpZ25lcnMgYW5kIGludGVycG9sYXRpbmdcbi8vIGFsbCBvZiB0aGUgdmFsdWVzIGJldHdlZW4gdGhlbS5cblxuQGZ1bmN0aW9uIF9nZXQtdW1icmEtbWFwKCRjb2xvciwgJG9wYWNpdHkpIHtcbiAgJHNoYWRvdy1jb2xvcjogaWYobWV0YS50eXBlLW9mKCRjb2xvcikgPT0gY29sb3IsIHJnYmEoJGNvbG9yLCAkb3BhY2l0eSAqIDAuMiksICRjb2xvcik7XG5cbiAgQHJldHVybiAoXG4gICAgMDogJzBweCAwcHggMHB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxOiAnMHB4IDJweCAxcHggLTFweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyOiAnMHB4IDNweCAxcHggLTJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAzOiAnMHB4IDNweCAzcHggLTJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA0OiAnMHB4IDJweCA0cHggLTFweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA1OiAnMHB4IDNweCA1cHggLTFweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA2OiAnMHB4IDNweCA1cHggLTFweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA3OiAnMHB4IDRweCA1cHggLTJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA4OiAnMHB4IDVweCA1cHggLTNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA5OiAnMHB4IDVweCA2cHggLTNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMDogJzBweCA2cHggNnB4IC0zcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTE6ICcwcHggNnB4IDdweCAtNHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEyOiAnMHB4IDdweCA4cHggLTRweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMzogJzBweCA3cHggOHB4IC00cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTQ6ICcwcHggN3B4IDlweCAtNHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE1OiAnMHB4IDhweCA5cHggLTVweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNjogJzBweCA4cHggMTBweCAtNXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE3OiAnMHB4IDhweCAxMXB4IC01cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTg6ICcwcHggOXB4IDExcHggLTVweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxOTogJzBweCA5cHggMTJweCAtNnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIwOiAnMHB4IDEwcHggMTNweCAtNnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIxOiAnMHB4IDEwcHggMTNweCAtNnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIyOiAnMHB4IDEwcHggMTRweCAtNnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIzOiAnMHB4IDExcHggMTRweCAtN3B4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDI0OiAnMHB4IDExcHggMTVweCAtN3B4ICN7JHNoYWRvdy1jb2xvcn0nXG4gICk7XG59XG5cbkBmdW5jdGlvbiBfZ2V0LXBlbnVtYnJhLW1hcCgkY29sb3IsICRvcGFjaXR5KSB7XG4gICRzaGFkb3ctY29sb3I6IGlmKG1ldGEudHlwZS1vZigkY29sb3IpID09IGNvbG9yLCByZ2JhKCRjb2xvciwgJG9wYWNpdHkgKiAwLjE0KSwgJGNvbG9yKTtcblxuICBAcmV0dXJuIChcbiAgICAwOiAnMHB4IDBweCAwcHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE6ICcwcHggMXB4IDFweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjogJzBweCAycHggMnB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAzOiAnMHB4IDNweCA0cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDQ6ICcwcHggNHB4IDVweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNTogJzBweCA1cHggOHB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA2OiAnMHB4IDZweCAxMHB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA3OiAnMHB4IDdweCAxMHB4IDFweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA4OiAnMHB4IDhweCAxMHB4IDFweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA5OiAnMHB4IDlweCAxMnB4IDFweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMDogJzBweCAxMHB4IDE0cHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDExOiAnMHB4IDExcHggMTVweCAxcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTI6ICcwcHggMTJweCAxN3B4IDJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMzogJzBweCAxM3B4IDE5cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE0OiAnMHB4IDE0cHggMjFweCAycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTU6ICcwcHggMTVweCAyMnB4IDJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNjogJzBweCAxNnB4IDI0cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE3OiAnMHB4IDE3cHggMjZweCAycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTg6ICcwcHggMThweCAyOHB4IDJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxOTogJzBweCAxOXB4IDI5cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIwOiAnMHB4IDIwcHggMzFweCAzcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjE6ICcwcHggMjFweCAzM3B4IDNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMjogJzBweCAyMnB4IDM1cHggM3B4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIzOiAnMHB4IDIzcHggMzZweCAzcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjQ6ICcwcHggMjRweCAzOHB4IDNweCAjeyRzaGFkb3ctY29sb3J9J1xuICApO1xufVxuXG5AZnVuY3Rpb24gX2dldC1hbWJpZW50LW1hcCgkY29sb3IsICRvcGFjaXR5KSB7XG4gICRzaGFkb3ctY29sb3I6IGlmKG1ldGEudHlwZS1vZigkY29sb3IpID09IGNvbG9yLCByZ2JhKCRjb2xvciwgJG9wYWNpdHkgKiAwLjEyKSwgJGNvbG9yKTtcblxuICBAcmV0dXJuIChcbiAgICAwOiAnMHB4IDBweCAwcHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE6ICcwcHggMXB4IDNweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjogJzBweCAxcHggNXB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAzOiAnMHB4IDFweCA4cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDQ6ICcwcHggMXB4IDEwcHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDU6ICcwcHggMXB4IDE0cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDY6ICcwcHggMXB4IDE4cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDc6ICcwcHggMnB4IDE2cHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDg6ICcwcHggM3B4IDE0cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDk6ICcwcHggM3B4IDE2cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEwOiAnMHB4IDRweCAxOHB4IDNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMTogJzBweCA0cHggMjBweCAzcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTI6ICcwcHggNXB4IDIycHggNHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEzOiAnMHB4IDVweCAyNHB4IDRweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNDogJzBweCA1cHggMjZweCA0cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTU6ICcwcHggNnB4IDI4cHggNXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE2OiAnMHB4IDZweCAzMHB4IDVweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNzogJzBweCA2cHggMzJweCA1cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTg6ICcwcHggN3B4IDM0cHggNnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE5OiAnMHB4IDdweCAzNnB4IDZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMDogJzBweCA4cHggMzhweCA3cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjE6ICcwcHggOHB4IDQwcHggN3B4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIyOiAnMHB4IDhweCA0MnB4IDdweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMzogJzBweCA5cHggNDRweCA4cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjQ6ICcwcHggOXB4IDQ2cHggOHB4ICN7JHNoYWRvdy1jb2xvcn0nXG4gICk7XG59XG5cbi8vIFRoZSBkZWZhdWx0IGR1cmF0aW9uIHZhbHVlIGZvciBlbGV2YXRpb24gdHJhbnNpdGlvbnMuXG4kdHJhbnNpdGlvbi1kdXJhdGlvbjogMjgwbXMgIWRlZmF1bHQ7XG5cbi8vIFRoZSBkZWZhdWx0IGVhc2luZyB2YWx1ZSBmb3IgZWxldmF0aW9uIHRyYW5zaXRpb25zLlxuJHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiB2YXJpYWJsZXMuJGZhc3Qtb3V0LXNsb3ctaW4tdGltaW5nLWZ1bmN0aW9uO1xuXG4vLyBUaGUgZGVmYXVsdCBjb2xvciBmb3IgZWxldmF0aW9uIHNoYWRvd3MuXG4kY29sb3I6IGJsYWNrICFkZWZhdWx0O1xuXG4vLyBUaGUgZGVmYXVsdCBvcGFjaXR5IHNjYWxpbmcgdmFsdWUgZm9yIGVsZXZhdGlvbiBzaGFkb3dzLlxuJG9wYWNpdHk6IDEgIWRlZmF1bHQ7XG5cbi8vIFByZWZpeCBmb3IgZWxldmF0aW9uLXJlbGF0ZWQgc2VsZWN0b3JzLlxuJHByZWZpeDogJ21hdC1lbGV2YXRpb24teic7XG5cbi8vIEFwcGxpZXMgdGhlIGNvcnJlY3QgY3NzIHJ1bGVzIHRvIGFuIGVsZW1lbnQgdG8gZ2l2ZSBpdCB0aGUgZWxldmF0aW9uIHNwZWNpZmllZCBieSAkelZhbHVlLlxuLy8gVGhlICR6VmFsdWUgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDI0LlxuQG1peGluIGVsZXZhdGlvbigkelZhbHVlLCAkY29sb3I6ICRjb2xvciwgJG9wYWNpdHk6ICRvcGFjaXR5KSB7XG4gIEBpZiBtZXRhLnR5cGUtb2YoJHpWYWx1ZSkgIT0gbnVtYmVyIG9yIG5vdCBtYXRoLmlzLXVuaXRsZXNzKCR6VmFsdWUpIHtcbiAgICBAZXJyb3IgJyR6VmFsdWUgbXVzdCBiZSBhIHVuaXRsZXNzIG51bWJlcic7XG4gIH1cbiAgQGlmICR6VmFsdWUgPCAwIG9yICR6VmFsdWUgPiAyNCB7XG4gICAgQGVycm9yICckelZhbHVlIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAyNCc7XG4gIH1cblxuICBib3gtc2hhZG93OiAje21hcC5nZXQoX2dldC11bWJyYS1tYXAoJGNvbG9yLCAkb3BhY2l0eSksICR6VmFsdWUpfSxcbiAgICAgICAgICAgICAgI3ttYXAuZ2V0KF9nZXQtcGVudW1icmEtbWFwKCRjb2xvciwgJG9wYWNpdHkpLCAkelZhbHVlKX0sXG4gICAgICAgICAgICAgICN7bWFwLmdldChfZ2V0LWFtYmllbnQtbWFwKCRjb2xvciwgJG9wYWNpdHkpLCAkelZhbHVlKX07XG59XG5cbi8vIEFwcGxpZXMgdGhlIGVsZXZhdGlvbiB0byBhbiBlbGVtZW50IGluIGEgbWFubmVyIHRoYXQgYWxsb3dzXG4vLyBjb25zdW1lcnMgdG8gb3ZlcnJpZGUgaXQgdmlhIHRoZSBNYXRlcmlhbCBlbGV2YXRpb24gY2xhc3Nlcy5cbkBtaXhpbiBvdmVycmlkYWJsZS1lbGV2YXRpb24oXG4gICAgJHpWYWx1ZSxcbiAgICAkY29sb3I6ICRjb2xvcixcbiAgICAkb3BhY2l0eTogJG9wYWNpdHkpIHtcbiAgJjpub3QoW2NsYXNzKj0nI3skcHJlZml4fSddKSB7XG4gICAgQGluY2x1ZGUgZWxldmF0aW9uKCR6VmFsdWUsICRjb2xvciwgJG9wYWNpdHkpO1xuICB9XG59XG5cbi8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBjYW4gYmUgdXNlZCBhcyB0aGUgdmFsdWUgZm9yIGEgdHJhbnNpdGlvbiBwcm9wZXJ0eSBmb3IgZWxldmF0aW9uLlxuLy8gQ2FsbGluZyB0aGlzIGZ1bmN0aW9uIGRpcmVjdGx5IGlzIHVzZWZ1bCBpbiBzaXR1YXRpb25zIHdoZXJlIGEgY29tcG9uZW50IG5lZWRzIHRvIHRyYW5zaXRpb25cbi8vIG1vcmUgdGhhbiBvbmUgcHJvcGVydHkuXG4vL1xuLy8gLmZvbyB7XG4vLyAgIHRyYW5zaXRpb246IG1hdC1lbGV2YXRpb24tdHJhbnNpdGlvbi1wcm9wZXJ0eS12YWx1ZSgpLCBvcGFjaXR5IDEwMG1zIGVhc2U7XG4vLyB9XG5AZnVuY3Rpb24gcHJpdmF0ZS10cmFuc2l0aW9uLXByb3BlcnR5LXZhbHVlKFxuICAgICRkdXJhdGlvbjogJHRyYW5zaXRpb24tZHVyYXRpb24sXG4gICAgJGVhc2luZzogJHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uKSB7XG4gIEByZXR1cm4gYm94LXNoYWRvdyAjeyRkdXJhdGlvbn0gI3skZWFzaW5nfTtcbn1cblxuLy8gQXBwbGllcyB0aGUgY29ycmVjdCBjc3MgcnVsZXMgbmVlZGVkIHRvIGhhdmUgYW4gZWxlbWVudCB0cmFuc2l0aW9uIGJldHdlZW4gZWxldmF0aW9ucy5cbi8vIFRoaXMgbWl4aW4gc2hvdWxkIGJlIGFwcGxpZWQgdG8gZWxlbWVudHMgd2hvc2UgZWxldmF0aW9uIHZhbHVlcyB3aWxsIGNoYW5nZSBkZXBlbmRpbmcgb24gdGhlaXJcbi8vIGNvbnRleHQgKGUuZy4gd2hlbiBhY3RpdmUgb3IgZGlzYWJsZWQpLlxuLy9cbi8vIE5PVEUodHJhdmlza2F1Zm1hbik6IEJvdGggdGhpcyBtaXhpbiBhbmQgdGhlIGFib3ZlIGZ1bmN0aW9uIHVzZSBkZWZhdWx0IHBhcmFtZXRlcnMgc28gdGhleSBjYW5cbi8vIGJlIHVzZWQgaW4gdGhlIHNhbWUgd2F5IGJ5IGNsaWVudHMuXG5AbWl4aW4gZWxldmF0aW9uLXRyYW5zaXRpb24oXG4gICAgJGR1cmF0aW9uOiAkdHJhbnNpdGlvbi1kdXJhdGlvbixcbiAgICAkZWFzaW5nOiAkdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24pIHtcbiAgdHJhbnNpdGlvbjogcHJpdmF0ZS10cmFuc2l0aW9uLXByb3BlcnR5LXZhbHVlKCRkdXJhdGlvbiwgJGVhc2luZyk7XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9jb3JlL3N0eWxlL3ByaXZhdGUnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3RoZW1pbmcnO1xuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcblxuICAubWF0LWF1dG9jb21wbGV0ZS1wYW5lbCB7XG4gICAgQGluY2x1ZGUgcHJpdmF0ZS5wcml2YXRlLXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbig0LCAkY29uZmlnKTtcbiAgICBiYWNrZ3JvdW5kOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIGNhcmQpO1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuXG4gICAgLy8gU2VsZWN0ZWQgb3B0aW9ucyBpbiBhdXRvY29tcGxldGVzIHNob3VsZCBub3QgYmUgZ3JheSwgYnV0IHdlXG4gICAgLy8gb25seSB3YW50IHRvIG92ZXJyaWRlIHRoZSBiYWNrZ3JvdW5kIGZvciBzZWxlY3RlZCBvcHRpb25zIGlmXG4gICAgLy8gdGhleSBhcmUgKm5vdCogaW4gaG92ZXIgb3IgZm9jdXMgc3RhdGUuIFRoaXMgY2hhbmdlIGhhcyB0byBiZVxuICAgIC8vIG1hZGUgaGVyZSBiZWNhdXNlIGJhc2Ugb3B0aW9uIHN0eWxlcyBhcmUgc2hhcmVkIGJldHdlZW4gdGhlXG4gICAgLy8gYXV0b2NvbXBsZXRlIGFuZCB0aGUgc2VsZWN0LlxuICAgIC5tYXQtb3B0aW9uLm1hdC1zZWxlY3RlZDpub3QoLm1hdC1hY3RpdmUpOm5vdCg6aG92ZXIpIHtcbiAgICAgIGJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgY2FyZCk7XG5cbiAgICAgICY6bm90KC5tYXQtb3B0aW9uLWRpc2FibGVkKSB7XG4gICAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LWF1dG9jb21wbGV0ZScpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5cbkBtaXhpbiBjb2xvcigkY29uZmlnLW9yLXRoZW1lKSB7XG4gICRjb25maWc6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkY29uZmlnLW9yLXRoZW1lKTtcbiAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1kaXZpZGVyIHtcbiAgICBib3JkZXItdG9wLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1kaXZpZGVyLXZlcnRpY2FsIHtcbiAgICBib3JkZXItcmlnaHQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIF9kZW5zaXR5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1kaXZpZGVyJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cbiIsIkBtaXhpbiBwcml2YXRlLWV4cGFuc2lvbi1mb2N1cyB7XG4gIC5tYXQtZXhwYW5zaW9uLXBhbmVsIHtcbiAgICAmIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5jZGsta2V5Ym9hcmQtZm9jdXNlZCxcbiAgICAmIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci5jZGstcHJvZ3JhbS1mb2N1c2VkLFxuICAgICY6bm90KC5tYXQtZXhwYW5kZWQpIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcjpob3ZlciB7XG4gICAgICAmOm5vdChbYXJpYS1kaXNhYmxlZD0ndHJ1ZSddKSB7XG4gICAgICAgIEBjb250ZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnLi4vdGhlbWluZy90aGVtaW5nJztcblxuLy8gUmVuZGVycyBhIGdyYWRpZW50IGZvciBzaG93aW5nIHRoZSBkYXNoZWQgbGluZSB3aGVuIHRoZSBpbnB1dCBpcyBkaXNhYmxlZC5cbi8vIFVubGlrZSB1c2luZyBhIGJvcmRlciwgYSBncmFkaWVudCBhbGxvd3MgdXMgdG8gYWRqdXN0IHRoZSBzcGFjaW5nIG9mIHRoZSBkb3R0ZWQgbGluZVxuLy8gdG8gbWF0Y2ggdGhlIE1hdGVyaWFsIERlc2lnbiBzcGVjLlxuQG1peGluIHByaXZhdGUtY29udHJvbC1kaXNhYmxlZC11bmRlcmxpbmUoJGNvbG9yKSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgJGNvbG9yIDAlLCAkY29sb3IgMzMlLCB0cmFuc3BhcmVudCAwJSk7XG4gIGJhY2tncm91bmQtc2l6ZTogNHB4IDEwMCU7XG4gIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcbn1cblxuLy8gRmlndXJlcyBvdXQgdGhlIGNvbG9yIG9mIHRoZSBwbGFjZWhvbGRlciBmb3IgYSBmb3JtIGNvbnRyb2wuXG4vLyBVc2VkIHByaW1hcmlseSB0byBwcmV2ZW50IHRoZSB2YXJpb3VzIGZvcm0gY29udHJvbHMgZnJvbVxuLy8gYmVjb21pbmcgb3V0IG9mIHN5bmMgc2luY2UgdGhlc2UgY29sb3JzIGFyZW4ndCBpbiBhIHBhbGV0dGUuXG5AZnVuY3Rpb24gcHJpdmF0ZS1jb250cm9sLXBsYWNlaG9sZGVyLWNvbG9yKCRjb25maWcpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAuZ2V0KCRjb25maWcsIGlzLWRhcmspO1xuICBAcmV0dXJuIHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQsXG4gICAgaWYoJGlzLWRhcmstdGhlbWUsIDAuNSwgMC40MikpO1xufVxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3RoZW1pbmcnO1xuQHVzZSAnLi4vY29yZS9zdHlsZS9mb3JtLWNvbW1vbic7XG5cblxuLy8gVGhlbWUgc3R5bGVzIHRoYXQgb25seSBhcHBseSB0byB0aGUgc3RhbmRhcmQgYXBwZWFyYW5jZSBvZiB0aGUgZm9ybS1maWVsZC5cblxuQG1peGluIHN0YW5kYXJkLWNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkZm9yZWdyb3VuZDogbWFwLmdldCgkY29uZmlnLCBmb3JlZ3JvdW5kKTtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC5nZXQoJGNvbmZpZywgaXMtZGFyayk7XG4gICR1bmRlcmxpbmUtY29sb3I6XG4gICAgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC43LCAwLjQyKSk7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utc3RhbmRhcmQge1xuICAgIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvcjtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWRpc2FibGVkIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgQGluY2x1ZGUgZm9ybS1jb21tb24ucHJpdmF0ZS1jb250cm9sLWRpc2FibGVkLXVuZGVybGluZSgkdW5kZXJsaW5lLWNvbG9yKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHN0YW5kYXJkLXR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHByaXZhdGUtZm9ybS1maWVsZC1zdGFuZGFyZC1kZW5zaXR5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiBzdGFuZGFyZC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1mb3JtLWZpZWxkLXN0YW5kYXJkJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgc3RhbmRhcmQtY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgcHJpdmF0ZS1mb3JtLWZpZWxkLXN0YW5kYXJkLWRlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBzdGFuZGFyZC10eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6bWFwJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtaWNvbiB7XG4gICAgJi5tYXQtcHJpbWFyeSB7XG4gICAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRwcmltYXJ5LCB0ZXh0KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYWNjZW50LCB0ZXh0KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHdhcm4sIHRleHQpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LWljb24nKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBfZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuXG4iLCIvLyBzdHlsZWxpbnQtZGlzYWJsZSBtYXRlcmlhbC9uby1wcmVmaXhlc1xuQG1peGluIHVzZXItc2VsZWN0KCR2YWx1ZSkge1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiAkdmFsdWU7XG4gIHVzZXItc2VsZWN0OiAkdmFsdWU7XG59XG5cbkBtaXhpbiBpbnB1dC1wbGFjZWhvbGRlciB7XG4gICY6OnBsYWNlaG9sZGVyIHtcbiAgICBAY29udGVudDtcbiAgfVxuXG4gICY6Oi1tb3otcGxhY2Vob2xkZXIge1xuICAgIEBjb250ZW50O1xuICB9XG5cbiAgJjo6LXdlYmtpdC1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cblxuICAvLyBOb3RlOiB0aGlzIGlzbid0IG5lY2Vzc2FyeSBhbnltb3JlIHNpbmNlIHdlIGRvbid0IHN1cHBvcnRcbiAgLy8gSUUsIGJ1dCBpdCBjYXVzZWQgc29tZSBwcmVzdWJtaXQgZmFpbHVyZXMgaW4gIzIzNDE2LlxuICAmOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cbn1cblxuQG1peGluIGJhY2tmYWNlLXZpc2liaWxpdHkoJHZhbHVlKSB7XG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogJHZhbHVlO1xuICBiYWNrZmFjZS12aXNpYmlsaXR5OiAkdmFsdWU7XG59XG5cbkBtaXhpbiBwcml2YXRlLWNvbG9yLWFkanVzdCgkdmFsdWUpIHtcbiAgLXdlYmtpdC1wcmludC1jb2xvci1hZGp1c3Q6ICR2YWx1ZTtcbiAgY29sb3ItYWRqdXN0OiAkdmFsdWU7XG59XG5cbkBtaXhpbiBwcml2YXRlLWJhY2tncm91bmQtY2xpcCgkdmFsdWUpIHtcbiAgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6ICR2YWx1ZTtcbiAgYmFja2dyb3VuZC1jbGlwOiAkdmFsdWU7XG59XG4vLyBzdHlsZWxpbnQtZW5hYmxlXG4iLCJAdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOm1ldGEnO1xuQHVzZSAnc2Fzczpjb2xvcic7XG5AdXNlICcuLi9jb3JlL3RoZW1pbmcvdGhlbWluZyc7XG5cbi8vIEFwcHJveGltYXRlcyB0aGUgY29ycmVjdCBidWZmZXIgY29sb3IgYnkgdXNpbmcgYSBtaXggYmV0d2VlbiB0aGUgdGhlbWUgY29sb3Jcbi8vIGFuZCB0aGUgdGhlbWUncyBiYWNrZ3JvdW5kIGNvbG9yLlxuQGZ1bmN0aW9uIF9nZXQtYnVmZmVyLWNvbG9yKCR0aGVtZSwgJGJhY2tncm91bmQpIHtcbiAgJHRoZW1lLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHRoZW1lKTtcbiAgLy8gUmV0dXJuIGZhbGxiYWNrIGNvbG9yIGlmIHRoZSB0aGVtZSB1c2VzIHZhcmlhYmxlcyB0byBkZWZpbmUgY29sb3JzLlxuICBAaWYgKG1ldGEudHlwZS1vZigkdGhlbWUtY29sb3IpICE9ICdjb2xvcicgb3IgbWV0YS50eXBlLW9mKCRiYWNrZ3JvdW5kKSAhPSAnY29sb3InKSB7XG4gICAgQHJldHVybiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHRoZW1lLCBsaWdodGVyKTtcbiAgfVxuICBAcmV0dXJuIGNvbG9yLm1peCgkdGhlbWUtY29sb3IsICRiYWNrZ3JvdW5kLCAkd2VpZ2h0OiAyNSUpO1xufVxuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRwcmltYXJ5OiBtYXAuZ2V0KCRjb25maWcsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAuZ2V0KCRjb25maWcsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAuZ2V0KCRjb25maWcsIHdhcm4pO1xuICAkYmFja2dyb3VuZDogbWFwLmdldChtYXAuZ2V0KCRjb25maWcsIGJhY2tncm91bmQpLCBiYWNrZ3JvdW5kKTtcblxuICAubWF0LXByb2dyZXNzLWJhci1iYWNrZ3JvdW5kIHtcbiAgICBmaWxsOiBfZ2V0LWJ1ZmZlci1jb2xvcigkcHJpbWFyeSwgJGJhY2tncm91bmQpO1xuICB9XG5cbiAgLm1hdC1wcm9ncmVzcy1iYXItYnVmZmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBfZ2V0LWJ1ZmZlci1jb2xvcigkcHJpbWFyeSwgJGJhY2tncm91bmQpO1xuICB9XG5cbiAgLm1hdC1wcm9ncmVzcy1iYXItZmlsbDo6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkcHJpbWFyeSk7XG4gIH1cblxuICAubWF0LXByb2dyZXNzLWJhci5tYXQtYWNjZW50IHtcbiAgICAubWF0LXByb2dyZXNzLWJhci1iYWNrZ3JvdW5kIHtcbiAgICAgIGZpbGw6IF9nZXQtYnVmZmVyLWNvbG9yKCRhY2NlbnQsICRiYWNrZ3JvdW5kKTtcbiAgICB9XG5cbiAgICAubWF0LXByb2dyZXNzLWJhci1idWZmZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogX2dldC1idWZmZXItY29sb3IoJGFjY2VudCwgJGJhY2tncm91bmQpO1xuICAgIH1cblxuICAgIC5tYXQtcHJvZ3Jlc3MtYmFyLWZpbGw6OmFmdGVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYWNjZW50KTtcbiAgICB9XG4gIH1cblxuICAubWF0LXByb2dyZXNzLWJhci5tYXQtd2FybiB7XG4gICAgLm1hdC1wcm9ncmVzcy1iYXItYmFja2dyb3VuZCB7XG4gICAgICBmaWxsOiBfZ2V0LWJ1ZmZlci1jb2xvcigkd2FybiwgJGJhY2tncm91bmQpO1xuICAgIH1cblxuICAgIC5tYXQtcHJvZ3Jlc3MtYmFyLWJ1ZmZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBfZ2V0LWJ1ZmZlci1jb2xvcigkd2FybiwgJGJhY2tncm91bmQpO1xuICAgIH1cblxuICAgIC5tYXQtcHJvZ3Jlc3MtYmFyLWZpbGw6OmFmdGVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkd2Fybik7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiB0eXBvZ3JhcGh5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiBfZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtcHJvZ3Jlc3MtYmFyJykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cblxuIiwiQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnLi4vY29yZS90aGVtaW5nL3RoZW1pbmcnO1xuXG5AbWl4aW4gY29sb3IoJGNvbmZpZy1vci10aGVtZSkge1xuICAkY29uZmlnOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJGNvbmZpZy1vci10aGVtZSk7XG4gICRwcmltYXJ5OiBtYXAuZ2V0KCRjb25maWcsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAuZ2V0KCRjb25maWcsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAuZ2V0KCRjb25maWcsIHdhcm4pO1xuXG4gIC5tYXQtcHJvZ3Jlc3Mtc3Bpbm5lciwgLm1hdC1zcGlubmVyIHtcbiAgICBjaXJjbGUge1xuICAgICAgc3Ryb2tlOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHByaW1hcnkpO1xuICAgIH1cblxuICAgICYubWF0LWFjY2VudCBjaXJjbGUge1xuICAgICAgc3Ryb2tlOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGFjY2VudCk7XG4gICAgfVxuXG4gICAgJi5tYXQtd2FybiBjaXJjbGUge1xuICAgICAgc3Ryb2tlOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJHdhcm4pO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gdHlwb2dyYXBoeSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gX2RlbnNpdHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIHRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpIHtcbiAgJHRoZW1lOiB0aGVtaW5nLnByaXZhdGUtbGVnYWN5LWdldC10aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKTtcbiAgQGluY2x1ZGUgdGhlbWluZy5wcml2YXRlLWNoZWNrLWR1cGxpY2F0ZS10aGVtZS1zdHlsZXMoJHRoZW1lLCAnbWF0LXByb2dyZXNzLXNwaW5uZXInKSB7XG4gICAgJGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1jb25maWcoJHRoZW1lKTtcbiAgICAkZGVuc2l0eTogdGhlbWluZy5nZXQtZGVuc2l0eS1jb25maWcoJHRoZW1lKTtcbiAgICAkdHlwb2dyYXBoeTogdGhlbWluZy5nZXQtdHlwb2dyYXBoeS1jb25maWcoJHRoZW1lKTtcblxuICAgIEBpZiAkY29sb3IgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBjb2xvcigkY29sb3IpO1xuICAgIH1cbiAgICBAaWYgJGRlbnNpdHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSBfZGVuc2l0eSgkZGVuc2l0eSk7XG4gICAgfVxuICAgIEBpZiAkdHlwb2dyYXBoeSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIHR5cG9ncmFwaHkoJHR5cG9ncmFwaHkpO1xuICAgIH1cbiAgfVxufVxuIiwiQHVzZSAnc2Fzczpjb2xvcic7XG5AdXNlICdzYXNzOm1hcCc7XG5AdXNlICdzYXNzOm1ldGEnO1xuQHVzZSAnLi4vY29yZS9zdHlsZS9wcml2YXRlJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkcHJpbWFyeTogbWFwLmdldCgkY29uZmlnLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLmdldCgkY29uZmlnLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLmdldCgkY29uZmlnLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAuZ2V0KCRjb25maWcsIGZvcmVncm91bmQpO1xuXG4gICRkcmF3ZXItYmFja2dyb3VuZC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCBkaWFsb2cpO1xuICAkZHJhd2VyLWNvbnRhaW5lci1iYWNrZ3JvdW5kLWNvbG9yOiAgdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRiYWNrZ3JvdW5kLCBiYWNrZ3JvdW5kKTtcbiAgJGRyYXdlci1wdXNoLWJhY2tncm91bmQtY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgZGlhbG9nKTtcbiAgJGRyYXdlci1zaWRlLWJvcmRlcjogc29saWQgMXB4IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG5cbiAgLm1hdC1kcmF3ZXItY29udGFpbmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZHJhd2VyLWNvbnRhaW5lci1iYWNrZ3JvdW5kLWNvbG9yO1xuICAgIGNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC1kcmF3ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkcmF3ZXItYmFja2dyb3VuZC1jb2xvcjtcbiAgICBjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgICYubWF0LWRyYXdlci1wdXNoIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRkcmF3ZXItcHVzaC1iYWNrZ3JvdW5kLWNvbG9yO1xuICAgIH1cblxuICAgICY6bm90KC5tYXQtZHJhd2VyLXNpZGUpIHtcbiAgICAgIC8vIFRoZSBlbGV2YXRpb24gb2Ygei0xNiBpcyBub3RlZCBpbiB0aGUgZGVzaWduIHNwZWNpZmljYXRpb25zLlxuICAgICAgLy8gU2VlIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL2NvbXBvbmVudHMvbmF2aWdhdGlvbi1kcmF3ZXIuaHRtbFxuICAgICAgQGluY2x1ZGUgcHJpdmF0ZS5wcml2YXRlLXRoZW1lLWVsZXZhdGlvbigxNiwgJGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1kcmF3ZXItc2lkZSB7XG4gICAgYm9yZGVyLXJpZ2h0OiAkZHJhd2VyLXNpZGUtYm9yZGVyO1xuXG4gICAgJi5tYXQtZHJhd2VyLWVuZCB7XG4gICAgICBib3JkZXItbGVmdDogJGRyYXdlci1zaWRlLWJvcmRlcjtcbiAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICB9XG4gIH1cblxuICBbZGlyPSdydGwnXSAubWF0LWRyYXdlci1zaWRlIHtcbiAgICBib3JkZXItbGVmdDogJGRyYXdlci1zaWRlLWJvcmRlcjtcbiAgICBib3JkZXItcmlnaHQ6IG5vbmU7XG5cbiAgICAmLm1hdC1kcmF3ZXItZW5kIHtcbiAgICAgIGJvcmRlci1sZWZ0OiBub25lO1xuICAgICAgYm9yZGVyLXJpZ2h0OiAkZHJhd2VyLXNpZGUtYm9yZGVyO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtZHJhd2VyLWJhY2tkcm9wLm1hdC1kcmF3ZXItc2hvd24ge1xuICAgICRvcGFjaXR5OiAwLjY7XG4gICAgJGJhY2tkcm9wLWNvbG9yOiB0aGVtaW5nLmdldC1jb2xvci1mcm9tLXBhbGV0dGUoJGJhY2tncm91bmQsIGNhcmQsICRvcGFjaXR5KTtcblxuICAgIEBpZiAobWV0YS50eXBlLW9mKCRiYWNrZHJvcC1jb2xvcikgPT0gY29sb3IpIHtcbiAgICAgIC8vIFdlIHVzZSBpbnZlcnQoKSBoZXJlIHRvIGhhdmUgdGhlIGRhcmtlbiB0aGUgYmFja2dyb3VuZCBjb2xvciBleHBlY3RlZCB0byBiZSB1c2VkLiBJZiB0aGVcbiAgICAgIC8vIGJhY2tncm91bmQgaXMgbGlnaHQsIHdlIHVzZSBhIGRhcmsgYmFja2Ryb3AuIElmIHRoZSBiYWNrZ3JvdW5kIGlzIGRhcmssXG4gICAgICAvLyB3ZSB1c2UgYSBsaWdodCBiYWNrZHJvcC5cbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGNvbG9yLmludmVydCgkYmFja2Ryb3AtY29sb3IpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICAvLyBJZiB3ZSBjb3VsZG4ndCByZXNvbHZlIHRoZSBiYWNrZHJvcCBjb2xvciB0byBhIGNvbG9yIHZhbHVlLCBmYWxsIGJhY2sgdG8gdXNpbmdcbiAgICAgIC8vIGBvcGFjaXR5YCB0byBtYWtlIGl0IG9wYXF1ZSBzaW5jZSBpdHMgZW5kIHZhbHVlIGNvdWxkIGJlIGEgc29saWQgY29sb3IuXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2Ryb3AtY29sb3I7XG4gICAgICBvcGFjaXR5OiAkb3BhY2l0eTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIHR5cG9ncmFwaHkoJGNvbmZpZy1vci10aGVtZSkge31cblxuQG1peGluIF9kZW5zaXR5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiB0aGVtZSgkdGhlbWUtb3ItY29sb3ItY29uZmlnKSB7XG4gICR0aGVtZTogdGhlbWluZy5wcml2YXRlLWxlZ2FjeS1nZXQtdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZyk7XG4gIEBpbmNsdWRlIHRoZW1pbmcucHJpdmF0ZS1jaGVjay1kdXBsaWNhdGUtdGhlbWUtc3R5bGVzKCR0aGVtZSwgJ21hdC1zaWRlbmF2Jykge1xuICAgICRjb2xvcjogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCR0aGVtZSk7XG4gICAgJGRlbnNpdHk6IHRoZW1pbmcuZ2V0LWRlbnNpdHktY29uZmlnKCR0aGVtZSk7XG4gICAgJHR5cG9ncmFwaHk6IHRoZW1pbmcuZ2V0LXR5cG9ncmFwaHktY29uZmlnKCR0aGVtZSk7XG5cbiAgICBAaWYgJGNvbG9yICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgY29sb3IoJGNvbG9yKTtcbiAgICB9XG4gICAgQGlmICRkZW5zaXR5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgX2RlbnNpdHkoJGRlbnNpdHkpO1xuICAgIH1cbiAgICBAaWYgJHR5cG9ncmFwaHkgIT0gbnVsbCB7XG4gICAgICBAaW5jbHVkZSB0eXBvZ3JhcGh5KCR0eXBvZ3JhcGh5KTtcbiAgICB9XG4gIH1cbn1cbiIsIkB1c2UgJ3Nhc3M6Y29sb3InO1xuQHVzZSAnc2FzczptYXAnO1xuQHVzZSAnc2FzczptZXRhJztcbkB1c2UgJy4uL2NvcmUvdGhlbWluZy90aGVtaW5nJztcblxuQG1peGluIGNvbG9yKCRjb25maWctb3ItdGhlbWUpIHtcbiAgJGNvbmZpZzogdGhlbWluZy5nZXQtY29sb3ItY29uZmlnKCRjb25maWctb3ItdGhlbWUpO1xuICAkYmFja2dyb3VuZDogbWFwLmdldCgkY29uZmlnLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC5nZXQoJGNvbmZpZywgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1zb3J0LWhlYWRlci1hcnJvdyB7XG4gICAgJHRhYmxlLWJhY2tncm91bmQ6IHRoZW1pbmcuZ2V0LWNvbG9yLWZyb20tcGFsZXR0ZSgkYmFja2dyb3VuZCwgJ2NhcmQnKTtcbiAgICAkdGV4dC1jb2xvcjogdGhlbWluZy5nZXQtY29sb3ItZnJvbS1wYWxldHRlKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG5cbiAgICAvLyBCZWNhdXNlIHRoZSBhcnJvdyBpcyBtYWRlIHVwIG9mIG11bHRpcGxlIGVsZW1lbnRzIHRoYXQgYXJlIHN0YWNrZWQgb24gdG9wIG9mIGVhY2ggb3RoZXIsXG4gICAgLy8gd2UgY2FuJ3QgdXNlIHRoZSBzZW1pLXRyYW5zcGFyZW50IGNvbG9yIGZyb20gdGhlIHRoZW1lIGRpcmVjdGx5LiBJZiB0aGUgdmFsdWUgaXMgYSBjb2xvclxuICAgIC8vICp0eXBlKiwgd2UgY29udmVydCBpdCBpbnRvIGEgc29saWQgY29sb3IgYnkgdGFraW5nIHRoZSBvcGFjaXR5IGZyb20gdGhlIHJnYmEgdmFsdWUgYW5kXG4gICAgLy8gdXNpbmcgdGhlIHZhbHVlIHRvIGRldGVybWluZSB0aGUgcGVyY2VudGFnZSBvZiB0aGUgYmFja2dyb3VuZCB0byBwdXQgaW50byBmb3JlZ3JvdW5kXG4gICAgLy8gd2hlbiBtaXhpbmcgdGhlIGNvbG9ycyB0b2dldGhlci4gT3RoZXJ3aXNlLCBpZiBpdCByZXNvbHZlcyB0byBzb21ldGhpbmcgZGlmZmVyZW50XG4gICAgLy8gKGUuZy4gaXQgcmVzb2x2ZXMgdG8gYSBDU1MgdmFyaWFibGUpLCB3ZSB1c2UgdGhlIGNvbG9yIGRpcmVjdGx5LlxuICAgIEBpZiAobWV0YS50eXBlLW9mKCR0YWJsZS1iYWNrZ3JvdW5kKSA9PSBjb2xvciBhbmQgbWV0YS50eXBlLW9mKCR0ZXh0LWNvbG9yKSA9PSBjb2xvcikge1xuICAgICAgJHRleHQtb3BhY2l0eTogb3BhY2l0eSgkdGV4dC1jb2xvcik7XG4gICAgICBjb2xvcjogY29sb3IubWl4KCR0YWJsZS1iYWNrZ3JvdW5kLCByZ2JhKCR0ZXh0LWNvbG9yLCAxKSwgKDEgLSAkdGV4dC1vcGFjaXR5KSAqIDEwMCUpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICBjb2xvcjogJHRleHQtY29sb3I7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiB0eXBvZ3JhcGh5KCRjb25maWctb3ItdGhlbWUpIHt9XG5cbkBtaXhpbiBfZGVuc2l0eSgkY29uZmlnLW9yLXRoZW1lKSB7fVxuXG5AbWl4aW4gdGhlbWUoJHRoZW1lLW9yLWNvbG9yLWNvbmZpZykge1xuICAkdGhlbWU6IHRoZW1pbmcucHJpdmF0ZS1sZWdhY3ktZ2V0LXRoZW1lKCR0aGVtZS1vci1jb2xvci1jb25maWcpO1xuICBAaW5jbHVkZSB0aGVtaW5nLnByaXZhdGUtY2hlY2stZHVwbGljYXRlLXRoZW1lLXN0eWxlcygkdGhlbWUsICdtYXQtc29ydCcpIHtcbiAgICAkY29sb3I6IHRoZW1pbmcuZ2V0LWNvbG9yLWNvbmZpZygkdGhlbWUpO1xuICAgICRkZW5zaXR5OiB0aGVtaW5nLmdldC1kZW5zaXR5LWNvbmZpZygkdGhlbWUpO1xuICAgICR0eXBvZ3JhcGh5OiB0aGVtaW5nLmdldC10eXBvZ3JhcGh5LWNvbmZpZygkdGhlbWUpO1xuXG4gICAgQGlmICRjb2xvciAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIGNvbG9yKCRjb2xvcik7XG4gICAgfVxuICAgIEBpZiAkZGVuc2l0eSAhPSBudWxsIHtcbiAgICAgIEBpbmNsdWRlIF9kZW5zaXR5KCRkZW5zaXR5KTtcbiAgICB9XG4gICAgQGlmICR0eXBvZ3JhcGh5ICE9IG51bGwge1xuICAgICAgQGluY2x1ZGUgdHlwb2dyYXBoeSgkdHlwb2dyYXBoeSk7XG4gICAgfVxuICB9XG59XG4iXX0= */";

/***/ }),

/***/ 9323:
/*!************************************************************************************************************!*\
  !*** ./projects/example-app/src/app/petriflow-info-dialog/petriflow-info-dialog.component.scss?ngResource ***!
  \************************************************************************************************************/
/***/ (function(module) {

module.exports = ".mat-cell {\n  text-align: left !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBldHJpZmxvdy1pbmZvLWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLDJCQUFBO0FBQ0oiLCJmaWxlIjoicGV0cmlmbG93LWluZm8tZGlhbG9nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hdC1jZWxsIHtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XG59XG4iXX0= */";

/***/ }),

/***/ 4015:
/*!********************************************************************!*\
  !*** ./projects/example-app/src/app/app.component.html?ngResource ***!
  \********************************************************************/
/***/ (function(module) {

module.exports = "<mat-toolbar fxLayout=\"row\" class=\"app-container mat-toolbar mat-toolbar-single-row\">\n    <mat-toolbar-row fxFlex>\n        <mat-icon id=\"netgrif-icon\" svgIcon=\"netgrif_logo\"></mat-icon>\n        <mat-button-toggle-group [value]=\"_mode\" fxLayoutAlign=\"start end\">\n            <mat-button-toggle mat-button [value]=\"canvasMode.SELECT\" (click)=\"changeCanvasMode(canvasMode.SELECT)\">\n                <mat-icon>open_with</mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button [value]=\"canvasMode.LASSO\"\n                               (click)=\"changeCanvasMode(canvasMode.LASSO, false)\">\n                <mat-icon>tab_unselected</mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button [value]=\"canvasMode.CREATE_TRANSITION\"\n                               (click)=\"changeCanvasMode(canvasMode.CREATE_TRANSITION)\">\n                <mat-icon svgIcon=\"transition\"></mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button [value]=\"canvasMode.CREATE_PLACE\"\n                               (click)=\"changeCanvasMode(canvasMode.CREATE_PLACE)\">\n                <mat-icon svgIcon=\"place\"></mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button [value]=\"canvasMode.CREATE_REGULAR_ARC\"\n                               (click)=\"changeCanvasMode(canvasMode.CREATE_REGULAR_ARC)\">\n                <mat-icon svgIcon=\"arc\"></mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button [value]=\"canvasMode.CREATE_RESET_ARC\"\n                               (click)=\"changeCanvasMode(canvasMode.CREATE_RESET_ARC)\">\n                <mat-icon svgIcon=\"resetarc\"></mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button [value]=\"canvasMode.CREATE_INHIBITOR_ARC\"\n                               (click)=\"changeCanvasMode(canvasMode.CREATE_INHIBITOR_ARC)\">\n                <mat-icon svgIcon=\"inhibitor\"></mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button [value]=\"canvasMode.CREATE_READ_ARC\"\n                               (click)=\"changeCanvasMode(canvasMode.CREATE_READ_ARC)\">\n                <mat-icon svgIcon=\"read\"></mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button [value]=\"canvasMode.MOVE\" (click)=\"changeCanvasMode(canvasMode.MOVE)\">\n                <mat-icon>all_out</mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button [value]=\"canvasMode.REMOVE\" (click)=\"changeCanvasMode(canvasMode.REMOVE)\">\n                <mat-icon>delete_outline</mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button (click)=\"openDialog()\">\n                <mat-icon>info</mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle mat-button id=\"reset-zoom-button\" (click)=\"resetPanZoom()\">\n                <mat-icon>clear</mat-icon>\n            </mat-button-toggle>\n        </mat-button-toggle-group>\n        <div flex></div>\n        <button mat-raised-button id=\"source-button\" (click)=\"goToLink('https://github.com/netgrif/petriflow-svg')\">\n            <mat-icon svgIcon=\"github\"></mat-icon>\n            Source\n        </button>\n        <button mat-raised-button id=\"petriflow-svg-docs-button\" (click)=\"goToLink('https://netgrif.github.io/petriflow.svg')\">\n            Petriflow.SVG Docs\n        </button>\n        <button mat-raised-button id=\"petri-svg-docs-button\" (click)=\"goToLink('https://netgrif.github.io/petriflow.svg/petri-svg')\">\n            Petri.SVG Docs\n        </button>\n    </mat-toolbar-row>\n</mat-toolbar>\n<div class=\"outer\">\n    <petriflow-svg-canvas class=\"canvas\"></petriflow-svg-canvas>\n</div>\n";

/***/ }),

/***/ 5138:
/*!************************************************************************************************************!*\
  !*** ./projects/example-app/src/app/petriflow-info-dialog/petriflow-info-dialog.component.html?ngResource ***!
  \************************************************************************************************************/
/***/ (function(module) {

module.exports = "<h2 mat-dialog-title>Shortcuts</h2>\n<mat-dialog-content class=\"mat-typography\">\n    <table class=\"mat-table\">\n        <caption>Shortcuts table</caption>\n        <tr class=\"mat-header-row\">\n            <th class=\"mat-header-cell\" scope=\"col\"></th>\n            <th class=\"mat-header-cell\" scope=\"col\"></th>\n        </tr>\n        <tr class=\"mat-row\">\n            <th class=\"mat-cell\" scope=\"col\">Ctrl + A: </th>\n            <th class=\"mat-cell\" scope=\"col\">Select all canvas elements on the canvas</th>\n        </tr>\n        <tr class=\"mat-row\">\n            <th class=\"mat-cell\" scope=\"col\">Ctrl + C: </th>\n            <th class=\"mat-cell\" scope=\"col\">Copy all selected elements on the canvas into the clipboard</th>\n        </tr>\n        <tr class=\"mat-row\">\n            <th class=\"mat-cell\" scope=\"col\">Ctrl + V: </th>\n            <th class=\"mat-cell\" scope=\"col\">Paste all selected elements from the clipboard into the canvas</th>\n        </tr>\n        <tr class=\"mat-row\">\n            <th class=\"mat-cell\" scope=\"col\">Delete: </th>\n            <th class=\"mat-cell\" scope=\"col\">Delete all selected elements from the canvas</th>\n        </tr>\n        <tr class=\"mat-row\">\n            <th class=\"mat-cell\" scope=\"col\">Escape: </th>\n            <th class=\"mat-cell\" scope=\"col\">Remove items from the clipboard, delete drawing lasso</th>\n        </tr>\n    </table>\n</mat-dialog-content>\n<mat-dialog-actions align=\"end\">\n    <button mat-button mat-dialog-close>Cancel</button>\n</mat-dialog-actions>\n";

/***/ }),

/***/ 4743:
/*!***************************************************************!*\
  !*** ./dist/petriflow-svg/fesm2015/netgrif-petriflow.svg.mjs ***!
  \***************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasElementCollection": function() { return /* binding */ CanvasElementCollection; },
/* harmony export */   "CanvasMode": function() { return /* binding */ CanvasMode; },
/* harmony export */   "EMPTY_FUNCTION": function() { return /* binding */ EMPTY_FUNCTION; },
/* harmony export */   "PetriflowArc": function() { return /* binding */ PetriflowArc; },
/* harmony export */   "PetriflowCanvas": function() { return /* binding */ PetriflowCanvas; },
/* harmony export */   "PetriflowCanvasComponent": function() { return /* binding */ PetriflowCanvasComponent; },
/* harmony export */   "PetriflowCanvasConfiguration": function() { return /* binding */ PetriflowCanvasConfiguration; },
/* harmony export */   "PetriflowCanvasConfigurationService": function() { return /* binding */ PetriflowCanvasConfigurationService; },
/* harmony export */   "PetriflowCanvasFactoryService": function() { return /* binding */ PetriflowCanvasFactoryService; },
/* harmony export */   "PetriflowCanvasModule": function() { return /* binding */ PetriflowCanvasModule; },
/* harmony export */   "PetriflowCanvasService": function() { return /* binding */ PetriflowCanvasService; },
/* harmony export */   "PetriflowInhibitorArc": function() { return /* binding */ PetriflowInhibitorArc; },
/* harmony export */   "PetriflowNode": function() { return /* binding */ PetriflowNode; },
/* harmony export */   "PetriflowPlace": function() { return /* binding */ PetriflowPlace; },
/* harmony export */   "PetriflowPlaceTransitionArc": function() { return /* binding */ PetriflowPlaceTransitionArc; },
/* harmony export */   "PetriflowReadArc": function() { return /* binding */ PetriflowReadArc; },
/* harmony export */   "PetriflowResetArc": function() { return /* binding */ PetriflowResetArc; },
/* harmony export */   "PetriflowTransition": function() { return /* binding */ PetriflowTransition; },
/* harmony export */   "PetriflowTransitionPlaceArc": function() { return /* binding */ PetriflowTransitionPlaceArc; },
/* harmony export */   "defaultPlace": function() { return /* binding */ defaultPlace; },
/* harmony export */   "defaultTransition": function() { return /* binding */ defaultTransition; }
/* harmony export */ });
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_construct_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/construct.js */ 2162);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits.js */ 4582);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper.js */ 2496);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js */ 8277);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js */ 8069);
/* harmony import */ var _home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass.js */ 8047);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @netgrif/petri.svg */ 25);
/* harmony import */ var panzoom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! panzoom */ 5689);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ 2528);











var _c0 = ["canvas"];

var CanvasElementCollection = /*#__PURE__*/function () {
  function CanvasElementCollection() {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, CanvasElementCollection);

    this._places = [];
    this._transitions = [];
    this._arcs = [];
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(CanvasElementCollection, [{
    key: "places",
    get: function get() {
      return this._places;
    },
    set: function set(value) {
      this._places = value;
    }
  }, {
    key: "transitions",
    get: function get() {
      return this._transitions;
    },
    set: function set(value) {
      this._transitions = value;
    }
  }, {
    key: "arcs",
    get: function get() {
      return this._arcs;
    },
    set: function set(value) {
      this._arcs = value;
    }
  }, {
    key: "nodes",
    get: function get() {
      return [].concat((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this._places), (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this._transitions));
    }
  }, {
    key: "selected",
    get: function get() {
      return (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this.nodes.filter(function (node) {
        return node.isSelected();
      }));
    }
  }, {
    key: "all",
    get: function get() {
      return [].concat((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this.nodes), (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this.arcs));
    }
  }]);

  return CanvasElementCollection;
}();

function defaultPlace() {
  return new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.Place('0', '0', 0, new DOMPoint());
}

function defaultTransition() {
  return new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.Transition('0', '0', new DOMPoint());
}

var EMPTY_FUNCTION = function EMPTY_FUNCTION() {};

var PetriflowNode = /*#__PURE__*/function () {
  function PetriflowNode(canvasElement) {
    var _this = this;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowNode);

    this._canvasElement = canvasElement;

    canvasElement.element.onmouseenter = function () {
      _this.canvasElement.activate();
    };

    canvasElement.element.onmouseleave = function () {
      if (!_this.isSelected()) {
        _this.canvasElement.deactivate();
      }
    };

    this._onClickEvent = EMPTY_FUNCTION;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowNode, [{
    key: "setOnClick",
    value: function setOnClick(event) {
      var _this2 = this;

      this.onClickEvent = event;

      this.canvasElement.element.onclick = function () {
        event(_this2);
      };
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      return this.canvasElement.isSelected();
    }
  }, {
    key: "deselect",
    value: function deselect() {
      this.canvasElement.setSelected(false);
      this.canvasElement.deactivate();
    }
  }, {
    key: "select",
    value: function select() {
      this.canvasElement.setSelected(true);
      this.canvasElement.activate();
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.canvasElement.position;
    }
  }, {
    key: "activate",
    value: function activate() {
      this.canvasElement.activate();
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.canvasElement.deactivate();
    }
  }, {
    key: "isEnclosedByRectangle",
    value: function isEnclosedByRectangle(rectangle) {
      return this.canvasElement.isEnclosedByRectangle(rectangle);
    }
  }, {
    key: "moveBy",
    value: function moveBy(x, y) {
      this.canvasElement.moveBy(x, y);
    }
  }, {
    key: "setSelected",
    value: function setSelected(value) {
      this.canvasElement.setSelected(value);
    }
  }, {
    key: "canvasElement",
    get: function get() {
      return this._canvasElement;
    },
    set: function set(value) {
      this._canvasElement = value;
    }
  }, {
    key: "onClickEvent",
    get: function get() {
      return this._onClickEvent;
    },
    set: function set(value) {
      this._onClickEvent = value;
    }
  }]);

  return PetriflowNode;
}();

var PetriflowCanvasConfiguration = /*#__PURE__*/(0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(function PetriflowCanvasConfiguration() {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowCanvasConfiguration);
});

PetriflowCanvasConfiguration.PANZOOM_MOVE = 10;
PetriflowCanvasConfiguration.PANZOOM_ZOOM_IN_MULTIPLIER = 1.25;
PetriflowCanvasConfiguration.PANZOOM_ZOOM_OUT_MULTIPLIER = 0.8;
PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER = 0;
PetriflowCanvasConfiguration.PLACE_ID_COUNTER = 0;

var PetriflowPlace = /*#__PURE__*/function (_PetriflowNode) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PetriflowPlace, _PetriflowNode);

  var _super = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PetriflowPlace);

  function PetriflowPlace(place) {
    var _this3;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowPlace);

    _this3 = _super.call(this, place);

    _this3.canvasElement.markingTokens.forEach(function (markingToken) {
      _this3.setPlaceActions(markingToken);
    });

    _this3._onTokenClickEvent = EMPTY_FUNCTION;
    return _this3;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowPlace, [{
    key: "setPlaceActions",
    value: function setPlaceActions(svgElement) {
      var _this4 = this;

      svgElement.onmouseenter = function () {
        _this4.canvasElement.activate();
      };

      svgElement.onmouseleave = function () {
        if (!_this4.isSelected()) {
          _this4.canvasElement.deactivate();
        }
      };
    }
  }, {
    key: "clone",
    value: function clone() {
      var _this5 = this;

      var _a;

      var cloned = new PetriflowPlace((_a = this.canvasElement.clone()) !== null && _a !== void 0 ? _a : defaultPlace());

      cloned.canvasElement.element.onclick = function () {
        return _this5.onClickEvent(cloned);
      };

      cloned.canvasElement.markingTokens.forEach(function (token) {
        token.onclick = function () {
          return _this5._onTokenClickEvent(cloned);
        };
      });
      cloned.setOnClick(function (clone) {
        return _this5.onClickEvent(clone);
      });
      cloned.setOnTokenClickEvent(function (clone) {
        return _this5._onTokenClickEvent(clone);
      });
      cloned.changeId("p".concat(++PetriflowCanvasConfiguration.PLACE_ID_COUNTER));
      return cloned;
    }
  }, {
    key: "setOnTokenClickEvent",
    value: function setOnTokenClickEvent(event) {
      var _this6 = this;

      this._onTokenClickEvent = event;
      this.canvasElement.markingTokens.forEach(function (token) {
        token.onclick = function () {
          event(_this6);
        };
      });
    }
  }, {
    key: "changeId",
    value: function changeId(id) {
      this.canvasElement.id = "svg_place_".concat(id);
      this.canvasElement.label.textContent = id;
    }
  }]);

  return PetriflowPlace;
}(PetriflowNode);

var PetriflowTransition = /*#__PURE__*/function (_PetriflowNode2) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PetriflowTransition, _PetriflowNode2);

  var _super2 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PetriflowTransition);

  function PetriflowTransition(transition, icon) {
    var _this7;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowTransition);

    _this7 = _super2.call(this, transition);
    _this7._cancelArrow = document.createElementNS(_netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.SVG_NAMESPACE, 'polygon');
    _this7._cancelArrow.id = "svg_transition_start_".concat(transition.id);

    _this7._cancelArrow.setAttributeNS(null, 'fill', 'white');

    _this7._cancelArrow.setAttributeNS(null, 'stroke', 'white');

    _this7._cancelArrow.setAttributeNS(null, 'stroke-width', '2');

    _this7.canvasElement.container.appendChild(_this7._cancelArrow);

    _this7._finishArrow = document.createElementNS(_netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.SVG_NAMESPACE, 'polygon');
    _this7._finishArrow.id = "svg_transition_finish_".concat(transition.id);

    _this7._finishArrow.setAttributeNS(null, 'fill', 'white');

    _this7._finishArrow.setAttributeNS(null, 'stroke', 'white');

    _this7._finishArrow.setAttributeNS(null, 'stroke-width', '2');

    _this7.canvasElement.container.appendChild(_this7._finishArrow);

    if (icon) {
      _this7._iconElement = document.createElementNS(_netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.SVG_NAMESPACE, 'text');

      _this7._iconElement.setAttributeNS(null, 'style', "font-family: Material Icons;font-size:".concat(_netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.ICON_SIZE));

      _this7._icon = document.createTextNode(icon);

      _this7._iconElement.appendChild(_this7._icon);

      _this7.canvasElement.container.appendChild(_this7._iconElement);
    }

    _this7.deactivate();

    return _this7;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowTransition, [{
    key: "move",
    value: function move(position) {
      this.canvasElement.move(position);

      this._cancelArrow.setAttributeNS(null, 'points', this.canvasElement.cancelArrowPoints(position));

      this._finishArrow.setAttributeNS(null, 'points', this.canvasElement.finishArrowPoints(position));

      if (this._iconElement) {
        this.setIconElementPosition(position);
      }
    }
  }, {
    key: "activate",
    value: function activate() {
      this.canvasElement.activate(); // this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-active');
      // this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-active');
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      this.canvasElement.deactivate();

      this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-inactive');

      this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-inactive');
    }
  }, {
    key: "setIconElementPosition",
    value: function setIconElementPosition(position) {
      if (this._iconElement) {
        this._iconElement.setAttributeNS(null, 'x', "".concat(position.x - _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.ICON_SIZE / 2));

        this._iconElement.setAttributeNS(null, 'y', "".concat(position.y + _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.ICON_SIZE / 2));
      }
    }
  }, {
    key: "setEnabled",
    value: function setEnabled(firing) {
      this.canvasElement.setEnabled(firing);
      this.setIconFiringClass(firing);
    }
  }, {
    key: "setDisabled",
    value: function setDisabled(firing) {
      this.canvasElement.setDisabled();
      this.setIconFiringClass(firing);
    }
  }, {
    key: "setIconFiringClass",
    value: function setIconFiringClass(firing) {
      var _a, _b;

      if (firing) {
        this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-active');

        this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-active');

        (_a = this._iconElement) === null || _a === void 0 ? void 0 : _a.setAttributeNS(null, 'class', 'svg-icon-inactive');
      } else {
        this._cancelArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-cancel-inactive');

        this._finishArrow.setAttributeNS(null, 'class', 'svg-fire-arrow-finish-inactive');

        (_b = this._iconElement) === null || _b === void 0 ? void 0 : _b.setAttributeNS(null, 'class', 'svg-icon-active');
      }
    }
  }, {
    key: "deselect",
    value: function deselect() {
      this.setSelected(false);
      this.deactivate();
    }
  }, {
    key: "select",
    value: function select() {
      this.setSelected(true);
      this.activate();
    }
  }, {
    key: "finishArrow",
    get: function get() {
      return this._finishArrow;
    },
    set: function set(value) {
      this._finishArrow = value;
    }
  }, {
    key: "cancelArrow",
    get: function get() {
      return this._cancelArrow;
    },
    set: function set(value) {
      this._cancelArrow = value;
    }
  }, {
    key: "iconElement",
    get: function get() {
      return this._iconElement;
    },
    set: function set(value) {
      this._iconElement = value;
    }
  }, {
    key: "icon",
    get: function get() {
      return this._icon;
    },
    set: function set(value) {
      this._icon = value;
    }
  }, {
    key: "clone",
    value: function clone() {
      var _this8 = this;

      var cloned = new PetriflowTransition(this.canvasElement.clone());

      cloned.canvasElement.element.onclick = function () {
        return _this8.onClickEvent(cloned);
      };

      cloned.setOnClick(function (clone) {
        return _this8.onClickEvent(clone);
      });
      cloned.changeId("t".concat(++PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER));
      return cloned;
    }
  }, {
    key: "changeId",
    value: function changeId(id) {
      this.canvasElement.id = "svg_transition_".concat(id);
      this.canvasElement.label.textContent = id;
    }
  }]);

  return PetriflowTransition;
}(PetriflowNode);

var PetriflowArc = /*#__PURE__*/function () {
  function PetriflowArc(element) {
    var _this9 = this;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowArc);

    this._element = element;

    this._element.arcLine.onmouseenter = function () {
      _this9.activate();
    };

    this._element.arcLine.onmouseleave = function () {
      if (!_this9.isSelected()) {
        _this9._element.deactivate();
      }
    };

    this._onClickEvent = EMPTY_FUNCTION;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowArc, [{
    key: "cloneArc",
    value: function cloneArc(start, end) {
      var _this10 = this;

      var _a, _b;

      var newLinePoints = [];
      this.element.linePoints.forEach(function (point) {
        return newLinePoints.push(Object.assign({}, {
          x: point.x,
          y: point.y
        }));
      });
      var cloned = this.createClonedInstanceOfArc(start, end, newLinePoints, (_b = (_a = this._element.multiplicity) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '');

      cloned.element.arcLine.onclick = function () {
        return _this10._onClickEvent(cloned);
      };

      cloned.setOnClick(function (clone) {
        return _this10._onClickEvent(clone);
      });
      return cloned;
    }
  }, {
    key: "activate",
    value: function activate() {
      this._element.activate();
    }
  }, {
    key: "isEnclosedByRectangle",
    value: function isEnclosedByRectangle(rectangle) {
      return this._element.isEnclosedByRectangle(rectangle); // TODO
    }
  }, {
    key: "isSelected",
    value: function isSelected() {
      return this._element.isSelected();
    }
  }, {
    key: "moveBy",
    value: function moveBy(x, y) {
      this._element.moveBy(x, y);
    }
  }, {
    key: "deselect",
    value: function deselect() {
      this.setSelected(false);

      this._element.deactivate();
    }
  }, {
    key: "select",
    value: function select() {
      this.setSelected(true);
      this.activate();
    }
  }, {
    key: "setSelected",
    value: function setSelected(value) {
      this._element.setSelected(value);
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    },
    set: function set(value) {
      this._element = value;
    }
  }, {
    key: "getBreakPointList",
    value: function getBreakPointList() {
      return this.element.linePoints;
    }
  }, {
    key: "setSource",
    value: function setSource(source) {
      this.element.start = source;
    }
  }, {
    key: "setOnClick",
    value: function setOnClick(eventFunction) {
      var _this11 = this;

      this._onClickEvent = eventFunction;

      this.element.arcLine.onclick = function (e) {
        eventFunction(_this11, e);
      };
    }
  }]);

  return PetriflowArc;
}();

var PetriflowPlaceTransitionArc = /*#__PURE__*/function (_PetriflowArc) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PetriflowPlaceTransitionArc, _PetriflowArc);

  var _super3 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PetriflowPlaceTransitionArc);

  function PetriflowPlaceTransitionArc(arc) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowPlaceTransitionArc);

    return _super3.call(this, arc);
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowPlaceTransitionArc, [{
    key: "createClonedInstanceOfArc",
    value: function createClonedInstanceOfArc(start, end, points, multiplicity) {
      return new PetriflowPlaceTransitionArc(new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.RegularPlaceTransitionArc(start, end, points, multiplicity));
    }
  }]);

  return PetriflowPlaceTransitionArc;
}(PetriflowArc);

var PetriflowTransitionPlaceArc = /*#__PURE__*/function (_PetriflowArc2) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PetriflowTransitionPlaceArc, _PetriflowArc2);

  var _super4 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PetriflowTransitionPlaceArc);

  function PetriflowTransitionPlaceArc(arc) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowTransitionPlaceArc);

    return _super4.call(this, arc);
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowTransitionPlaceArc, [{
    key: "createClonedInstanceOfArc",
    value: function createClonedInstanceOfArc(start, end, points, multiplicity) {
      return new PetriflowTransitionPlaceArc(new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.RegularPlaceTransitionArc(start, end, points, multiplicity));
    }
  }]);

  return PetriflowTransitionPlaceArc;
}(PetriflowArc);

var PetriflowResetArc = /*#__PURE__*/function (_PetriflowArc3) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PetriflowResetArc, _PetriflowArc3);

  var _super5 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PetriflowResetArc);

  function PetriflowResetArc(arc) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowResetArc);

    return _super5.call(this, arc);
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowResetArc, [{
    key: "createClonedInstanceOfArc",
    value: function createClonedInstanceOfArc(start, end, points, multiplicity) {
      return new PetriflowResetArc(new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.ResetArc(start, end, points, multiplicity));
    }
  }]);

  return PetriflowResetArc;
}(PetriflowArc);

var PetriflowReadArc = /*#__PURE__*/function (_PetriflowArc4) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PetriflowReadArc, _PetriflowArc4);

  var _super6 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PetriflowReadArc);

  function PetriflowReadArc(arc) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowReadArc);

    return _super6.call(this, arc);
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowReadArc, [{
    key: "createClonedInstanceOfArc",
    value: function createClonedInstanceOfArc(start, end, points, multiplicity) {
      return new PetriflowReadArc(new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.ReadArc(start, end, points, multiplicity));
    }
  }]);

  return PetriflowReadArc;
}(PetriflowArc);

var PetriflowInhibitorArc = /*#__PURE__*/function (_PetriflowArc5) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PetriflowInhibitorArc, _PetriflowArc5);

  var _super7 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PetriflowInhibitorArc);

  function PetriflowInhibitorArc(arc) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowInhibitorArc);

    return _super7.call(this, arc);
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowInhibitorArc, [{
    key: "createClonedInstanceOfArc",
    value: function createClonedInstanceOfArc(start, end, points, multiplicity) {
      return new PetriflowInhibitorArc(new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.InhibitorArc(start, end, points, multiplicity));
    }
  }]);

  return PetriflowInhibitorArc;
}(PetriflowArc);

var PetriflowCanvasService = /*#__PURE__*/function () {
  function PetriflowCanvasService() {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowCanvasService);

    this._petriflowElementsCollection = new CanvasElementCollection();
    this._petriflowClipboardElementsCollection = new CanvasElementCollection();
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowCanvasService, [{
    key: "setSelectedByRectangleEnclosure",
    value: function setSelectedByRectangleEnclosure(rectangle) {
      var _a, _b, _c, _d;

      if (!this._canvas) return;

      var newRect = this._canvas.svg.createSVGRect();

      newRect.x = +((_a = rectangle.getAttribute('x')) !== null && _a !== void 0 ? _a : 0);
      newRect.y = +((_b = rectangle.getAttribute('y')) !== null && _b !== void 0 ? _b : 0);
      newRect.width = +((_c = rectangle.getAttribute('width')) !== null && _c !== void 0 ? _c : 0);
      newRect.height = +((_d = rectangle.getAttribute('height')) !== null && _d !== void 0 ? _d : 0);

      this._petriflowElementsCollection.all.forEach(function (petriflowElement) {
        if (petriflowElement.isEnclosedByRectangle(newRect)) {
          petriflowElement.setSelected(true);
          petriflowElement.activate();
        }
      });
    }
  }, {
    key: "copyElements",
    value: function copyElements(from, to) {
      var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!append) {
        to = new CanvasElementCollection();
        to.places = from.places.filter(function (place) {
          return place.isSelected();
        });
        to.transitions = from.transitions.filter(function (place) {
          return place.isSelected();
        });
        to.arcs = from.arcs.filter(function (place) {
          return place.isSelected();
        });
      } else {
        from.places.forEach(function (place) {
          return to.places.push(place);
        });
        from.transitions.forEach(function (place) {
          return to.transitions.push(place);
        });
        from.arcs.forEach(function (place) {
          return to.arcs.push(place);
        });
      }

      return to;
    }
  }, {
    key: "panzoom",
    get: function get() {
      return this._panzoom;
    },
    set: function set(value) {
      this._panzoom = value;
    }
  }, {
    key: "getPanZoomOffset",
    value: function getPanZoomOffset() {
      var _a;

      return (_a = this === null || this === void 0 ? void 0 : this._panzoom) === null || _a === void 0 ? void 0 : _a.getTransform();
    }
  }, {
    key: "selectAll",
    value: function selectAll() {
      this.petriflowElementsCollection.all.forEach(function (element) {
        element.select();
      });
    }
  }, {
    key: "deselectAll",
    value: function deselectAll() {
      this.petriflowElementsCollection.all.forEach(function (element) {
        element.deselect();
      });
    }
  }, {
    key: "canvas",
    get: function get() {
      return this._canvas;
    },
    set: function set(value) {
      this._canvas = value;
    }
  }, {
    key: "petriflowElementsCollection",
    get: function get() {
      return this._petriflowElementsCollection;
    }
  }, {
    key: "petriflowClipboardElementsCollection",
    get: function get() {
      return this._petriflowClipboardElementsCollection;
    },
    set: function set(value) {
      this._petriflowClipboardElementsCollection = value;
    }
  }]);

  return PetriflowCanvasService;
}();

PetriflowCanvasService.ɵfac = function PetriflowCanvasService_Factory(t) {
  return new (t || PetriflowCanvasService)();
};

PetriflowCanvasService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: PetriflowCanvasService,
  factory: PetriflowCanvasService.ɵfac,
  providedIn: 'root'
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](PetriflowCanvasService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [];
  }, null);
})();

var PetriflowCanvasFactoryService = /*#__PURE__*/function () {
  function PetriflowCanvasFactoryService(_petriflowCanvasService) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowCanvasFactoryService);

    this._petriflowCanvasService = _petriflowCanvasService;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowCanvasFactoryService, [{
    key: "createPlace",
    value: function createPlace(marking, position) {
      var place = new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.Place("p".concat(++PetriflowCanvasConfiguration.PLACE_ID_COUNTER), "p".concat(PetriflowCanvasConfiguration.PLACE_ID_COUNTER), marking, position);
      var petriflowPlace = new PetriflowPlace(place);
      if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

      this._petriflowCanvasService.canvas.add(place);

      this._petriflowCanvasService.petriflowElementsCollection.places.push(petriflowPlace);

      return petriflowPlace;
    }
  }, {
    key: "createStaticPlace",
    value: function createStaticPlace(marking, position) {
      var place = new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.StaticPlace("p".concat(++PetriflowCanvasConfiguration.PLACE_ID_COUNTER), "p".concat(PetriflowCanvasConfiguration.PLACE_ID_COUNTER), marking, position);
      var petriflowPlace = new PetriflowPlace(place);
      if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

      this._petriflowCanvasService.canvas.add(place);

      this._petriflowCanvasService.petriflowElementsCollection.places.push(petriflowPlace);

      return petriflowPlace;
    }
  }, {
    key: "createTransition",
    value: function createTransition(position, icon) {
      var transition = new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.Transition("t".concat(++PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER), "t".concat(PetriflowCanvasConfiguration.TRANSITION_ID_COUNTER), position);
      var petriflowTransition = new PetriflowTransition(transition, icon);
      if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

      this._petriflowCanvasService.canvas.add(transition);

      this._petriflowCanvasService.petriflowElementsCollection.transitions.push(petriflowTransition);

      return petriflowTransition;
    }
  }, {
    key: "addArc",
    value: function addArc(element, type) {
      if (!this._source) return undefined;

      if (this._source.canvasElement instanceof _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.Place) {
        switch (type) {
          case 'arc':
            {
              return this.createArcByGenericType(element, PetriflowPlaceTransitionArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.RegularPlaceTransitionArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.RegularPlaceTransitionArc.ID);
            }

          case 'resetarc':
            {
              return this.createArcByGenericType(element, PetriflowResetArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.ResetArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.ResetArc.ID);
            }

          case 'inhibitor':
            {
              return this.createArcByGenericType(element, PetriflowInhibitorArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.InhibitorArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.InhibitorArc.ID);
            }

          case 'read':
            {
              return this.createArcByGenericType(element, PetriflowReadArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.ReadArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.ReadArc.ID);
            }

          default:
            {
              return undefined;
            }
        }
      } else if (type === 'arc') {
        return this.createArcByGenericType(element, PetriflowTransitionPlaceArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.RegularTransitionPlaceArc, _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.RegularTransitionPlaceArc.ID);
      } else {
        return undefined;
      }
    } // @ts-ignore

  }, {
    key: "createArcByGenericType",
    value: function createArcByGenericType(element, type, typeArc, arrow) {
      var _a, _b;

      if (!this._arcLine) {
        this._source = element;
        return this.createSvgArc(element, arrow);
      } else if (element.constructor !== ((_a = this._source) === null || _a === void 0 ? void 0 : _a.constructor)) {
        if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");
        if (!this.arcLine) return undefined;

        this._petriflowCanvasService.canvas.container.removeChild(this.arcLine);

        this.arcLine = undefined;
        var arc = this.createArc(typeArc, (_b = this._source) === null || _b === void 0 ? void 0 : _b.canvasElement, element.canvasElement, []);
        var petriflowArc = this.createArc(type, arc);

        this._petriflowCanvasService.canvas.container.appendChild(arc.container);

        this._petriflowCanvasService.petriflowElementsCollection.arcs.push(petriflowArc);

        this._source = undefined;
        this._arcLine = undefined;
        return petriflowArc;
      } else {
        return undefined;
      }
    } // @ts-ignore

  }, {
    key: "createArc",
    value: function createArc(type) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      return (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_construct_js__WEBPACK_IMPORTED_MODULE_0__["default"])(type, params);
    }
  }, {
    key: "createSvgArc",
    value: function createSvgArc(element, arrowUrl) {
      if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");
      var arcLine = document.createElementNS(_netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.SVG_NAMESPACE, 'polyline');
      arcLine.setAttributeNS(null, 'fill', 'none');
      arcLine.setAttributeNS(null, 'stroke', 'black');
      arcLine.setAttributeNS(null, 'stroke-width', '2');
      arcLine.setAttributeNS(null, 'marker-end', "url(#".concat(arrowUrl, ")"));
      arcLine.setAttributeNS(null, 'points', "".concat(element.getPosition().x, ",").concat(element.getPosition().y, " ").concat(element.getPosition().x, ",").concat(element.getPosition().y));

      this._petriflowCanvasService.canvas.container.appendChild(arcLine);

      this.arcLine = arcLine;
      return arcLine;
    }
  }, {
    key: "arcLine",
    get: function get() {
      return this._arcLine;
    },
    set: function set(value) {
      this._arcLine = value;
    }
  }, {
    key: "source",
    get: function get() {
      return this._source;
    },
    set: function set(value) {
      this._source = value;
    }
  }]);

  return PetriflowCanvasFactoryService;
}();

PetriflowCanvasFactoryService.ɵfac = function PetriflowCanvasFactoryService_Factory(t) {
  return new (t || PetriflowCanvasFactoryService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](PetriflowCanvasService));
};

PetriflowCanvasFactoryService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: PetriflowCanvasFactoryService,
  factory: PetriflowCanvasFactoryService.ɵfac,
  providedIn: 'root'
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](PetriflowCanvasFactoryService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: PetriflowCanvasService
    }];
  }, null);
})();

var CanvasMode;

(function (CanvasMode) {
  CanvasMode["SELECT"] = "select";
  CanvasMode["LASSO"] = "lasso";
  CanvasMode["CREATE_TRANSITION"] = "transition";
  CanvasMode["CREATE_PLACE"] = "place";
  CanvasMode["CREATE_REGULAR_ARC"] = "arc";
  CanvasMode["CREATE_RESET_ARC"] = "resetarc";
  CanvasMode["CREATE_INHIBITOR_ARC"] = "inhibitor";
  CanvasMode["CREATE_READ_ARC"] = "read";
  CanvasMode["MOVE"] = "move";
  CanvasMode["REMOVE"] = "remove";
})(CanvasMode || (CanvasMode = {}));

var PetriflowCanvasConfigurationService = /*#__PURE__*/function () {
  function PetriflowCanvasConfigurationService(_petriflowCanvasFactory, _petriflowCanvasService) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowCanvasConfigurationService);

    this._petriflowCanvasFactory = _petriflowCanvasFactory;
    this._petriflowCanvasService = _petriflowCanvasService;
    this.arcTypes = ['arc', 'resetarc', 'inhibitor', 'read'];
    this.mouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this._breakpoint = new DOMPoint();
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowCanvasConfigurationService, [{
    key: "mode",
    get: function get() {
      return this._mode;
    },
    set: function set(value) {
      this._mode = value;
    }
  }, {
    key: "toolbar",
    get: function get() {
      return this._toolbar;
    }
  }, {
    key: "addCanvasEvent",
    value: function addCanvasEvent(svg, toolbar) {
      var _this12 = this;

      this._toolbar = toolbar;

      svg.onmousemove = function (e) {
        var _a, _b, _c, _d;

        if (_this12._arcLine) {
          _this12.moveArc(e);
        }

        _this12.moveElement(e);

        _this12.moveBreakpoint(e);

        if (_this12.mouseDown && _this12.mode === CanvasMode.LASSO) {
          if (!_this12._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

          _this12._petriflowCanvasService.deselectAll();

          _this12._petriflowCanvasService.canvas.svg.deselectAll();

          var offset = _this12._petriflowCanvasService.getPanZoomOffset();

          var width = (e.offsetX - ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0)) / ((_b = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _b !== void 0 ? _b : 1) - _this12.mouseX;
          var height = (e.offsetY - ((_c = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _c !== void 0 ? _c : 0)) / ((_d = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _d !== void 0 ? _d : 1) - _this12.mouseY;
          var newX = width > 0 ? _this12.mouseX : _this12.mouseX + width;
          var newY = height > 0 ? _this12.mouseY : _this12.mouseY + height;
          if (!_this12.rectangle) throw new Error("SVGElement is not set");

          _this12.rectangle.setAttributeNS(null, 'width', "".concat(Math.abs(width)));

          _this12.rectangle.setAttributeNS(null, 'height', "".concat(Math.abs(height)));

          _this12.rectangle.setAttributeNS(null, 'x', "".concat(newX));

          _this12.rectangle.setAttributeNS(null, 'y', "".concat(newY));
        }

        _this12.onCanvasMouseMoveClipboard(e);
      };

      svg.onmousedown = function (e) {
        var _a, _b, _c, _d;

        e.preventDefault();

        if (_this12.mode === CanvasMode.LASSO) {
          _this12._petriflowCanvasService.deselectAll();

          _this12.mouseDown = true;

          var offset = _this12._petriflowCanvasService.getPanZoomOffset();

          _this12.rectangle = document.createElementNS(_netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.SVG_NAMESPACE, 'rect');

          _this12.rectangle.setAttributeNS(null, 'fill', 'none');

          _this12.rectangle.setAttributeNS(null, 'class', 'path');

          _this12.rectangle.setAttributeNS(null, 'stroke', 'black');

          _this12.rectangle.setAttributeNS(null, 'stroke-width', '1');

          _this12.rectangle.setAttributeNS(null, 'animation', 'dash 5s linear');

          _this12.mouseX = (e.offsetX - ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0)) / ((_b = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _b !== void 0 ? _b : 1);
          _this12.mouseY = (e.offsetY - ((_c = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _c !== void 0 ? _c : 0)) / ((_d = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _d !== void 0 ? _d : 1);

          _this12.rectangle.setAttributeNS(null, 'x', "".concat(_this12.mouseX));

          _this12.rectangle.setAttributeNS(null, 'y', "".concat(_this12.mouseY));

          if (!_this12._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

          _this12._petriflowCanvasService.canvas.container.appendChild(_this12.rectangle);
        }

        _this12.onMouseMoveDownDestroyClipboard();
      };

      svg.onmouseup = function (e) {
        e.preventDefault();

        if (_this12.mode === CanvasMode.LASSO && _this12.rectangle) {
          _this12._petriflowCanvasService.setSelectedByRectangleEnclosure(_this12.rectangle);

          _this12.mouseDown = false;
          if (!_this12._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

          _this12._petriflowCanvasService.canvas.container.removeChild(_this12.rectangle);

          _this12.rectangle = undefined;
        }
      };

      svg.onmouseleave = function () {
        _this12.deleteClipboard();
      };
    } // Transition Events

  }, {
    key: "addTransitionEvents",
    value: function addTransitionEvents(petriflowTransition) {
      var _this13 = this;

      petriflowTransition.setOnClick(function (element) {
        _this13.attachCanvasElementOnClickFunctions(element);
      });
    } // Place Events

  }, {
    key: "addPlaceEvents",
    value: function addPlaceEvents(petriflowPlace) {
      var _this14 = this;

      petriflowPlace.setOnClick(function (element) {
        _this14.attachCanvasElementOnClickFunctions(element);
      });
      petriflowPlace.setOnTokenClickEvent(function (element) {
        _this14.attachCanvasElementOnClickFunctions(element);
      });
    }
  }, {
    key: "attachCanvasElementOnClickFunctions",
    value: function attachCanvasElementOnClickFunctions(element) {
      this.addArc(element);
      this.selectElement(element);
      this.deleteElement(element);
      this.multipleSelectElement(element);
    } // Arc Events

  }, {
    key: "addArcEvents",
    value: function addArcEvents(arc) {
      var _this15 = this;

      arc.setOnClick(function (element, e) {
        _this15.deleteArc(element);

        _this15.createBreakpoint(e, element);

        _this15.multipleSelectElement(element);
      });
    }
  }, {
    key: "addArc",
    value: function addArc(element) {
      if (!this._arcLine && this.arcTypes.includes(this._mode)) {
        this._source = element;
        this._petriflowCanvasFactory.source = element;
        this._arcLine = this._petriflowCanvasFactory.addArc(element, this._mode);
      } else if (this._arcLine) {
        var arc = this._petriflowCanvasFactory.addArc(element, this._mode);

        if (arc) {
          this._source = undefined;
          this._arcLine = undefined;
          this.addArcEvents(arc);
        }
      }
    }
  }, {
    key: "selectElement",
    value: function selectElement(element) {
      if (this._mode === CanvasMode.MOVE) {
        if (!this._petriflowCanvasFactory.source && this._petriflowCanvasService.petriflowElementsCollection.selected.length === 0) {
          this._petriflowCanvasFactory.source = element;
        } else {
          this._petriflowCanvasFactory.source = undefined;
        }
      }
    }
  }, {
    key: "multipleSelectElement",
    value: function multipleSelectElement(element) {
      var _this16 = this;

      if (this._mode === CanvasMode.MOVE) {
        if (this._petriflowCanvasService.petriflowElementsCollection.selected.length > 1 && this._petriflowCanvasService.petriflowElementsCollection.selected.includes(element)) {
          this.initialiseClipboard();

          this._petriflowCanvasService.petriflowElementsCollection.selected.forEach(function (selectedElement) {
            var _a;

            (_a = _this16.clipboard) === null || _a === void 0 ? void 0 : _a.appendChild(selectedElement.canvasElement.container);
          });

          this._petriflowCanvasService.petriflowElementsCollection.arcs.filter(function (arc) {
            return arc.isSelected();
          }).forEach(function (selectedElement) {
            var _a;

            (_a = _this16.clipboard) === null || _a === void 0 ? void 0 : _a.appendChild(selectedElement.element.container);
          });

          if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

          if (this.clipboard) {
            this._petriflowCanvasService.canvas.container.appendChild(this.clipboard);

            this._clipboardBox = this.clipboard.getBoundingClientRect();
          }
        }
      }
    }
  }, {
    key: "moveElement",
    value: function moveElement(e) {
      var _a, _b, _c, _d;

      if (this._mode === CanvasMode.MOVE && this._petriflowCanvasFactory.source && !this.clipboard) {
        var offsetPanZoom = this._petriflowCanvasService.getPanZoomOffset();

        this._petriflowCanvasFactory.source.canvasElement.move(new DOMPoint((e.offsetX - ((_a = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.x) !== null && _a !== void 0 ? _a : 0)) / ((_b = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.scale) !== null && _b !== void 0 ? _b : 1), (e.offsetY - ((_c = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.y) !== null && _c !== void 0 ? _c : 0)) / ((_d = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.scale) !== null && _d !== void 0 ? _d : 1)));
      }
    }
  }, {
    key: "moveArc",
    value: function moveArc(e) {
      var _a, _b, _c, _d, _e, _f, _g, _h;

      var offsetPanZoom = this._petriflowCanvasService.getPanZoomOffset();

      if (!this._source) return;

      var intersect = this._source.canvasElement.getEdgeIntersection(new DOMPoint((e.offsetX - ((_a = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.x) !== null && _a !== void 0 ? _a : 0)) / ((_b = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.scale) !== null && _b !== void 0 ? _b : 1), (e.offsetY - ((_c = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.y) !== null && _c !== void 0 ? _c : 0)) / ((_d = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.scale) !== null && _d !== void 0 ? _d : 1)), 0);

      var xLineLength = (e.offsetX - ((_e = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.x) !== null && _e !== void 0 ? _e : 0)) / ((_f = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.scale) !== null && _f !== void 0 ? _f : 1) - intersect.x;
      var yLineLength = (e.offsetY - ((_g = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.y) !== null && _g !== void 0 ? _g : 0)) / ((_h = offsetPanZoom === null || offsetPanZoom === void 0 ? void 0 : offsetPanZoom.scale) !== null && _h !== void 0 ? _h : 1) - intersect.y;
      var arcLength = Math.sqrt(xLineLength * xLineLength + yLineLength * yLineLength);
      var arcLengthOffset = arcLength - _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.ARROW_HEAD_SIZE;
      var arcRatio = arcLengthOffset / arcLength;
      var finalX = intersect.x + xLineLength * arcRatio;
      var finalY = intersect.y + yLineLength * arcRatio;
      if (!this._arcLine) throw new Error("Arc line is not set!");

      this._arcLine.setAttributeNS(null, 'points', "".concat(intersect.x, ",").concat(intersect.y, " ").concat(finalX, ",").concat(finalY));
    }
  }, {
    key: "deleteElement",
    value: function deleteElement(element) {
      var _this17 = this;

      if (this._mode === CanvasMode.REMOVE) {
        var removedArcs = [];
        if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");
        element.canvasElement.arcs.forEach(function (arc) {
          var _a, _b;

          (_b = (_a = _this17._petriflowCanvasService) === null || _a === void 0 ? void 0 : _a.canvas) === null || _b === void 0 ? void 0 : _b.remove(arc);
          removedArcs.push(arc);
        });

        this._petriflowCanvasService.petriflowElementsCollection.nodes.forEach(function (petriflowElement) {
          petriflowElement.canvasElement.deleteArcs(removedArcs);
        });

        this._petriflowCanvasService.canvas.remove(element.canvasElement);
      }
    }
  }, {
    key: "deleteArc",
    value: function deleteArc(petriflowElement) {
      if (this._mode === CanvasMode.REMOVE) {
        if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

        this._petriflowCanvasService.canvas.remove(petriflowElement.element);
      }
    }
  }, {
    key: "pasteElements",
    value: function pasteElements() {
      var _this18 = this;

      var _a;

      this.initialiseClipboard();

      var clipboardContent = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes);

      this.pasteElementsFromCollection(this._petriflowCanvasService.petriflowClipboardElementsCollection.places);
      this.pasteElementsFromCollection(this._petriflowCanvasService.petriflowClipboardElementsCollection.transitions);
      var arcsCollection = this._petriflowCanvasService.petriflowClipboardElementsCollection.arcs;
      var length = arcsCollection.length;
      arcsCollection.forEach(function (element) {
        var _a;

        var newElement = _this18.createArcByDeterminedType(element, clipboardContent);

        (_a = _this18.clipboard) === null || _a === void 0 ? void 0 : _a.appendChild(newElement.element.container);
        arcsCollection.push(newElement);
      });
      arcsCollection.splice(0, length);
      if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");
      clipboardContent = [];

      if (this.clipboard) {
        this._petriflowCanvasService.canvas.container.appendChild(this.clipboard);

        this._clipboardBox = (_a = this.clipboard) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
      }
    }
  }, {
    key: "pasteElementsFromCollection",
    value: function pasteElementsFromCollection(collection) {
      var _this19 = this;

      var length = collection.length;
      collection.forEach(function (element) {
        var _a;

        var newElement = element.clone();
        (_a = _this19.clipboard) === null || _a === void 0 ? void 0 : _a.appendChild(newElement.canvasElement.container);
        collection.push(newElement);
      });
      collection.splice(0, length);
    }
  }, {
    key: "onMouseMoveDownDestroyClipboard",
    value: function onMouseMoveDownDestroyClipboard() {
      if (this.clipboard && this._clipboardBox && this.mode === CanvasMode.LASSO) {
        this.destroyAndReduceClipboard();
      } else if (this.clipboard && this._clipboardBox && this.mode === CanvasMode.MOVE) {
        this.destroyAndMoveElements();
      }
    }
  }, {
    key: "createArcByDeterminedType",
    value: function createArcByDeterminedType(petriflowArc, clipboardContent) {
      var source = petriflowArc.element.start;
      var destination = petriflowArc.element.end;
      var startIndex = clipboardContent.findIndex(function (startElement) {
        return source.container === startElement.canvasElement.container;
      });
      var endIndex = clipboardContent.findIndex(function (endElement) {
        return destination.container === endElement.canvasElement.container;
      });
      return petriflowArc.cloneArc(this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes[startIndex].canvasElement, this._petriflowCanvasService.petriflowClipboardElementsCollection.nodes[endIndex].canvasElement);
    }
  }, {
    key: "onCanvasMouseMoveClipboard",
    value: function onCanvasMouseMoveClipboard(event) {
      var _a, _b, _c, _d, _e, _f, _g, _h;

      if (this.clipboard && this._clipboardBox) {
        var offset = this._petriflowCanvasService.getPanZoomOffset();

        var mouseX = (event.x - ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0)) / ((_b = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _b !== void 0 ? _b : 1) - (this._clipboardBox.x + this._clipboardBox.width / 2 - ((_c = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _c !== void 0 ? _c : 0)) / ((_d = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _d !== void 0 ? _d : 1);
        var mouseY = (event.y - ((_e = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _e !== void 0 ? _e : 0)) / ((_f = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _f !== void 0 ? _f : 1) - (this._clipboardBox.y + this._clipboardBox.height / 2 - ((_g = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _g !== void 0 ? _g : 0)) / ((_h = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _h !== void 0 ? _h : 1);
        this.clipboard.setAttribute('transform', "matrix(1,0,0,1,".concat(mouseX, ",").concat(mouseY, ")"));
      }
    }
  }, {
    key: "deleteSelectedElements",
    value: function deleteSelectedElements() {
      this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.places);
      this.deleteSelectedCollection(this._petriflowCanvasService.petriflowElementsCollection.transitions);
    }
  }, {
    key: "deleteSelectedCollection",
    value: function deleteSelectedCollection(collection) {
      var _this20 = this;

      var removedArcs = [];
      collection.filter(function (element) {
        return element.isSelected();
      }).forEach(function (selectedElement) {
        if (!_this20._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");
        selectedElement.canvasElement.arcs.forEach(function (arc) {
          var _a, _b;

          (_b = (_a = _this20._petriflowCanvasService) === null || _a === void 0 ? void 0 : _a.canvas) === null || _b === void 0 ? void 0 : _b.remove(arc);
          removedArcs.push(arc);
        });

        _this20._petriflowCanvasService.petriflowElementsCollection.nodes.forEach(function (petriflowElement) {
          return petriflowElement.canvasElement.deleteArcs(removedArcs);
        });

        removedArcs.forEach(function (arc) {
          _this20._petriflowCanvasService.petriflowElementsCollection.arcs.splice(_this20._petriflowCanvasService.petriflowElementsCollection.arcs.findIndex(function (petriflowArc) {
            return petriflowArc.element === arc;
          }), 1);
        });
        removedArcs = [];

        _this20._petriflowCanvasService.canvas.remove(selectedElement.canvasElement);

        collection.splice(collection.indexOf(selectedElement), 1);
      });
    }
  }, {
    key: "initialiseClipboard",
    value: function initialiseClipboard() {
      this.clipboard = document.createElementNS(_netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.CanvasConfiguration.SVG_NAMESPACE, 'g');
      this.clipboard.id = 'petri-svg-clipboard';
    }
  }, {
    key: "destroyAndReduceClipboard",
    value: function destroyAndReduceClipboard() {
      var _this21 = this;

      var _a, _b;

      var matrix = (_b = (_a = this.clipboard.transform) === null || _a === void 0 ? void 0 : _a.baseVal[0]) === null || _b === void 0 ? void 0 : _b.matrix;
      this.copyFromClipboardToCollection(matrix, this._petriflowCanvasService.petriflowClipboardElementsCollection.places, this._petriflowCanvasService.petriflowElementsCollection.places);
      this.copyFromClipboardToCollection(matrix, this._petriflowCanvasService.petriflowClipboardElementsCollection.transitions, this._petriflowCanvasService.petriflowElementsCollection.transitions);

      this._petriflowCanvasService.petriflowClipboardElementsCollection.arcs.forEach(function (copyElement) {
        copyElement.moveBy(matrix.e, matrix.f);
        if (!_this21._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

        _this21._petriflowCanvasService.canvas.container.appendChild(copyElement.element.container);

        _this21._petriflowCanvasService.petriflowElementsCollection.arcs.push(copyElement);
      });

      this.deleteClipboard();
    }
  }, {
    key: "copyFromClipboardToCollection",
    value: function copyFromClipboardToCollection(matrix, collectionFrom, collectionTo) {
      var _this22 = this;

      collectionFrom.forEach(function (copyElement) {
        copyElement.moveBy(matrix.e, matrix.f);
        if (!_this22._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

        _this22._petriflowCanvasService.canvas.add(copyElement.canvasElement);

        collectionTo.push(copyElement);
      });
    }
  }, {
    key: "destroyAndMoveElements",
    value: function destroyAndMoveElements() {
      var _this23 = this;

      var _a, _b;

      var matrix = (_b = (_a = this.clipboard.transform) === null || _a === void 0 ? void 0 : _a.baseVal[0]) === null || _b === void 0 ? void 0 : _b.matrix;

      this._petriflowCanvasService.petriflowElementsCollection.selected.forEach(function (copyElement) {
        copyElement.moveBy(matrix.e, matrix.f);
        if (!_this23._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

        _this23._petriflowCanvasService.canvas.add(copyElement.canvasElement);
      });

      this._petriflowCanvasService.petriflowElementsCollection.arcs.filter(function (arc) {
        return arc.isSelected();
      }).forEach(function (copyElement) {
        copyElement.moveBy(matrix.e, matrix.f);
        if (!_this23._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

        _this23._petriflowCanvasService.canvas.container.appendChild(copyElement.element.container);
      });

      this.deleteClipboard();
    }
  }, {
    key: "deleteClipboard",
    value: function deleteClipboard() {
      if (!this._petriflowCanvasService.canvas) throw new Error("SVG canvas for petriflow objects doesn't exists!");

      if (this.clipboard) {
        this._petriflowCanvasService.canvas.container.removeChild(this.clipboard);

        this.clipboard = undefined;
        this._petriflowCanvasService.petriflowClipboardElementsCollection = new CanvasElementCollection();
      }

      if (this.rectangle) {
        this.mouseDown = false;

        this._petriflowCanvasService.canvas.container.removeChild(this.rectangle);

        this.rectangle = undefined;
      }

      if (this._arcLine) {
        this._petriflowCanvasService.canvas.container.removeChild(this._arcLine);

        this._petriflowCanvasFactory.arcLine = undefined;
        this._arcLine = undefined;
        this.mouseDown = false;
      }
    }
  }, {
    key: "clipboard",
    get: function get() {
      return this._clipboard;
    },
    set: function set(value) {
      this._clipboard = value;
    }
  }, {
    key: "createBreakpoint",
    value: function createBreakpoint(e, arc) {
      var _a, _b, _c, _d;

      if (this.mode === CanvasMode.MOVE && !this._selectedArc) {
        var offset = this._petriflowCanvasService.getPanZoomOffset();

        var mouseX = (e.offsetX - ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0)) / ((_b = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _b !== void 0 ? _b : 1);
        var mouseY = (e.offsetY - ((_c = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _c !== void 0 ? _c : 0)) / ((_d = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _d !== void 0 ? _d : 1);
        var newBreakpoint = new DOMPoint(mouseX, mouseY);
        arc.element.linePoints.splice(this.getBreakpointIndex(newBreakpoint, arc.element), 0, newBreakpoint);
        arc.element.move(arc.element.start, arc.element.end);
        this._breakpoint = newBreakpoint;
        this._selectedArc = arc;
      } else if (this.mode === CanvasMode.MOVE && this._selectedArc) {
        this._breakpoint = new DOMPoint();
        this._selectedArc = undefined;
      }
    }
  }, {
    key: "getBreakpointIndex",
    value: function getBreakpointIndex(newBreakpoint, arc) {
      var arcPoints = [].concat((0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_toConsumableArray_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arc.linePoints), [arc.end.position]);
      var arcPointsLength = arcPoints.length;

      if (arcPointsLength) {
        for (var i = 0; i < arcPointsLength - 1; i++) {
          var breakpointOffset = this.getDistanceBetweenPoints(arcPoints[i], arcPoints[i + 1]) - (this.getDistanceBetweenPoints(arcPoints[i], newBreakpoint) + this.getDistanceBetweenPoints(newBreakpoint, arcPoints[i + 1]));

          if (Math.abs(breakpointOffset) <= 2) {
            return i + 1;
          }
        }
      }

      return 0;
    }
  }, {
    key: "getDistanceBetweenPoints",
    value: function getDistanceBetweenPoints(pointStart, pointEnd) {
      return Math.sqrt(Math.pow(pointEnd.x - pointStart.x, 2) + Math.pow(pointEnd.y - pointStart.y, 2));
    }
  }, {
    key: "moveBreakpoint",
    value: function moveBreakpoint(e) {
      var _a, _b, _c, _d, _e;

      if (this.mode === CanvasMode.MOVE && this._breakpoint) {
        var offset = this._petriflowCanvasService.getPanZoomOffset();

        var mouseX = (e.offsetX - ((_a = offset === null || offset === void 0 ? void 0 : offset.x) !== null && _a !== void 0 ? _a : 0)) / ((_b = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _b !== void 0 ? _b : 1);
        var mouseY = (e.offsetY - ((_c = offset === null || offset === void 0 ? void 0 : offset.y) !== null && _c !== void 0 ? _c : 0)) / ((_d = offset === null || offset === void 0 ? void 0 : offset.scale) !== null && _d !== void 0 ? _d : 1);
        this._breakpoint.x = mouseX;
        this._breakpoint.y = mouseY;
        (_e = this._selectedArc) === null || _e === void 0 ? void 0 : _e.element.move(this._selectedArc.element.start, this._selectedArc.element.end);
      }
    }
  }]);

  return PetriflowCanvasConfigurationService;
}();

PetriflowCanvasConfigurationService.ɵfac = function PetriflowCanvasConfigurationService_Factory(t) {
  return new (t || PetriflowCanvasConfigurationService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](PetriflowCanvasFactoryService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](PetriflowCanvasService));
};

PetriflowCanvasConfigurationService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: PetriflowCanvasConfigurationService,
  factory: PetriflowCanvasConfigurationService.ɵfac,
  providedIn: 'root'
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](PetriflowCanvasConfigurationService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], function () {
    return [{
      type: PetriflowCanvasFactoryService
    }, {
      type: PetriflowCanvasService
    }];
  }, null);
})();
/* ARCS */


var PetriflowCanvas = /*#__PURE__*/function (_Canvas) {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_inherits_js__WEBPACK_IMPORTED_MODULE_1__["default"])(PetriflowCanvas, _Canvas);

  var _super8 = (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createSuper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(PetriflowCanvas);

  function PetriflowCanvas(svg) {
    var _this24;

    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowCanvas);

    _this24 = _super8.call(this, svg);

    _this24.register(new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.ArrowArcEnd());

    _this24.register(new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.EmptyCircleArcEnd());

    _this24.register(new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.FullCircleArcEnd());

    _this24.register(new _netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.DoubleArrowArcEnd());

    return _this24;
  }

  return (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowCanvas);
}(_netgrif_petri_svg__WEBPACK_IMPORTED_MODULE_6__.Canvas);

var PetriflowCanvasComponent = /*#__PURE__*/function () {
  function PetriflowCanvasComponent(_canvasService, _canvasConfig, _snackBar) {
    (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowCanvasComponent);

    this._canvasService = _canvasService;
    this._canvasConfig = _canvasConfig;
    this._snackBar = _snackBar;
  }

  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(PetriflowCanvasComponent, [{
    key: "ngAfterViewInit",
    value: function ngAfterViewInit() {
      var _a;

      this._canvas = new PetriflowCanvas((_a = this.canvasElement) === null || _a === void 0 ? void 0 : _a.nativeElement);
      this._canvasService.canvas = this._canvas;
      this._canvasService.panzoom = panzoom__WEBPACK_IMPORTED_MODULE_7__(this._canvas.container);
    }
  }, {
    key: "canvas",
    get: function get() {
      return this._canvas;
    }
  }, {
    key: "onControlC",
    value: function onControlC($event) {
      $event.preventDefault();
      this.openSnackBar('Canvas elements copied to clipboard');
      this._canvasService.petriflowClipboardElementsCollection = this._canvasService.copyElements(this._canvasService.petriflowElementsCollection, this._canvasService.petriflowClipboardElementsCollection);
    }
  }, {
    key: "onControlV",
    value: function onControlV($event) {
      $event.preventDefault();

      this._canvasConfig.pasteElements();
    }
  }, {
    key: "onControlA",
    value: function onControlA($event) {
      $event.preventDefault();
      this.openSnackBar('Selected all petri-svg elements');

      this._canvasService.selectAll();
    }
  }, {
    key: "onDelete",
    value: function onDelete() {
      this.openSnackBar('All selected petri-svg elements deleted');

      this._canvasConfig.deleteSelectedElements();
    }
  }, {
    key: "onEscape",
    value: function onEscape() {
      this._canvasService.deselectAll();

      this._canvasConfig.deleteClipboard();
    }
  }, {
    key: "onPlusButton",
    value: function onPlusButton() {
      var _a, _b, _c, _d, _e;

      (_a = this._canvasService.panzoom) === null || _a === void 0 ? void 0 : _a.smoothZoom((_c = (_b = this._mouseEvent) === null || _b === void 0 ? void 0 : _b.x) !== null && _c !== void 0 ? _c : 0, (_e = (_d = this._mouseEvent) === null || _d === void 0 ? void 0 : _d.y) !== null && _e !== void 0 ? _e : 0, PetriflowCanvasConfiguration.PANZOOM_ZOOM_IN_MULTIPLIER);
    }
  }, {
    key: "onMinusButton",
    value: function onMinusButton() {
      var _a, _b, _c, _d, _e;

      (_a = this._canvasService.panzoom) === null || _a === void 0 ? void 0 : _a.smoothZoom((_c = (_b = this._mouseEvent) === null || _b === void 0 ? void 0 : _b.x) !== null && _c !== void 0 ? _c : 0, (_e = (_d = this._mouseEvent) === null || _d === void 0 ? void 0 : _d.y) !== null && _e !== void 0 ? _e : 0, PetriflowCanvasConfiguration.PANZOOM_ZOOM_OUT_MULTIPLIER);
    }
  }, {
    key: "onUpButton",
    value: function onUpButton() {
      var _a;

      (_a = this._canvasService.panzoom) === null || _a === void 0 ? void 0 : _a.moveBy(0, PetriflowCanvasConfiguration.PANZOOM_MOVE, false);
    }
  }, {
    key: "onRightButton",
    value: function onRightButton() {
      var _a;

      (_a = this._canvasService.panzoom) === null || _a === void 0 ? void 0 : _a.moveBy(-PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, false);
    }
  }, {
    key: "onDownButton",
    value: function onDownButton() {
      var _a;

      (_a = this._canvasService.panzoom) === null || _a === void 0 ? void 0 : _a.moveBy(0, -PetriflowCanvasConfiguration.PANZOOM_MOVE, false);
    }
  }, {
    key: "onLeftButton",
    value: function onLeftButton() {
      var _a;

      (_a = this._canvasService.panzoom) === null || _a === void 0 ? void 0 : _a.moveBy(PetriflowCanvasConfiguration.PANZOOM_MOVE, 0, false);
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove($event) {
      this._mouseEvent = $event;
    }
  }, {
    key: "openSnackBar",
    value: function openSnackBar(message) {
      this._snackBar.open(message, undefined, {
        duration: 1000
      });
    }
  }]);

  return PetriflowCanvasComponent;
}();

PetriflowCanvasComponent.ɵfac = function PetriflowCanvasComponent_Factory(t) {
  return new (t || PetriflowCanvasComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](PetriflowCanvasService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](PetriflowCanvasConfigurationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBar));
};

PetriflowCanvasComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: PetriflowCanvasComponent,
  selectors: [["petriflow-svg-canvas"]],
  viewQuery: function PetriflowCanvasComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 5);
    }

    if (rf & 2) {
      var _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.canvasElement = _t.first);
    }
  },
  hostBindings: function PetriflowCanvasComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("keydown.control.c", function PetriflowCanvasComponent_keydown_control_c_HostBindingHandler($event) {
        return ctx.onControlC($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.control.v", function PetriflowCanvasComponent_keydown_control_v_HostBindingHandler($event) {
        return ctx.onControlV($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.control.a", function PetriflowCanvasComponent_keydown_control_a_HostBindingHandler($event) {
        return ctx.onControlA($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.delete", function PetriflowCanvasComponent_keydown_delete_HostBindingHandler($event) {
        return ctx.onDelete($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.escape", function PetriflowCanvasComponent_keydown_escape_HostBindingHandler($event) {
        return ctx.onEscape($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.+", function PetriflowCanvasComponent_keydown___HostBindingHandler($event) {
        return ctx.onPlusButton($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.-", function PetriflowCanvasComponent_keydown___HostBindingHandler($event) {
        return ctx.onMinusButton($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.ArrowUp", function PetriflowCanvasComponent_keydown_ArrowUp_HostBindingHandler($event) {
        return ctx.onUpButton($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.ArrowRight", function PetriflowCanvasComponent_keydown_ArrowRight_HostBindingHandler($event) {
        return ctx.onRightButton($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.ArrowDown", function PetriflowCanvasComponent_keydown_ArrowDown_HostBindingHandler($event) {
        return ctx.onDownButton($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("keydown.ArrowLeft", function PetriflowCanvasComponent_keydown_ArrowLeft_HostBindingHandler($event) {
        return ctx.onLeftButton($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresolveWindow"])("mousemove", function PetriflowCanvasComponent_mousemove_HostBindingHandler($event) {
        return ctx.onMouseMove($event);
      });
    }
  },
  decls: 2,
  vars: 0,
  consts: [["width", "100%", "height", "100%", 2, "width", "100%", "height", "100%"], ["canvas", ""]],
  template: function PetriflowCanvasComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnamespaceSVG"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "svg", 0, 1);
    }
  },
  encapsulation: 2
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](PetriflowCanvasComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.Component,
    args: [{
      selector: 'petriflow-svg-canvas',
      styles: [],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewEncapsulation.None,
      template: "<svg #canvas width=\"100%\" height=\"100%\" style=\"width: 100%; height: 100%\">\n</svg>\n"
    }]
  }], function () {
    return [{
      type: PetriflowCanvasService
    }, {
      type: PetriflowCanvasConfigurationService
    }, {
      type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBar
    }];
  }, {
    canvasElement: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
      args: ['canvas']
    }],
    onControlC: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.control.c', ['$event']]
    }],
    onControlV: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.control.v', ['$event']]
    }],
    onControlA: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.control.a', ['$event']]
    }],
    onDelete: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.delete', ['$event']]
    }],
    onEscape: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.escape', ['$event']]
    }],
    onPlusButton: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.+', ['$event']]
    }],
    onMinusButton: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.-', ['$event']]
    }],
    onUpButton: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.ArrowUp', ['$event']]
    }],
    onRightButton: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.ArrowRight', ['$event']]
    }],
    onDownButton: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.ArrowDown', ['$event']]
    }],
    onLeftButton: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['window:keydown.ArrowLeft', ['$event']]
    }],
    onMouseMove: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.HostListener,
      args: ['mousemove', ['$event']]
    }]
  });
})();

var PetriflowCanvasModule = /*#__PURE__*/(0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_createClass_js__WEBPACK_IMPORTED_MODULE_5__["default"])(function PetriflowCanvasModule() {
  (0,_home_runner_work_petriflow_svg_petriflow_svg_node_modules_babel_runtime_helpers_esm_classCallCheck_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this, PetriflowCanvasModule);
});

PetriflowCanvasModule.ɵfac = function PetriflowCanvasModule_Factory(t) {
  return new (t || PetriflowCanvasModule)();
};

PetriflowCanvasModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: PetriflowCanvasModule,
  declarations: [PetriflowCanvasComponent],
  exports: [PetriflowCanvasComponent]
});
PetriflowCanvasModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  imports: [[]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵsetClassMetadata"](PetriflowCanvasModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.NgModule,
    args: [{
      declarations: [PetriflowCanvasComponent],
      imports: [],
      exports: [PetriflowCanvasComponent]
    }]
  }], null, null);
})();
/*
 * Public API Surface of petriflow-petri-svg
 */

/**
 * Generated bundle index. Do not edit.
 */




/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendor"], function() { return __webpack_exec__(3437); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map