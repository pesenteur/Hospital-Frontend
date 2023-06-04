<template>
    <div class="main">
        <el-page-header @back="goBack">
            <template #content>
                <span class="header-title"> 医生预约 </span>
            </template>
        </el-page-header>
        <el-card shadow="never" class="card">
            <div class="introduction">
                <el-avatar size="large" :src="doctorInfo.image"/>
                <div class="text">
                    <div class="name">{{ doctorInfo.name }}</div>
                    <div>{{ doctorInfo.department }}</div>
                    <el-scrollbar>
                        <div class="detail">{{ doctorInfo.introduction }}</div>
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
                <div>{{ appointmentDate }}</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>诊查费</div>
                <div>20.00 元</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>选择就诊人</div>
                <el-select v-model="selectPatient">
                    <el-option
                        v-for="patient in patients"
                        :key="patient.id"
                        :value="patient.id"
                        :label="patient.name"
                    />
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
                <el-radio-group class="available" v-model="appointmentTime">
                    <el-radio-button
                        v-for="available in vacancyDetail"
                        :key="available.vacancy_id"
                        :label="available.start_time"
                        :disabled="!available.left"
                        class="available-item"
                    >
                        <div class="available-detail">
                            <div v-text="availableFormater(available)"></div>
                            <div>余{{ available.left }}</div>
                        </div>
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div class="button">
                <el-button
                    type="primary"
                    size="large"
                    @click="makeAppointment"
                >
                    确认
                </el-button>
                <el-button
                    size="large"
                    :plain="true"
                    @click="goBack"
                >
                    取消
                </el-button>
            </div>
        </el-card>
    </div>
    <pay
        v-model="start_pay"
        :payment_id="payment_id"
        @success="afterPay"
        @cancel="afterPay"
    />
</template>

<script setup>
import {Plus} from "@element-plus/icons-vue";
import {computed, inject, nextTick, onMounted, ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import Pay from "@/views/appointment/Pay.vue";
import useCustomLoading from "@/utils/loading";

const $api = inject('$api');
const route = useRoute();
const router = useRouter();
const {doctorID, date, half} = route.params;

// 格式化预约日期
const appointmentDate = computed(()=>{
    const chinese = ['日', '一', '二', '三', '四', '五', '六'];
    const temp = new Date(date);
    const year = temp.getUTCFullYear();
    const month = temp.getMonth();
    const day = temp.getDate();
    const weekday = temp.getDay();
    return `${year}年${month}月${day}日（星期${chinese[weekday]}）${half}`;
});

// 记录请求结果是否已返回
const gotDoctorInfo = ref(false);
const gotPatients = ref(false);
const gotVacancyDetail = ref(false);
// 存储医生信息
const doctorInfo = ref({});
// 获取医生信息
async function getDoctorInfo() {
    const result = await $api.doctor.requestDoctorDetail(doctorID);
    if (result.result === "1") {
        doctorInfo.value = result.data;
    } else {
        ElMessage({
            message: result.message || '获取医生数据失败，请刷新页面',
            type: 'error'
        });
    }
    gotDoctorInfo.value = true;
}

// 存储选择的就诊人
const selectPatient = ref();
// 存储就诊人列表
const patients = ref();
// 获取就诊人列表
async function getPatients() {
    const result = await $api.user.requestPatients();
    if (result.result === "1") {
        patients.value = result.data;
    } else {
        ElMessage({
            message: result.message || "获取就诊人数据失败，请刷新页面",
            type: 'error'
        });
    }
    gotPatients.value = true;
}
// 选择添加就诊人时，跳转到/patient
watch(selectPatient, (newValue)=>{
    if (newValue === 'add') {
        router.push('/patient');
    }
});

// 存储选择的预约时段
const appointmentTime = ref();
// 存储放号信息
const vacancyDetail = ref([]);
// 获取放号信息
async function getVacancyDetail() {
    const result = await $api.appointment.requestVacancyDetail(
        doctorID,
        date,
        half === '上午' ? 1:0
    );
    if (result.result === "1") {
        vacancyDetail.value = result.data;
    } else {
        ElMessage({
            message: result.message || "获取放号数据失败，请刷新页面",
            type: 'error'
        });
    }
    gotVacancyDetail.value = true;
}
// 格式化可预约时间段
function availableFormater(available) {
    const start = new Date(available.start_time);
    const end = new Date(available.end_time);
    let result = '';
    result += start.getHours() < 10 ? '0' + start.getHours() : start.getHours();
    result += ':';
    result += start.getMinutes() < 10 ? '0' + start.getMinutes() : start.getMinutes();
    result += '-';
    result += end.getHours() < 10 ? '0' + end.getHours() : end.getHours();
    result += ':';
    result += end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes();
    return result;
}

// 点击确定的回调——进行预约
async function makeAppointment() {
    if (!selectPatient.value || selectPatient.value === 'add') {
        ElMessage({
            message: "请选择就诊人",
            type: 'error'
        });
        return;
    }
    if (!appointmentTime.value) {
        ElMessage({
            message: "请选择就诊时间",
            type: 'error'
        });
        return;
    }
    const result = await $api.appointment.makeAppointment(
        selectPatient.value, appointmentTime.value, doctorID
    );
    if (result.result === "1") {
        start_pay.value = true;
        payment_id.value = result.payment_id;
    } else {
        ElMessage({
            message: result.message || "预约失败，请稍后重试",
            type: 'error'
        });
    }
}

// 支付相关
// 是否显示支付弹窗
const start_pay = ref(false);
const payment_id = ref(1);
// 支付成功或取消支付后跳转到我的预约界面
function afterPay() {
    router.push('/my-appointment');
}

onMounted(()=>{
    getDoctorInfo();
    getPatients();
    getVacancyDetail();
});
watchEffect(()=>{
    if (gotDoctorInfo.value
        && gotPatients.value
        && gotVacancyDetail.value
    ) {
        nextTick(()=>useCustomLoading().end());
    }
});

// 页头及取消按钮的返回操作
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

.introduction {
    display: flex;
}

.text {
    margin-left: 30px;
    overflow: hidden;
}

.name {
    font-weight: bold;
    font-size: 1.2em;
}

.detail {
    font-size: 0.8em;
    width: 700px;
    height: 60px;
    margin-top: 3px;
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
    margin: 0 25px 20px 0;
}

.available-detail {
    display: flex;
    flex-direction: column;
}

.button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 30px;
}
</style>