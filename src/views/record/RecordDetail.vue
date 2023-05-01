<template>
    <div>
        <div class="date-choose">
            <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="到"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="large"
                    :shortcuts="shortcuts"
            />
        </div>
        <div class="record">
            <el-descriptions
                    :column="3"
                    size="large"
                    border
            >
                <el-descriptions-item>
                    <template #label>
                        姓名
                    </template>
                    <div class="info">
                        患者一
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        性别
                    </template>
                    <div class="info">
                        男
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        年龄
                    </template>
                    <div class="info">
                        18
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        就诊日期
                    </template>
                    <div class="info">
                        2023年04月05日
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        就诊科室
                    </template>
                    <div class="info">
                        全科
                    </div>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        主治医师
                    </template>
                    <div class="info">
                        医生一
                    </div>
                </el-descriptions-item>
                <el-descriptions-item :span="3">
                    <template #label>
                        症状
                    </template>
                    <div class="info">
                        症状一<br/>症状二<br/>症状三
                    </div>
                </el-descriptions-item>
                <el-descriptions-item :span="3">
                    <template #label>
                        诊断结果
                    </template>
                    <div class="info">
                        结果一<br/>结果二<br/>结果三
                    </div>
                </el-descriptions-item>
                <el-descriptions-item :span="3">
                    <template #label>
                        处方
                    </template>
                    <div class="info">
                        处方一<br/>处方二<br/>处方三
                    </div>
                </el-descriptions-item>
                <el-descriptions-item :span="3">
                    <template #label>
                        医嘱
                    </template>
                    <div class="info">
                        医嘱一<br/>医嘱二<br/>医嘱三
                    </div>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script setup>
import {ref, reactive} from "vue";

const date = ref();
const shortcuts = reactive([{
    text: '近一周',
    value: () => {
        const today = new Date();
        const lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        return [lastWeek, today];
    }
}, {
    text: '近两周',
    value: () => {
        const today = new Date();
        const lastTwoWeek = new Date();
        lastTwoWeek.setDate(today.getDate() - 14);
        return [lastTwoWeek, today];
    }
}, {
    text: '近一个月',
    value: () => {
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(today.getMonth() - 1);
        return [lastMonth, today];
    }
}, {
    text: '近三个月',
    value: () => {
        const today = new Date();
        const lastThreeMonth = new Date();
        lastThreeMonth.setMonth(today.getMonth() - 3);
        return [lastThreeMonth, today];
    }
}, {
    text: '近一年',
    value: () => {
        const today = new Date();
        const lastYear = new Date();
        lastYear.setUTCFullYear(today.getUTCFullYear() - 1);
        return [lastYear, today];
    }
}]);
</script>

<style scoped>
.record {
    padding: 20px 0;
}
</style>