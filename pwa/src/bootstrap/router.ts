import { RouteRecordRaw, Router, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [{
    path: "/",
    name: "Home",
    component: () => import('../screens/Home.vue')
},
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router