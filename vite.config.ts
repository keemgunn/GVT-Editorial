import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import sassGlobImports from 'vite-plugin-sass-glob-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    sassGlobImports(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
  }
})
