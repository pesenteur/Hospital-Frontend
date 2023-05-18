// 二次封装axios
import axios from 'axios'

// 1. 创建axios实例
const requests = axios.create({
    baseURL: '/api',
    timeout: 5000
});

// 2. 请求拦截器
requests.interceptors.request.use(config=>{
    return config;
});

// 3. 响应拦截器
requests.interceptors.response.use(response=>response.data);

export default requests;