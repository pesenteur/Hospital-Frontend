<template>
    <div class="main">
        <div class="filter">
            <div class="filter-item">
                <span>就诊人：</span>
                <el-select
                    v-model="selectPatient"
                    placeholder="选择就诊人"
                    no-data-text="未添加就诊人"
                >
                    <el-option
                        v-for="patient in patients"
                        :key="patient.id"
                        :value="patient.id"
                        :label="patient.name"
                    />
                </el-select>
            </div>
            <div class="filter-item">
                <el-button @click="getRecords">查询</el-button>
            </div>
        </div>
        <div class="record" v-if="query">
            <record-detail :data="records"/>
        </div>
        <el-empty description="请选择就诊人查询病历记录" v-else/>
    </div>
</template>

<script setup>
import RecordDetail from "@/views/record/RecordDetail.vue";
import {inject, onMounted, ref, watch} from "vue";

const $api = inject('$api');

// 存储选择的就诊人
const selectPatient = ref();
// 是否进行过查询，用于控制空状态的显示
let query = ref(false);
// 存储就诊人列表
const patients = ref([]);
// 获取就诊人列表
async function getPatients() {
    const result = await $api.user.requestPatients();
    if (result.result === "1") {
        patients.value = result.data;
    } else {
        ElMessage({
            message: "获取就诊人数据失败，请刷新页面",
            type: 'error'
        });
    }
}

// 存储病历信息
const records = ref([]);
// 发送请求获取病历
async function getRecords() {
    query.value = true;
    const result = await $api.user.requestsRecord(selectPatient.value);
    if (result.result === '1') {
        records.value = result.data;
    } else {
        ElMessage({
            message: "查询失败，请重试",
            type: 'error'
        });
    }
}

onMounted(()=>{
    getPatients();
});
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;
}

.filter, .filter-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.filter-item {
    margin-right: 40px;
}

.record {
    margin-top: 30px;
}
</style>