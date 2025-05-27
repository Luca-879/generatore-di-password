import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
      base: '/generatore-di-password/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
