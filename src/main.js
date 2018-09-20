import puppeteer from "puppeteer";
import Nomlish from "./class/nomlish";

let browser = null;
let page = null;


/**
 * ブラウザの立ち上げ関係処理
 * 
 * @export
 */
export async function init() {
  browser = await puppeteer.launch({
    args: ['--disable-infobars','--disable-notifications']
  });
  page    = await browser.newPage();
  await pageLoadSetting(page);
  await page.goto("https://racing-lagoon.info/nomu/translate.php");
}


/**
 * ブラウザを閉じる
 *
 * @export
 */
export function close() {
  browser.close();
}


/**
 * 日本語をノムリッシュ・テキストに翻訳して返すメイン処理
 *
 * @export
 * @param {*} _text 日本語テキスト
 * @param {*} _level 翻訳レベル
 * @returns  ノムリッシュ・テキスト
 */
export async function translate(_text, _level) {
  const level = _level || null;
  const nomlish = new Nomlish(_text, level);
  return translateJapanese(page, nomlish);
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