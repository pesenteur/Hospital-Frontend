<template>
    <div class="main">
        <div v-show="!success">
            这是一个用于演示的支付页面，点击下面的按钮即可支付
        </div>
        <el-button type="primary" @click="pay" v-show="!success">点击支付</el-button>
        <img :src="paySuccess" alt="pay successfully" v-show="success">
    </div>
</template>

<script setup>
import {inject, ref} from "vue";
import {useRoute} from "vue-router";
import paySuccess from '@/assets/paySuccess.webp'
import {ElMessage} from "element-plus";

const $api = inject('$api');
const route = useRoute();

const success = ref(false);

async function pay() {
    const paymentID = route.params.payment_id;
    const result = await $api.appointment.requestPay(paymentID);
    if (result.result === '1') {
        success.value = true;
    } else {
        ElMessage({
            message: result.message || '支付遇到问题，请稍后重试',
            type: 'error'
        });
    }
}
</script>

<style scoped>
.main {
    width: 100%;
    margin-top: 20%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

img {
    width: 60%;
}

.main>div {
    margin-bottom: 2%;
}
</style>