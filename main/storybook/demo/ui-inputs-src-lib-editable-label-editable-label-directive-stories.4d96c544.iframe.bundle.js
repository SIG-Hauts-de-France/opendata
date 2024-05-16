"use strict";(self.webpackChunkgeonetwork_ui=self.webpackChunkgeonetwork_ui||[]).push([[6715],{"./libs/ui/inputs/src/lib/editable-label/editable-label.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{s:()=>EditableLabelDirective});var tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let EditableLabelDirective=class EditableLabelDirective{constructor(el,renderer){this.el=el,this.renderer=renderer,this.editableLabelChanged=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter}ngAfterViewInit(){if(!1!==this.gnUiEditableLabel){const appendedInput=this.renderer.createElement("input");this.renderer.setStyle(appendedInput,"background","inherit"),this.renderer.setStyle(appendedInput,"color","inherit"),this.renderer.setStyle(appendedInput,"font","inherit"),this.renderer.setStyle(appendedInput,"border","inherit"),this.renderer.setStyle(appendedInput,"width","100%"),this.renderer.setStyle(appendedInput,"padding","inherit"),this.renderer.setStyle(appendedInput,"margin","0"),this.renderer.setStyle(appendedInput,"height","inherit"),this.renderer.setStyle(appendedInput,"line-height","inherit"),this.renderer.setStyle(appendedInput,"text-decoration","inherit");const formattedContent=(this.el.nativeElement.textContent||"").replace(/\s+/g," ").trim();this.renderer.setProperty(appendedInput,"value",formattedContent),this.renderer.setProperty(this.el.nativeElement,"innerHTML",""),this.renderer.listen(appendedInput,"input",(event=>{this.editableLabelChanged.emit(event.target.value)})),this.renderer.appendChild(this.el.nativeElement,appendedInput)}}static#_=this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef},{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2}];static#_2=this.propDecorators={editableLabelChanged:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Output}],gnUiEditableLabel:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}]}};EditableLabelDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({selector:"[gnUiEditableLabel]",standalone:!0}),(0,tslib__WEBPACK_IMPORTED_MODULE_1__.w6)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2])],EditableLabelDirective)},"./node_modules/@storybook/addon-actions/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{aD:()=>chunk_AY7I2SME.aD});var chunk_AY7I2SME=__webpack_require__("./node_modules/@storybook/addon-actions/dist/chunk-AY7I2SME.mjs")},"./node_modules/@storybook/angular/dist/client/decorators.js":(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.componentWrapperDecorator=exports.applicationConfig=exports.moduleMetadata=void 0;const ComputesTemplateFromComponent_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/ComputesTemplateFromComponent.js"),NgComponentAnalyzer_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/angular-beta/utils/NgComponentAnalyzer.js");exports.moduleMetadata=metadata=>storyFn=>{const story=storyFn(),storyMetadata=story.moduleMetadata||{};return metadata=metadata||{},{...story,moduleMetadata:{declarations:[...metadata.declarations||[],...storyMetadata.declarations||[]],entryComponents:[...metadata.entryComponents||[],...storyMetadata.entryComponents||[]],imports:[...metadata.imports||[],...storyMetadata.imports||[]],schemas:[...metadata.schemas||[],...storyMetadata.schemas||[]],providers:[...metadata.providers||[],...storyMetadata.providers||[]]}}},exports.applicationConfig=function applicationConfig(config){return storyFn=>{const story=storyFn(),storyConfig=story.applicationConfig;return{...story,applicationConfig:storyConfig||config?{...config,...storyConfig,providers:[...config?.providers||[],...storyConfig?.providers||[]]}:void 0}}};exports.componentWrapperDecorator=(element,props)=>(storyFn,storyContext)=>{const story=storyFn(),currentProps="function"==typeof props?props(storyContext):props,template=(0,NgComponentAnalyzer_1.isComponent)(element)?(0,ComputesTemplateFromComponent_1.computesTemplateFromComponent)(element,currentProps??{},story.template):element(story.template);return{...story,template,...currentProps||story.props?{props:{...currentProps,...story.props}}:{}}}},"./node_modules/@storybook/angular/dist/client/index.js":function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.applicationConfig=exports.componentWrapperDecorator=exports.moduleMetadata=void 0,__webpack_require__("./node_modules/@storybook/angular/dist/client/globals.js"),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-api.js"),exports),__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);var decorators_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/decorators.js");Object.defineProperty(exports,"moduleMetadata",{enumerable:!0,get:function(){return decorators_1.moduleMetadata}}),Object.defineProperty(exports,"componentWrapperDecorator",{enumerable:!0,get:function(){return decorators_1.componentWrapperDecorator}}),Object.defineProperty(exports,"applicationConfig",{enumerable:!0,get:function(){return decorators_1.applicationConfig}})},"./node_modules/@storybook/angular/dist/client/public-api.js":function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.raw=exports.forceReRender=exports.configure=exports.storiesOf=void 0;const preview_api_1=__webpack_require__("@storybook/preview-api"),render_1=__webpack_require__("./node_modules/@storybook/angular/dist/client/render.js"),decorateStory_1=__importDefault(__webpack_require__("./node_modules/@storybook/angular/dist/client/decorateStory.js"));__exportStar(__webpack_require__("./node_modules/@storybook/angular/dist/client/public-types.js"),exports);const api=(0,preview_api_1.start)(render_1.renderToCanvas,{decorateStory:decorateStory_1.default,render:render_1.render});exports.storiesOf=(kind,m)=>api.clientApi.storiesOf(kind,m).addParameters({renderer:"angular"});exports.configure=(...args)=>api.configure("angular",...args),exports.forceReRender=api.forceReRender,exports.raw=api.clientApi.raw},"./node_modules/@storybook/angular/dist/client/public-types.js":(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},"./node_modules/@storybook/angular/dist/index.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _client_index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/client/index.js");__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"applicationConfig")&&__webpack_require__.d(__webpack_exports__,{applicationConfig:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.applicationConfig}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"componentWrapperDecorator")&&__webpack_require__.d(__webpack_exports__,{componentWrapperDecorator:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator}}),__webpack_require__.o(_client_index__WEBPACK_IMPORTED_MODULE_0__,"moduleMetadata")&&__webpack_require__.d(__webpack_exports__,{moduleMetadata:function(){return _client_index__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata}})},"./libs/ui/inputs/src/lib/editable-label/editable-label.directive.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Editable:()=>Editable,EditableWithNewLinesAndSpaces:()=>EditableWithNewLinesAndSpaces,NonEditable:()=>NonEditable,NonEditableWithNewLinesAndSpaces:()=>NonEditableWithNewLinesAndSpaces,default:()=>__WEBPACK_DEFAULT_EXPORT__});var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/addon-actions/dist/index.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_editable_label_directive__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./libs/ui/inputs/src/lib/editable-label/editable-label.directive.ts");let EditableLabelStoryComponent=class EditableLabelStoryComponent{constructor(){this.handleEditableLabelChanged=(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("editableLabelChanged")}static#_=this.propDecorators={editable:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input}],label:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input}]}};EditableLabelStoryComponent=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.gn)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({selector:"gn-ui-editable-label-story",template:'<h3\n    class="text-3xl font-bold"\n    [gnUiEditableLabel]="editable"\n    (editableLabelChanged)="handleEditableLabelChanged($event)"\n  >\n    {{ label }}\n  </h3>'})],EditableLabelStoryComponent);const __WEBPACK_DEFAULT_EXPORT__={title:"Inputs/EditableLabel",component:EditableLabelStoryComponent,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_1__.moduleMetadata)({imports:[_editable_label_directive__WEBPACK_IMPORTED_MODULE_2__.s]})]},Editable={args:{editable:!0,label:"This is an in place editable label."},render:args=>({props:{...args,editableLabelChanged:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("editableLabelChanged")}})},NonEditable={args:{editable:!1,label:"This is a non editable label."},render:args=>({props:{...args,editableLabelChanged:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("editableLabelChanged")}})},EditableWithNewLinesAndSpaces={args:{editable:!0,label:"   This is a multi-line\n    editable label.  "},render:args=>({props:{...args,editableLabelChanged:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("editableLabelChanged")}})},NonEditableWithNewLinesAndSpaces={args:{editable:!1,label:"   This is a multi-line\n    non editable label.  "},render:args=>({props:{...args,editableLabelChanged:(0,_storybook_addon_actions__WEBPACK_IMPORTED_MODULE_0__.aD)("editableLabelChanged")}})}}}]);