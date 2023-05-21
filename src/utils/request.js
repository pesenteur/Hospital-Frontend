// 二次封装axios
import axios from 'axios'
import {useAccountStore} from "@/stores/account";
import pinia from "@/stores/pinia";
import {ElMessage} from "element-plus";

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
requests.interceptors.response.use(response=>response.data, error => {
    if (error.response.status === 401) {
        const accountStore = useAccountStore(pinia);
        accountStore.Handle401();
        ElMessage({
            message: 'token有误，请刷新重试',
            type: 'error'
        });
    } else {
        ElMessage({
            message: '请检查网络连接',
            type: 'error'
        });
    }
    return Promise.reject(error.response.data);
});

export default requests;