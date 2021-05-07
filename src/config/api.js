/**
 * @file 统一操作 API
 *
 * @example
 *  - vm.$api.post.test
 *
 *  - import { $api } from '@/utils/api';
 *  - $api.post.test
 *  - $api.get.test
 */

import axios from '@/utils/axios';

const post = {
    test(params) {
        return axios.post('@post/aaa', params);
    },
};

const get = {
    test(params) {
        return axios.get('@text/aaa', { params });
    },
};

const api = {
    getCurrency(params) {
        return axios.get('@api/pro/v2/beta/common/currencies', { params });
    },
};

// 外部单独引用
export const $api = {
    post,
    get,
    api,
};

// 方便挂在到Vue实例上使用
export const install = (Vue) => {
    Vue.prototype.$api = $api;

    // 开发环境打印请求接口
    if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line
        console.log('%c可用的 this.$api', 'background-color: #0bba96; color: #fff; padding: 2px 4px; border-radius: 4px;', Vue.prototype.$api);
    }
};
