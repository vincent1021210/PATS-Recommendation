// 共用設定與 HTML 小工具（內容檔與建置腳本都會用到）

export const SITE = {
  origin: 'https://vincent1021210.github.io',
  basePath: '/PATS-Recommendation',
  appUrl: 'https://vincent1021210.github.io/',
  repoUrl: 'https://github.com/vincent1021210/PATS-Recommendation',
  published: '2026-10-27',
  updated: '2026-10-27',
  brandColor: '#2563eb'
};

export const BASE_URL = SITE.origin + SITE.basePath;

// 每個頁面在兩種語言下的路徑（相對於 basePath）
export const ROUTES = {
  home:       { 'zh-Hant': '/',                    en: '/en/' },
  faq:        { 'zh-Hant': '/faq/',                en: '/en/faq/' },
  noLine:     { 'zh-Hant': '/guides/no-line/',     en: '/en/guides/no-line/' },
  getStarted: { 'zh-Hant': '/guides/get-started/', en: '/en/guides/get-started/' }
};

export function path(lang, key, hash) {
  return SITE.basePath + ROUTES[key][lang] + (hash ? '#' + hash : '');
}

export function url(lang, key, hash) {
  return SITE.origin + path(lang, key, hash);
}

export function asset(p) {
  return SITE.basePath + '/assets/' + p;
}

export function assetUrl(p) {
  return SITE.origin + asset(p);
}

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function section(id, title, html, cls) {
  return '<section id="' + id + '" class="section' + (cls ? ' ' + cls : '') + '" aria-labelledby="' + id + '-h">\n' +
    '<div class="wrap">\n<h2 id="' + id + '-h">' + title + '</h2>\n' + html + '\n</div>\n</section>';
}

// 問答一律展開顯示（不用 <details> 收合），讓搜尋引擎與 AI 都能直接讀到答案
export function faqHtml(items) {
  return '<div class="faq">\n' + items.map(function (it) {
    return '<div class="faq-item" id="' + it.id + '">\n<h3>' + esc(it.q) + '</h3>\n<p>' + esc(it.a) + '</p>\n</div>';
  }).join('\n') + '\n</div>';
}

export function stepsHtml(steps) {
  return '<ol class="steps">\n' + steps.map(function (s, i) {
    var img = s.image
      ? '\n<figure><img src="' + asset(s.image.src) + '" alt="' + esc(s.image.alt) + '" width="' + s.image.w +
        '" height="' + s.image.h + '" loading="lazy" decoding="async"></figure>'
      : '';
    return '<li class="step" id="step-' + (i + 1) + '">\n<span class="step-no" aria-hidden="true">' + (i + 1) +
      '</span>\n<div>\n<h3>' + esc(s.name) + '</h3>\n<p>' + s.html + '</p>' + img + '\n</div>\n</li>';
  }).join('\n') + '\n</ol>';
}

export function featuresHtml(items) {
  return '<ul class="features">\n' + items.map(function (f) {
    return '<li class="feature">\n<span class="feature-icon" aria-hidden="true">' + f.icon + '</span>\n<h3>' +
      esc(f.title) + '</h3>\n<p>' + esc(f.text) + '</p>\n</li>';
  }).join('\n') + '\n</ul>';
}

export function tableHtml(caption, head, rows) {
  return '<div class="table-wrap"><table>\n<caption>' + esc(caption) + '</caption>\n<thead><tr>' +
    head.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') + '</tr></thead>\n<tbody>\n' +
    rows.map(function (r) {
      return '<tr><th scope="row">' + esc(r[0]) + '</th>' +
        r.slice(1).map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>';
    }).join('\n') + '\n</tbody>\n</table></div>';
}

export function listHtml(items, cls) {
  return '<ul' + (cls ? ' class="' + cls + '"' : '') + '>\n' +
    items.map(function (t) { return '<li>' + t + '</li>'; }).join('\n') + '\n</ul>';
}

export function ctaHtml(t) {
  return '<div class="cta-box">\n<p class="cta-title">' + esc(t.title) + '</p>\n<p>' + esc(t.text) + '</p>\n' +
    '<a class="btn btn-primary btn-lg" href="' + SITE.appUrl + '">' + esc(t.button) + '</a>\n</div>';
}

export function stripHtml(s) {
  return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
