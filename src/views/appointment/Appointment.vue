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
            <el-skeleton :loading="loading" animated>
                <template #template>
                    <el-row :gutter="40" v-for="i in 2" :key="i" style="margin-bottom: 60px;">
                        <el-col
                            :span="8"
                            v-for="j in 3"
                            :key="j"
                        >
                            <el-card shadow="never">
                                <div style="display:flex; align-items: center">
                                    <el-skeleton-item
                                        variant="circle"
                                        style="height: 60px;width: 60px"
                                    />
                                    <div style="display:flex;flex-direction: column;margin-left: 10px;">
                                        <el-skeleton-item
                                            variant="h1"
                                            style="height: 25px; width: 120px"
                                        />
                                        <el-skeleton-item
                                            variant="h3"
                                            style="margin-top: 10px;height: 15px; width: 80px;"
                                        />
                                    </div>
                                </div>
                                <el-skeleton-item
                                    variant="rect"
                                    style="margin-top: 20px;"
                                />
                                <el-skeleton-item
                                    v-for="k in 5"
                                    :key="k"
                                    variant="rect"
                                    style="margin-top: 10px;"
                                />
                            </el-card>
                        </el-col>
                    </el-row>
                </template>
                <template #default>
                    <template
                        v-for="(vacancy,index) in vacancyList"
                        :key="index"
                    >
                        <el-row :gutter="30" v-if="!(index%3)" class="item">
                            <el-col
                                :span="8"
                                v-for="j in vacancyList.length-index > 3?3:vacancyList.length-index"
                                :key="vacancyList[index+j-1].id"
                            >
                                <Vacancy
                                    :data="vacancyList[index+j-1]"
                                />
                            </el-col>
                        </el-row>
                    </template>
                </template>
            </el-skeleton>
        </div>
        <el-empty
            description="请选择科室及就诊时间"
            v-if="!$route.query.department"
            style="height: 540px"
        />
        <el-empty
            description="暂无放号信息"
            v-else-if="!vacancyList.length"
            style="height: 540px"
        />
    </div>
</template>

<script setup>
import {inject, onMounted, ref} from "vue";
import Vacancy from "@/views/appointment/Vacancy.vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import DoctorCard from "@/views/doctor/DoctorCard.vue";
import useCustomLoading from "@/utils/loading";

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
onMounted(() => {
    getDepartmentList().then(()=>useCustomLoading().end());
    department.value = route.query.department * 1;
    date.value = route.query.date;
    if (!department.value || !date.value)
        return;
    getVacancyList();
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

// 是否处于加载状态
const loading = ref(false);
// 存储放号信息
const vacancyList = ref([]);

// 获取放号信息
async function getVacancyList() {
    loading.value = true;
    const result = await $api.appointment.requestVacancyList(department.value, date.value);
    if (result.result === "1") {
        vacancyList.value = result.data;
    } else {
        ElMessage({
            message: result.message || "获取放号数据失败，请刷新页面",
            type: 'error'
        });
    }
    loading.value=false;
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
}

.item {
    margin-bottom: 40px;
}
</style>