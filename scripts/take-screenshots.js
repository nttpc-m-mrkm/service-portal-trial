/**
 * 画面スクリーンショット自動撮影スクリプト
 *
 * ローカル実行（Docker経由）:
 *   cd service-portal
 *   docker build -t screenshot-runner scripts/
 *   docker run --rm -v "$(pwd):/site" screenshot-runner
 *
 * 出力先: docs/screenshots/
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Docker内では /site にマウント、直接実行時は親ディレクトリ
const BASE_DIR = fs.existsSync('/site/login.html')
  ? '/site'
  : path.join(__dirname, '..');

const SCREENSHOT_DIR = path.join(BASE_DIR, 'docs', 'screenshots');

// 撮影対象の画面定義
const PAGES = [
  {
    name: 'login',
    file: 'login.html',
    description: 'ログイン画面',
  },
  {
    name: 'dashboard',
    file: 'dashboard.html',
    description: 'ダッシュボード',
  },
  {
    name: 'services',
    file: 'services.html',
    description: '契約サービス一覧',
  },
  {
    name: 'service-detail',
    file: 'service-detail.html?id=SV001',
    description: 'サービス詳細',
  },
  {
    name: 'apply',
    file: 'apply.html',
    description: '新規申し込み',
  },
  {
    name: 'coupon',
    file: 'coupon.html',
    description: 'クーポン購入',
  },
  {
    name: 'contact',
    file: 'contact.html',
    description: 'お問い合わせ',
  },
];

async function main() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'ja-JP',
  });

  const page = await context.newPage();

  // ログインしてセッションを確立
  const loginUrl = `file://${path.join(BASE_DIR, 'login.html')}`;
  await page.goto(loginUrl);
  await page.fill('#userId', 'user001');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);

  console.log('ログイン完了');

  // 各画面のスクリーンショットを撮影
  for (const def of PAGES) {
    const fileUrl = `file://${path.join(BASE_DIR, def.file)}`;
    await page.goto(fileUrl);
    await page.waitForTimeout(300);

    const outputPath = path.join(SCREENSHOT_DIR, `${def.name}.png`);
    await page.screenshot({ path: outputPath, fullPage: true });
    console.log(`${def.description} → ${def.name}.png`);
  }

  await browser.close();
  console.log(`\n完了: ${PAGES.length}画面のスクリーンショットを ${SCREENSHOT_DIR} に保存しました`);
}

main().catch(err => {
  console.error('エラー:', err);
  process.exit(1);
});
