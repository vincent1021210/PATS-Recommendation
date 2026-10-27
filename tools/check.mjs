// 建置後的 SEO 自我檢查：node tools/check.mjs
// 檢查每頁的 title/description 長度、canonical、hreflang、h1 數量、JSON-LD 可解析、圖片 alt 與站內連結是否存在。
import fs from 'node:fs';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, ROUTES } from '../src/lib.mjs';

const ROOT = nodePath.resolve(nodePath.dirname(fileURLToPath(import.meta.url)), '..');
let problems = 0;

function fail(file, msg) { problems++; console.log('✗', file, '：', msg); }

function exists(href) {
  const p = href.split('#')[0].split('?')[0];
  if (!p.startsWith(SITE.basePath + '/')) return true;
  const local = nodePath.join(ROOT, p.slice(SITE.basePath.length));
  return fs.existsSync(p.endsWith('/') ? nodePath.join(local, 'index.html') : local);
}

const files = [];
Object.keys(ROUTES).forEach(function (k) {
  Object.keys(ROUTES[k]).forEach(function (lang) { files.push(ROUTES[k][lang].replace(/^\//, '') + 'index.html'); });
});

files.forEach(function (f) {
  const html = fs.readFileSync(nodePath.join(ROOT, f), 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const isEn = f.startsWith('en/');
  if (!title) fail(f, '缺 title');
  if (isEn ? title.length > 65 : title.length > 32) fail(f, 'title 太長（' + title.length + '）');
  if (!desc) fail(f, '缺 description');
  if (isEn ? desc.length > 170 : desc.length > 90) fail(f, 'description 太長（' + desc.length + '）');
  if (!/<link rel="canonical"/.test(html)) fail(f, '缺 canonical');
  if ((html.match(/hreflang="(zh-Hant|en|x-default)" href=/g) || []).length < 3) fail(f, 'hreflang 不完整');
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail(f, 'h1 數量不是 1');
  if (!/property="og:image"/.test(html)) fail(f, '缺 og:image');
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ld) fail(f, '缺 JSON-LD');
  else {
    try {
      const types = JSON.parse(ld[1])['@graph'].map(function (n) { return n['@type']; });
      console.log('✓', f, '|', title.length, '/', desc.length, '|', types.join(', '));
    } catch (e) { fail(f, 'JSON-LD 解析失敗：' + e.message); }
  }
  (html.match(/<img [^>]*>/g) || []).forEach(function (img) {
    if (!/alt="[^"]+"/.test(img)) fail(f, '圖片缺 alt：' + img);
    const src = (img.match(/src="([^"]+)"/) || [])[1];
    if (src && !exists(src)) fail(f, '圖片不存在：' + src);
  });
  (html.match(/href="([^"]+)"/g) || []).forEach(function (h) {
    const href = h.slice(6, -1);
    if (href.startsWith('/') && !exists(href)) fail(f, '站內連結失效：' + href);
  });
});

console.log(problems ? '\n共 ' + problems + ' 個問題' : '\n全部通過');
process.exit(problems ? 1 : 0);
