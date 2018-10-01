(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["nomlish"] = factory();
	else
		root["nomlish"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: translate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"translate\", function() { return translate; });\nvar axios = __webpack_require__(/*! axios */ \"axios\").default;\n\nvar libxmljs = __webpack_require__(/*! libxmljs */ \"libxmljs\");\n\nvar querystring = __webpack_require__(/*! querystring */ \"querystring\");\n\nvar axiosCookieJarSupport = __webpack_require__(/*! axios-cookiejar-support */ \"axios-cookiejar-support\").default;\n\nvar tough = __webpack_require__(/*! tough-cookie */ \"tough-cookie\");\n\nvar cookieJar = new tough.CookieJar();\naxiosCookieJarSupport(axios);\naxios.defaults.withCredentials = true;\naxios.defaults.jar = cookieJar;\nvar NOMLISH_URL = \"https://racing-lagoon.info/nomu/translate.php\";\nvar xpathToekn = '//input[@name=\"token\"]';\nvar xpathAfter = '//textarea[@name=\"after1\"]';\n/**\n * テキストをノムリッシュテキストに変換します。\n *\n * @export\n * @param {String} text 変換前テキスト\n * @param {Number} level 翻訳レベル:1~6\n * @returns ノムリッシュ・テキスト\n */\n\nfunction translate(text, level) {\n  return new Promise(function (resolve, reject) {\n    axios.get(NOMLISH_URL).then(function (response) {\n      var html = libxmljs.parseHtml(response.data); // ページを開いた時にhidden要素で用意されているtokenを入れる\n\n      var token = html.get(xpathToekn).attr(\"value\").value();\n      var postParams = setPostParam(text, level, token);\n      axios.post(NOMLISH_URL, postParams).then(function (response) {\n        html = libxmljs.parseHtml(response.data);\n        return html.get(xpathAfter).text();\n      }).then(function (nomlishText) {\n        return resolve(nomlishText);\n      }).catch(function (error) {\n        return reject(error.response.status);\n      });\n    }).catch(function (error) {\n      return reject(error.response.status);\n    });\n  });\n}\n/**\n * 翻訳レベルを取得する\n *\n * @param {Number} level 翻訳レベル\n * @returns 2~5の翻訳レベル\n */\n\nfunction getLevel(level) {\n  if (0 < level && 6 > level) {\n    return level;\n  } else {\n    return 2;\n  }\n}\n/**\n * フォームをPOSTするのに必要なパラメータの設定\n *\n * @param {String} text 変換前テキスト\n * @param {Number} level 翻訳レベル:1~6\n * @param {String} token POSTに必要なトークン\n * @returns POSTパラメータ\n */\n\n\nfunction setPostParam(text, level, token) {\n  var params = {\n    options: \"nochk\",\n    transbtn: \"翻訳\",\n    before: text,\n    level: getLevel(level),\n    token: token\n  };\n  return querystring.stringify(params);\n}\n\n//# sourceURL=webpack://nomlish/./src/main.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack://nomlish/external_%22axios%22?");

/***/ }),

/***/ "axios-cookiejar-support":
/*!******************************************!*\
  !*** external "axios-cookiejar-support" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios-cookiejar-support\");\n\n//# sourceURL=webpack://nomlish/external_%22axios-cookiejar-support%22?");

/***/ }),

/***/ "libxmljs":
/*!***************************!*\
  !*** external "libxmljs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"libxmljs\");\n\n//# sourceURL=webpack://nomlish/external_%22libxmljs%22?");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"querystring\");\n\n//# sourceURL=webpack://nomlish/external_%22querystring%22?");

/***/ }),

/***/ "tough-cookie":
/*!*******************************!*\
  !*** external "tough-cookie" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"tough-cookie\");\n\n//# sourceURL=webpack://nomlish/external_%22tough-cookie%22?");

/***/ })

/******/ });
});