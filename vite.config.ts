/// <reference types="vite-svg-loader" />

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'unplugin-dts/vite';
import svgLoader from 'vite-svg-loader';

const externalDependencies = [
  '@vimeo/player',
  'email-validator',
  'gsap',
  'gsap/ScrollTrigger',
  'query-string',
  'swiper',
  'swiper/modules',
  'swiper/vue',
  'vue',
];

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
    dts({
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        quietDeps: true,
        silenceDeprecations: ['import'],
      },
    },
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: 'src/index.ts',
      name: 'ModularComponents',
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es'
        ? 'modular-components.js'
        : 'modular-components.cjs',
      cssFileName: 'modular-components',
    },
    rollupOptions: {
      external: externalDependencies,
    },
  },
});
