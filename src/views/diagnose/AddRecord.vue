<template>
    <el-dialog title="诊断结果" v-model="display" align-center>
        <el-form label-width="80">
            <el-form-item label="症状">
                <el-input
                    v-model="symptom"
                    type="textarea"
                    placeholder="请填写患者症状"
                    :rows="6"
                    resize="none"
                />
            </el-form-item>
            <el-form-item label="诊断结果">
                <el-input
                    v-model="result"
                    type="textarea"
                    placeholder="请填写诊断结果"
                    :rows="6"
                    resize="none"
                />
            </el-form-item>
            <el-form-item label="处方">
                <el-input
                    v-model="prescription"
                    type="textarea"
                    placeholder="请开具处方"
                    :rows="6"
                    resize="none"
                />
            </el-form-item>
            <el-form-item label="医嘱">
                <el-input
                    v-model="advice"
                    type="textarea"
                    placeholder="请填写医嘱"
                    :rows="6"
                    resize="none"
                />
            </el-form-item>
        </el-form>
        <div class="option">
            <el-button type="primary" size="large" @click="confirm">确定</el-button>
            <el-button size="large" @click="cancel">取消</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import {computed, reactive, ref, watchEffect} from "vue";

const props = defineProps(['modelValue', 'data']);
const emit = defineEmits(['update:modelValue', 'updateRecord']);

// v-model的实现
const display = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

const symptom = ref(props.data?.symptom);
const result = ref(props.data?.result);
const prescription = ref(props.data?.prescription);
const advice = ref(props.data?.advice);
watchEffect(()=>{
    symptom.value = props.data?.symptom || '';
    result.value = props.data?.result || '';
    prescription.value = props.data?.prescription || '';
    advice.value = props.data?.advice || '';
});

// 点击确定
function confirm() {
    emit('updateRecord', {
        'symptom': symptom.value,
        'result': result.value,
        'prescription': prescription.value,
        'advice': advice.value
    });
    display.value = false;
}
// 点击取消
function cancel() {
    display.value = false;
}
</script>

<style scoped>
.option {
    display: flex;
    justify-content: space-around;
}
</style>