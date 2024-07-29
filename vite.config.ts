import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // 外部からのアクセスを許可
        port: 3000, // 使用するポート
        watch: {
            usePolling: true, // Docker内でのファイル変更を検知するための設定
        },
    },
});
