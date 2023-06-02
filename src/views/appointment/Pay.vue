<template>
    <el-dialog
        title="请扫码支付费用"
        width="30%"
        v-model="display"
        center
        :close-on-click-modal="false"
        :show-close="false"
    >
        <div class="qrcode" v-if="!success">
            <img :src="qrcode" alt="url of payment">
        </div>
        <div class="success" v-else>
            <img :src="paySuccess" alt="pay successfully">
            <div>将在{{ left }}秒后自动关闭</div>
        </div>
        <template #footer>
            <el-button type="danger" @click="cancel">暂不支付</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import {computed, inject, ref, watch, watchEffect} from "vue";
import { useQRCode } from '@vueuse/integrations/useQRCode'
import {ElMessage, ElMessageBox} from "element-plus";
import paySuccess from "@/assets/paySuccess.webp"

const $api = inject('$api');
const props = defineProps(['modelValue', 'payment_id']);
const emit = defineEmits(['update:modelValue', 'success', 'cancel', 'failed']);

// v-model的实现
const display = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

// 支付页面的网址
const url = computed(()=>new URL(`/confirm-pay/${props.payment_id}`,
    window.location.origin).href);
// 生成二维码
const qrcode = useQRCode(url);
// 定时器、支付状态
let timer, success = false, left;
watchEffect(()=>{
    if (display.value) {
        timer = setInterval(async ()=>{
            const result = await $api.appointment.requestPayStatus(props.payment_id);
            if (result.result === '1') {
                success = result.status === '已支付';
            } else {
                ElMessage({
                    message: result.message || '查询支付状态失败',
                    type: 'error'
                });
                clearInterval(timer);
                emit('failed');
                display.value = false;
            }
            if (success) {
                clearInterval(timer);
                left = 3;
                timer = setInterval(()=>{
                    left--;
                    if (!left) {
                        clearInterval(timer);
                        emit('success');
                        display.value = false;
                    }
                }, 1000);
            }
        }, 1000);
    }
});

// 暂不支付
function cancel() {
    ElMessageBox.confirm('退出后订单将保留三十分钟，请于三十分钟内支付', '确认退出', {
        confirmButtonText: '仍然退出',
        cancelButtonText: '继续支付',
        type: 'warning'
    }).then(()=> {
        clearInterval(timer);
        display.value = false;
        emit('cancel');
    }).catch(()=>null)
}

</script>

<style scoped>
.qrcode,.success {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.qrcode img, .success img {
    width: 50%;
}
</style>