import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfilio2/',
  build: {
    outDir: 'dist',
    rollupOptions:{
      external: ['framer-motion'],
      output:{
        globals:{
          'framer-motion': 'framerMotion',
        },
      },
    },
  },
})
