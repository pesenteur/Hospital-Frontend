<template>
    <el-card shadow="hover" class="card">
        <div class="first">
            <div>
                <el-avatar size="large" :src="data.image"/>
                <div class="short">
                    <div class="name">{{ data.name }}</div>
                    <div class="department">{{ data.department }}</div>
                </div>
            </div>
            <div>
                <router-link :to="`/doctor-detail/${data.id}`" class="more">
                    查看更多
                    <el-icon><DArrowRight/></el-icon>
                </router-link>
            </div>
        </div>
        <el-divider/>
        <div>
            <el-scrollbar>
                <div class="detail">{{ data.introduction }}</div>
            </el-scrollbar>
        </div>
    </el-card>
</template>

<script setup>
import {DArrowRight} from "@element-plus/icons-vue";

const props = defineProps(['data']);
</script>

<style scoped>
.card {
    width: 330px;
    height: 280px;
    margin: 20px 40px 20px 0;
}

.first {
    display: flex;
    justify-content: space-between;
}

.first>div:first-child {
    display: flex;
}

.short {
    margin-left: 30px;
}

.more {
    display: flex;
    align-items: center;
}

.more:hover {
    color: #409eff;
}

.name {
    font-weight: bold;
    font-size: 1.2em;
}

.department {
    margin-top: 3px;
    font-weight: bold;
    font-size: 1.1em;
}

.detail {
    width: 100%;
    height: 135px;
}
</style>