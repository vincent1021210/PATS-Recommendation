// 繁體中文內容。只寫 PATS 實際具備的功能，數字（圖片保留 20 天等）與後端設定一致。
import {
  SITE, path, asset, section, faqHtml, stepsHtml, featuresHtml, tableHtml, listHtml, ctaHtml
} from './lib.mjs';

const L = 'zh-Hant';
const APP = SITE.appUrl;
const APK = SITE.origin + '/download/PATS.apk';
const WIN = 'https://github.com/vincent1021210/vincent1021210.github.io/releases/latest/download/PATS-Setup.exe';

export const ui = {
  lang: L,
  htmlLang: 'zh-Hant-TW',
  ogLocale: 'zh_TW',
  siteName: 'PATS',
  skip: '跳到主要內容',
  nav: [
    { href: path(L, 'home', 'features'), text: '功能' },
    { href: path(L, 'getStarted'), text: '使用教學' },
    { href: path(L, 'noLine'), text: '沒有 LINE 怎麼辦' },
    { href: path(L, 'faq'), text: '常見問題' }
  ],
  navLabel: '主要導覽',
  switchLabel: 'English',
  switchTitle: '切換為英文版',
  cta: '免費開始使用',
  breadcrumbLabel: '麵包屑',
  homeCrumb: '首頁',
  updatedLabel: '最後更新',
  footerTagline: '免安裝、不需手機號碼的網頁通訊工具。',
  footerLinks: [
    { href: APP, text: '開啟 PATS' },
    { href: APK, text: '下載 Android APP' },
    { href: APP, text: '安裝到 iPhone 主畫面' },
    { href: WIN, text: '下載 Windows 電腦版' },
    { href: path(L, 'getStarted'), text: '使用教學' },
    { href: path(L, 'noLine'), text: '沒有 LINE 怎麼辦' },
    { href: path(L, 'faq'), text: '常見問題' },
    { href: SITE.basePath + '/llms.txt', text: 'llms.txt' },
    { href: SITE.repoUrl, text: 'GitHub' }
  ],
  ogImageAlt: 'PATS：沒有 LINE 也能聊天的免安裝網頁通訊'
};

