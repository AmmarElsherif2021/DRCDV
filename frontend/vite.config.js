/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL || 'https://drcdv-1.onrender.com',
          changeOrigin: true,
          secure: false,
        },
        '/socket.io': {
          target: env.VITE_SOCKET_HOST || 'https://drcdv-1.onrender.com',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    define: {
      'process.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL),
      'process.env.VITE_SOCKET_HOST': JSON.stringify(env.VITE_SOCKET_HOST),
    },
  }
})
