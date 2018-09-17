
exports.getLevel = async function(level) {
  // レベルが1以下か6以上
  if(1 > Number(level) || Number(level) > 6) {
    console.log("lvは1~6の数値で指定してください。");
  }
  return level;
}

