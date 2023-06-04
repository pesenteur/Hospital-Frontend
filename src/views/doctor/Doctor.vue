<template>
    <div class="main">
        <div class="search">
            <el-input
                    v-model="keyWord"
                    :clearable="true"
                    :prefix-icon="Search"
                    size="large"
                    @keydown.enter="search"
            >
                <template #append>
                    <el-button @click="search">搜索</el-button>
                </template>
            </el-input>
        </div>
        <div class="doctors">
            <el-skeleton :loading="!doctorList" animated>
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
                    <doctor-card
                        v-for="doctor in doctorList"
                        :key="doctor.id"
                        :data="doctor"
                    />
                </template>
            </el-skeleton>
        </div>
        <el-empty
            description="什么都搜不到，试试换个关键词吧！"
            v-show="doctorList && !doctorList.length"
        />
    </div>
</template>

<script setup>
import DoctorCard from "@/views/doctor/DoctorCard.vue";
import {Search} from "@element-plus/icons-vue";
import {inject, onMounted, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";


const route = useRoute();
const router = useRouter();
const $api = inject('$api');

// 搜索关键词
const keyWord = ref(route.query.keyWord);

const doctorList = ref();
// 获取医生数据
async function getDoctorList() {
    doctorList.value = null;
    let result = await $api.doctor.requestDoctorList(keyWord.value);
    if (result.result === "1") {
        doctorList.value = result.data;
    } else {
        ElMessage({
            message: result.message || "获取医生数据失败，请刷新页面",
            type: 'error'
        })
    }
}

onMounted(async ()=>{
    await getDoctorList();
});

// 输入框搜索
function search(){
    router.push({
        path: '/doctor',
        query: {keyWord: keyWord.value || undefined}
    });
}

onBeforeRouteUpdate((to, from)=>{
    // 如果跳转到/doctor，说明在进行搜素，需要发送请求。
    if (to.path === '/doctor') {
        // 通过导航栏跳转到/doctor时，keyWord应清空。
        keyWord.value = to.query.keyWord;
        getDoctorList();
    }
});
</script>

<style scoped>
.main {
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
}
.search {
    width: 60%;
    margin: 0 auto;
}
.doctors {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 60px auto 0;
    width: 1120px;
}
</style>

<style>
.search .el-input-group__append {
    background-color: #409EFFFF;
    color: white;
}
.search .el-input-group__append:hover {
    background-color: #79bbff;
}
</style>