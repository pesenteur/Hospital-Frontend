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
                <el-button @click="getAppointmentList">查询</el-button>
            </div>
        </div>
        <div class="appointments">
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
                            type="danger"
                            size="small"
                            v-if="row.appointment_status === '待就医'"
                            @click="cancelAppointment(row.appointment_id)"
                        >
                            取消预约
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import {computed, inject, onMounted, ref} from "vue";

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
            message: "获取就诊人数据失败，请刷新页面",
            type: 'error'
        });
    }
}

// 存储预约信息
const appointmentList = ref([]);
// 发送请求获取预约信息
async function getAppointmentList() {
    if (!selectPatient.value) {
        ElMessage({
            message: "请先选择就诊人",
            type: 'error'
        });
        return;
    }
    const result = await $api.appointment.requestAppointmentList(selectPatient.value);
    if (result.result === '1') {
        appointmentList.value = result.data;
    } else {
        ElMessage({
            message: "查询失败，请重试",
            type: 'error'
        });
    }
}
// 当前选中的就诊人姓名
const selectPatientName = computed(
    ()=> patients.value.find(value => value.id === selectPatient.value).name
);

// 取消预约
async function cancelAppointment(appointmentID) {
    const result = await $api.appointment.cancelAppointment(appointmentID);
    if (result.result === '1') {
        ElMessage({
            message: "取消成功",
            type: 'success'
        });
        await getAppointmentList();
    } else {
        ElMessage({
            message: "取消失败，请重试",
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