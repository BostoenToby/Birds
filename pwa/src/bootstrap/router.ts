import {
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from 'vue-router'
import useAuthentication from '../composables/useAuthentication'

const { user } = useAuthentication()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () =>
      import(
        '../components/holders/AppHolder.vue'
      ), //this is a dynamic import, can also be a static import --> lazy loading
    children: [
      {
        path: '', // altijd naar / resolven
        component: () =>
          import('../screens/Home.vue'),
      },
      {
        path: 'observations',
        component: () =>
          import(
            '../screens/observations/index.vue'
          ),
        meta: {
          needsAuthentication: true,
        },
      },
      {
        path: 'locations',
        component: () =>
          import(
            '../screens/locations/index.vue'
          ),
      },
      {
        path: 'log',
        component: () =>
          import(
            '../screens/log/index.vue'
          ),
        meta: {
          needsAuthentication: true,
        },
      },
      {
        path: 'birds',
        component: () =>
          import(
            '../screens/birds/index.vue'
          ),
      },
      {
        path: 'account',
        component: () =>
          import(
            '../screens/Account.vue'
          ),
        meta: {
          needsAuthentication: true,
        },
      },
    ],
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: () =>
      import(
        '../components/holders/AuthHolder.vue'
      ),
    children: [
      {
        path: 'login',
        component: () =>
          import(
            '../components/auth/Login.vue'
          ),
        meta: {
          cantAuthenticate: true,
        },
      },
      {
        path: 'register',
        component: () =>
          import(
            '../components/auth/Register.vue'
          ),
        meta: {
          cantAuthenticate: true,
        },
      },
      {
        path: 'forgot-password',
        component: () =>
          import(
            '../components/auth/ForgotPassword.vue'
          ),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*', //notatie voor wildcard, iedere pagina die we niet zelf gemaakt hebben
    name: 'ClientError',
    component: () =>
      import(
        '../screens/generic/ClientError.vue'
      ), //als je deze static import (bovenaan) zal deze pagina altijd inladen als je naar gelijk welke pagina gaat --> verspilling van bandwidth
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
  ) => {
    if (
      to.meta.needsAuthentication &&
      !user.value
    )
      return 'auth/login'
    if (
      to.meta.cantAuthenticate &&
      user.value
    )
      return '/'
  },
)

export default router
