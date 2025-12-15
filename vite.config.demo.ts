/// <reference types="vite/client" />
import viteTsConfigPaths from 'vite-tsconfig-paths'
import commonjs from 'vite-plugin-commonjs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'
import sass from 'sass'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteTsConfigPaths(),
    commonjs(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  }
})

