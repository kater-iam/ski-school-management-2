# スキースクール管理システム

## 概要
スキースクールの予約管理、レッスン管理、生徒の進捗管理を行うシステムです。

## 技術スタック
- フロントエンド
  - Next.js
  - React
  - TypeScript
  - Refine
  - Shadcn UI
  - Tailwind CSS

- バックエンド
  - Supabase
  - PostgreSQL

## 開発環境のセットアップ

### 必要な環境
- Node.js v20以上
- npm
- Docker
- Supabase CLI

### インストール手順

1. リポジトリのクローン
```bash
git clone https://github.com/kater-iam/ski-school-management-2.git
cd ski-school-management-2
```

2. フロントエンドの依存関係インストール
```bash
cd next-app
npm install
```

3. Supabaseの依存関係インストール
```bash
cd supabase
npm install
```

4. Supabaseの起動
```bash
supabase start
```

5. データベースのマイグレーションとシード
```bash
supabase db reset
```

6. フロントエンドの起動
```bash
cd next-app
npm run dev
```

## テスト

### Supabaseのテスト

#### ローカルでのテスト実行
```bash
cd supabase
npm test
```

#### GitHub Actionsでのテスト
プロジェクトにはGitHub Actionsが設定されており、以下のタイミングで自動的にテストが実行されます：
- `main`ブランチへのプッシュ時
- `develop`ブランチへのプッシュ時
- プルリクエスト作成時

テストの実行状況は[GitHub Actionsタブ](https://github.com/kater-iam/ski-school-management-2/actions)で確認できます。

#### ローカルでのGitHub Actionsテスト
GitHub Actionsのワークフローをローカルでテストするには、[act](https://github.com/nektos/act)を使用します：

1. actのインストール
```bash
brew install act
```

2. ワークフローの実行
```bash
act push -W .github/workflows/supabase-test.yml --container-architecture linux/amd64
```

注意: M1 Macでは一部の機能が制限される場合があります。その場合は直接 `npm test` を使用してください。

## ブランチ戦略
- `main`: 本番環境用のブランチ
- `develop`: 開発用のブランチ
- 機能追加は `feature/YYYYMM/author/function-name` の形式でブランチを作成

例：
```bash
# 新しい機能のブランチを作成
current_date=$(date '+%Y%m')
git checkout -b feature/${current_date}/yousan/add-user-authentication
```

## コミットメッセージの規約
- フォーマット: `${verb} ${message}`
- 英語で記載
- 動詞は現在形を使用

例：
- `add user authentication feature`
- `fix database connection error`
- `update README documentation`

## API仕様
APIの詳細な仕様は[Supabase Dashboard](http://localhost:54323)で確認できます。

## 環境変数
必要な環境変数は`.env.example`を参照してください。

## ライセンス
このプロジェクトはMITライセンスの下で公開されています。 