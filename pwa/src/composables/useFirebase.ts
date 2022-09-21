import {
  FirebaseApp,
  initializeApp,
} from 'firebase/app'
import { ref, Ref } from 'vue'
import {
  getAuth,
  Auth,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'

export default () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env
      .VITE_authDomain,
    projectId: import.meta.env
      .VITE_projectId,
    storageBucket: import.meta.env
      .VITE_storageBucket,
    messagingSenderId: import.meta.env
      .VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
  }

  const app: FirebaseApp =
    initializeApp(firebaseConfig)
  const auth: Auth = getAuth()
  setPersistence(
    auth,
    browserLocalPersistence,
  )
  // setPersistence hier plaatsen als je standaard ingelogd wilt blijven (zonder "wil je aangemeld blijven" button)

  return {
    app,
    auth,
  }
}