export const faqs = [
  { id: 'free', q: 'PATS 要錢嗎？',
    a: 'PATS 免費使用，沒有付費方案，也沒有內購。只要有網路和瀏覽器就能用。' },
  { id: 'no-line', q: '沒有 LINE 可以用 PATS 嗎？',
    a: '可以。PATS 是獨立的通訊平台，不需要 LINE、Messenger、WhatsApp 或任何其他通訊軟體，雙方都有 PATS 帳號就能互相傳訊息與通話。' },
  { id: 'no-install', q: '需要下載 App 嗎？',
    a: '不需要。PATS 直接在瀏覽器裡執行，打開 vincent1021210.github.io 就能使用，不佔手機容量，也不用手動更新；網站推出新版時會自動更新。iPhone 用 Safari 打開網站，點「分享」再選「加入主畫面」，之後就像一般 APP：全螢幕、畫面存在手機裡。Android 也可以下載 PATS Android APP（APK）。Windows 另有電腦版，可以開機自動啟動、收到新訊息時跳出桌面通知。' },
  { id: 'no-phone', q: '沒有手機號碼可以註冊嗎？',
    a: '可以。PATS 不需要手機號碼，用 Google 帳號一鍵註冊，或用電子郵件加密碼註冊（會寄 6 位數驗證碼到信箱確認）。' },
  { id: 'computer', q: '可以在電腦上用嗎？',
    a: '可以。Windows、Mac、Chromebook 的瀏覽器都能使用，手機和平板也可以。在學校或公用電腦使用後，記得登出。' },
  { id: 'browsers', q: '支援哪些瀏覽器？',
    a: '建議使用最新版的 Chrome、Edge、Safari 或 Firefox。語音和視訊通話需要允許瀏覽器使用麥克風與相機。' },
  { id: 'photos', q: '可以傳照片嗎？照片會保留多久？',
    a: '可以。手機可以直接拍照或從相簿選圖，系統會自動壓縮後傳送；收到的圖片可以點開放大並下載保存。聊天中的圖片會保留 20 天，之後自動過期，重要的圖片請先下載。' },
  { id: 'calls', q: '可以語音或視訊通話嗎？',
    a: '可以。PATS 支援一對一語音與視訊通話，通話中可以靜音、關閉鏡頭或切換前後鏡頭，不需要另外安裝任何軟體。' },
  { id: 'groups', q: '可以建立群組嗎？',
    a: '可以。除了一對一私訊，也能建立群組一起討論；不常用的對話可以封存，需要時再取消封存。' },
  { id: 'anyone', q: '誰可以使用 PATS？',
    a: '任何人都可以使用。PATS 不限年齡、學校或身分，只要有 Google 帳號或電子郵件就能註冊，學生、上班族、家人朋友都能用。' },
  { id: 'invite', q: '註冊時為什麼要邀請碼？',
    a: '只有管理員啟用邀請碼時，註冊才需要填寫，用來確保只有學校或團體成員能加入。請向老師或管理員索取；沒有啟用時不會出現這個欄位。' },
  { id: 'data', q: '我的資料存在哪裡？安全嗎？',
    a: 'PATS 的後端使用 Google Apps Script，訊息存在 Google 試算表，圖片存在 Google 雲端硬碟。連線全程使用 HTTPS 加密，帳號密碼以雜湊方式儲存，不會以明碼保存。' },
  { id: 'forgot', q: '忘記密碼怎麼辦？',
    a: '在登入頁點「忘記密碼」，輸入註冊時的電子郵件，收到驗證碼後就能設定新密碼。使用 Google 登入的人不需要密碼。' }
];

export const steps = [
  { name: '打開 PATS 網站',
    text: '用手機、平板或電腦的瀏覽器（Chrome、Edge、Safari、Firefox）前往 vincent1021210.github.io。',
    html: '用手機、平板或電腦的瀏覽器（Chrome、Edge、Safari、Firefox）前往 <a href="' + APP + '">vincent1021210.github.io</a>，不需要下載任何 App。',
    image: { src: 'img/app-login-desktop.webp', alt: 'PATS 登入畫面：可用 Google 帳號或電子郵件登入', w: 1280, h: 800 } },
  { name: '建立帳號',
    text: '點「立即註冊」，用 Google 帳號一鍵建立；或填寫顯示名稱、電子郵件和密碼，再輸入寄到信箱的 6 位數驗證碼。管理員有設定邀請碼時，需要一併填寫。',
    html: '點「立即註冊」，用 Google 帳號一鍵建立；或填寫顯示名稱、電子郵件和密碼（至少 8 個字元），再輸入寄到信箱的 6 位數驗證碼。管理員有設定邀請碼時，需要一併填寫。' },
  { name: '加入聯絡人，開始聊天',
    text: '登入後點「發起新對話」找到對方，就能傳訊息、傳照片，或直接撥打語音、視訊通話。',
    html: '登入後點「發起新對話」找到對方，就能傳訊息、傳照片，或直接撥打語音、視訊通話。想要像 App 一樣快速開啟，可以在手機瀏覽器選「加入主畫面」。' }
];

const features = [
  { icon: '💬', title: '私訊與群組', text: '一對一私訊，或建立群組一起討論，還能搜尋訊息與聯絡人、封存不常用的對話。' },
  { icon: '🖼️', title: '傳送與下載圖片', text: '手機直接拍照或從相簿選圖，自動壓縮後傳送；收到的圖片可以放大檢視、下載保存。' },
  { icon: '📞', title: '語音與視訊通話', text: '在瀏覽器裡就能通話，可靜音、關閉鏡頭、切換前後鏡頭，不用另外裝軟體。' },
  { icon: '🔑', title: '不需要手機號碼', text: '用 Google 帳號一鍵登入，或用電子郵件加密碼註冊，不必公開自己的電話。' },
  { icon: '🌏', title: '誰都能用', text: '不限學校或身分，任何人都能用 Google 帳號或電子郵件註冊，跟家人、朋友、同學都能聊。' },
  { icon: '🔄', title: '自動更新', text: '網站有新版本時會自動更新，不用到商店更新 App，也不佔手機容量。' }
];

