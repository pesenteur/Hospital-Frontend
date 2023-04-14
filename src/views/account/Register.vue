<template>
    <account-header/>
    <div class="main">
        <div class="form">
            <el-image :src="accountImage" class="image"/>
            <div>
                <el-card shadow="never" class="panel">
                    <template #header>
                        <div class="card-header">注册</div>
                    </template>
                    <el-form
                            label-width="70px"
                    >
                        <el-form-item
                                label="手机号"
                        >
                            <el-input
                                    v-model="phone"
                                    placeholder="请输入手机号"
                                    class="input"
                            >
                                <template #prepend>+86</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item
                                label="验证码"
                        >
                            <el-input
                                    v-model="code"
                                    placeholder="请输入验证码"
                                    class="input-with-button input"
                            >
                                <template #append>
                                    <el-button>获取验证码</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item
                                label="密码"
                        >
                            <el-input
                                    v-model="code"
                                    placeholder="请输入密码"
                                    class="input"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item
                                label="确认密码"
                        >
                            <el-input
                                    v-model="code"
                                    placeholder="请再次输入密码"
                                    class="input"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="login">注册</el-button>
                        </el-form-item>
                        <el-form-item>
                            <div class="agree">
                                <input type="checkbox">
                                <span>我已阅读并同意《用户协议》</span>
                            </div>
                        </el-form-item>
                        <el-form-item class="other-option">
                            <router-link to="/login" class="option">已有帐号，前去登录</router-link>
                        </el-form-item>

                    </el-form>
                </el-card>
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
    width: 65%;
    height: 80%;
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

.card-header {
    display: flex;
    justify-content: center;
}

.panel {
    width: 450px;
}

.input {
    height: 40px;
    margin-right: 20px;
}

.login {
    width: 100%;
    height: 40px;
    margin: 10px 20px 0 0;
}

.agree {
    display: flex;
    align-items: center;
}

.agree span {
    font-size: 12px;
    opacity: 50%;
}

.other-option .option {
    font-size: 12px;
    opacity: 50%;
    margin: 0 10px;
}
</style>

<style>
.other-option .el-form-item__content {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
}
</style>