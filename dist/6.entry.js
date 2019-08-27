exports.ids = [6];
exports.modules = {

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(316);

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(60)(content, options);

if (content.locals) {
  module.exports = content.locals;
}


/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(59)(false);
// Module
exports.push([module.i, ":root {\n  --color-main: #3498db;\n  --color-orange: #ff874d;\n  --color-white: #f5f5f5;\n  --color-gray: #b7b8b7;\n  --color-black: #222;\n}\n\n.fusuma-presenter-view {\n  height: 100vh;\n  width: 100vw;\n  position: relative\n}\n\n.fusuma-presenter-view > * {\n    height: 100%;\n    position: absolute;\n    width: 100%;\n    top: 0;\n    left: 0;\n  }\n\n.fusuma-presenter-view {\n\n  /* canvas */\n}\n\n.fusuma-presenter-view > div {\n    z-index: 1000;\n  }\n\n/* cannot use before/after for video tags, so should wrap div tags */\n\n.fusuma-screen {\n  background: #ddd;\n  box-shadow: 0 0 2px #96bbee;\n  margin: auto;\n  position: relative;\n  height: 100%;\n  width: 100%\n}\n\n.fusuma-screen > * {\n    height: 100%;\n    width: 100%;\n  }\n\n.fusuma-screen > div {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    pointer-events: none;\n    z-index: 10;\n  }\n\n/* overwrite */\n\n.fusuma-canvas > canvas:first-child {\n  display: none !important;\n}\n", ""]);


/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _presentationMode_Receiver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93);
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(94);
/* harmony import */ var _utils_webrtc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(314);
/* harmony import */ var _assets_style_view_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(315);
/* harmony import */ var _assets_style_view_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_assets_style_view_css__WEBPACK_IMPORTED_MODULE_5__);
function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{Promise.resolve(value).then(_next,_throw);}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value);}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err);}_next(undefined);});};}function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_nonIterableRest();}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}/*
 * View for Presentation mode
 */var presentationReceiver=null;var webrtc=null;var currentVideoTag=null;var currentLayer=null;var View=Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function(_ref){var slides=_ref.slides,hash=_ref.hash;// need to declare here
if(!presentationReceiver){presentationReceiver=new _presentationMode_Receiver__WEBPACK_IMPORTED_MODULE_2__["Receiver"]();presentationReceiver.onChangePage(function(pageNum){if(window.slide){window.slide.goToSlide(pageNum);// stop capturing
if(webrtc&&currentVideoTag){stopCapturing(currentVideoTag);}}});}var _useState=Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),_useState2=_slicedToArray(_useState,2),usedCanvas=_useState2[0],changeCanvasState=_useState2[1];var startCapturing=/*#__PURE__*/function(){var _ref2=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(){return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(webrtc){_context.next=7;break;}webrtc=new _utils_webrtc__WEBPACK_IMPORTED_MODULE_4__["WebRTC"]();_context.next=4;return webrtc.startCapturing({video:{displaySurface:'monitor'}});case 4:return _context.abrupt("return",_context.sent);case 7:throw new Error('Capturing has already run.');case 8:case"end":return _context.stop();}}},_callee);}));return function startCapturing(){return _ref2.apply(this,arguments);};}();var stopCapturing=function stopCapturing(elem){if(webrtc&&elem){elem.pause();webrtc.stopCapturing(elem);currentLayer.style.opacity=1;webrtc=null;currentLayer=null;currentVideoTag=null;}};var listenVideoTags=/*#__PURE__*/function(){var _ref3=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee3(id){var videoContainers;return regeneratorRuntime.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:videoContainers=document.querySelectorAll('#webslides .fusuma-screen');if(!(videoContainers===null)){_context3.next=3;break;}return _context3.abrupt("return");case 3:// need to active the view screen if want to capture the screen
videoContainers.forEach(function(container){var _container$children=_slicedToArray(container.children,2),overlay=_container$children[0],video=_container$children[1];video.addEventListener('click',/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee2(){var stream;return regeneratorRuntime.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:if(webrtc){_context2.next=10;break;}_context2.next=3;return startCapturing();case 3:stream=_context2.sent;video.srcObject=stream;video.play();currentVideoTag=video;currentLayer=overlay;currentLayer.style.opacity=0;// Click on browser UI stop sharing button
//https://stackoverflow.com/questions/25141080/how-to-listen-for-stop-sharing-click-in-chrome-desktopcapture-api
stream.getVideoTracks()[0].onended=function(){stopCapturing(video);};case 10:case"end":return _context2.stop();}}},_callee2);})));});case 4:case"end":return _context3.stop();}}},_callee3);}));return function listenVideoTags(_x){return _ref3.apply(this,arguments);};}();var listenCanvas=function listenCanvas(){Object(_Canvas__WEBPACK_IMPORTED_MODULE_3__["listenCanvasEvent"])(function(e){changeCanvasState(e.status==='start');});};Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function(){listenVideoTags();// https://github.com/hiroppy/fusuma/issues/139#issuecomment-508637780
// listenCanvas();
// changeCanvasState(getValue().status === 'start');
},[]);return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{className:"fusuma-presenter-view"},usedCanvas&&react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Canvas__WEBPACK_IMPORTED_MODULE_3__["Canvas"],{disabled:true,hideGrid:true}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Base__WEBPACK_IMPORTED_MODULE_1__["Base"],{slides:slides,hash:hash,showIndex:false}));});/* harmony default export */ __webpack_exports__["default"] = (View);

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Receiver", function() { return Receiver; });
function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}var Receiver=/*#__PURE__*/function(){function Receiver(){_classCallCheck(this,Receiver);this.apiType=navigator.presentation&&navigator.presentation.receiver?'presentation':'localStorage';if(this.apiType==='presentation')this.setUp();}_createClass(Receiver,[{key:"registerEvent",value:function registerEvent(name,cb){navigator.presentation.receiver.connectionList.then(function(list){list.connections.forEach(function(connection){connection.addEventListener(name,cb);});list.addEventListener('connectionavailable',function(event){cb(event.connection);});});}},{key:"setUp",value:function setUp(){this.registerEvent('close',function(e){console.log(e);});}},{key:"onChangePage",value:function onChangePage(cb){if(this.apiType==='presentation'){this.registerEvent('message',function(e){var page=JSON.parse(e.data).page;cb(page);});}else{window.addEventListener('storage',function(e){if(e.key==='page'){var page=JSON.parse(e.newValue).page;cb(page);}});}}}]);return Receiver;}();

/***/ })

};;