<template>
    <div class="main">
        <el-card shadow="never" class="card">
            <div class="introduction">
                <el-avatar size="large"/>
                <div class="text">
                    <div class="name">医生名</div>
                    <div>科室</div>
                    <el-scrollbar>
                        <div class="detail">这是医生的具体介绍</div>
                    </el-scrollbar>
                </div>
            </div>
            <el-divider/>
            <div class="info">
                <div>就诊医区</div>
                <div>某某某医院</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>就诊日期</div>
                <div>2023年4月17日（星期二）上午</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>诊查费</div>
                <div>20.00 元</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>选择就诊人</div>
                <el-select>
                    <el-option value="add">
                        <el-icon>
                            <Plus/>
                        </el-icon>
                        添加就诊人
                    </el-option>
                </el-select>
            </div>
            <el-divider/>
            <div class="info">
                <div>
                    预约时间段
                </div>
                <el-radio-group class="available" v-model="time">
                    <el-radio-button class="available-item" label="8">
                        <div>08:01-08:30</div>
                        <div>余10</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" disabled label="8.5">
                        <div>08:31-09:00</div>
                        <div>约满</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" label="9">
                        <div>09:01-09:30</div>
                        <div>余10</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" label="9.5">
                        <div>09:31-10:00</div>
                        <div>余10</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" label="10">
                        <div>10:01-10:30</div>
                        <div>余10</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" label="10.5">
                        <div>10:31-11:00</div>
                        <div>余10</div>
                    </el-radio-button>
                </el-radio-group>
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
import {ref} from "vue";

const time = ref();
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;
}

.introduction {
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