// const test = require('ava');
// const nomlish  = require('../dist/main');

import test from 'ava';
import NomlishTranslate from '../dist/main';

// サイトに接続できるか
test('connect', async t => {
  let nomlish = new NomlishTranslate();
  await nomlish.init();
  const url = nomlish.page.url();
  await nomlish.close();

  t.is(url, "https://racing-lagoon.info/nomu/translate.php");
});

// 翻訳レベルの指定なしで変換できているか
test('translate', async t => {
  let nomlish = new NomlishTranslate();
  const text = await "テスト用文字列あいうえお";
  await nomlish.init();
  const translateText = await nomlish.translate(text);
  await nomlish.close();

  t.not(text, translateText);
});

// フォームの翻訳レベルを正しく指定できているか(引数にNumberを指定)
// フォームの翻訳レベルを正しく指定できているか(引数にStringを指定)

// 例外:translateの第一引数にテキストなし
// 例外:translateの第二引数に不適切な文字列を与える