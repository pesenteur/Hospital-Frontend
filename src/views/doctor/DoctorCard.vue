<template>
    <el-card shadow="hover" class="card">
        <div class="first">
            <div>
                <el-avatar size="large"/>
                <div class="short">
                    <div class="name">医生名</div>
                    <div class="department">科室</div>
                </div>
            </div>
            <div>
                <router-link to="/doctor-detail/10001" class="more">
                    查看更多
                    <el-icon><DArrowRight/></el-icon>
                </router-link>
            </div>
        </div>
        <el-divider/>
        <div>
            <el-scrollbar>
                <div class="detail">这是医生的具体介绍</div>
            </el-scrollbar>
        </div>
    </el-card>
</template>

<script setup>
import {DArrowRight} from "@element-plus/icons-vue";
</script>

<style scoped>
.card {
    width: 330px;
    height: 280px;
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
    font-weight: bold;
    font-size: 1.1em;
}

.detail {
    width: 200px;
    height: 60px;
}
</style>