<template>
    <div class="main">
        <editable-avatar :src="accountStore.userInfo.avatar"/>
        <div class="options">
            <el-collapse accordion>
                <el-collapse-item title="修改密码">
                    <el-form
                        ref="passwordFormRef"
                        label-width="80px"
                        :model="passwordForm"
                        :rules="passwordRules"
                        class="form"
                    >
                        <el-form-item label="当前密码" prop="old_password">
                            <el-input
                                type="password"
                                placeholder="请输入当前密码"
                                show-password
                                v-model="passwordForm.old_password"
                            />
                        </el-form-item>
                        <el-form-item label="新密码" prop="password">
                            <el-input
                                type="password"
                                placeholder="请输入新密码"
                                show-password
                                v-model="passwordForm.password"
                            />
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirm_password">
                            <el-input
                                type="password"
                                placeholder="请再次输入新密码"
                                show-password
                                v-model="passwordForm.confirm_password"
                            />
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="updatePassword"
                            >
                                修改
                            </el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="修改手机号">
                    <el-form
                        label-width="80px"
                        ref="phoneFormRef"
                        :model="phoneForm"
                        :rules="phoneRules"
                        class="form"
                    >
                        <el-form-item
                            label="手机号"
                            prop="phone"
                        >
                            <el-input
                                v-model="phoneForm.phone"
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
                                v-model="phoneForm.code"
                                placeholder="请输入验证码"
                                class="input-with-button input"
                            >
                                <template #append>
                                    <el-button v-if="canGetCode" @click="getCode">获取验证码</el-button>
                                    <el-button v-else disabled>重新获取({{ leftTime }})</el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="updatePhone"
                            >
                                修改
                            </el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script setup>
import EditableAvatar from "@/views/user/EditableAvatar.vue";
import {useAccountStore} from "@/stores/account";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";

const accountStore = useAccountStore();
const router = useRouter();

// 更改密码表单校验部分
const passwordFormRef = ref();
// 检查旧密码是否输入
function checkOldPassword(rule, value, callback) {
    if (!value) {
        return callback(new Error("请输入当前密码"));
    }
    callback();
}
// 校验密码
function checkPassword(rule, value, callback) {
    if (passwordForm.confirm_password !== '') {
        if (!passwordFormRef.value)
            return
        passwordFormRef.value.validateField('confirm_password', () => null);
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
    if (value !== passwordForm.password) {
        return callback(new Error("两次密码不一致，请检查"));
    }
    callback();
}
// 存储更改密码表单信息
const passwordForm = reactive({
    old_password: '',
    password: '',
    confirm_password: ''
});
const passwordRules = reactive({
    old_password: [{validator: checkOldPassword, trigger: 'blur'}],
    password: [{validator: checkPassword, trigger: 'blur'}],
    confirm_password: [{validator: checkConfirmPassword, trigger: 'blur'}]
});
// 修改密码
async function updatePassword() {
    passwordFormRef.value.validate(async (isValid, invalidFields) => {
        if (!isValid) {
            ElMessage({
                message: "请正确填写表单",
                type: 'error'
            });
        } else {
            try {
                await accountStore.updatePassword(passwordForm.old_password, passwordForm.password);
                passwordFormRef.value.resetFields();
                ElMessage({
                    message: '修改成功',
                    type: 'success'
                });
            } catch (error) {
                ElMessage({
                    message: error,
                    type: 'error'
                });
            }
        }
    });
}


// 更改手机号表单校验部分
const phoneFormRef = ref();
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

const phoneForm = reactive({
    phone: '',
    code: ''
});

const phoneRules = reactive({
    phone: [{validator: checkPhone, trigger: 'blur'}],
    code: [{validator: checkCode, trigger: 'change'}]
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
    phoneFormRef.value.validateField('phone', async isValid=>{
        if (!isValid) {
            ElMessage({
                message: '请输入正确的手机号',
                type: 'error'
            });
        } else {
            try {
                // 发请求获取验证码
                await accountStore.getCode(phoneForm.phone);
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
                phoneForm.code = accountStore.code;
            } catch (error) {
                ElMessage({
                    message: error,
                    type: 'error'
                });
            }
        }
    });
}

// 修改手机号
async function updatePhone() {
    phoneFormRef.value.validate(async (isValid, invalidFields) => {
        if (!isValid) {
            ElMessage({
                message: "请正确填写表单",
                type: 'error'
            });
        } else {
            try {
                await accountStore.updatePhone(phoneForm.phone, phoneForm.code);
                phoneFormRef.value.resetFields();
                ElMessage({
                    message: '修改成功',
                    type: 'success'
                });
                await accountStore.getUserInfo();
            } catch (error) {
                ElMessage({
                    message: error,
                    type: 'error'
                });
            }
        }
    });
}
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;
}
.options {
    margin-top: 40px;
}
.input {
    height: 40px;
    margin-right: 20px;
}
.form {
    width: 50%;
}
</style>