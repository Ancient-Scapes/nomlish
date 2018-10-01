let axios = require('axios').default;
const libxmljs = require("libxmljs");
const querystring = require('querystring');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const cookieJar = new tough.CookieJar();
axiosCookieJarSupport(axios);
axios.defaults.withCredentials = true;
axios.defaults.jar = cookieJar;

const NOMLISH_URL = "https://racing-lagoon.info/nomu/translate.php";
const xpathToekn = '//input[@name="token"]';
const xpathAfter = '//textarea[@name="after1"]';

/**
 * テキストをノムリッシュテキストに変換します。
 *
 * @export
 * @param {String} text 変換前テキスト
 * @param {Number} level 翻訳レベル:1~6
 * @returns ノムリッシュ・テキスト
 */
export function translate(text, level) {
  return new Promise((resolve, reject) => {
    axios.get(NOMLISH_URL)
      .then((response) => {
        let html = libxmljs.parseHtml(response.data);
        // ページを開いた時にhidden要素で用意されているtokenを入れる
        const token = html.get(xpathToekn).attr("value").value();
        const postParams = setPostParam(text, level, token);
        
        axios.post(NOMLISH_URL, postParams)
          .then((response) => {
            html = libxmljs.parseHtml(response.data);
            return html.get(xpathAfter).text();
          })
          .then(nomlishText => resolve(nomlishText))
          .catch(error => reject(error.response.status));
      })
      .catch(error => reject(error.response.status));
  });
}


/**
 * 翻訳レベルを取得する
 *
 * @param {Number} level 翻訳レベル
 * @returns 2~5の翻訳レベル
 */
function getLevel(level) {
  if(0 < level && 6 > level) {
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
  const params = {
    options : "nochk",
    transbtn: "翻訳",
    before  : text,
    level   : getLevel(level),
    token   : token
  };
  return querystring.stringify(params);
}