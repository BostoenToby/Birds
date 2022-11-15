import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  
  server: {
    host: '0.0.0.0',
  },
  
  plugins: [
    vue(),

    Unocss({
      rules: [
        [
          'font-theme',
          {
            'font-family':
              'din-condensed, sans-serif;',
          },
        ],
      ],
    }),

    VitePWA({
      // filename: 'sw.ts', //als je zelf wilt werken met serviceworkers
      strategies: 'generateSW' //niet zelfde strategies als in theorie van caching enz...
    }),

    VitePluginFonts({
      typekit: {
        id: 'afx8ltw', //haal id uit adobe font link achteraan of zie webprojecten adobe fonts
        defer: true,
        injectTo: 'head',
      },
    }),
  ],
})
