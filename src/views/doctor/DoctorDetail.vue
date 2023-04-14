<template>
    <div class="main">
        <el-card shadow="never" class="card">
            <div class="first">
                <el-avatar size="large"/>
                <div class="text">
                    <div class="name">医生名</div>
                </div>
            </div>
            <el-divider/>
            <div class="info">
                <div>科室</div>
                <div>某某某科室</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>医生介绍</div>
                <el-scrollbar>
                    <div class="detail">这是医生的具体介绍</div>
                </el-scrollbar>
            </div>
            <el-divider/>
            <div class="info">
                <div>出诊日期</div>
                <div class="available">
                    <el-tag class="available-item" size="large">
                        <div>2023年4月24日（周一）上午</div>
                    </el-tag>
                    <el-tag class="available-item" size="large">
                        <div>2023年4月25日（周二）下午</div>
                    </el-tag>
                </div>
            </div>
            <div class="button">
                <el-button type="primary" size="large">确认</el-button>
                <el-button size="large" :plain="true">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import {Plus} from "@element-plus/icons-vue";
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;
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
    width: 200px;
    height: 60px;
}

.info {
    display: flex;
}

.info>div:first-child{
    margin-right: 30px;
    width: 100px;
}

.available {
    display: flex;
    flex-wrap: wrap;
}

.available-item {
    margin: 0 30px 20px 0;
}

.button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 30px;
}
</style>