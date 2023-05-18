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
                                <el-button
                                    @click="getCode"
                                    v-if="canGetCode"
                                >
                                    获取验证码
                                </el-button>
                                <el-button v-else>
                                    重新获取({{leftTime}})
                                </el-button>
                            </template>
                        </el-input>
                        <el-button class="login" @click="loginWithCode">
                            登录
                        </el-button>
                        <div class="agree">
                            <input type="checkbox" v-model="agree">
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
                        <el-button class="login" @click="loginWithPassword">
                            登录
                        </el-button>
                        <div class="agree">
                            <input type="checkbox" v-model="agree">
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
import {useAccountStore} from "@/stores/account";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const accountStore = useAccountStore();
const router = useRouter();
const route = useRoute();

const phone = ref('');
const code = ref('');
const password = ref('');
const agree = ref(false);

// 检查手机号格式
function checkPhone(input) {
    return !/^1[3-9]\d{9}$/.test(input);
}

// 获取验证码相关
// 是否可以获取验证码
const canGetCode = ref(true);
// 倒计时
const leftTime = ref(0);
// 点击获取验证码按钮
async function getCode() {
    if (!phone.value) {
        ElMessage({
            message: '请输入手机号',
            type: 'error'
        });
        return;
    }
    if (!checkPhone(phone)) {
        ElMessage({
            message: '手机号格式错误，请检查后修改',
            type: 'error'
        });
        return;
    }
    try {
        // 发请求获取验证码
        await accountStore.getCode(phone.value);
        // 限制60秒获取一次
        canGetCode.value = false;
        leftTime.value = 60;
        const timer = setInterval(() => leftTime.value--, 1000);
        setTimeout(() => {
            clearInterval(timer);
            canGetCode.value = true;
        }, 60000);
        // 虚假验证码实现
        code.value = accountStore.code;
    } catch (error) {
        ElMessage({
            message: error,
            type: 'error'
        });
    }
}

// 通过验证码登录
async  function loginWithCode() {
    if (!phone.value) {
        ElMessage({
            message: '请输入手机号',
            type: 'error'
        });
        return;
    }
    if (!code.value) {
        ElMessage({
            message: '请输入验证码',
            type: 'error'
        });
        return;
    }
    if (!agree.value) {
        ElMessage({
            message: '请勾选同意用户协议',
            type: 'error'
        });
        return;
    }
    try {
        await accountStore.loginWithCode(phone.value, code.value);
        ElMessage({
            message: '登录成功，即将跳转',
            type: 'success'
        });
        setTimeout(()=>{
            if (route.query.redirect) {
                router.push(route.query.redirect);
            } else {
                router.push('/');
            }
        }, 2000);
    } catch (error) {
        ElMessage({
            message: error,
            type: 'error'
        });
    }
}

// 通过密码登录
async function loginWithPassword(){
    if (!phone.value) {
        ElMessage({
            message: '请输入手机号',
            type: 'error'
        });
        return;
    }
    if (!password.value) {
        ElMessage({
            message: '请输入密码',
            type: 'error'
        });
        return;
    }
    if (!agree.value) {
        ElMessage({
            message: '请勾选同意用户协议',
            type: 'error'
        });
        return;
    }
    try {
        await accountStore.loginWithPassword(phone.value, password.value);
        ElMessage({
            message: '登录成功，即将跳转',
            type: 'success'
        });
        setTimeout(()=>{
            if (route.query.redirect) {
                router.push(route.query.redirect);
            } else {
                router.push('/');
            }
        }, 2000);
    } catch (error) {
        ElMessage({
            message: error,
            type: 'error'
        });
    }
}
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