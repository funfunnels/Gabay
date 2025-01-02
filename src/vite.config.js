import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/synagogue-app/', // שם הריפו שלך
  build: {
    outDir: 'dist',
  }
})
