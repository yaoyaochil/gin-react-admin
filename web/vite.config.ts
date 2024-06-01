import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import * as http from "node:http"
import dotenv from 'dotenv'

// 手动加载 .env 文件
dotenv.config()

console.log('VITE_API_HOST:', process.env.VITE_API_HOST);
console.log('VITE_API_PORT:', process.env.VITE_API_PORT);
console.log('VITE_APP_NAME:', process.env.VITE_APP_NAME);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: `http://${process.env.VITE_API_HOST || '127.0.0.1'}:${process.env.VITE_API_PORT || '8800'}`,
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        agent: new http.Agent({keepAlive:true}), // agent: new http.Agent({ keepAlive: true })
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  }
})
