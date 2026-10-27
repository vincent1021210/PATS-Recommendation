// 把截圖原檔轉成網站用的各尺寸圖片。
// 用法：node tools/make-images.cjs <截圖資料夾>
// 截圖資料夾需有 og.png、logo.png、desktop.png、mobile-raw.png（見 README）。
// 需要 sharp：在截圖資料夾執行 npm i sharp，本 repo 不放 node_modules。
const path = require('path');
const src = path.resolve(process.argv[2] || '.');
const sharp = require(require.resolve('sharp', { paths: [src] }));
const out = path.resolve(__dirname, '..', 'assets', 'img');

async function main() {
  const jobs = [
    sharp(path.join(src, 'og.png')).resize(1200, 630).png({ compressionLevel: 9, palette: true, quality: 90 })
      .toFile(path.join(out, 'og-image.png')),
    sharp(path.join(src, 'desktop.png')).resize(1280, 800).webp({ quality: 82 })
      .toFile(path.join(out, 'app-login-desktop.webp')),
    // iframe 截圖為 2 倍像素，左上角 780x1688 就是 390x844 的手機畫面
    sharp(path.join(src, 'mobile-raw.png')).extract({ left: 0, top: 0, width: 780, height: 1688 }).webp({ quality: 82 })
      .toFile(path.join(out, 'app-login-mobile.webp'))
  ];
  [[512, 'logo-512.png'], [192, 'logo-192.png'], [180, 'apple-touch-icon.png'], [48, 'favicon-48.png']]
    .forEach(function (s) {
      jobs.push(sharp(path.join(src, 'logo.png')).resize(s[0], s[0]).png({ compressionLevel: 9 })
        .toFile(path.join(out, s[1])));
    });
  const results = await Promise.all(jobs);
  results.forEach(function (r) { console.log(r.width + 'x' + r.height, r.format); });
}

main().catch(function (e) { console.error(e); process.exit(1); });
