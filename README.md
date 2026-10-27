# PATS 推薦網站

PATS（免安裝、不需手機號碼的網頁通訊）的中英雙語介紹網站，針對 Google／Bing 一般搜尋與 ChatGPT、Perplexity、Gemini 等 AI 搜尋最佳化，並導流到 [PATS App](https://vincent1021210.github.io/)。

- 正式網址：<https://vincent1021210.github.io/PATS-Recommendation/>
- 純靜態 HTML，零框架、零外部 JS，由 GitHub Pages 直接從 `main` 分支根目錄發佈。

## 結構

```
src/                    ← 只改這裡
  lib.mjs               網址、路徑、共用 HTML 小工具
  content-zh.mjs        繁中內容（頁面、FAQ、步驟、功能）
  content-en.mjs        英文內容（與繁中逐段對應）
  site.css              樣式（建置時內聯進每一頁）
  art/                  OG 圖、Logo、手機截圖的 HTML 模板
tools/
  build.mjs             產生所有頁面、sitemap.xml、llms.txt、llms-full.txt、404.html
  check.mjs             SEO 自我檢查
  serve.mjs             本機預覽
  make-images.cjs       截圖轉成各尺寸圖片
index.html、en/、faq/、guides/、404.html、sitemap.xml、llms*.txt、site.webmanifest
                        ← 全部由 build.mjs 產生，不要手改
assets/img/             圖片
```

## 修改內容的流程

1. 改 `src/content-zh.mjs`（與對應的 `src/content-en.mjs`）。
2. 若內容有實質更新，把 `src/lib.mjs` 的 `SITE.updated` 改成今天日期（會更新 sitemap 的 lastmod 與頁面「最後更新」）。
3. 執行：

```bash
node tools/build.mjs
node tools/check.mjs
node tools/serve.mjs      # 開 http://localhost:8080/PATS-Recommendation/
```

4. commit 並推送到 `main`。

> 用 Node 讀寫檔案，不要用 PowerShell 的 `Get-Content`／`Set-Content` 改中文檔，會造成亂碼。`build.mjs` 偵測到 U+FFFD 會直接中止。

## 重做圖片

```powershell
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$tmp = "$env:TEMP\pats-art"
# og.png 1200x630、logo.png 512x512：用 Edge 無頭模式截 src/art/og.html、src/art/logo.html
# desktop.png：截 https://vincent1021210.github.io/（--window-size=1280,800）
# mobile-raw.png：截 src/art/mobile-frame.html（--force-device-scale-factor=2 --window-size=800,900）
cd $tmp; npm i sharp
node <repo>/tools/make-images.cjs $tmp
```

## SEO 與 AI 搜尋做了什麼

- 每頁唯一的 title、description、canonical，中英互相標註 `hreflang`（含 `x-default`）。
- Open Graph、Twitter Card（共用 `assets/img/og-image.png`）。
- JSON-LD：`Organization`、`WebSite`、`WebApplication`、`FAQPage`、`HowTo`、`Article`、`BreadcrumbList`。
- 每個段落第一句就是完整答案，問答用自然問句，方便 AI 直接引用；比較用 `<table>`。
- `llms.txt`（網站摘要與頁面清單）、`llms-full.txt`（全站純文字）。
- `robots.txt` 只在網域根目錄有效，放在使用者站 repo（`vincent1021210.github.io`），明確允許 GPTBot、ClaudeBot、PerplexityBot、Google-Extended 等爬蟲，並列出本站 sitemap。

## 上線後要手動做的事

1. **開啟 GitHub Pages**：repo 的 Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main`、資料夾 `/ (root)`。
2. **Google Search Console**：新增「網址前置字元」資源 `https://vincent1021210.github.io/`，用 HTML 標記驗證（把 `google-site-verification` meta 加進 App 的 `index.html`），再提交兩個 sitemap：
   - `https://vincent1021210.github.io/sitemap.xml`
   - `https://vincent1021210.github.io/PATS-Recommendation/sitemap.xml`
3. **Bing Webmaster Tools**：直接從 Search Console 匯入（ChatGPT 搜尋也會用到 Bing 的索引）。
4. 驗證工具：
   - [Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema Markup Validator](https://validator.schema.org/)
   - Chrome DevTools 的 Lighthouse
5. 把網址分享到 Dcard、PTT、社群或其他 GitHub README，增加反向連結與 AI 引用的機會。
