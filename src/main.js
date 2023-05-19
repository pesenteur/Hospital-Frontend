import {createApp} from 'vue'
import pinia from "@/stores/pinia";
import App from './App.vue'
import router from './router'
import 'dayjs/locale/zh-cn'
import '@/mock/mockServer'
import api from "@/api";
import 'element-plus/dist/index.css'

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(api);

app.mount('#app');
