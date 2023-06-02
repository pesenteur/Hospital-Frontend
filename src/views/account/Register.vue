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
                        ref="ruleFormRef"
                        :model="ruleForm"
                        :rules="rules"
                    >
                        <el-form-item
                                label="手机号"
                                prop="phone"
                        >
                            <el-input
                                    v-model="ruleForm.phone"
                                    placeholder="请输入手机号"
                                    class="input"
                            >
                                <template #prepend>+86</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item
                                label="验证码"
                                prop="code"
                        >
                            <el-input
                                    v-model="ruleForm.code"
                                    placeholder="请输入验证码"
                                    class="input-with-button input"
                            >
                                <template #append>
                                    <el-button v-if="canGetCode" @click="getCode">获取验证码</el-button>
                                    <el-button v-else disabled>重新获取({{ leftTime }})</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item
                                label="密码"
                                prop="password"
                        >
                            <el-input
                                type="password"
                                show-password
                                v-model="ruleForm.password"
                                placeholder="请输入密码"
                                class="input"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item
                                label="确认密码"
                                prop="confirm_password"
                        >
                            <el-input
                                type="password"
                                show-password
                                v-model="ruleForm.confirm_password"
                                placeholder="请再次输入密码"
                                class="input"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type="primary"
                                    class="login"
                                    :loading="isloading"
                                    @click="register"
                            >
                                注册
                            </el-button>
                        </el-form-item>
                        <el-form-item prop="agree">
                            <el-checkbox-group v-model="ruleForm.agree" class="agree">
                                <el-checkbox label="agree">
                                    我已阅读并同意
                                    <el-text>《用户协议》</el-text>
                                </el-checkbox>
                            </el-checkbox-group>
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
import {reactive, ref} from "vue";
import accountImage from '@/assets/accountImage.webp'
import {ElMessage} from "element-plus";
import {useAccountStore} from "@/stores/account";
import {useRouter} from "vue-router";

const accountStore = useAccountStore();
const router = useRouter();

// 表单校验部分
const ruleFormRef = ref();

// 校验手机号
function checkPhone(rule, value, callback) {
    if (!value) {
        return callback(new Error("请输入手机号"));
    }
    if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error("手机号格式有误"));
    }
    callback();
}

// 校验验证码
function checkCode(rule, value, callback) {
    if (!gotCode) {
        return callback(new Error("请获取验证码"));
    }
    if (!value) {
        return callback(new Error("请输入验证码"));
    }
    callback();
}

// 校验密码
function checkPassword(rule, value, callback) {
    if (ruleForm.confirm_password !== '') {
        if (!ruleFormRef.value)
            return
        ruleFormRef.value.validateField('confirm_password', () => null);
    }
    if (!value) {
        return callback(new Error("请输入密码"));
    }
    if (value.length > 20 || value.length < 8) {
        return callback(new Error("密码长度应大于8小于20"));
    }
    if (!/^[a-zA-z0-9]*$/.test(value)) {
        return callback(new Error("密码只能包含数字、字母"));
    }
    callback();
}

// 校验确认密码
function checkConfirmPassword(rule, value, callback) {
    if (!value) {
        return callback(new Error("请再次输入密码"));
    }
    if (value !== ruleForm.password) {
        return callback(new Error("两次密码不一致，请检查"));
    }
    callback();
}

// 校验是否同意用户协议
function checkAgree(rule, value, callback) {
    if (value.length === 0) {
        return callback(new Error("请勾选同意"));
    }
    callback();
}

const ruleForm = reactive({
    phone: '',
    code: '',
    password: '',
    confirm_password: '',
    agree: []
});

const rules = reactive({
    phone: [{validator: checkPhone, trigger: 'blur'}],
    code: [{validator: checkCode, trigger: 'change'}],
    password: [{validator: checkPassword, trigger: 'blur'}],
    confirm_password: [{validator: checkConfirmPassword, trigger: 'blur'}],
    agree: [{validator: checkAgree, trigger: 'change'}]
});

// 获取验证码相关
// 是否获取过验证码
let gotCode = false;
// 是否可以获取验证码
const canGetCode = ref(true);
// 倒计时
const leftTime = ref(0);

// 点击获取验证码按钮
async function getCode() {
    ruleFormRef.value.validateField('phone', async isValid=>{
        if (!isValid) {
            ElMessage({
                message: '请输入正确的手机号',
                type: 'error'
            });
        } else {
            try {
                // 发请求获取验证码
                await accountStore.getCode(ruleForm.phone);
                // 限制60秒获取一次
                gotCode = true;
                canGetCode.value = false;
                leftTime.value = 60;
                const timer = setInterval(() => leftTime.value--, 1000);
                setTimeout(() => {
                    clearInterval(timer);
                    canGetCode.value = true;
                }, 60000);
                // 虚假验证码实现
                ruleForm.code = accountStore.code;
            } catch (error) {
                ElMessage({
                    message: error,
                    type: 'error'
                });
            }
        }
    });
}

// 用于控制按钮是否处于等待状态
const isloading = ref(false);

// 点击注册后的回调函数
async function register() {
    await ruleFormRef.value.validate(async (isValid, invalidFields) => {
        if (!isValid) {
            ElMessage({
                message: "请正确填写表单",
                type: 'error'
            });
        } else {
            isloading.value = true;
            try {
                await accountStore.register(ruleForm.phone, ruleForm.code, ruleForm.password);
                ElMessage({
                    message: '注册成功，即将跳转到登录界面',
                    type: 'success'
                });
                setTimeout(()=>router.push('/login'), 2000);
            } catch (error) {
                ElMessage({
                    message: error,
                    type: 'error'
                });
            }
            isloading.value = false;
        }
    });
}
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