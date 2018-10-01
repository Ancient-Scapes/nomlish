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
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
var axios = __webpack_require__(/*! axios */ "axios").default;

var libxmljs = __webpack_require__(/*! libxmljs */ "libxmljs");

var querystring = __webpack_require__(/*! querystring */ "querystring");

var axiosCookieJarSupport = __webpack_require__(/*! axios-cookiejar-support */ "axios-cookiejar-support").default;

var tough = __webpack_require__(/*! tough-cookie */ "tough-cookie");

var cookieJar = new tough.CookieJar();
axiosCookieJarSupport(axios);
axios.defaults.withCredentials = true;
axios.defaults.jar = cookieJar;
var NOMLISH_URL = "https://racing-lagoon.info/nomu/translate.php";
var xpathToekn = '//input[@name="token"]';
var xpathAfter = '//textarea[@name="after1"]';
/**
 * テキストをノムリッシュテキストに変換します。
 *
 * @export
 * @param {String} text 変換前テキスト
 * @param {Number} level 翻訳レベル:1~6
 * @returns ノムリッシュ・テキスト
 */

function translate(text, level) {
  return new Promise(function (resolve, reject) {
    axios.get(NOMLISH_URL).then(function (response) {
      var html = libxmljs.parseHtml(response.data); // ページを開いた時にhidden要素で用意されているtokenを入れる

      var token = html.get(xpathToekn).attr("value").value();
      var postParams = setPostParam(text, level, token);
      axios.post(NOMLISH_URL, postParams).then(function (response) {
        html = libxmljs.parseHtml(response.data);
        return html.get(xpathAfter).text();
      }).then(function (nomlishText) {
        return resolve(nomlishText);
      }).catch(function (error) {
        return reject(error.response.status);
      });
    }).catch(function (error) {
      return reject(error.response.status);
    });
  });
}
/**
 * 翻訳レベルを取得する
 *
 * @param {Number} level 翻訳レベル
 * @returns 2~5の翻訳レベル
 */

function getLevel(level) {
  if (0 < level && 6 > level) {
    return level;
  } else {
    return 2;
  }
}
/**
 * フォームをPOSTするのに必要なパラメータの設定
 *
 * @param {String} text 変換前テキスト
 * @param {Number} level 翻訳レベル:1~6
 * @param {String} token POSTに必要なトークン
 * @returns POSTパラメータ
 */


function setPostParam(text, level, token) {
  var params = {
    options: "nochk",
    transbtn: "翻訳",
    before: text,
    level: getLevel(level),
    token: token
  };
  return querystring.stringify(params);
}

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "axios-cookiejar-support":
/*!******************************************!*\
  !*** external "axios-cookiejar-support" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios-cookiejar-support");

/***/ }),

