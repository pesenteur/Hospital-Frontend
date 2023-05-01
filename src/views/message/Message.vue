<template>
    <div class="main">
        <message-card class="card"/>
        <message-card class="card"/>
        <message-card class="card"/>
    </div>
</template>

<script setup>
import MessageCard from "@/views/message/MessageCard.vue";
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