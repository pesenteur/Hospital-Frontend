<template>
    <div class="container">
        <el-skeleton :loading="!data" animated>
            <template #template>
                <ul>
                    <li v-for="i in 5" :key="i">
                        <div class="item">
                            <div class="image">
                                <el-skeleton-item variant="image" style="height: 80px;width: 160px"/>
                            </div>
                            <div class="content">
                                <el-skeleton-item
                                    variant="h1"
                                    style="display:block; height: 30px;width: 600px;"
                                />
                                <el-skeleton-item
                                    variant="rect"
                                    style="display:block;
                                    margin-top: 5px; height: 14px; width: 60px"
                                />
                                <el-skeleton-item
                                    variant="rect"
                                    style="display: block;
                                    margin-top: 10px; height: 60px; width: 1000px"
                                />
                            </div>
                        </div>
                    </li>
                </ul>
            </template>
            <template #default>
                <ul>
                    <li v-for="item in data" :key="item.id">
                        <router-link :to="`/${target}/${item.id}`" class="item">
                            <div class="image">
                                <img :src="item.image" alt="">
                            </div>
                            <div class="content">
                                <div class="title">{{item.title}}</div>
                                <div class="date">{{ item.date }}</div>
                                <div class="text">{{ item.short_info }}</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </template>
        </el-skeleton>
        <el-empty
            description="啊哦~暂无内容"
            v-if="data && !data.length"
            style="height: 360px;"
        />
    </div>
</template>

<script setup>
const props = defineProps(['data', 'target']);
</script>

<style scoped>
.container {
    width: 80%;
    margin: 40px auto;
}
ul {
    list-style:none;
}
.item {
    display: flex;
    width: 100%;
    height: 140px;
    padding: 32px 24px;
}
.item:hover{
    box-shadow: 0 0 5px 0 #cccccc;
    border-radius: 0 20px;
}
.image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    margin-right: 30px;
}
.image img {
    width: 100%;
}
.container {
    width: calc(100% - 190px);
    overflow: hidden;
}
.title {
    height: 36px;
    font-size: 20px;
    line-height: 36px;
    width: 100%;
}
.date {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    width: 100%;
    opacity: 50%;
}
.text {
    font-size: 16px;
    height: 58px;
    width: 100%;
    color: #999999;
}
</style>