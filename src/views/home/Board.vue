<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>{{props.title}}</span>
                <router-link :to="`/${target}`" class="right">更多</router-link>
            </div>
        </template>

        <el-skeleton :loading="loading" animated>
            <template #template>
                <el-skeleton-item
                    v-for="i in 10"
                    :key="i"
                    style="height: 24px; margin-bottom: 10px"
                />
            </template>
            <template #default>
                <router-link
                    v-for="item in props.data"
                    :key="item.id"
                    :to="`/${target}/${item.id}`"
                    class="item"
                >
                    <div class="text">
                        {{ item.title }}
                    </div>
                    <div class="date">
                        {{item.date}}
                    </div>
                </router-link>
            </template>
        </el-skeleton>
    </el-card>
</template>

<script setup>
const props = defineProps(['title', 'data', 'target', 'loading']);

</script>

<style scoped>
.box-card {
    width: 45%;
    height: 460px;
}

.right {
    float: right;
    font-size: 14px;
    opacity: 60%;
}

.right:hover {
    color: #409eff;
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
    cursor: pointer;
}

.date {
    font-size: 12px;
    opacity: 50%;
}
</style>