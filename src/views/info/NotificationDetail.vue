<template>
    <div class="main">
        <el-skeleton :loading="loading" animated>
            <template #template>
                <el-skeleton-item variant="image" class="fake-image"/>
                <el-skeleton-item variant="h1" class="fake-h1"/>
                <el-skeleton-item variant="rect" class="fake-content"/>
            </template>
            <template #default>
                <el-image :src="notificationDetail.image" class="image"/>
                <h1>{{ notificationDetail.title }}</h1>
                <div class="time">发布于{{ notificationDetail.date }}</div>
                <div v-html="notificationDetail.content"></div>
            </template>
        </el-skeleton>
    </div>
</template>

<script setup>

import {inject, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";

const $api = inject('$api');
const route = useRoute();

const id = ref(route.params.id);
// 是否处于加载状态
const loading=ref(true);
// 存储通知数据
const notificationDetail = ref({});
// 发请求获取通知内容
async function getContent() {
    const result = await $api.home.requestNotificationDetail(id.value);
    if (result.result === '1') {
        notificationDetail.value=result.data;
        loading.value = false;
    } else {
        ElMessage({
            message: result.message || '无法获取通知内容',
            type: 'error'
        });
    }
}

onMounted(()=>{
    getContent();
});
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;
}

.fake-image {
    width: 100%;
    height: 300px;
}

.fake-h1 {
    margin: 24px 0;
    height: 32px;
}

.fake-content {
    height: 300px;
}

.image {
    width: 100%;
}

h1 {
    font-size: 28px;
    margin-bottom: 10px;
}

.time {
    font-size: 12px;
    opacity: 60%;
}
</style>