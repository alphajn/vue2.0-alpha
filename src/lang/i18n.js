// i18n-setup.js

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { langs, lang as defaultLang } from '@/config/setup';

// 默认存储的cookie key
const STORAGE_LANG = 'lang';
const loadedLanguages = ['en']; // 我们的预装默认语言

Vue.use(VueI18n);

// 国家化实例对象
const i18n = new VueI18n({
    fallbackLocale: 'zh-cn', // 失败使用默认中文
    silentTranslationWarn: true, // 禁止本地化失败警告
});

// i18n添加支持的语言的语言
i18n.langs = langs;

/**
 * 判断语言是否支持设置
 *
 * @param {string} lang 需要判断的语言
 * @returns {boolean} 支持返回true
 */
const supportLang = (lang = '') => lang && langs.includes(lang.toLowerCase());

/**
 * 替换链接中的语言标识
 *
 * @description
 * 1. 会自动替换错误的 //
 * 2. 根据当前的语言，自动处理前缀
 * 3. 如果为单语言，将自动删除 lang 前缀
 *
 * @param  {string} path - 路径链接.
 * @param  {string} [lang=i18n.locale] - 追加语言，默认为当前语言
 * @return {string} 替换后的路径
 *
 * @example
 *  1. 默认追加当前语言
 *      replace('/login') => /zh-cn/login
 *
 *  2. 替换当前语言
 *      replace('/en-us/login') => /zh-cn/login
 *
 *  3. 替换参数语言
 *      replace('/en-us/login', 'zh') => /zh/login
 *
 *  4. 自动修改链接中的 /
 *      replace('//zh-cn///login') => /zh-cn/login
 */
const replacePath = (path = '', lang = i18n.locale) => {
    // 过滤开头的 / ，用来做路径分隔。过滤转义符，防止外链接钓鱼
    // 以 / 分隔来取 lang
    const paths = path.replace(/^[\\/]+/, '').split(/\/+/);

    // 如果一级是语言，则删除
    if (supportLang(paths[0])) {
        paths.shift();
    }

    // 处理多语言前缀
    return lang ? `/${lang}/${paths.join('/')}` : `/${paths.join('/')}`;
};

/**
 * 获取除origin之外的全路径-替换语言之后的
 *
 * @param {*} lang
 * @returns
 */
const getFullPath = (lang = i18n.locale) => {
    const fullPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    return replacePath(fullPath, lang);
};

/**
 * 获取语言 本地缓存 > 浏览器 > 默认
 *
 * @return {string|undefined}
 */
const getLanguage = () => {
    const storageLang = localStorage.getItem(STORAGE_LANG);
    if (supportLang(storageLang)) {
        return storageLang;
    }

    const language = navigator.language || navigator.userLanguage;
    const index = langs.findIndex((lang) => language.indexOf(lang.split('-')[0]) > -1);

    if (index > -1) {
        return langs[index];
    }

    return defaultLang;
};

/**
 * 异步加载语言包并设置语言
 *
 * @param {string} lang 目录语言
 * @return {Promise}
 */
const setAsyncLang = (lang = '') => {
    lang = supportLang(lang) ? lang.toLowerCase() : defaultLang;
    i18n.locale = lang;
    localStorage.setItem(STORAGE_LANG, lang);

    if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}/index.js`).then((data) => {
            if (data.default) {
                data = data.default;
            }

            i18n.setLocaleMessage(lang, data);
            loadedLanguages.push(lang);
            return Promise.resolve(lang);
        });
    }

    return Promise.resolve(lang);
};

/**
 * 设置当前语言
 *
 * @param {string} lang 需要设置的语言
 * @param {Boolean} redirect 设置完是否需要重定向
 */
i18n.setLang = (lang = '', redirect = false) => {
    if (!supportLang(lang)) return;

    // 如果重定向
    if (redirect) {
        localStorage.setItem(STORAGE_LANG, lang);

        // 跳转链接
        window.location.href = getFullPath(lang);
    } else {
        window.history.pushState(null, '', getFullPath(lang));

        setAsyncLang(lang);
    }
};

export {
    i18n,
    supportLang,
    replacePath,
    setAsyncLang,
    getLanguage,
};
