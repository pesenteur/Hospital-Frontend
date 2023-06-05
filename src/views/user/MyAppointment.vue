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
                <el-button @click="search">查询</el-button>
            </div>
        </div>
        <div class="appointments" v-if="searched">
            <el-table
                :data="appointmentList"
            >
                <el-table-column property="appointment_time" label="预约时间"/>
                <el-table-column label="就诊人">{{ selectPatientName }}</el-table-column>
                <el-table-column property="department_name" label="科室"/>
                <el-table-column property="doctor_name" label="预约医生"/>
                <el-table-column property="appointment_status" label="预约状态"/>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button
                            type="primary"
                            size="small"
                            v-if="canPay(row)"
                            @click="startPay(row.appointment_id)"
                        >
                            支付费用
                        </el-button>
                        <el-button
                            type="danger"
                            size="small"
                            v-if="canCancel(row)"
                            @click="cancelAppointment(row.appointment_id)"
                        >
                            取消预约
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-empty
            description="请选择就诊人查询"
            v-else
            style="height: 580px;"
        />
    </div>
    <pay
        v-model="start_pay"
        :payment_id="payment_id"
        @success="afterPay"
    />
</template>

<script setup>
import {computed, inject, nextTick, onMounted, ref} from "vue";
import useCustomLoading from "@/utils/loading";
import {ElMessage} from "element-plus";
import Pay from "@/views/appointment/Pay.vue";

const $api = inject('$api');

// 存储选择的就诊人
const selectPatient = ref();
// 存储就诊人列表
const patients = ref([]);
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
}

// 存储预约信息
const appointmentList = ref([]);
// 是否进行过查询
const searched = ref(false);
// 发送请求获取预约信息
async function getAppointmentList() {
    searched.value = true;
    const result = await $api.appointment.requestAppointmentList(selectPatient.value);
    if (result.result === '1') {
        appointmentList.value = result.data;
    } else {
        ElMessage({
            message: result.message || "查询失败，请重试",
            type: 'error'
        });
    }
    await nextTick();
    useCustomLoading().end();
}
// 当前选中的就诊人姓名
const selectPatientName = computed(
    ()=> patients.value.find(value => value.id === selectPatient.value)?.name
);

// 点击查询按钮
async function search() {
    if (!selectPatient.value) {
        ElMessage({
            message: "请先选择就诊人",
            type: 'error'
        });
        return;
    }
    useCustomLoading().start({
        fullscreen: true,
        text: '加载中，请稍后'
    });
    await getAppointmentList();
}

// 是否可以取消预约
const canCancel = row=>row.appointment_status === '待就医' || row.appointment_status === '待支付';
// 取消预约
async function cancelAppointment(appointmentID) {
    useCustomLoading().start({
        fullscreen: true,
        text: '加载中，请稍后'
    });
    const result = await $api.appointment.cancelAppointment(appointmentID);
    if (result.result === '1') {
        ElMessage({
            message: "取消成功",
            type: 'success'
        });
        await getAppointmentList();
    } else {
        ElMessage({
            message: result.message || "取消失败，请重试",
            type: 'error'
        });
    }
}

// 是否可以支付
const canPay = row=>row.appointment_status === '待支付';
// 是否显示支付弹窗
const start_pay = ref(false);
const payment_id = ref(1);
// 支付成功后更改状态
function afterPay() {
    useCustomLoading().start({
        fullscreen: true,
        text: '加载中，请稍后'
    });
    getAppointmentList();
}
// 获取支付订单号
async function getPayment(appointmentID) {
    const result = await $api.appointment.requestPayment(appointmentID);
    if (result.result === '1') {
        payment_id.value = result.data.payment_id;
    } else {
        return Promise.reject(result.message || "获取支付订单，请重试");
    }
}
// 点击支付
async function startPay(appointmentID) {
    try {
        useCustomLoading().start({
            fullscreen: true,
            text: '加载中，请稍后'
        });
        await getPayment(appointmentID);
        start_pay.value = true;
        useCustomLoading().end();
    } catch (err) {
        ElMessage({
            message: err.message,
            type: "error"
        });
    }
}

onMounted(()=>{
    getPatients();
});
</script>

<style scoped>
.main {
    width: 80%;
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

.appointments {
    margin-top: 20px;
}
</style>