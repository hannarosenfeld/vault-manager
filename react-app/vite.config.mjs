import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';  // Use the correct package

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // This is now using the correct PostCSS package
  ],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    cors: true,
    proxy: {
      "/api/": {
        target: "http://127.0.0.1:5000/api/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
