const test = require("ava");
const nomlish = require("../dist/main")

// レベル指定なしでの翻訳テスト
test('cheerio', t => {
  const beforeText = "テスト用文字列あいうえお";

  return nomlish.translate(beforeText).then((nomlishText) => {
    console.log(nomlishText);
    t.not(nomlishText, beforeText, "翻訳できました");
  });
});

// 翻訳レベルの指定(stringの時)
// 翻訳レベルの指定(numberの時)

// 例外:translateの第一引数にテキストなし
// 例外:翻訳レベルに数字以外の不適切な値が入った場合
