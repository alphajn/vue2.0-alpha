import axios from 'axios';
import { api } from '@/config/api';

const Axios = axios.create({
    timeout: 30000,
    headers: {
        post: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    },
    emulateJSON: true,
    // withCredentials: true, // `withCredentials` 表示跨域请求时是否需要使用凭证
});

// 请求参数处理
Axios.interceptors.request.use((config) => {
    Object.keys(api).some((key) => {
        if (config.url.indexOf(key) !== -1) {
            const target = typeof api[key] === 'string' ? api[key] : api[key].url;
            // eslint-disable-next-line
            config.url = config.url.replace(key, target);
            // eslint-disable-next-line
            config.headers = { ...api[key].headers(), ...config.headers };
            return true;
        }
        return false;
    });

    // eslint-disable-next-line
    config.params = {
        ...config.params,
        t: Math.random().toString(36).slice(2),
    };

    // eslint-disable-next-line
    config.headers = {
        // 'Accept-Language': 'ch', // 设置多语言
        ...config.headers,
    };
    return config;
}, (error) => Promise.reject(error));

// 响应数据处理
Axios.interceptors.response.use((response) => {
    // 处理data为字符串的
    if (typeof response.data === 'string') {
        response.data = {
            data: response.data,
            code: 0,
        };
    }

    return response.data;
}, (error) => Promise.resolve({
    error: error.config,
    msg: '系统错误',
    code: false,
}));


export default Axios;
