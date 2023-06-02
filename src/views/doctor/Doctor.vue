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
            <doctor-card
                v-for="doctor in doctorList"
                :key="doctor.id"
                :data="doctor"
            />
        </div>
        <el-empty
            description="什么都搜不到，试试换个关键词吧！"
            v-show="!doctorList.length"
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

const doctorList = ref([]);
// 获取医生数据
async function getDoctorList() {
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