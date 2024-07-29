# ベースイメージを指定
FROM node:18

# アプリケーションディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# ソースコードをコピー
COPY . .

# Vite開発サーバーを起動
CMD ["npm", "run", "dev"]