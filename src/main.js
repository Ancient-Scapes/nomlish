let axios = require('axios').default;
const cheerio = require("cheerio");
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const cookieJar = new tough.CookieJar();
axiosCookieJarSupport(axios);
axios.defaults.withCredentials = true;
axios.defaults.jar = cookieJar;

const NOMLISH_URL = "https://racing-lagoon.info/nomu/translate.php";
const postParams = new URLSearchParams();
postParams.append("options", "nochk");
postParams.append("transbtn", "翻訳");

/**
 * テキストをノムリッシュテキストに変換します。
 *
 * @export
 * @param {*} text 変換前テキスト
 * @param {*} level 翻訳レベル:デフォルトでは2
 * @returns ノムリッシュ・テキスト
 */
export function translate(text, level) {
  postParams.append("before", text);
  postParams.append("level", getLevel(level));

  return new Promise((resolve, reject) => {
    axios.get(NOMLISH_URL).then( (response) => {
      let $ = cheerio.load(response.data);
      // ページを開いた時にhidden要素で用意されているtokenを入れる
      postParams.append("token", $('input[name="token"]').val());
      
      axios.post(NOMLISH_URL, postParams).then((response) => {
        $ = cheerio.load(response.data);
        return $('textarea[name="after1"]').text();
      })
      .then(nomlishText => resolve(nomlishText))
      .catch(error => reject(error.response.status))
    });
  });
}

function getLevel(level) {
  if(0 < level && 7 > level) {
    return level;
  } else {
    return 2;
  }
}