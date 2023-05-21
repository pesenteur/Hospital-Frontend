<template>
    <div class="main">
        <el-table
            ref="multipleTableRef"
            :data="patients"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="30"/>
            <el-table-column type="expand" width="30">
                <template #default="{row}">
                    <div class="more">
                        <patient-detail :data="row" @update-patient="updatePatientInfo"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="name" label="就诊者姓名"/>
            <el-table-column property="identification" label="身份证号"/>
            <el-table-column align="right">
                <template #header>
                    <el-button type="primary" @click="display=true">添加就诊者</el-button>
                    <el-button type="danger" @click="removeSelect">删除所选</el-button>
                </template>
                <template #default="{row}">
                    <el-button type="danger" :icon="Delete" circle @click="removePatient(row)"/>
                </template>
            </el-table-column>
        </el-table>
        <add-patient v-model="display" @add-patient="addNewPatient"/>
    </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import {Delete} from "@element-plus/icons-vue";
import AddPatient from "@/views/user/AddPatient.vue";
import PatientDetail from "@/views/user/PatientDetail.vue";
import {ElMessage} from "element-plus";

const $api = inject('$api');

// 存储就诊者
const patients = ref([]);
// 发送请求获取就诊者信息
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

// 发送请求更改就诊人信息
async function updatePatientInfo(data) {
    const result = await $api.user.updatePatient(
        data.id, data.name, data.gender, data.identification,
        data.phone, data.address
    );
    if (result.result === '1') {
        ElMessage({
            message: '更新信息成功',
            type: 'success'
        });
        await getPatients();
    } else {
        ElMessage({
            message: '更新信息失败，请重试',
            type: 'error'
        });
    }
}

// 是否显示添加就诊者弹窗
const display = ref(false);
// 发送请求添加就诊者
async function addNewPatient(info) {
    const result = await $api.user.addPatient(
        info.name, info.identification, info.phone, info.address
    );
    if (result.result === '1') {
        ElMessage({
            message: '添加成功',
            type: 'success'
        });
        await getPatients();
    } else {
        ElMessage({
            message: '添加失败，请重试',
            type: 'error'
        });
    }
}

// 存储选中的数据
const selectedPatients = ref([]);
// 选中状态切换时维护selectedPatients
function handleSelectionChange(value){
    selectedPatients.value = value;
}

// 删除所选
async function removeSelect() {
    await removePatients(selectedPatients.value.map(item=>item.id));
}
async function removePatient(patient) {
    await removePatients([patient.id]);
}

async function removePatients(patients) {
    const result = await $api.user.deletePatient(patients);
    if (result.result === '1') {
        ElMessage({
            message: '删除成功',
            type: 'success'
        });
        await getPatients();
    } else {
        ElMessage({
            message: '删除失败，请重试',
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

.more {
    margin-left: 60px;
}
</style>