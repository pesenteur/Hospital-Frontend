<template>
    <div>
        <div class="date-choose">
            <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    range-separator="到"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="large"
                    :shortcuts="shortcuts"
                    clearable
            />
        </div>
        <div class="record" v-if="displayRecords.length">
            <el-space fill wrap :size="30">
                <el-descriptions
                    :column="3"
                    size="large"
                    border
                    v-for="record in displayRecords"
                    :key="record.medical_record_id"
                >
                    <el-descriptions-item>
                        <template #label>
                            姓名
                        </template>
                        <div class="info">
                            {{ record.name }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            性别
                        </template>
                        <div class="info">
                            {{ record.gender }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            年龄
                        </template>
                        <div class="info">
                            {{ record.age }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            就诊日期
                        </template>
                        <div class="info">
                            {{ record.medical_record_date }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            就诊科室
                        </template>
                        <div class="info">
                            {{ record.department_name }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            主治医师
                        </template>
                        <div class="info">
                            {{ record.doctor_name }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item :span="3">
                        <template #label>
                            症状
                        </template>
                        <div class="info">
                            {{ record.symptom }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item :span="3">
                        <template #label>
                            诊断结果
                        </template>
                        <div class="info">
                            {{ record.result }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item :span="3">
                        <template #label>
                            处方
                        </template>
                        <div class="info">
                            {{ record.prescription }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item :span="3">
                        <template #label>
                            医嘱
                        </template>
                        <div class="info">
                            {{ record.advice }}
                        </div>
                    </el-descriptions-item>
                </el-descriptions>
            </el-space>
        </div>
        <el-empty v-else/>
    </div>
</template>

<script setup>
import {ref, reactive, watch, computed, watchEffect} from "vue";

const props = defineProps({
    data: {
        default(rawProps) {
            return [];
        }
    }
});

// 存储病历信息
const records = computed(()=>props.data);
// 筛选条件——开始日期及结束日期
const dateRange = ref();
// 展示指定时间段的病历信息
const displayRecords = ref([]);

// 获取要展示的病历信息
// 监视筛选条件——开始日期及结束日期，改变要展示的病历信息
watchEffect(()=>{
    if (!dateRange.value) {
        displayRecords.value = records.value;
    } else {
        displayRecords.value = records.value.filter(
            item=> {
                const date = new Date(item.medical_record_date);
                date.setHours(0);
                return date >= dateRange.value[0] && date <= dateRange.value[1];
            }
        );
    }
})

// 常用日期范围选择
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

.info {
    white-space: pre-wrap;
}
</style>