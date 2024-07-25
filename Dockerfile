# ベースイメージ
FROM node:14

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# アプリケーションを提供するために使用するポート
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]