const audience = [
  '<strong>沒有 LINE</strong>，或不想安裝任何通訊軟體的人',
  '<strong>學生</strong>：手機不能裝 App、只能用學校電腦或平板',
  '<strong>沒有手機號碼</strong>，或不想公開自己電話的人',
  '<strong>手機容量不足</strong>、舊手機裝不了新版 App',
  '<strong>家人與長輩</strong>：不會裝 App，打開網址就能跟家人聊天'
];

const compareRows = [
  ['需要安裝 App', '不需要，用瀏覽器即可', '需要下載安裝並定期更新'],
  ['需要手機號碼', '不需要', '通常需要'],
  ['在電腦上使用', '打開瀏覽器就能用', '通常要另外安裝電腦版'],
  ['佔用手機容量', '幾乎不佔', '會佔用並隨聊天紀錄增加'],
  ['費用', '免費', '多數免費'],
  ['貼圖商店', '沒有', '通常有']
];

const limits = [
  '需要網路連線才能使用。',
  '對方也需要有 PATS 帳號，才能互相聊天。',
  '聊天中的圖片保留 20 天後自動過期，重要圖片請先下載。',
  '沒有貼圖商店和動態牆，專注在訊息與通話。',
  '部分學校或團體會要求邀請碼才能註冊。'
];

const homeFaqIds = ['free', 'no-line', 'no-install', 'no-phone', 'computer', 'photos'];

function heroHtml() {
  return '<section class="hero" aria-labelledby="hero-h">\n<div class="wrap hero-grid">\n<div>\n' +
    '<p class="eyebrow">免費・免安裝・不需手機號碼</p>\n' +
    '<h1 id="hero-h">沒有 LINE，<br>也能跟大家聊天</h1>\n' +
    '<p class="lead">PATS 是免安裝的網頁通訊工具。打開瀏覽器、用 Google 帳號登入，就能私訊、建群組、傳照片，還能語音和視訊通話。</p>\n' +
    '<div class="hero-actions">\n<a class="btn btn-primary btn-lg" href="' + APP + '">免費開始使用</a>\n' +
    '<a class="btn btn-ghost btn-lg" href="' + path(L, 'getStarted') + '">看 3 分鐘教學</a>\n</div>\n' +
    '<p class="hero-apk">Android？<a href="' + APK + '">下載 APP</a>・iPhone？<a href="' + APP + '">加入主畫面</a>・Windows？<a href="' + WIN + '">下載電腦版</a></p>\n' +
    listHtml(['手機、平板、電腦都能用', '不佔手機容量', '網站自動更新'], 'hero-facts') +
    '\n</div>\n' + mockupHtml() + '\n</div>\n</section>';
}

function mockupHtml() {
  return '<div class="mockup" aria-hidden="true">\n<div class="mock-bar"><span class="mock-dot"></span>PATS・同學群組</div>\n' +
    '<div class="mock-body">\n<p class="bubble in">明天報告的資料我放上來了</p>\n' +
    '<p class="bubble in img">📷 報告大綱.jpg</p>\n<p class="bubble out">收到！我沒有 LINE，還好有 PATS 😂</p>\n' +
    '<p class="bubble in">晚上 8 點視訊討論？</p>\n<p class="bubble out">OK，直接在網頁打給我</p>\n</div>\n' +
    '<div class="mock-input">輸入訊息…<span>➤</span></div>\n</div>';
}

