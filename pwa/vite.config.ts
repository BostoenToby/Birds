import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
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

    VitePluginFonts({
      typekit: {
        id: 'afx8ltw', //haal id uit adobe font link achteraan of zie webprojecten adobe fonts
        defer: true,
        injectTo: 'head',
      },
    }),
  ],
})
