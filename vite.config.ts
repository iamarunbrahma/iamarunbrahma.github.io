import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    mdx(),
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://arunbrahma.com',
      dynamicRoutes: ['/shelf'],
      changefreq: 'weekly',
      priority: 1.0,
      robots: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api/', '/_*', '/assets/*.map'],
          crawlDelay: 1,
        },
      ],
    }),
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'lucide': ['lucide-react'],
        },
      },
    },
  },
});
