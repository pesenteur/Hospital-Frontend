<template>
    <div class="main">
        <message-card
            class="card message"
            v-for="(message, index) in messages"
            :key="message.id"
            :id="`message${message.id}`"
            v-model="messages[index]"
        />
    </div>
</template>

<script setup>
import MessageCard from "@/views/message/MessageCard.vue";
import {inject, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

const $api = inject('$api');

// 存储消息
const messages = ref([]);
// 发请求获取消息
async function getMessages() {
    const result = await $api.user.requestsMessages();
    if (result.result === '1') {
        messages.value = result.messages;
    } else {
        ElMessage({
            message: result.message || '获取消息失败，请刷新重试',
            type: 'error'
        });
    }
}

onMounted(()=>{
    getMessages().then(()=>{
        const id = messages.value.find(item=>!item.is_read)?.id;
        if (!id) {
            return;
        }
        const unread = document.querySelector(`#message${id}`);
        console.log(unread)
        unread.scrollIntoView({
            behavior: 'auto',
            block: 'center'
        });
    });
});
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;
}

.card {
    margin-bottom: 40px;
}
</style>