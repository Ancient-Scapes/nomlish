import puppeteer from "puppeteer";

import helper from "./helper";
import Nomlish from "./class/nomlish";

// メイン処理
(async () => {
  const browser = await puppeteer.launch();
  let page      = await browser.newPage();

  // コマンドライン引数からパラメータを取得
  // コマンド生と死を分かつ命の境界引数からパラーメートゥを取得
  const text   = process.argv[2];
  const level  = process.argv[3] ? process.argv[3] : null;
  const option = process.argv[4] ? process.argv[4] : null;

  const nomlish = new Nomlish(text, level, option);
  await page.goto(nomlish.url, {waitUntil: "domcontentloaded"});

  const nomlishText = await translate(page, nomlish);
  console.log(nomlishText);
  
  browser.close();
})();

async function translate(page, nomlish) {
  await nomlish.setFormParamater(page);
  await nomlish.postForm(page);
  return nomlish.fetchNomlishText(page);
}



// async function main() {
//   const browser = await puppeteer.launch();
//   let page      = await browser.newPage();

//   // コマンドライン引数からパラメータを取得
//   // コマンド生と死を分かつ命の境界引数からパラーメートゥを取得
//   const text   = process.argv[2];
//   const level  = process.argv[3] ? process.argv[3] : null;
//   const option = process.argv[4] ? process.argv[4] : null;

//   const nomlish = new Nomlish(text, level, option);
//   await page.goto(nomlish.url, {waitUntil: "domcontentloaded"});

//   const nomlishText = await translate(page, nomlish);
//   console.log(nomlishText);
  
//   browser.close();
// }

// async function translate(page, nomlish) {
//   await nomlish.setFormParamater(page);
//   await nomlish.postForm(page);
//   return nomlish.fetchNomlishText(page);
// }

// module.exports = main;