<template>
    <el-config-provider :locale="zhCn">
        <hospital-header v-if="!$route.meta.hidden"/>
        <router-view/>
        <hospital-footer/>
    </el-config-provider>
</template>

<script setup>
import HospitalHeader from "@/components/HospitalHeader.vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import HospitalFooter from "@/components/HospitalFooter.vue";
</script>

<style>
a {
    text-decoration: none;
    color: black;
}
</style>