/***/ "libxmljs":
/*!***************************!*\
  !*** external "libxmljs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("libxmljs");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),

/***/ "tough-cookie":
/*!*******************************!*\
  !*** external "tough-cookie" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tough-cookie");

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub21saXNoL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9ub21saXNoL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25vbWxpc2gvLi9zcmMvbWFpbi5qcyIsIndlYnBhY2s6Ly9ub21saXNoL2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9ub21saXNoL2V4dGVybmFsIFwiYXhpb3MtY29va2llamFyLXN1cHBvcnRcIiIsIndlYnBhY2s6Ly9ub21saXNoL2V4dGVybmFsIFwibGlieG1sanNcIiIsIndlYnBhY2s6Ly9ub21saXNoL2V4dGVybmFsIFwicXVlcnlzdHJpbmdcIiIsIndlYnBhY2s6Ly9ub21saXNoL2V4dGVybmFsIFwidG91Z2gtY29va2llXCIiXSwibmFtZXMiOlsiYXhpb3MiLCJkZWZhdWx0IiwibGlieG1sanMiLCJxdWVyeXN0cmluZyIsImF4aW9zQ29va2llSmFyU3VwcG9ydCIsInRvdWdoIiwiY29va2llSmFyIiwiQ29va2llSmFyIiwiZGVmYXVsdHMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJqYXIiLCJOT01MSVNIX1VSTCIsInhwYXRoVG9la24iLCJ4cGF0aEFmdGVyIiwidHJhbnNsYXRlIiwidGV4dCIsImxldmVsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJodG1sIiwicGFyc2VIdG1sIiwiZGF0YSIsInRva2VuIiwiYXR0ciIsInZhbHVlIiwicG9zdFBhcmFtcyIsInNldFBvc3RQYXJhbSIsInBvc3QiLCJub21saXNoVGV4dCIsImNhdGNoIiwiZXJyb3IiLCJzdGF0dXMiLCJnZXRMZXZlbCIsInBhcmFtcyIsIm9wdGlvbnMiLCJ0cmFuc2J0biIsImJlZm9yZSIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNE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QUEsT0FOZDtBQU9ELEtBZEgsRUFlR0YsS0FmSCxDQWVTLFVBQUFDLEtBQUs7QUFBQSxhQUFJZixNQUFNLENBQUNlLEtBQUssQ0FBQ1osUUFBTixDQUFlYSxNQUFoQixDQUFWO0FBQUEsS0FmZDtBQWdCRCxHQWpCTSxDQUFQO0FBa0JEO0FBR0Q7Ozs7Ozs7QUFNQSxTQUFTQyxRQUFULENBQWtCcEIsS0FBbEIsRUFBeUI7QUFDdkIsTUFBRyxJQUFJQSxLQUFKLElBQWEsSUFBSUEsS0FBcEIsRUFBMkI7QUFDekIsV0FBT0EsS0FBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU8sQ0FBUDtBQUNEO0FBQ0Y7QUFFRDs7Ozs7Ozs7OztBQVFBLFNBQVNjLFlBQVQsQ0FBc0JmLElBQXRCLEVBQTRCQyxLQUE1QixFQUFtQ1UsS0FBbkMsRUFBMEM7QUFDeEMsTUFBTVcsTUFBTSxHQUFHO0FBQ2JDLFdBQU8sRUFBRyxPQURHO0FBRWJDLFlBQVEsRUFBRSxJQUZHO0FBR2JDLFVBQU0sRUFBSXpCLElBSEc7QUFJYkMsU0FBSyxFQUFLb0IsUUFBUSxDQUFDcEIsS0FBRCxDQUpMO0FBS2JVLFNBQUssRUFBS0E7QUFMRyxHQUFmO0FBT0EsU0FBT3ZCLFdBQVcsQ0FBQ3NDLFNBQVosQ0FBc0JKLE1BQXRCLENBQVA7QUFDRCxDOzs7Ozs7Ozs7OztBQzNFRCxrQzs7Ozs7Ozs7Ozs7QUNBQSxvRDs7Ozs7Ozs7Ozs7QUNBQSxxQzs7Ozs7Ozs7Ozs7QUNBQSx3Qzs7Ozs7Ozs7Ozs7QUNBQSx5QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibm9tbGlzaFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJub21saXNoXCJdID0gZmFjdG9yeSgpO1xufSkoZ2xvYmFsLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYWluLmpzXCIpO1xuIiwibGV0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKS5kZWZhdWx0O1xuY29uc3QgbGlieG1sanMgPSByZXF1aXJlKFwibGlieG1sanNcIik7XG5jb25zdCBxdWVyeXN0cmluZyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5nJyk7XG5jb25zdCBheGlvc0Nvb2tpZUphclN1cHBvcnQgPSByZXF1aXJlKCdheGlvcy1jb29raWVqYXItc3VwcG9ydCcpLmRlZmF1bHQ7XG5jb25zdCB0b3VnaCA9IHJlcXVpcmUoJ3RvdWdoLWNvb2tpZScpO1xuY29uc3QgY29va2llSmFyID0gbmV3IHRvdWdoLkNvb2tpZUphcigpO1xuYXhpb3NDb29raWVKYXJTdXBwb3J0KGF4aW9zKTtcbmF4aW9zLmRlZmF1bHRzLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5heGlvcy5kZWZhdWx0cy5qYXIgPSBjb29raWVKYXI7XG5cbmNvbnN0IE5PTUxJU0hfVVJMID0gXCJodHRwczovL3JhY2luZy1sYWdvb24uaW5mby9ub211L3RyYW5zbGF0ZS5waHBcIjtcbmNvbnN0IHhwYXRoVG9la24gPSAnLy9pbnB1dFtAbmFtZT1cInRva2VuXCJdJztcbmNvbnN0IHhwYXRoQWZ0ZXIgPSAnLy90ZXh0YXJlYVtAbmFtZT1cImFmdGVyMVwiXSc7XG5cbi8qKlxuICog44OG44Kt44K544OI44KS44OO44Og44Oq44OD44K344Ol44OG44Kt44K544OI44Gr5aSJ5o+b44GX44G+44GZ44CCXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtTdHJpbmd9IHRleHQg5aSJ5o+b5YmN44OG44Kt44K544OIXG4gKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwg57+76Kiz44Os44OZ44OrOjF+NlxuICogQHJldHVybnMg44OO44Og44Oq44OD44K344Ol44O744OG44Kt44K544OIXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUodGV4dCwgbGV2ZWwpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBheGlvcy5nZXQoTk9NTElTSF9VUkwpXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgbGV0IGh0bWwgPSBsaWJ4bWxqcy5wYXJzZUh0bWwocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgIC8vIOODmuODvOOCuOOCkumWi+OBhOOBn+aZguOBq2hpZGRlbuimgee0oOOBp+eUqOaEj+OBleOCjOOBpuOBhOOCi3Rva2Vu44KS5YWl44KM44KLXG4gICAgICAgIGNvbnN0IHRva2VuID0gaHRtbC5nZXQoeHBhdGhUb2VrbikuYXR0cihcInZhbHVlXCIpLnZhbHVlKCk7XG4gICAgICAgIGNvbnN0IHBvc3RQYXJhbXMgPSBzZXRQb3N0UGFyYW0odGV4dCwgbGV2ZWwsIHRva2VuKTtcbiAgICAgICAgXG4gICAgICAgIGF4aW9zLnBvc3QoTk9NTElTSF9VUkwsIHBvc3RQYXJhbXMpXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBodG1sID0gbGlieG1sanMucGFyc2VIdG1sKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIGh0bWwuZ2V0KHhwYXRoQWZ0ZXIpLnRleHQoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKG5vbWxpc2hUZXh0ID0+IHJlc29sdmUobm9tbGlzaFRleHQpKVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiByZWplY3QoZXJyb3IucmVzcG9uc2Uuc3RhdHVzKSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHJlamVjdChlcnJvci5yZXNwb25zZS5zdGF0dXMpKTtcbiAgfSk7XG59XG5cblxuLyoqXG4gKiDnv7voqLPjg6zjg5njg6vjgpLlj5blvpfjgZnjgotcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwg57+76Kiz44Os44OZ44OrXG4gKiBAcmV0dXJucyAyfjXjga7nv7voqLPjg6zjg5njg6tcbiAqL1xuZnVuY3Rpb24gZ2V0TGV2ZWwobGV2ZWwpIHtcbiAgaWYoMCA8IGxldmVsICYmIDYgPiBsZXZlbCkge1xuICAgIHJldHVybiBsZXZlbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gMjtcbiAgfVxufVxuXG4vKipcbiAqIOODleOCqeODvOODoOOCklBPU1TjgZnjgovjga7jgavlv4XopoHjgarjg5Hjg6njg6Hjg7zjgr/jga7oqK3lrppcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGV4dCDlpInmj5vliY3jg4bjgq3jgrnjg4hcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCDnv7voqLPjg6zjg5njg6s6MX42XG4gKiBAcGFyYW0ge1N0cmluZ30gdG9rZW4gUE9TVOOBq+W/heimgeOBquODiOODvOOCr+ODs1xuICogQHJldHVybnMgUE9TVOODkeODqeODoeODvOOCv1xuICovXG5mdW5jdGlvbiBzZXRQb3N0UGFyYW0odGV4dCwgbGV2ZWwsIHRva2VuKSB7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBvcHRpb25zIDogXCJub2Noa1wiLFxuICAgIHRyYW5zYnRuOiBcIue/u+ios1wiLFxuICAgIGJlZm9yZSAgOiB0ZXh0LFxuICAgIGxldmVsICAgOiBnZXRMZXZlbChsZXZlbCksXG4gICAgdG9rZW4gICA6IHRva2VuXG4gIH07XG4gIHJldHVybiBxdWVyeXN0cmluZy5zdHJpbmdpZnkocGFyYW1zKTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvcy1jb29raWVqYXItc3VwcG9ydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsaWJ4bWxqc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxdWVyeXN0cmluZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0b3VnaC1jb29raWVcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==