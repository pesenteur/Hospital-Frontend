<template>
    <el-card shadow="hover" class="card">
        <div class="introduction">
            <el-avatar size="large" :src="data.image"/>
            <div class="text">
                <div class="name">{{ data.name }}</div>
                <div class="department">{{ data.department }}</div>
                <el-scrollbar>
                    <div class="detail">{{ data.introduction }}</div>
                </el-scrollbar>
            </div>
        </div>
        <el-divider/>
        <div class="available">
            <el-button
                v-for="(item, index) in data.available"
                :key="index"
                class="available-item"
                :disabled="!item.num"
                @click="$router.push(`/appointment-detail/${data.id}/${item.time}/${item.is_morning?'上午':'下午'}`)"
            >
                <div>{{ format(item) }}</div>
                <div v-if="!item.num">约满</div>
            </el-button>
        </div>
    </el-card>
</template>

<script setup>
const props = defineProps(['data']);

const format = (item)=>{
    const chinese = ['日', '一', '二', '三', '四', '五', '六'];
    const date = new Date(item.time);
    const month = date.getUTCMonth();
    const day = date.getDate();
    const weekday = date.getDay();
    return `${month+1}月${day}日（星期${chinese[weekday]}）${item.is_morning?'上午':'下午'}`;
}
</script>

<style scoped>
.card {
    width: 330px;
    height: 320px;
}

.introduction {
    display: flex;
}

.text {
    margin-left: 30px;
}

.text > *:not(:last-child) {
    margin-bottom: 5px;
}

.name {
    font-weight: bold;
    font-size: 1.2em;
}

.detail {
    font-size: 0.8em;
    width: 200px;
    height: 60px;
    overflow: auto;
}

.available {
    display: flex;
    flex-direction: column;
}

.available > * {
    margin: 12px 0;
}

.available-item {
    width: 100%;
}
</style>

<style>
.available-item > span {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>