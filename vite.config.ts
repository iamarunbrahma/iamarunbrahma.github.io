import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import createSitemapPlugin from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    createSitemapPlugin({
      hostname: 'https://arunbrahma.com',
      dynamicRoutes: ['/'],
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      outDir: 'dist',
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 1.0
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  publicDir: 'public',
  assetsInclude: ['**/*.md'],
})