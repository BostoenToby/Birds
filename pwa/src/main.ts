import { App as VueApp, createApp, h } from 'vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'

import App from './App.vue'
import router from './bootstrap/router'
import useAuthentication from './composables/useAuthentication'
import useApollo from './composables/useGraphQL'
import usei18n from './composables/usei18n'

const app: VueApp = createApp({
  setup() {
    useApollo
  },
  render: () => h(App),
})

const { restoreUser } = useAuthentication() //ingelogd blijven

const { i18n, loadLocale } = usei18n()
loadLocale()
app.use(i18n) //moet beschikbaar zijn voor de router dus zo vroeg mogelijk

// self evoking function --> kan ook een functie maken en die direct aanroepen
;(async function () {
  await restoreUser()
  app.use(router)
  app.mount('#app')
})()
