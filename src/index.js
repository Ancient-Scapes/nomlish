var nomlish = require("../dist/main");

async function main() {
  var text = await nomlish.translate("ハイ、ヨロシクゥ！30分で5万！良い体してんねえ！", "2");
  console.log(text);
}
main();
