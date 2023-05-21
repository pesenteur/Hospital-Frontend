<template>
    <el-dialog title="添加就诊者" v-model="display">
        <el-form
            label-width="80"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            status-icon
        >
            <el-form-item label="姓名" prop="name">
                <el-input
                    v-model="ruleForm.name"
                    placeholder="请填写姓名"
                />
            </el-form-item>
            <el-form-item label="身份证号" prop="identification">
                <el-input
                    v-model="ruleForm.identification"
                    placeholder="请填写身份证号"
                />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input
                    v-model="ruleForm.phone"
                    placeholder="请填写手机号"
                />
            </el-form-item>
            <el-form-item label="家庭住址" prop="address">
                <el-input
                    v-model="ruleForm.address"
                    placeholder="请填写住址"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import IDValidator from "id-validator"
import {ElMessage} from "element-plus";

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'addPatient'])

// v-model的实现
const display = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

// 表单校验部分
const ruleFormRef = ref();
// 校验身份证号
function checkIdentification(rule, value, callback) {
    const validator = new IDValidator();
    if (!validator.isValid(value)) {
        return callback(new Error("身份证号错误"));
    }
    callback();
}
// 校验手机号
function checkPhone(rule, value, callback) {
    if (value && !/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error("手机号格式有误"));
    }
    callback();
}

const ruleForm = reactive({
    name: '',
    identification: '',
    phone: '',
    address: ''
});
const rules = reactive({
    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
    identification: [
        {required: true, message: '请输入身份证号', trigger: 'blur'},
        {validator: checkIdentification, trigger: 'blur'}
    ],
    phone: [{validator: checkPhone, trigger: 'blur'}],
    address: [{trigger: 'blur'}]
});

// 点击确定
function confirm() {
    ruleFormRef.value.validate(isValid=>{
        if (!isValid) {
            ElMessage({
                message: "请正确填写表单",
                type: 'error'
            });
        } else {
            emit('addPatient', ruleForm);
            ruleFormRef.value.resetFields();
            display.value = false;
        }
    });
}
// 点击取消按钮
function cancel() {
    display.value = false;
}
</script>

<style scoped>

</style>