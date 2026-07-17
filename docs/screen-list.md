# 画面一覧・画面遷移図

## 画面一覧

| No. | 画面ID | 画面名 | ファイル | 概要 |
|-----|--------|--------|----------|------|
| 1 | SCR-LOGIN | ログイン | login.html | ユーザーID・パスワードを入力してシステムにログインする |
| 2 | SCR-DASHBOARD | ダッシュボード | dashboard.html | 利用中サービス数・月額合計・クーポン残高などのサマリーとお知らせを表示する。新たに「未読お知らせ」カードが追加され、直近7日以内のお知らせが未読としてカウントされる。 |
| 3 | SCR-SERVICES | 契約サービス一覧 | services.html | ユーザーが契約中のサービスを一覧表示し、ステータスでフィルタリングできる |
| 4 | SCR-SERVICE-DETAIL | サービス詳細 | service-detail.html | 個別サービスの契約情報を表示し、解約操作ができる |
| 5 | SCR-APPLY | 新規申し込み | apply.html | サービス選択→確認→完了の3ステップで新規サービスを申し込む |
| 6 | SCR-COUPON | クーポン購入 | coupon.html | クーポンの額面を選択して購入する |

## 画面遷移図

```mermaid
graph TD
    LOGIN[ログイン<br>login.html] -->|ログイン成功| DASHBOARD[ダッシュボード<br>dashboard.html]
    
    DASHBOARD --> SERVICES[契約サービス一覧<br>services.html]
    DASHBOARD --> APPLY[新規申し込み<br>apply.html]
    DASHBOARD --> COUPON[クーポン購入<br>coupon.html]
    
    SERVICES --> DETAIL[サービス詳細<br>service-detail.html]
    DETAIL --> SERVICES
    DETAIL -->|解約実行| SERVICES
    
    APPLY -->|申し込み完了| SERVICES

    subgraph サイドバーナビゲーション
        DASHBOARD
        SERVICES
        APPLY
        COUPON
    end

    DASHBOARD -->|ログアウト| LOGIN
    SERVICES -->|ログアウト| LOGIN
    APPLY -->|ログアウト| LOGIN
    COUPON -->|ログアウト| LOGIN

## 共通レイアウト

ログイン画面以外の全画面は以下の共通レイアウトで構成される。

- **サイドバー**（左 220px 固定）
  - ロゴ: 「サービス管理ポータル」
  - ナビゲーションメニュー: ダッシュボード / 契約サービス一覧 / 新規申し込み / クーポン購入
  - ユーザー情報: ユーザー名 + ログアウトリンク（下部固定）
- **メインコンテンツエリア**（右側）
  - ページヘッダー: 画面タイトル + パンくずリスト
  - コンテンツ: 各画面固有の内容
