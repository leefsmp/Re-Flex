/// <reference types="vite/client" />
import viteTsConfigPaths from 'vite-tsconfig-paths'
import commonjs from 'vite-plugin-commonjs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'
import path from 'path'
import sass from 'sass'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({insertTypesEntry: true}), 
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
    // Downlevel modern syntax (class fields, etc.) so the
    // published output doesn't require consumers' own
    // toolchains (e.g. webpack + babel-loader configured to
    // skip node_modules) to understand bleeding-edge syntax
    target: 'es2017',
    lib: {
      entry: resolve(__dirname, 'src/libts/index.ts'),
      formats: ['es', 'cjs', 'umd'],
      name: 'react-reflex'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
})

