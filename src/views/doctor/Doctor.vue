<template>
    <div class="main">
        <div class="search">
            <el-input
                    v-model="keyWord"
                    :clearable="true"
                    :prefix-icon="Search"
                    size="large"
            >
                <template #append>
                    <el-button>搜索</el-button>
                </template>
            </el-input>
        </div>
        <div class="doctors">
            <doctor-card/>
            <doctor-card/>
            <doctor-card/>
        </div>
    </div>
</template>

<script setup>
import DoctorCard from "@/views/doctor/DoctorCard.vue";
import {Search} from "@element-plus/icons-vue";
import {ref} from "vue";

const keyWord = ref('');
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
    justify-content: space-between;
    margin-top: 60px;
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