import puppeteer from "puppeteer";
import Nomlish from "./class/nomlish";

let browser = null;
let page = null;

export async function init() {
  browser = await puppeteer.launch({
    // headless:false,
    args: ['--disable-infobars','--disable-notifications']
  });
  page    = await browser.newPage();
  // 画像、CSS、フォント、scriptの読み込みをしない指定で高速化
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
      request.abort();
    } else {
      request.continue();
    }
  });
  await page.goto("https://racing-lagoon.info/nomu/translate.php");
}

export function close() {
  browser.close();
}

export async function translate(text, level) {
  const nomlish = new Nomlish(text, level);
  return translateJapanese(page, nomlish);
}

async function translateJapanese(page, nomlish) {
  await nomlish.setFormParamater(page);
  await nomlish.postForm(page);
  return nomlish.fetchNomlishText(page);
}