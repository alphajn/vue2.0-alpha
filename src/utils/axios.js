import axios from 'axios';
import {
    requestHandle,
    responseHandle,
    errorHandle,
} from '@/config/proxy';

const Axios = axios.create({
    timeout: 30000, // 30秒
    headers: {
        post: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
    },
    emulateJSON: true,
    // withCredentials: true, // `withCredentials` 表示跨域请求时是否需要使用凭证
});

// 请求参数处理
Axios.interceptors.request.use((config) => requestHandle(config), (error) => errorHandle(error));

// 响应数据处理
Axios.interceptors.response.use((response) => responseHandle(response), (error) => errorHandle(error));

export default Axios;
