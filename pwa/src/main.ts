import {
  App as VueApp,
  createApp,
  h,
} from 'vue'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import router from './bootstrap/router'
import useAuthentication from './composables/useAuthentication'
import useApollo from './composables/useGraphQL'

const app: VueApp = createApp({
  setup() {
    useApollo
  },
  render: () => h(App)
})

const { restoreUser } =
  useAuthentication()

// self evoking function --> kan ook een functie maken en die direct aanroepen
;(async function () {
  await restoreUser()
  app.use(router)
  app.mount('#app')
})()
