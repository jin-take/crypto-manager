# Crypto-manager

環境:
- React + Node.js (Express) + MySQL
ブロックチェーン上のアドレス残高を取得・保存・表示するアプリ

## 🚀 Quickstart

以下の方法でローカル環境で立ち上げられます。

### 前提条件

- [Docker](https://www.docker.com/) / Docker Compose がインストールされていること

---

### 起動手順

1. **このリポジトリをクローン**

```bash
git clone git@github.com:jin-take/crypto-manager.git
cd crypto-manager
```

2. **Docker コンテナをビルド & 起動**

```bash
docker-compose up --build
```

3. **ブラウザでフロントエンドにアクセス**

```txt
http://localhost:3000
```

---

### 🐬 MySQL情報

- ホスト: `localhost`（Docker内部では `db`）
- ポート: `3306`
- DB名: `crypto-manager`
- ユーザー: `root`
- パスワード: `root`

→ workbenchやsequel aceで動作確認済み

---

### 🧪 API 確認用エンドポイント

APIは Express ベースで以下のようにアクセス可能です：

```bash
GET http://localhost:4000/api/balance/:address
```

---

### 📁 各ディレクトリの役割

| ディレクトリ | 説明 |
|--------------|------|
| `frontend/` | ReactベースのUIアプリ |
| `backend/`  | Node.js + Express + TypeScriptのAPIサーバー |
| `db` (Docker) | MySQL 9 コンテナによるデータベース |

