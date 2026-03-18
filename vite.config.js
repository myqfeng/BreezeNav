import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import { site, theme } from './src/config/site'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.js',
      template: 'index.html',
      inject: {
        data: {
          title: site.title,
          subtitle: site.subtitle,
          description: site.description,
          keywords: site.keywords,
          author: site.author,
          favicon: site.favicon,
        },
      },
    }),
  ],
})
