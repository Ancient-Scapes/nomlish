var nomlish = require("../dist/main");

async function main() {
  await nomlish.init();
  
  console.time("翻訳だけにかかった時間");
  var text = null;
  if(process.argv[3]){
    text = await nomlish.translate(process.argv[2], String(process.argv[3]));
  } else {
    text = await nomlish.translate(process.argv[2]);
  }
  console.timeEnd("翻訳だけにかかった時間");
  console.log(text);

  nomlish.close();
}
main();
