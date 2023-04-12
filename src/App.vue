<template>
    <el-config-provider :locale="zhCn">
        <HospitalHeader/>
        <router-view/>
    </el-config-provider>
</template>

<script setup>
import HospitalHeader from "@/components/HospitalHeader.vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>
git
<style>
a {
    text-decoration: none;
    color: black;
}
</style>
