import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
    },
    {
        path: '/test/css',
        name: 'css',
        component: () => import(/* webpackChunkName: "test" */ '@/views/test/css.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
