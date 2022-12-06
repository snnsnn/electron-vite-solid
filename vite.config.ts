import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solidPlugin(),
    electron({
      // entry: 'main/main.ts',
      entry: ['main/main.ts', 'main/preload.ts'],
      vite: {
        build: {
          outDir: 'dist',
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    outDir: 'dist/app',
  },
});
