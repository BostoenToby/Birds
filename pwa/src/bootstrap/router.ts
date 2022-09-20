import { RouteRecordRaw, Router, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../components/holders/AppHolder.vue'), //this is a dynamic import, can also be a static import --> lazy loading
        children: [
            {
                path: '', // altijd naar / resolven 
                component: () => import('../screens/Home.vue'),
            },
            {
                path: 'observations', 
                component: () => import('../screens/observations/index.vue'),
            },
            {
                path: 'locations', 
                component: () => import('../screens/locations/index.vue'),
            },
            {
                path: 'log', 
                component: () => import('../screens/log/index.vue'),
            },
            {
                path: 'birds', 
                component: () => import('../screens/birds/index.vue'),
            },
            {
                path: 'account', 
                component: () => import('../screens/Account.vue')
            }
        ]
    },
    {
        path: '/auth',
        redirect: '/auth/login',
        component: () => import('../components/holders/AuthHolder.vue'),
        children: [
            {
                path: 'login',
                component: () => import('../components/auth/Login.vue')
            },
            {
                path: 'register',
                component: () => import('../components/auth/Register.vue')
            },
            {
                path: 'forgot-password',
                component: () => import('../components/auth/ForgotPassword.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*', //notatie voor wildcard, iedere pagina die we niet zelf gemaakt hebben
        name: 'ClientError',
        component: () => import('../screens/generic/ClientError.vue') //als je deze static import (bovenaan) zal deze pagina altijd inladen als je naar gelijk welke pagina gaat --> verspilling van bandwidth
    }
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router