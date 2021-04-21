import Vue from 'vue';
import VueRouter from 'vue-router';
import { langs } from '@/config/setup';
import routeList from './routes';
import langEach from './langEach';

Vue.use(VueRouter);

const routes = [];

if (langs.length > 1) {
    // 生成多语言路由
    langs.forEach((lang) => {
        routeList.forEach((item) => {
            routes.push({
                ...item,
                path: `/${lang}/${item.path.replace(/^\/+/, '')}`,
                meta: {
                    layout: 'Default',
                    ...item.meta,
                },
            });
        });
    });
} else {
    routeList.forEach((item) => {
        routes.push({
            ...item,
            path: `/${item.path.replace(/^\/+/, '')}`,
            meta: {
                layout: 'Default',
                ...item.meta,
            },
        });
    });
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth',
            };
        }

        return savedPosition || { x: 0, y: 0 };
    },
});

/**
 * 添加路由守卫
 *
 * @param {object|array} context 路由守卫
 */
const routerEach = (context) => {
    if (Array.isArray(context)) {
        context.forEach((item) => router.beforeEach(item));
    } else {
        if (Array.isArray(context.beforeEach)) {
            context.beforeEach.forEach((item) => router.beforeEach(item));
        }

        if (Array.isArray(context.afterEach)) {
            context.afterEach.forEach((item) => router.afterEach(item));
        }
    }
};

routerEach(langEach);

export default router;
