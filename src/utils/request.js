// 二次封装axios
import axios from 'axios'
import {useAccountStore} from "@/stores/account";
import {ElMessage} from "element-plus";
import router from "@/router";

// 1. 创建axios实例
const requests = axios.create({
    baseURL: 'http://azure.pesenteur.eu.org:5555/api',
    timeout: 5000
});

// 2. 请求拦截器
requests.interceptors.request.use(config=>{
    const accountStore = useAccountStore();
    if (accountStore.token) {
        config.headers.Authorization = accountStore.token;
    }
    return config;
});

// 3. 响应拦截器
requests.interceptors.response.use(response=> {
    return response.data
}, error => {
    if (error.response && error.response.status === 401) {
        const accountStore = useAccountStore();
        accountStore.logout();
        router.push({
            path: '/login',
            query: {
                'redirect': router.currentRoute.value.fullPath
            }
        }).then(()=>{});
        ElMessage({
            message: 'token失效，请重新登录',
            type: 'error'
        });
    } else if (!error.response?.data.result) {
        error.response = {
            data: {
                result: '0',
                message: '未知错误，请稍后重试'
            }
        }
    }
    return error.response.data;
});

export default requests;