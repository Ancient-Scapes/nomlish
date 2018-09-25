import puppeteer from "puppeteer";
import Helper from "./nomlishPageHelper";

export default class NomlishTranslate {

  constructor() {
    this.browser = null;
    this.page = null;
  }

  /**
   * ブラウザの立ち上げ関係処理
   * 
   * @export
   */
  async init() {
    this.browser = await puppeteer.launch({
      // headless: false,
      args: ['--disable-infobars','--disable-notifications']
    });
    this.page    = await this.browser.newPage();
    await pageLoadSetting(this.page);
    await this.page.goto("https://racing-lagoon.info/nomu/translate.php");
  }

  /**
   * 日本語をノムリッシュ・テキストに翻訳して返すメイン処理
   *
   * @export
   * @param {*} _text 日本語テキスト
   * @param {*} _level 翻訳レベル
   * @returns  ノムリッシュ・テキスト
   */
  async translate(_text, _level) {
    const level = _level || null;
    // await page.goto("https://racing-lagoon.info/nomu/translate.php");
    const nomlish = new Helper(_text, level);
    return translateJapanese(this.page, nomlish);
  }

  /**
   * ブラウザを閉じる
   *
   * @export
   */
  async close() {
    await this.browser.close();
  }

}


/**
 * ページ読み込み時の設定を行う
 *
 * @param {*} page ノムリッシュ翻訳サイト
 */
async function pageLoadSetting(page) {
  // 画像、CSS、フォント、scriptの読み込みをしない指定で高速化
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
      request.abort();
    } else {
      request.continue();
    }
  });
}

/**
 * ノムリッシュテキストを取得するための処理を行う
 *
 * @param {*} page ノムリッシュ翻訳サイト
 * @param {*} nomlish ノムリッシュ翻訳サイトの処理Class
 * @returns ノムリッシュ・テキスト
 */
async function translateJapanese(page, nomlish) {
  await nomlish.setFormParamater(page);
  await nomlish.postForm(page);
  return nomlish.fetchNomlishText(page);
}