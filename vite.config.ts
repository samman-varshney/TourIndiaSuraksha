import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

// Vite build configuration with React plugin and path alias
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      // Allows imports like: import X from '@/components/X'
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    // Proxy API calls to backend during local development
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
