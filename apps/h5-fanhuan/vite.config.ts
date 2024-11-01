/// <reference types='vitest' />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/h5-fanhuan',
  resolve: {
    alias: {
      '@fanhuan/h5': path.resolve(__dirname, './src'),
      '@fanhuan/css': path.resolve(__dirname, '../../css'),
      '@fanhuan/shared': path.resolve(__dirname, '../../shared/src/index.ts'),
      '@fanhuan/ui': path.resolve(__dirname, '../../ui/src/index.ts'),
    },
  },
  server: {
    port: 4200,
    host: '10.0.138.191',
    proxy: {
      '/tq-api': {
        target: 'https://test-tequan.seeyouyima.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tq-api/, ''),
      }
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [vue(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md']), vueJsx()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/h5-fanhuan',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/h5-fanhuan',
      provider: 'v8',
    },
  },
});
