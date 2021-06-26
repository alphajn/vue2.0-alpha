const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '@/views/home.vue'),
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import(/* webpackChunkName: "about" */ '@/views/demo.vue'),
    },
];

export default routes;
