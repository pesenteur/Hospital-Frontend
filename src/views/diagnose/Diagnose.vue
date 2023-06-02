<template>
    <div class="main">
        <div class="filter">
            选择患者
            <el-select
                placeholder="选择就诊患者"
                no-data-text="今日无就诊患者"
                v-model="selectPatient"
            >
                <el-option-group label="候诊患者">
                    <el-option
                        v-for="patient in waitingPatients"
                        :key="patient.patient_id"
                        :label="patient.patient_name"
                        :value="patient.patient_id"
                    />
                </el-option-group>
                <el-option-group label="已就诊患者">
                    <el-option
                        v-for="patient in finishedPatients"
                        :key="patient.patient_id"
                        :label="patient.patient_name"
                        :value="patient.patient_id"
                    />
                </el-option-group>
            </el-select>
            <div class="flex-grow"/>
            <div>
                <el-button type="primary" :disabled="!selectPatient && !waitingPatients.length" @click="nextPatient">下一位</el-button>
                <el-button type="success" :disabled="!selectPatient" @click="display=true">诊断</el-button>
            </div>
        </div>
        <el-divider/>
        <div v-if="selectPatient">
            <div class="info">
                <div class="title">患者信息</div>
                <patient-detail :data="patientInfo" />
            </div>
            <el-divider/>
            <div class="records">
                <div class="title">既往病历</div>
                <record-detail :data="records"/>
            </div>
        </div>
        <el-empty description="无候诊患者" v-else-if="!waitingPatients.length"/>
        <el-empty description="请选择患者" v-else/>
        <add-record
            v-model="display"
            :data="data"
            @update-record="updateRecord"
        />
    </div>
</template>

<script setup>
import RecordDetail from "@/views/record/RecordDetail.vue";
import {Iphone, Male, OfficeBuilding, User, WarningFilled} from "@element-plus/icons-vue";
import AddRecord from "@/views/diagnose/AddRecord.vue";
import {inject, onMounted, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import PatientDetail from "@/views/user/PatientDetail.vue";

const $api = inject('$api');

// 当前患者
const selectPatient = ref();
// 存储已就诊患者
const finishedPatients = ref([]);
// 存储待就诊患者
const waitingPatients = ref([]);
// 发送请求获取就诊患者
async function getWaitingPatients() {
    const result = await $api.diagnose.requestWaitingPatients();
    if (result.result) {
        finishedPatients.value = result.appointment_finished;
        waitingPatients.value = result.appointment_unfinished;
    } else {
        ElMessage({
            message: result.message || '获取患者列表失败，请刷新重试',
            type: 'error'
        });
    }
}

// 当前患者是否处于候诊
function isWaiting() {
    return !!(waitingPatients.value.find(
        item=>item.patient_id === selectPatient.value
    ));
}

// 存储患者信息
const patientInfo = ref({});
// 发送请求获取当前患者信息
async function getPatientInfo() {
    const result = await $api.user.requestPatientDetail(selectPatient.value);
    if (result.result === '1') {
        patientInfo.value = result.data;
    } else {
        ElMessage({
            message: result.message || "查询患者信息失败，请重试",
            type: 'error'
        });
    }
}

// 存储病历信息
const records = ref([]);
// 发送请求获取当前患者病历
async function getRecords() {
    const result = await $api.user.requestsRecord(selectPatient.value);
    if (result.result === '1') {
        records.value = result.data;
    } else {
        ElMessage({
            message: result.message || "查询病历信息失败，请重试",
            type: 'error'
        });
    }
}

// 传递到病历修改弹窗的数据
const data = ref();
// 监视当前就诊患者的变化
watch(selectPatient, async newvalue=>{
    if (!selectPatient.value) {
        patientInfo.value = {};
        records.value = [];
        return;
    }
    await getRecords();
    await getPatientInfo();
});
watch(patientInfo, newValue=>{
    data.value = isWaiting() ? {} : records.value[0];
});

// 诊断、修改病历
// 控制诊断、修改病历弹窗的显示
const display = ref(false);

// 获取当前日期
function getDate() {
    const date = new Date();
    let year = `${date.getUTCFullYear()}`;
    let month = date.getUTCMonth() + 1;
    month = month < 10 ? '0' + month : '' + month;
    let day = date.getUTCDate();
    day = day < 10 ? '0' + day : '' + day;
    return `${year}-${month}-${day}`;
}
// 更新（创建）病历
async function updateRecord(info) {
    info.medical_record_date = getDate();
    info.patient_id = selectPatient.value;
    const result = await $api.diagnose.makeMedicalrecord(info);
    if (result.result === '1') {
        await getWaitingPatients();
        await getRecords();
        ElMessage({
            message: '操作成功',
            type: 'success'
        });
    } else {
        ElMessage({
            message: result.message || isWaiting() ? '创建病历失败，请重试' : '更新病历失败，请重试',
            type: 'error'
        });
    }
}

// 下一位患者
function nextPatient() {
    console.log('in')
    selectPatient.value = waitingPatients[0]?.patient_id;
}

onMounted(()=>{
    getWaitingPatients();
});
</script>

<style scoped>
.main {
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
}

.filter {
    display: flex;
    align-items: center;
}

.cell-item {
    display: flex;
    align-items: center;
}

.icon {
    margin-right: 8px;;
}

.records {
    margin-top: 30px;;
}

.title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 30px;
}
</style>