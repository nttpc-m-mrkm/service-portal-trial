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
│       └── coupon.md
└── README.md
