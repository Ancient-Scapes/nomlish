class Nomlish{

  constructor(text, level) {
    this.text   = text;
    this.level  = level;
  }

  /**
   * フォームに必要な情報をセットする
   *
   * @param {*} page ノムリッシュ翻訳サイト
   * @memberof Nomlish
   */
  async setFormParamater(page) {
    const s_textJapanese = "body > form > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > textarea";
    const s_selectLevel  = ".levelselect";
    const value = this.text;

    await page.evaluate((data) => {
      return document.querySelector(data.s_textJapanese).value = data.value;
    },{s_textJapanese, value})
    if(this.level !== null)  await page.select(s_selectLevel, this.level);
  }

  
  /**
   * フォームをPOSTし待つ
   *
   * @param {*} page ノムリッシュ翻訳サイト
   * @memberof Nomlish
   */
  async postForm(page) {
    const s_translate = "input[name='transbtn']";
    
    await page.click(s_translate);
    await page.waitForNavigation({timeout: 60000, waitUntil: "networkidle2"});
  }

  /**
   * 翻訳後のテキストを取得する
   *
   * @param {*} page ノムリッシュ翻訳サイト
   * @returns
   * @memberof Nomlish
   */
  async fetchNomlishText(page) {
    const s_textNomlish = "body > form > div:nth-child(3) > div:nth-child(4) > div:nth-child(5) > textarea";

    return page.evaluate((selector) => {
      return document.querySelector(selector).textContent;
    }, s_textNomlish);
  }

}

export default Nomlish;