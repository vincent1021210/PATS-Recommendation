// 本機預覽：node tools/serve.mjs [port]，再開 http://localhost:8080/PATS-Recommendation/
// 掛在與 GitHub Pages 相同的子路徑下，站內絕對連結才會正確。
import http from 'node:http';
import fs from 'node:fs';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/lib.mjs';

const ROOT = nodePath.resolve(nodePath.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2]) || 8080;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json'
};

http.createServer(function (req, res) {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' ) { res.writeHead(302, { Location: SITE.basePath + '/' }); return res.end(); }
  if (p.indexOf(SITE.basePath + '/') !== 0) { res.writeHead(404); return res.end('not found'); }
  p = p.slice(SITE.basePath.length);
  let file = nodePath.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (p.endsWith('/')) file = nodePath.join(file, 'index.html');
  fs.readFile(file, function (err, buf) {
    if (err) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      return res.end(fs.readFileSync(nodePath.join(ROOT, '404.html')));
    }
    res.writeHead(200, { 'Content-Type': TYPES[nodePath.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
}).listen(PORT, function () {
  console.log('預覽：http://localhost:' + PORT + SITE.basePath + '/');
});
