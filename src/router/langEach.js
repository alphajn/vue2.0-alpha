/**
 * @file 路由中语言处理-导航守卫
 */

import {
    supportLang,
    setAsyncLang,
    getLanguage,
} from '@/lang/i18n';
import { lang, langs } from '@/config/setup';

export default [
    ({ path, query, hash }, from, next) => {
        let pathLang = path.split('/')[1];
        pathLang = pathLang ? pathLang.toLowerCase() : pathLang;

        // 如果连接中没有语言，则使用 browser > default
        if (!supportLang(pathLang) && langs.length > 1) {
            const defaultLang = getLanguage();

            return next({
                path: `/${defaultLang}/${path.replace(/^\/+/g, '')}`,
                query,
                hash,
                replace: true,
            });
        }

        // 设置语言
        setAsyncLang(pathLang || lang).then(() => next());
    },
];
