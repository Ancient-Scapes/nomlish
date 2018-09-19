class Nomlish{

  constructor(text, level) {
    this.text   = text;
    this.level  = level;
  }

  async setFormParamater(page) {
    const s_textJapanese = "body > form > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > textarea";
    const s_selectLevel  = ".levelselect";
    const value = this.text;

    await page.evaluate((data) => {
      return document.querySelector(data.s_textJapanese).value = data.value;
    },{s_textJapanese, value})
    if(this.level !== null)  await page.select(s_selectLevel, this.level);
  }

  // 取得した日本語を基にフォームに入力しPOSTする
  async postForm(page) {
    const s_translate = "input[name='transbtn']";
    
    await page.click(s_translate);
    await page.waitForNavigation({timeout: 60000, waitUntil: "networkidle2"});
  }

  // POST結果からノムリッシュ・テキストを取得する
  async fetchNomlishText(page) {
    const s_textNomlish = "body > form > div:nth-child(3) > div:nth-child(4) > div:nth-child(5) > textarea";

    return page.evaluate((selector) => {
      return document.querySelector(selector).textContent;
    }, s_textNomlish);
  }

}

export default Nomlish;