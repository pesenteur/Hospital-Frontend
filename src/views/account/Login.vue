<template>
    <account-header/>
    <div class="main">
        <div class="form">
            <el-image :src="accountImage" class="image"/>
            <div>
                <el-tabs
                        type="border-card"
                        :stretch="true"
                        class="panel"
                >
                    <el-tab-pane label="验证码登录">
                        <el-input
                                v-model="phone"
                                placeholder="请输入手机号"
                                class="input"
                        >
                            <template #prepend>+86</template>
                        </el-input>
                        <el-input
                                v-model="code"
                                placeholder="请输入验证码"
                                class="input-with-button input"
                        >
                            <template #append>
                                <el-button>获取验证码</el-button>
                            </template>
                        </el-input>
                        <el-button class="login">登录</el-button>
                        <div class="agree">
                            <input type="checkbox">
                            <span>我已阅读并同意《用户协议》</span>
                        </div>
                        <div class="other-option">
                            <span class="option">找回密码</span>
                            <router-link to="/register" class="option">免费注册</router-link>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="密码登录">
                        <el-input
                                v-model="phone"
                                placeholder="请输入手机号"
                                class="input"
                        >
                            <template #prepend>+86</template>
                        </el-input>
                        <el-input
                                v-model="password"
                                placeholder="请输入密码"
                                type="password"
                                show-password
                                class="input-with-button input"
                        />
                        <el-button class="login">登录</el-button>
                        <div class="agree">
                            <input type="checkbox">
                            <span>我已阅读并同意《用户协议》</span>
                        </div>
                        <div class="other-option">
                            <span class="option">找回密码</span>
                            <router-link to="/register" class="option">免费注册</router-link>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import AccountHeader from "@/views/account/AccountHeader.vue";
import {ref} from "vue";
import accountImage from '@/assets/accountImage.webp'

const phone = ref('');
const code = ref('');
const password = ref('');
</script>

<style scoped>
.main {
    position: relative;
    width: 100%;
    height: 700px;
}

.form {
    width: 60%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.image {
    width: 250px;
    margin-right: 80px;
}

.panel {
    width: 350px;
}

.input {
    margin: 15px 0;
    height: 40px
}

.login {
    width: 100%;
    height: 40px;
    margin: 15px 0;
}

.agree {
    display: flex;
    align-items: center;
}

.agree span {
    font-size: 12px;
    opacity: 50%;
}

.other-option {
    display: flex;
    justify-content: flex-end;
    margin: 10px 0;
}

.other-option .option {
    font-size: 12px;
    opacity: 50%;
    margin: 0 10px;
}
</style>

<style>
.input-with-button .el-input-group__append {
    background-color: #ff4141;
    color: white;
}
</style>