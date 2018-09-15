class Nomlish{

  constructor(text, level, option) {
    this.text   = text;
    this.level  = level;
    this.option = option;
    this.url    = "https://racing-lagoon.info/nomu/translate.php";
  }

  async setFormParamater(page) {
    const s_textJapanese = "body > form > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > textarea";
    const s_selectLevel   = ".levelselect";
    const s_selectOption  = ".optionselect"

    await page.type(s_textJapanese, this.text);
    if(this.level !== null)  await page.select(s_selectLevel, this.level);
    if(this.option !== null) await page.select(s_selectOption, this.option);
  }

  // 取得した日本語を基にフォームに入力しPOSTする
  // ドローした旧き言霊を魔晄炉にフォームに咏唱しPOSTする
  async postForm(page) {
    await page.click("input[name='transbtn']");
    await page.waitForNavigation({timeout: 60000, waitUntil: "networkidle2"});
  }

  // POST結果からノムリッシュ・テキストを取得する
  // POST神々の導き出したる道筋からノムリッシュ、全ての終わりを告げる神々の神代文字を取得破壊し尽くす
  async fetchNomlishText(page) {
    const s_textNomlish = "body > form > div:nth-child(3) > div:nth-child(4) > div:nth-child(5) > textarea";

    return page.evaluate((selector) => {
      return document.querySelector(selector).textContent;
    }, s_textNomlish);
  }

}

export default Nomlish;