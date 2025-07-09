import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: 'src/popup.html',
        options: 'src/options.html',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
