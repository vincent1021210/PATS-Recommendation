// 產生全站靜態檔：node tools/build.mjs
// 從 src/ 的中英內容輸出各頁 HTML、sitemap.xml、llms.txt、llms-full.txt、404.html。
import fs from 'node:fs';
import nodePath from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, BASE_URL, ROUTES, path, url, asset, assetUrl, esc, stripHtml } from '../src/lib.mjs';
import * as zh from '../src/content-zh.mjs';
import * as en from '../src/content-en.mjs';

const ROOT = nodePath.resolve(nodePath.dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = { 'zh-Hant': zh, en: en };
const CSS = fs.readFileSync(nodePath.join(ROOT, 'src/site.css'), 'utf8').replace(/\n+/g, '\n').trim();
const OG = { src: 'img/og-image.png', w: 1200, h: 630 };
const IDS = {
  org: BASE_URL + '/#organization',
  site: BASE_URL + '/#website',
  app: BASE_URL + '/#app'
};

function other(lang) { return lang === 'en' ? 'zh-Hant' : 'en'; }

function outFile(lang, key) {
  return nodePath.join(ROOT, ROUTES[key][lang].replace(/^\//, ''), 'index.html');
}

function write(file, text) {
  if (text.indexOf('\uFFFD') >= 0) throw new Error('出現亂碼字元 U+FFFD：' + file);
  fs.mkdirSync(nodePath.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, 'utf8');
  console.log('寫入', nodePath.relative(ROOT, file));
}

// ---------- JSON-LD ----------

function orgNode() {
  return {
    '@type': 'Organization',
    '@id': IDS.org,
    name: 'PATS',
    url: BASE_URL + '/',
    logo: { '@type': 'ImageObject', url: assetUrl('img/logo-512.png'), width: 512, height: 512 },
    sameAs: [SITE.appUrl, SITE.repoUrl]
  };
}

function siteNode(lang) {
  return {
    '@type': 'WebSite',
    '@id': IDS.site,
    url: BASE_URL + '/',
    name: 'PATS',
    alternateName: lang === 'en' ? 'PATS web messenger' : 'PATS 網頁通訊',
    inLanguage: ['zh-Hant', 'en'],
    publisher: { '@id': IDS.org }
  };
}

function appNode(lang) {
  const c = LANGS[lang];
  return {
    '@type': 'WebApplication',
    '@id': IDS.app,
    name: 'PATS',
    url: SITE.appUrl,
    description: c.appInfo.description,
    applicationCategory: 'CommunicationApplication',
    applicationSubCategory: lang === 'en' ? 'Instant messaging' : '即時通訊',
    operatingSystem: 'Any (web browser)',
    browserRequirements: 'Requires a modern browser such as Chrome, Edge, Safari or Firefox with JavaScript enabled.',
    inLanguage: 'zh-Hant',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TWD' },
    featureList: c.appInfo.featureList,
    screenshot: [assetUrl('img/app-login-desktop.webp'), assetUrl('img/app-login-mobile.webp')],
    image: assetUrl(OG.src),
    publisher: { '@id': IDS.org }
  };
}

function webPageNode(lang, key, page, type) {
  return {
    '@type': type || 'WebPage',
    '@id': url(lang, key) + '#webpage',
    url: url(lang, key),
    name: page.title,
    description: page.description,
    inLanguage: lang,
    isPartOf: { '@id': IDS.site },
    about: { '@id': IDS.app },
    primaryImageOfPage: { '@type': 'ImageObject', url: assetUrl(OG.src), width: OG.w, height: OG.h },
    datePublished: SITE.published,
    dateModified: SITE.updated,
    breadcrumb: key === 'home' ? undefined : { '@id': url(lang, key) + '#breadcrumb' }
  };
}

function breadcrumbNode(lang, key, page) {
  const c = LANGS[lang];
  return {
    '@type': 'BreadcrumbList',
    '@id': url(lang, key) + '#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: c.ui.homeCrumb, item: url(lang, 'home') },
      { '@type': 'ListItem', position: 2, name: page.crumb, item: url(lang, key) }
    ]
  };
}

function faqNode(lang, key, ids) {
  const c = LANGS[lang];
  return {
    '@type': 'FAQPage',
    '@id': url(lang, key) + '#faq',
    inLanguage: lang,
    mainEntity: c.faqs.filter(function (f) { return ids.indexOf(f.id) >= 0; }).map(function (f) {
      return {
        '@type': 'Question',
        name: f.q,
        url: url(lang, key, f.id),
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      };
    })
  };
}

function howtoNode(lang, key, page) {
  const c = LANGS[lang];
  return {
    '@type': 'HowTo',
    '@id': url(lang, key) + '#howto',
    name: page.howtoName,
    description: page.description,
    inLanguage: lang,
    totalTime: 'PT3M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'TWD', value: '0' },
    tool: [{ '@type': 'HowToTool', name: lang === 'en' ? 'A web browser' : '網頁瀏覽器' }],
    supply: [{ '@type': 'HowToSupply', name: lang === 'en' ? 'A Google account or email address' : 'Google 帳號或電子郵件' }],
    image: assetUrl('img/app-login-desktop.webp'),
    step: c.steps.map(function (s, i) {
      const step = { '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text, url: url(lang, key, 'step-' + (i + 1)) };
      if (s.image) step.image = assetUrl(s.image.src);
      return step;
    })
  };
}

function articleNode(lang, key, page) {
  return {
    '@type': 'Article',
    '@id': url(lang, key) + '#article',
    headline: page.headline,
    description: page.description,
    inLanguage: lang,
    image: [assetUrl(OG.src)],
    datePublished: SITE.published,
    dateModified: SITE.updated,
    author: { '@id': IDS.org },
    publisher: { '@id': IDS.org },
    mainEntityOfPage: { '@id': url(lang, key) + '#webpage' },
    about: { '@id': IDS.app }
  };
}

function jsonLd(lang, key, page) {
  const graph = [orgNode(), siteNode(lang)];
  if (page.type === 'home') {
    graph.push(webPageNode(lang, key, page), appNode(lang), faqNode(lang, key, page.faqIds));
  } else {
    graph.push(webPageNode(lang, key, page, page.type === 'faq' ? 'FAQPage' : 'WebPage'), breadcrumbNode(lang, key, page));
    if (page.type === 'faq') {
      // FAQPage 本身就是 WebPage，問答直接掛在同一個節點
      const faq = faqNode(lang, key, page.faqIds);
      Object.assign(graph[2], { mainEntity: faq.mainEntity });
    }
    if (page.type === 'howto') graph.push(howtoNode(lang, key, page));
    if (page.type === 'article') graph.push(articleNode(lang, key, page));
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 1)
    .replace(/</g, '\\u003c');
}

// ---------- 版面 ----------

function head(lang, page, opts) {
  const c = LANGS[lang];
  const key = opts.key;
  const canonical = key ? url(lang, key) : '';
  const alt = key
    ? '<link rel="alternate" hreflang="zh-Hant" href="' + url('zh-Hant', key) + '">\n' +
      '<link rel="alternate" hreflang="en" href="' + url('en', key) + '">\n' +
      '<link rel="alternate" hreflang="x-default" href="' + url('zh-Hant', key) + '">\n'
    : '';
  const robots = opts.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const ogType = page.type === 'article' || page.type === 'howto' ? 'article' : 'website';
  return '<!doctype html>\n<html lang="' + c.ui.htmlLang + '">\n<head>\n' +
    '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + esc(page.title) + '</title>\n' +
    '<meta name="description" content="' + esc(page.description) + '">\n' +
    '<meta name="robots" content="' + robots + '">\n' +
    (canonical ? '<link rel="canonical" href="' + canonical + '">\n' : '') + alt +
    '<meta name="theme-color" content="' + SITE.brandColor + '">\n' +
    '<meta name="author" content="PATS">\n' +
    '<link rel="icon" href="' + asset('img/favicon.svg') + '" type="image/svg+xml">\n' +
    '<link rel="icon" href="' + asset('img/favicon-48.png') + '" sizes="48x48" type="image/png">\n' +
    '<link rel="apple-touch-icon" href="' + asset('img/apple-touch-icon.png') + '">\n' +
    '<link rel="manifest" href="' + SITE.basePath + '/site.webmanifest">\n' +
    '<link rel="alternate" type="text/plain" title="llms.txt" href="' + SITE.basePath + '/llms.txt">\n' +
    (canonical
      ? '<meta property="og:type" content="' + ogType + '">\n' +
        '<meta property="og:site_name" content="PATS">\n' +
        '<meta property="og:title" content="' + esc(page.title) + '">\n' +
        '<meta property="og:description" content="' + esc(page.description) + '">\n' +
        '<meta property="og:url" content="' + canonical + '">\n' +
        '<meta property="og:locale" content="' + c.ui.ogLocale + '">\n' +
        '<meta property="og:locale:alternate" content="' + LANGS[other(lang)].ui.ogLocale + '">\n' +
        '<meta property="og:image" content="' + assetUrl(OG.src) + '">\n' +
        '<meta property="og:image:width" content="' + OG.w + '">\n' +
        '<meta property="og:image:height" content="' + OG.h + '">\n' +
        '<meta property="og:image:alt" content="' + esc(c.ui.ogImageAlt) + '">\n' +
        (ogType === 'article'
          ? '<meta property="article:published_time" content="' + SITE.published + '">\n' +
            '<meta property="article:modified_time" content="' + SITE.updated + '">\n'
          : '') +
        '<meta name="twitter:card" content="summary_large_image">\n' +
        '<meta name="twitter:title" content="' + esc(page.title) + '">\n' +
        '<meta name="twitter:description" content="' + esc(page.description) + '">\n' +
        '<meta name="twitter:image" content="' + assetUrl(OG.src) + '">\n' +
        '<meta name="twitter:image:alt" content="' + esc(c.ui.ogImageAlt) + '">\n' +
        '<script type="application/ld+json">\n' + jsonLd(lang, key, page) + '\n</script>\n'
      : '') +
    '<style>\n' + CSS + '\n</style>\n</head>\n';
}

function header(lang, key) {
  const c = LANGS[lang];
  const o = other(lang);
  const switchHref = path(o, key || 'home');
  return '<a class="skip" href="#main">' + c.ui.skip + '</a>\n' +
    '<header class="site-header">\n<div class="wrap header-row">\n' +
    '<a class="brand" href="' + path(lang, 'home') + '" aria-label="PATS"><img class="brand-mark" src="' + asset('img/logo-192.png') + '" width="36" height="36" alt="PATS">PATS</a>\n' +
    '<nav class="site-nav" aria-label="' + c.ui.navLabel + '">\n' +
    c.ui.nav.map(function (n) { return '<a href="' + n.href + '">' + n.text + '</a>'; }).join('\n') + '\n</nav>\n' +
    '<a class="lang-switch" href="' + switchHref + '" hreflang="' + o + '" lang="' + o + '" title="' + c.ui.switchTitle + '">' + c.ui.switchLabel + '</a>\n' +
    '<a class="btn btn-primary header-cta" href="' + SITE.appUrl + '">' + c.ui.cta + '</a>\n' +
    '</div>\n</header>\n';
}

function footer(lang) {
  const c = LANGS[lang];
  return '<footer class="site-footer">\n<div class="wrap footer-row">\n<div>\n' +
    '<p><strong>PATS</strong> — ' + c.ui.footerTagline + '</p>\n' +
    '<p>' + c.ui.updatedLabel + (lang === 'en' ? ': ' : '：') + '<time datetime="' + SITE.updated + '">' + SITE.updated + '</time></p>\n' +
    '</div>\n<ul class="footer-links">\n' +
    c.ui.footerLinks.map(function (l) { return '<li><a href="' + l.href + '">' + l.text + '</a></li>'; }).join('\n') +
    '\n</ul>\n</div>\n</footer>\n';
}

function crumbs(lang, page) {
  const c = LANGS[lang];
  return '<nav class="crumbs" aria-label="' + c.ui.breadcrumbLabel + '"><ol>' +
    '<li><a href="' + path(lang, 'home') + '">' + c.ui.homeCrumb + '</a></li>' +
    '<li aria-current="page">' + esc(page.crumb) + '</li></ol></nav>\n';
}

function renderPage(lang, key) {
  const c = LANGS[lang];
  const page = c.pages[key];
  let main;
  if (page.type === 'home') {
    main = '<main id="main">\n' + page.body() + '\n</main>\n';
  } else {
    main = '<main id="main" class="page">\n<div class="wrap">\n' + crumbs(lang, page) +
      '<article>\n<h1>' + esc(page.h1) + '</h1>\n' +
      '<p class="meta">' + c.ui.updatedLabel + (lang === 'en' ? ': ' : '：') + '<time datetime="' + SITE.updated + '">' + SITE.updated + '</time></p>\n' +
      page.body() + '\n</article>\n</div>\n</main>\n';
  }
  return head(lang, page, { key: key }) + '<body>\n' + header(lang, key) + main + footer(lang) + '</body>\n</html>\n';
}

function render404() {
  const page = { title: zh.notFound.title + ' / ' + en.notFound.title, description: zh.notFound.text, type: 'page' };
  const body = '<main id="main" class="page">\n<div class="wrap">\n<article>\n' +
    '<h1>' + zh.notFound.h1 + '</h1>\n<p>' + zh.notFound.text + '</p>\n' +
    '<p lang="en">' + en.notFound.h1 + '. ' + en.notFound.text + '</p>\n' +
    '<p><a class="btn btn-primary" href="' + path('zh-Hant', 'home') + '">回首頁</a> ' +
    '<a class="btn btn-ghost" href="' + path('en', 'home') + '" lang="en">English home</a> ' +
    '<a class="btn btn-ghost" href="' + SITE.appUrl + '">開啟 PATS</a></p>\n</article>\n</div>\n</main>\n';
  return head('zh-Hant', page, { noindex: true }) + '<body>\n' + header('zh-Hant', null) + body + footer('zh-Hant') + '</body>\n</html>\n';
}

// ---------- sitemap / llms ----------

function sitemap() {
  const rows = [];
  Object.keys(ROUTES).forEach(function (key) {
    ['zh-Hant', 'en'].forEach(function (lang) {
      rows.push('  <url>\n    <loc>' + url(lang, key) + '</loc>\n    <lastmod>' + SITE.updated + '</lastmod>\n' +
        '    <xhtml:link rel="alternate" hreflang="zh-Hant" href="' + url('zh-Hant', key) + '"/>\n' +
        '    <xhtml:link rel="alternate" hreflang="en" href="' + url('en', key) + '"/>\n' +
        '    <xhtml:link rel="alternate" hreflang="x-default" href="' + url('zh-Hant', key) + '"/>\n' +
        (key === 'home' && lang === 'zh-Hant'
          ? '    <image:image><image:loc>' + assetUrl(OG.src) + '</image:loc></image:image>\n' : '') +
        '  </url>');
    });
  });
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
    rows.join('\n') + '\n</urlset>\n';
}

function htmlToText(html) {
  return html
    .replace(/<section class="hero"[\s\S]*?<\/section>/, '')
    .replace(/<div class="mockup"[\s\S]*?<\/div>\n<\/div>/g, '')
    .replace(/<span[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/g, '')
    .replace(/<li class="(feature|step)"[^>]*>/g, '')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, function (_, h, t) {
      const full = h.indexOf('http') === 0 ? h : SITE.origin + h;
      return '[' + stripHtml(t) + '](' + full + ')';
    })
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '\n## $1\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '\n### $1\n')
    .replace(/<table>([\s\S]*?)<\/table>/g, function (_, t) {
      const caption = stripHtml((t.match(/<caption>([\s\S]*?)<\/caption>/) || [])[1] || '');
      const rows = (t.match(/<tr>[\s\S]*?<\/tr>/g) || []).map(function (r) {
        const cells = (r.match(/<t[hd][^>]*>[\s\S]*?<\/t[hd]>/g) || []).map(stripHtml);
        return '| ' + cells.join(' | ') + ' |';
      });
      if (rows.length) rows.splice(1, 0, '|' + rows[0].split(' | ').map(function () { return ' --- '; }).join('|') + '|');
      return '\n' + caption + '\n\n' + rows.join('\n') + '\n';
    })
    .replace(/<li[^>]*>/g, '\n- ')
    .replace(/<\/p>/g, '\n')
    .replace(/<img [^>]*alt="([^"]*)"[^>]*>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n\n- /g, '\n- ')
    .trim();
}

function llmsTxt() {
  const link = function (lang, key, desc) {
    return '- [' + LANGS[lang].pages[key].title + '](' + url(lang, key) + '): ' + desc;
  };
  return '# PATS\n\n' +
    '> PATS 是免費、免安裝的網頁通訊工具：不需要 LINE、不需要手機號碼，用瀏覽器以 Google 帳號或電子郵件登入，就能私訊、建群組、傳照片和語音視訊通話。' +
    'PATS is a free, no-install web messenger: no LINE and no phone number needed; sign in from any browser to chat, share photos and make voice/video calls.\n\n' +
    '重點事實 / Key facts:\n\n' +
    '- 網址 / App URL: ' + SITE.appUrl + '\n' +
    '- 費用 / Price: 免費 / Free\n' +
    '- 平台 / Platform: 任何現代瀏覽器（Chrome、Edge、Safari、Firefox），手機、平板、電腦皆可 / Any modern browser on phone, tablet or computer\n' +
    '- 註冊 / Sign-up: Google 帳號或電子郵件＋驗證碼，不需手機號碼；管理員可要求邀請碼 / Google account or email with verification code; no phone number; optional invite code\n' +
    '- 功能 / Features: 私訊、群組、搜尋、封存、傳送與下載圖片（保留 20 天）、一對一語音與視訊通話；任何人都能註冊使用 / Anyone can sign up\n' +
    '- 介面語言 / Interface language: 繁體中文 / Traditional Chinese\n' +
    '- 技術 / Stack: 前端 GitHub Pages 靜態網站，後端 Google Apps Script，資料存於 Google 試算表與雲端硬碟，全程 HTTPS\n\n' +
    '## 繁體中文\n\n' +
    link('zh-Hant', 'home', 'PATS 介紹、適合誰、功能、與 LINE 比較、限制') + '\n' +
    link('zh-Hant', 'getStarted', '3 步驟註冊與開始聊天的圖文教學') + '\n' +
    link('zh-Hant', 'noLine', '沒有 LINE 時 5 種聯絡方式比較') + '\n' +
    link('zh-Hant', 'faq', '完整常見問題') + '\n\n' +
    '## English\n\n' +
    link('en', 'home', 'Overview, audience, features, comparison with LINE, limitations') + '\n' +
    link('en', 'getStarted', 'Step-by-step sign-up guide') + '\n' +
    link('en', 'noLine', '5 ways to keep in touch without LINE') + '\n' +
    link('en', 'faq', 'Full FAQ') + '\n\n' +
    '## Optional\n\n' +
    '- [llms-full.txt](' + BASE_URL + '/llms-full.txt): 全站內容純文字版 / Full site content as plain text\n' +
    '- [PATS App](' + SITE.appUrl + '): 登入與使用 / Sign in and use PATS\n';
}

function llmsFull() {
  const parts = ['# PATS — 全站內容 / Full site content', '', '最後更新 / Last updated: ' + SITE.updated, ''];
  ['zh-Hant', 'en'].forEach(function (lang) {
    Object.keys(ROUTES).forEach(function (key) {
      const page = LANGS[lang].pages[key];
      const h1 = page.h1 || stripHtml((page.body().match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || page.title);
      parts.push('---', '', '# ' + h1, '', 'URL: ' + url(lang, key), '', page.description, '', htmlToText(page.body()), '');
    });
  });
  return parts.join('\n') + '\n';
}

function manifest() {
  return JSON.stringify({
    name: 'PATS 網頁通訊',
    short_name: 'PATS',
    description: zh.appInfo.description,
    lang: 'zh-Hant',
    start_url: SITE.basePath + '/',
    scope: SITE.basePath + '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: SITE.brandColor,
    icons: [
      { src: asset('img/logo-192.png'), sizes: '192x192', type: 'image/png' },
      { src: asset('img/logo-512.png'), sizes: '512x512', type: 'image/png' }
    ]
  }, null, 2) + '\n';
}

// ---------- 輸出 ----------

Object.keys(LANGS).forEach(function (lang) {
  Object.keys(ROUTES).forEach(function (key) {
    write(outFile(lang, key), renderPage(lang, key));
  });
});
write(nodePath.join(ROOT, '404.html'), render404());
write(nodePath.join(ROOT, 'sitemap.xml'), sitemap());
write(nodePath.join(ROOT, 'llms.txt'), llmsTxt());
write(nodePath.join(ROOT, 'llms-full.txt'), llmsFull());
write(nodePath.join(ROOT, 'site.webmanifest'), manifest());
