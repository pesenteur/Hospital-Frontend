<template>
    <el-affix :offset="8">
        <el-menu
            :default-active="$route.path"
            class="menu"
            mode="horizontal"
            :router="true"
            :ellipsis="false"
        >
            <router-link to="/" id="logo">医院门诊预约系统</router-link>
            <el-menu-item index="/">医院首页</el-menu-item>
            <el-menu-item index="/introduce">新闻通知</el-menu-item>
            <el-sub-menu index="patient"
                         popper-class="popper-own"
                         :teleported="false"
                         :popper-offset="6"
            >
                <template #title>就医服务</template>
                <el-menu-item index="/doctor">医生查询</el-menu-item>
                <el-menu-item index="/appointment">预约挂号</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="doctor"
                         popper-class="popper-own"
                         :teleported="false"
                         :popper-offset="6"
            >
                <template #title>看诊服务</template>
                <el-menu-item index="/diagnose">看诊</el-menu-item>
                <el-menu-item index="/leave">请假</el-menu-item>
            </el-sub-menu>
            <div class="flex-grow"/>
            <el-badge class="right icon" is-dot>
                <router-link to="/message">
                    <el-icon :size="22"><Message /></el-icon>
                </router-link>
            </el-badge>
            <el-link :icon="UserFilled" class="right">
                <router-link to="/login">登录</router-link>
            </el-link>
            <el-link :icon="UserFilled" class="right">
                <router-link to="/register">注册</router-link>
            </el-link>
            <el-sub-menu index="user"
                         popper-class="popper-own"
                         :teleported="false"
                         :popper-offset="12"
            >
                <template #title><el-avatar/></template>
                <el-menu-item index="/userinfo">我的信息</el-menu-item>
                <el-menu-item index="/patient">管理就诊人</el-menu-item>
                <el-menu-item index="/my-appointment">我的预约</el-menu-item>
                <el-menu-item index="/my-record">我的病历</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-affix>
</template>

<script setup>
import {Message, UserFilled} from "@element-plus/icons-vue";

</script>

<style scoped>
.menu {
    height: 60px;
}
.right {
    margin-right: 30px;
}
.icon {
    margin-top: 4px;
}
</style>

<style>
#logo{
    font-size: 30px;
    margin-right: 50px;
}
.popper-own {
    margin-left: -10px;
}
.el-menu--popup {
    min-width: 150px !important;
}
.el-menu--popup li {
    justify-content: center;
}
.flex-grow {
    flex-grow: 1;
}
.el-menu--horizontal {
    display: flex;
    align-items: center;
}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus:focus {
    background-color: white;
    color: black;
}
</style>