# サービス管理ポータル

法人向けサービスの契約管理・申し込み・クーポン購入ができるポータルサイトのサンプルアプリケーションです。

## 画面構成

| 画面名 | ファイル | 概要 |
|---|---|---|
| ログイン | login.html | ユーザーID・パスワードによるログイン |
| ダッシュボード | dashboard.html | 利用状況サマリー・お知らせ表示（未読お知らせカードを追加） |
| 契約サービス一覧 | services.html | 契約中サービスの一覧表示・フィルタリング |
| サービス詳細 | service-detail.html | サービスの契約情報詳細・解約操作 |
| 新規申し込み | apply.html | サービス選択→確認→完了のステップ型フォーム |
| クーポン購入 | coupon.html | クーポン額面選択・購入 |
| お問い合わせ | contact.html | お問い合わせフォーム。サイドバーに「よくある質問」へのリンクが追加され、FAQページへのアクセスが容易になった。 |
| よくある質問 | faq.html | カテゴリフィルター付きのアコーディオン形式FAQ |

## 技術スタック

- HTML5 + CSS3 + Vanilla JavaScript
- サーバー不要（モックデータで動作）

## 起動方法

ローカルでHTMLファイルを開くか、任意のHTTPサーバーで配信してください。

```bash
# 例: Python簡易サーバー
cd service-portal
python3 -m http.server 8080

ブラウザで `http://localhost:8080/login.html` にアクセスしてください。

## ディレクトリ構成

service-portal/
├── login.html           # ログイン画面
├── dashboard.html       # ダッシュボード
├── services.html        # 契約サービス一覧
├── service-detail.html  # サービス詳細
├── apply.html           # 新規申し込み
├── coupon.html          # クーポン購入
├── contact.html         # お問い合わせ
├── faq.html             # よくある質問
├── css/
│   └── style.css        # 共通スタイル
├── js/
│   └── app.js           # 共通ロジック・モックデータ
├── docs/
│   ├── screen-list.md   # 画面一覧・画面遷移図
│   └── screens/         # 各画面の仕様書
│       ├── login.md
│       ├── dashboard.md
│       ├── services.md
│       ├── service-detail.md
│       ├── apply.md
│       ├── coupon.md
│       ├── contact.md
│       └── faq.md
└── README.md

## 追加情報

ダッシュボードに「未読お知らせ」カードが追加され、直近7日以内のお知らせが未読としてカウントされるようになりました。この変更により、ユーザーは新しいお知らせの存在を一目で確認できるようになります。
