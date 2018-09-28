const cheerio = require("cheerio");
let request = require("request");
request = request.defaults({jar: true});

const NOMLISH_URL = "https://racing-lagoon.info/nomu/translate.php";
let params = {
  method: "POST",
  url: NOMLISH_URL,
  form: {
    level : 2,
    options : "nochk",
    transbtn: "翻訳",
  }
};


/**
 * テキストをノムリッシュテキストに変換します。
 *
 * @export
 * @param {*} text 変換前テキスト
 * @param {*} level 翻訳レベル:デフォルトでは2
 * @returns
 */
export function translate(text, level) {
  return new Promise((resolve, reject) => {
    params.form.before = text;

    request({url: NOMLISH_URL},function(error,response,body){
      if (error && response.statusCode == 200) {
        reject(error);
      } 

      let $ = cheerio.load(body);
      params.form.token = $('input[name="token"]').val();

      request.post(params, function(error, response, body){
        if (error && response.statusCode == 200) {
          reject(error);
        }
        $ = cheerio.load(body);
        const nomlishText = $('textarea[name="after1"]').text();
        resolve(nomlishText);
      })
    });
  });
}