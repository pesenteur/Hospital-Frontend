<template>
    <div class="container">
        <el-icon class="icon" size="20px">
            <Bell/>
        </el-icon>
        <div class="banner">
            <div>进入医院请佩戴口罩</div>
        </div>
    </div>
</template>

<script setup>
import {Bell} from "@element-plus/icons-vue";
</script>

<style scoped>
.container {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
}

/* 文字滚动 */
.banner {
    width: 80%;
    overflow: hidden;
    background-color: #eee5dd;
}

@keyframes scrolltext {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(-100%);
    }
}

.banner div {
    font-size: 20px;
    animation: 15s scrolltext linear infinite;
    white-space: pre;
}

</style>