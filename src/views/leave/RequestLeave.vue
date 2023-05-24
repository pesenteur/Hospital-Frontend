<template>
    <el-dialog title="请假申请" v-model="display">
        <el-form
            label-width="80"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
        >
            <el-form-item label="请假时间" prop="dateRange">
                <el-date-picker
                        v-model="ruleForm.dateRange"
                        type="datetimerange"
                        range-separator="到"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="YYYY-MM-DD hh:mm:ss"
                />
            </el-form-item>
            <el-form-item label="请假类别" prop="type">
                <el-select v-model="ruleForm.type">
                    <el-option value="事假"/>
                    <el-option value="病假"/>
                    <el-option value="其他"/>
                </el-select>
            </el-form-item>
            <el-form-item label="请假原因" prop="reason">
                <el-input type="textarea" :rows="6" resize="none" v-model="ruleForm.reason"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirm">提交</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import {ElMessage} from "element-plus";

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'requestLeave'])

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
const ruleForm = reactive({
    dateRange: undefined,
    type: undefined,
    reason: ''
});
const rules = reactive({
    dateRange: [{required: true, message: '请选择日期', trigger: 'blur'}],
    type: [{required: true, message: '请选择请假类型', trigger: 'blur'}],
    reason: [{required: true, message: '请填写请假原因', trigger: 'blur'}]
});

// 点击确定按钮
function confirm() {
    ruleFormRef.value.validate(isValid=>{
        if (!isValid) {
            ElMessage({
                message: "请正确填写表单",
                type: 'error'
            });
        } else {
            emit('requestLeave', ruleForm);
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