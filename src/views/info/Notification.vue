<template>
    <div class="banner"></div>
    <info-list :data="data" target="notification"/>
    <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="prev,pager, next, jumper"
        :page-count="pageCount"
        hide-on-single-page
        background
        class="pagination"
    />
</template>

<script setup>
import InfoList from "@/views/info/InfoList.vue";
import {computed, inject, onMounted, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const route = useRoute();
const router = useRouter();
const $api = inject('$api');

// 分页器
const page = route.query.page ? route.query.page * 1: 1;
const pageSize = ref(10);
const currentPage = ref(page);
const total = ref(0);
const pageCount = computed(()=>Math.ceil(total.value/pageSize.value));
watch(currentPage, (newPage)=>{
    router.push({
        path: '/notification',
        query: {
            page: newPage
        }
    });
});

// 存储通知数据
const data = ref();
// 发送请求获取数据
async function getData() {
    const offset = (currentPage.value - 1) * pageSize.value + 1;
    const result = await $api.home.requestNotificationList(offset, pageSize.value);
    if (result.result === '1') {
        data.value = result.data;
        total.value = result.total;
    } else {
        ElMessage({
            message: result.message || '获取通知失败，请刷新重试',
            type: 'error'
        });
    }
}
// 路由改变需要发送请求获取数据
onBeforeRouteUpdate((to, from)=>{
    if (to.path === '/notification') {
        currentPage.value = to.query.page ? to.query.page * 1 : 1;
        getData();
    }
});

onMounted(()=>{
    getData();
});
</script>

<style scoped>
.banner {
    width: 100%;
    height: 200px;
    background-image: url("@/assets/banner.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}
.pagination {
    justify-content: center;
}
</style>