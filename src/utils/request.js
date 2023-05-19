// 二次封装axios
import axios from 'axios'
import {useAccountStore} from "@/stores/account";
import pinia from "@/stores/pinia";

// 1. 创建axios实例
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
});

// 2. 请求拦截器
requests.interceptors.request.use(config=>{
    const accountStore = useAccountStore(pinia);
    if (accountStore.token) {
        config.headers.Authorization = accountStore.token;
    }
    return config;
});

// 3. 响应拦截器
requests.interceptors.response.use(response=>response.data);

export default requests;