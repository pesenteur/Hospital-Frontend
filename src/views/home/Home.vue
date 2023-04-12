<template>
    <div class="main">
        <roll-notification/>
        <el-carousel type="card">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <el-row class="board">
            <Board/>
            <Board/>
        </el-row>
    </div>
</template>

<script setup>
import Board from "@/views/home/Board.vue";
import RollNotification from "@/views/home/RollNotification.vue";
</script>

<style scoped>
.main {
    width: 80%;
    margin: 0 auto;
}

.board {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
}
</style>

<style>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>