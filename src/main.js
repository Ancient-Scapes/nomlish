import puppeteer from "puppeteer";
import Nomlish from "./class/nomlish";

export async function translate(text, level) {
  const browser = await puppeteer.launch();
  let page      = await browser.newPage();

  const nomlish = new Nomlish(text, level);
  await page.goto(nomlish.url);

  const nomlishText = await translateJapanese(page, nomlish);
  browser.close();

  return nomlishText;
}

async function translateJapanese(page, nomlish) {
  await nomlish.setFormParamater(page);
  await nomlish.postForm(page);
  return nomlish.fetchNomlishText(page);
}