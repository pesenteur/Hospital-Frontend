<template>
    <div class="main">
        <el-page-header @back="goBack">
            <template #content>
                <span class="header-title"> 医生详情 </span>
            </template>
        </el-page-header>
        <el-card shadow="never" class="card">
            <div class="first">
                <el-avatar size="large" :src="detail.image"/>
                <div class="text">
                    <div class="name">{{ detail.name }}</div>
                </div>
            </div>
            <el-divider/>
            <div class="info">
                <div>科室</div>
                <div>{{ detail.department }}</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>医生介绍</div>
                <el-scrollbar>
                    <div class="detail">{{ detail.introduction }}</div>
                </el-scrollbar>
            </div>
            <el-divider/>
            <div class="info">
                <div>出诊日期</div>
                <div class="available">
                    <el-tag
                        class="available-item"
                        size="large"
                        v-for="(item, index) in detail.available"
                        :key="index"
                    >
                        <div>{{ item }}</div>
                    </el-tag>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const router = useRouter();
const route = useRoute();
const $api = inject('$api');

// 存储医生的数据
const detail = ref({});
// 获取医生的数据
async function getDetail() {
    const result = await $api.doctor.requestDoctorDetail(route.params.doctorID);
    if (result.result === "1") {
        detail.value = result.data;
    } else {
        ElMessage({
            message: '获取医生数据失败，请刷新页面',
            type: 'error'
        });
    }
}

onMounted(()=>{
    getDetail();
});

function goBack() {
    router.back();
}
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;
}

.header-title {
    font-size: 22px;
    font-weight: bold;
}

.card {
    margin-top: 40px;
}

.first {
    display: flex;
}

.text {
    margin-left: 30px;
}

.name {
    font-weight: bold;
    font-size: 1.2em;
}

.detail {
    font-size: 0.8em;
    width: 650px;
    height: 60px;
}

.info {
    display: flex;
}

.info>div:first-child{
    margin-right: 30px;
    width: 100px;
    font-size: 18px;
}

.available {
    display: flex;
    flex-wrap: wrap;
    width: 650px;
}

.available-item {
    margin: 0 70px 20px 0;
}
</style>