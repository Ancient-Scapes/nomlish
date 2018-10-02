# nomlish(ノムリッシュ翻訳)

<img src="./readme_picture/logo.png" width="100%">

![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg) [![npm version](https://badge.fury.io/js/nomlish.svg)](https://badge.fury.io/js/nomlish) [![Build Status](https://travis-ci.org/SugarShootingStar/nomlish.svg?branch=master)](https://travis-ci.org/SugarShootingStar/nomlish) 
[![Coverage Status](https://img.shields.io/coveralls/SugarShootingStar/nomlish.svg)](https://coveralls.io/r/SugarShootingStar/nomlish?branch=master)

# Description(概要)

任意の文字列をノムリッシュ・テキストに変換するライブラリです。

axiosとlibxmljsを用いて実装されています。axiosベースのためすべてPromiseで処理結果が返ってきます。

### nomlish.translate(text, level)

- text 任意のString
- level 1~5のNumber
  - 1:日→野 Lv1
  - 2:日→野 Lv2
  - 3:日→野 Lv3
  - 4:日→野 Lv4
  - 5:日→ラグーン語
- returns Promise

# Installation(セットアップ方法)

Using npm:
```
$ npm install nomlish
```

Using yarn:
```
$ yarn add nomlish
```


# Usage(使用方法)


## example(例)

- 翻訳(翻訳レベル指定なし) Promise ver.
```javascript
const nomlish = require("nomlish");

const beforeText = "任意の文字列をノムリッシュ・テキストに変換するライブラリです。";

nomlish.translate(beforeText)
  .then((nomlishText) => {
     // ニン・インの文字列をノムリスッシュ――テキストに変換実行するラインヴラ・リ=フォースライトだと願うことは、許されなかった──。
    console.log(nomlishText);
  });
```

- 翻訳(翻訳レベル指定あり) Promise ver.
```javascript
const nomlish = require("nomlish");

const beforeText = "任意の文字列をノムリッシュ・テキストに変換するライブラリです。";
const level = 4;

nomlish.translate(beforeText, level)
  .then((nomlishText) => {
     // ・・・そのグルガン族の男は静かに語った・・・善悪の彼岸に立ちそれを望む者任意のビビとお医者さんごっこをした文字列をノムティスリスッ・シェュ(CV・日野聡)……神代文字に破壊と創造宿命を背負う騎士千人分の魔力を誇るラーインヴラー＝リかもしれぬな…。・・・これは、一篇の物語ではない。自ら綴る歴史であり、運命である。
    console.log(nomlishText);
  });
```
# Licence(ライセンス)

This software is released under the MIT License, see LICENSE.

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

# Authors(作者)

- Source Code:SugarShootingStar(@_Ancient_Scapes)

- Nomlish Translate Site: http://racing-lagoon.info/