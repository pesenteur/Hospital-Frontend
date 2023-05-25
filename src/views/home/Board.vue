<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>{{props.title}}</span>
                <el-link class="right">更多</el-link>
            </div>
        </template>
        <a v-for="item in props.data" :key="item.id" :href="item.link" class="item">
            <div class="text">
                {{ item.title }}
            </div>
            <div class="date">
                {{item.date}}
            </div>
        </a>
    </el-card>
</template>

<script setup>
const props = defineProps(['title', 'data']);

</script>

<style scoped>
.box-card {
    width: 45%;
}

.right {
    float: right;
}

.item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
}

.text {
    font-size: 14px;
    max-width: 75%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.text:hover {
    color: red;
    text-decoration: underline;
}

.date {
    font-size: 12px;
    opacity: 50%;
}
</style>