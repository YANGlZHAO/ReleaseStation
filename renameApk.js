const fs = require('fs');
const path = require('path');

const apkDir = path.resolve(__dirname, 'dist/build/app-plus');
const files = fs.readdirSync(apkDir);

const apkFile = files.find(f => f.endsWith('.apk'));

if (apkFile) {
  const oldPath = path.join(apkDir, apkFile);
  const newFileName = '发布站.apk';
  const newPath = path.join(apkDir, newFileName);

  fs.renameSync(oldPath, newPath);
  console.log(`✅ APK 已重命名为：${newFileName}`);
} else {
  console.error('❌ 未找到 .apk 文件');
}
