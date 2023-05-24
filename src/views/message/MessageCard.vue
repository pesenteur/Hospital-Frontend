<template>
    <el-card shadow="hover" v-intersection-observer="onIntersectionObserver">
        <template #header>
            <div class="title">
                <el-tag type="success" class="status" v-if="data.is_read">
                    已读
                </el-tag>
                <el-tag type="danger" class="status" v-else>
                    未读
                </el-tag>
                <div class="title-content">{{ data.title }}</div>
            </div>
        </template>
        <div class="content">
            {{ data.content }}
        </div>
    </el-card>
</template>

<script setup>
import { vIntersectionObserver } from '@vueuse/components'
import {computed, inject} from "vue";

const $api = inject('$api');
const props = defineProps({
    modelValue: {
        required: true,
        type: Object
    }
});
const emit = defineEmits(['update:modelValue']);

// v-model的实现
const data = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    }
});

let timer;
function onIntersectionObserver([{ isIntersecting }]) {
    if (isIntersecting && !data.value.is_read) {
        timer = setTimeout(()=>{
            setRead();
        }, 3000);
    } else if (!isIntersecting && !data.value.is_read) {
        clearTimeout(timer);
    }
}

// 发请求设为已读
async function setRead() {
    const result = await $api.user.readMessage(data.value.id);
    if (result.result === '1') {
        data.value.is_read = 1;
    }
}
</script>

<style scoped>
.title {
    display: flex;
    justify-items: center;
}

.status {
    margin-right: 15px;
}

.content {
    line-height: 30px;
    white-space: pre-wrap;
}
</style>