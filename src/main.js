import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import 'dayjs/locale/zh-cn'
import api from "@/api";
import 'element-plus/dist/index.css'
import {createPinia} from "pinia";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(api);

app.mount('#app');
