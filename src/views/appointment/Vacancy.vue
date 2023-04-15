<template>
    <el-card shadow="hover" class="card">
        <div class="introduction">
            <el-avatar size="large"/>
            <div class="text">
                <div class="name">医生名</div>
                <el-scrollbar>
                    <div class="detail">这是医生的具体介绍</div>
                </el-scrollbar>
            </div>
        </div>
        <el-divider/>
        <div class="available">
            <router-link to="/appointment-detail/10000/2023-04-17/am">
                <el-button class="available-item">
                    <div>04-17（星期一）上午</div>
                </el-button>
            </router-link>
            <router-link to="/appointment-detail/10000/2023-04-17/pm">
                <el-button class="available-item" disabled>
                    <div>04-17（星期一）下午</div>
                    <div>约满</div>
                </el-button>
            </router-link>
        </div>
    </el-card>
</template>

<script setup>
</script>

<style scoped>
.card {
    width: 330px;
    height: 280px;
}

.introduction {
    display: flex;
}

.text {
    margin-left: 30px;
}

.name {
    font-weight: bold;
    font-size: 1.2em;
}

.detail {
    font-size: 0.8em;
    width: 200px;
    height: 60px;
}

.available {
    display: flex;
    flex-direction: column;
}

.available>*{
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