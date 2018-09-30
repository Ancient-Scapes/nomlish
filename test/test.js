const test = require("ava");
const nomlish = require("../dist/main");
const beforeText = "テスト用文字列あいうえおシュガーシューティングスターフェットチーネグミピュレグミイエーイ渋谷最高";

test('textOnly', t => {
  return nomlish.translate(beforeText).then((nomlishText) => {
    t.not(nomlishText, beforeText);
  });
});

test('level-string', t => {
  const level = "4";
  return nomlish.translate(beforeText, level).then((nomlishText) => {
    t.not(nomlishText, beforeText);
  });
});

test('level-number', t => {
  const level = 4;
  return nomlish.translate(beforeText, level).then((nomlishText) => {
    t.not(nomlishText, beforeText);
  });
});

// 翻訳レベルに不適切なパラメータが入った場合、デフォルトの翻訳レベル2で翻訳が実行される
test('level-incorrect', t => {
  const level = "不適切なレベル";
  return nomlish.translate(beforeText, level).then((nomlishText) => {
    t.not(nomlishText, beforeText);
  });
});