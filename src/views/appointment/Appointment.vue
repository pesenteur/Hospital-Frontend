<template>
    <div class="main">
        <div class="filter">
            <div class="filter-item">
                <span>科室：</span>
                <el-cascader
                        :options="departmentList"
                        :props="props"
                        :show-all-levels="false"
                        :filterable="true"
                        v-model="department"
                />
            </div>
            <div class="filter-item">
                <span>就诊日期：</span>
                <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="请选择日期"
                        :editable="false"
                        :clearable="false"
                        :disabled-date="checkDate"
                        value-format="YYYY-MM-DD"
                />
            </div>
            <div class="filter-item">
                <el-button @click="search">查询</el-button>
            </div>
        </div>
        <div class="vacancy">
            <Vacancy
                v-for="vacancy in vacancyList"
                :key="vacancy.id"
                :data="vacancy"
                class="item"
            />
        </div>
        <el-empty description="请选择科室及就诊时间" v-if="!$route.query.department"/>
        <el-empty description="暂无放号信息" v-else-if="!vacancyList.length"/>
    </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import Vacancy from "@/views/appointment/Vacancy.vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const $api = inject('$api');

const props = {
    expandTrigger: 'hover',
    label: 'name',
    value: 'id',
    emitPath: false
};
// 存储部门数据
const departmentList = ref([]);

// 获取部门数据
async function getDepartmentList() {
    const result = await $api.appointment.requestDepartmentList();
    if (result.result === "1") {
        departmentList.value = result.data;
    } else {
        ElMessage({
            message: result.message || "获取部门数据失败，请刷新页面",
            type: 'error'
        });
    }
}

// 选取的部门
const department = ref();
onMounted(async () => {
    await getDepartmentList();
    department.value = route.query.department * 1;
    date.value = route.query.date;
    if (!department.value || !date.value)
        return;
    await getVacancyList();
});

// 存储预约时间
const date = ref('');

// 限制可预约时间段
function checkDate(selectDate) {
    const today = new Date();
    const latest = new Date();
    latest.setDate(latest.getDate() + 7);
    return selectDate <= today || selectDate >= latest;
}

// 存储放号信息
const vacancyList = ref([]);

// 获取放号信息
async function getVacancyList() {
    const result = await $api.appointment.requestVacancyList(department.value, date.value);
    if (result.result === "1") {
        vacancyList.value = result.data;
    } else {
        ElMessage({
            message: result.message || "获取放号数据失败，请刷新页面",
            type: 'error'
        });
    }
}
function search() {
    if (!department.value || !date.value) {
        ElMessage({
            message: "请选择科室及就诊日期",
            type: 'warning'
        });
        return;
    }
    router.push({
        path: '/appointment',
        query: {
            department: department.value,
            date: date.value
        }
    });
}

onBeforeRouteUpdate(async (to, from)=>{
    department.value = to.query.department * 1;
    date.value = to.query.date;
    if (!department.value || !date.value) {
        vacancyList.value = [];
        return;
    }
    await getVacancyList();
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

.vacancy {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.item {
    margin-bottom: 40px;
}
</style>