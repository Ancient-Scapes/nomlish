let axios = require('axios').default;
const libxmljs = require("libxmljs");
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const cookieJar = new tough.CookieJar();
axiosCookieJarSupport(axios);
axios.defaults.withCredentials = true;
axios.defaults.jar = cookieJar;

const NOMLISH_URL = "https://racing-lagoon.info/nomu/translate.php";
const xpathToekn = '//input[@name="token"]';
const xpathAfter = '//textarea[@name="after1"]';
const postParams = new URLSearchParams();
postParams.append("options", "nochk");
postParams.append("transbtn", "翻訳");

/**
 * テキストをノムリッシュテキストに変換します。
 *
 * @export
 * @param {String} text 変換前テキスト
 * @param {Number} level 翻訳レベル:1~6
 * @returns ノムリッシュ・テキスト
 */
export function translate(text, level) {
  postParams.append("before", text);
  postParams.append("level", getLevel(level));

  return new Promise((resolve, reject) => {
    axios.get(NOMLISH_URL)
      .then((response) => {
        let html = libxmljs.parseHtml(response.data);
        // ページを開いた時にhidden要素で用意されているtokenを入れる
        const token = html.get(xpathToekn).attr("value").value();
        postParams.append("token", token);
        
        axios.post(NOMLISH_URL, postParams)
          .then((response) => {
            html = libxmljs.parseHtml(response.data);
            return html.get(xpathAfter).text();
          })
          .then(nomlishText => resolve(nomlishText))
          .catch(error => reject(error.response.status))
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
  if(0 < level && 6 > level) {
    return level;
  } else {
    return 2;
  }
}