import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';
import vue from '@vitejs/plugin-vue';
import {svelte, vitePreprocess} from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  root: 'app',
  resolve: {
    conditions: ['quilt:source'],
  },
  // We need to disable fast refresh for the Preact plugin, as it doesn’t work in workers
  // as it tries to access `window`
  plugins: [
    preact({prefreshEnabled: false}),
    svelte({
      preprocess: vitePreprocess(),
    }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('ui-'),
        },
      },
    }),
  ],
});
