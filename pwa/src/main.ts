import { App as VueApp, createApp } from 'vue'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import router from './bootstrap/router'
import useAuthentication from './composables/useAuthentication'

const app: VueApp = createApp(App)

const { restoreUser } = useAuthentication()

;(async function() {
    await restoreUser()
    app.use(router)

app.mount('#app')
})()
