<template>
    <div class="container">
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