export const pages = {
  home: {
    title: 'PATS｜沒有 LINE 也能聊天的免安裝網頁通訊',
    description: 'PATS 是免費、免安裝的網頁通訊工具。沒有 LINE、沒有手機號碼也能用：打開瀏覽器、用 Google 帳號登入，就能私訊、建群組、傳照片和語音視訊通話。',
    type: 'home',
    faqIds: homeFaqIds,
    body: function () {
      return heroHtml() + '\n' +
        section('what', 'PATS 是什麼？',
          '<p class="answer">PATS 是一個在瀏覽器裡執行的通訊平台，不需要下載 App，也不需要手機號碼。只要有 Google 帳號或電子郵件，在手機、平板或電腦打開 <a href="' + APP + '">vincent1021210.github.io</a> 就能開始聊天。</p>\n' +
          '<p>它適合沒有 LINE、不能安裝 App，或不想公開電話號碼的人。訊息、照片、群組和語音視訊通話都在同一個網頁裡完成，網站推出新版時也會自動更新。</p>') + '\n' +
        section('who', '誰適合用 PATS？',
          '<p class="answer">只要「不方便用 LINE 或一般通訊 App」，PATS 就是很好的替代方案，特別適合以下這些人：</p>\n' + listHtml(audience, 'checklist'), 'alt') + '\n' +
        section('features', 'PATS 有哪些功能？',
          '<p class="answer">PATS 提供私訊、群組、傳送與下載圖片、語音與視訊通話，而且任何人都能註冊使用。</p>\n' + featuresHtml(features)) + '\n' +
        section('how', '怎麼開始使用？（3 個步驟）',
          '<p class="answer">打開網站、建立帳號、加入聯絡人，大約 3 分鐘就能開始聊天。</p>\n' + stepsHtml(steps.map(function (s) { return { name: s.name, html: s.html }; })) +
          '\n<p><a href="' + path(L, 'getStarted') + '">看完整圖文教學 →</a></p>', 'alt') + '\n' +
        section('compare', 'PATS 和 LINE 等通訊 App 有什麼不同？',
          '<p class="answer">最大的差別是 PATS 不用安裝、不需要手機號碼，用瀏覽器就能聊天；但它沒有貼圖商店，功能專注在訊息與通話。</p>\n' +
          tableHtml('PATS 與一般通訊 App 比較', ['項目', 'PATS', '一般通訊 App（如 LINE）'], compareRows)) + '\n' +
        section('limits', 'PATS 有什麼限制？',
          '<p class="answer">PATS 需要網路，而且雙方都要有帳號；以下是使用前值得知道的事：</p>\n' + listHtml(limits), 'alt') + '\n' +
        section('faq', '常見問題',
          faqHtml(faqs.filter(function (f) { return homeFaqIds.indexOf(f.id) >= 0; })) +
          '\n<p><a href="' + path(L, 'faq') + '">看全部常見問題 →</a></p>') + '\n' +
        '<div class="wrap">' + ctaHtml({ title: '現在就開始，不用安裝任何東西', text: '打開瀏覽器、用 Google 帳號登入，3 分鐘內就能和朋友聊天。', button: '免費開始使用' }) + '</div>';
    }
  },

  faq: {
    title: 'PATS 常見問題｜免費嗎？要手機號碼嗎？能視訊嗎？',
    description: '整理 PATS 網頁通訊的常見問題：是否免費、沒有 LINE 能不能用、需不需要手機號碼、支援哪些瀏覽器、照片保留多久、誰可以使用與資料安全。',
    type: 'faq',
    h1: 'PATS 常見問題',
    crumb: '常見問題',
    faqIds: faqs.map(function (f) { return f.id; }),
    body: function () {
      return '<p class="answer">這裡整理大家最常問的 PATS 問題。簡單來說：PATS 免費、免安裝、不需要手機號碼，用瀏覽器就能私訊、建群組、傳照片和視訊通話。</p>\n' +
        faqHtml(faqs) + '\n' +
        ctaHtml({ title: '還有問題？直接試試看最快', text: '註冊只要一分鐘，不需要手機號碼。', button: '免費開始使用' });
    }
  },

  noLine: {
    title: '沒有 LINE 怎麼跟同學、家人聯絡？5 種方法比較',
    description: '沒有 LINE、不能裝 App 或沒有手機號碼，還能怎麼聯絡同學和家人？比較簡訊、電子郵件、社群私訊、學校平台與免安裝網頁通訊 PATS 的優缺點。',
    type: 'article',
    h1: '沒有 LINE 怎麼跟同學、家人聯絡？5 種方法比較',
    crumb: '沒有 LINE 怎麼辦',
    headline: '沒有 LINE 怎麼跟同學、家人聯絡？5 種方法比較',
    body: function () {
      return '<p class="answer"><strong>結論：</strong>沒有 LINE 時，最接近 LINE 體驗的做法是使用免安裝的網頁通訊工具，例如 <a href="' + APP + '">PATS</a>：用瀏覽器登入就能私訊、建群組、傳照片和視訊通話，不需要手機號碼。如果只是偶爾聯絡，簡訊或電子郵件也可以。</p>\n' +
        '<p>很多人沒有 LINE 的原因各不相同：手機不能安裝 App、家長還不讓用通訊軟體、沒有自己的手機號碼，或手機容量不夠。以下比較 5 種常見的聯絡方式，幫你找到最適合的方法。</p>\n' +
        '<h2 id="m1">1. 簡訊與電話</h2>\n<p>優點是幾乎每支手機都能用；缺點是需要手機號碼，傳照片不方便，也很難多人一起討論。</p>\n' +
        '<h2 id="m2">2. 電子郵件</h2>\n<p>只要有信箱就能用，適合傳檔案和正式通知；但回覆慢，不適合即時聊天或群組討論。</p>\n' +
        '<h2 id="m3">3. 社群網站私訊</h2>\n<p>Instagram、Facebook 等可以私訊，但通常要安裝 App、有年齡限制，也容易被動態和廣告分心。</p>\n' +
        '<h2 id="m4">4. 學校的學習平台</h2>\n<p>部分學校平台有留言或訊息功能，適合交作業和公告；但通常不支援即時聊天、傳照片或視訊。</p>\n' +
        '<h2 id="m5">5. 免安裝的網頁通訊：PATS</h2>\n<p class="answer">PATS 用瀏覽器就能使用，不用安裝 App，也不需要手機號碼，是最接近 LINE 的替代方案。</p>\n' +
        listHtml(['私訊與群組聊天，可以搜尋訊息、封存對話', '手機拍照直接傳送，收到的圖片可以下載保存', '一對一語音與視訊通話', '手機、平板、學校電腦都能登入', '任何人都能註冊，家人、朋友、同學都能用']) + '\n' +
        '<h2 id="compare">5 種方法一次比較</h2>\n' +
        tableHtml('沒有 LINE 時的聯絡方式比較', ['方法', '需要手機號碼', '即時聊天', '傳照片', '群組', '視訊通話'], [
          ['簡訊與電話', '需要', '可以', '不方便', '困難', '視手機而定'],
          ['電子郵件', '不需要', '不行', '可以', '可以（群組信）', '不行'],
          ['社群網站私訊', '通常需要', '可以', '可以', '可以', '可以'],
          ['學校學習平台', '不需要', '多半不行', '視平台而定', '視平台而定', '多半不行'],
          ['PATS 網頁通訊', '不需要', '可以', '可以', '可以', '可以']
        ]) + '\n' +
        '<h2 id="tips">邀請朋友一起用 PATS 的小技巧</h2>\n' +
        listHtml(['把網址 vincent1021210.github.io 傳給同學，請對方用 Google 帳號註冊。', '在手機瀏覽器選「加入主畫面」，之後像 App 一樣一鍵打開。', '用學校或公用電腦登入後，記得登出。', '重要照片收到後先下載，聊天中的圖片會在 20 天後過期。']) + '\n' +
        ctaHtml({ title: '沒有 LINE？現在就用 PATS', text: '免安裝、不需要手機號碼，打開瀏覽器就能聊天。', button: '免費開始使用' }) + '\n' +
        '<p>延伸閱讀：<a href="' + path(L, 'getStarted') + '">3 分鐘開始使用 PATS</a>、<a href="' + path(L, 'faq') + '">PATS 常見問題</a></p>';
    }
  },

  getStarted: {
    title: '3 分鐘開始使用 PATS｜註冊與聊天圖文教學',
    description: '3 個步驟開始使用 PATS 網頁通訊：用瀏覽器打開網站、用 Google 帳號或電子郵件註冊、加入聯絡人後就能傳訊息、傳照片和視訊通話。',
    type: 'howto',
    h1: '3 分鐘開始使用 PATS',
    crumb: '使用教學',
    howtoName: '如何開始使用 PATS 網頁通訊',
    body: function () {
      return '<p class="answer">開始使用 PATS 只要 3 個步驟：用瀏覽器打開 <a href="' + APP + '">vincent1021210.github.io</a>、用 Google 帳號或電子郵件註冊、加入聯絡人後開始聊天。全程不需要下載 App 或手機號碼。</p>\n' +
        '<h2 id="before">開始前你需要</h2>\n' +
        listHtml(['一台能上網的手機、平板或電腦', '最新版的 Chrome、Edge、Safari 或 Firefox', '一個 Google 帳號，或任何可以收信的電子郵件', '（若學校有設定）管理員提供的邀請碼']) + '\n' +
        '<h2 id="steps">步驟</h2>\n' + stepsHtml(steps) + '\n' +
        '<h2 id="mobile">在手機上像 App 一樣使用</h2>\n' +
        '<figure class="phone-shot"><img src="' + asset('img/app-login-mobile.webp') + '" alt="PATS 手機版登入畫面" width="390" height="844" loading="lazy" decoding="async"><figcaption>手機瀏覽器打開 PATS 的畫面</figcaption></figure>\n' +
        listHtml(['<strong>iPhone（Safari）</strong>：點下方「分享」按鈕，選「加入主畫面」。', '<strong>Android（Chrome）</strong>：點右上角「⋮」，選「加到主畫面」。']) + '\n' +
        '<h2 id="next">接下來可以做什麼</h2>\n' +
        listHtml(['建立群組，和同學一起討論報告', '傳照片：點輸入框旁的圖片按鈕，可以拍照或從相簿選', '撥打語音或視訊通話：在對話上方點電話或攝影機圖示', '邀請家人或朋友：把網址傳給對方，請他用 Google 帳號註冊']) + '\n' +
        '<h2 id="trouble">遇到問題？</h2>\n' +
        listHtml(['<strong>收不到驗證碼</strong>：檢查垃圾郵件匣，或改用 Google 帳號登入。', '<strong>通話沒有聲音或畫面</strong>：確認瀏覽器已允許使用麥克風與相機。', '<strong>畫面怪怪的</strong>：重新整理頁面，網站會自動載入最新版本。']) + '\n' +
        ctaHtml({ title: '準備好了嗎？', text: '打開 PATS，用 Google 帳號一鍵註冊。', button: '開啟 PATS' }) + '\n' +
        '<p>延伸閱讀：<a href="' + path(L, 'noLine') + '">沒有 LINE 怎麼跟同學、家人聯絡？</a>、<a href="' + path(L, 'faq') + '">PATS 常見問題</a></p>';
    }
  }
};

export const appInfo = {
  description: 'PATS 是免費、免安裝的網頁通訊工具，用瀏覽器登入就能私訊、建群組、傳照片和語音視訊通話，不需要 LINE 或手機號碼。',
  featureList: features.map(function (f) { return f.title + '：' + f.text; })
};

export const notFound = {
  title: '找不到這個頁面｜PATS',
  h1: '找不到這個頁面',
  text: '網址可能打錯了，或頁面已經移動。'
};
