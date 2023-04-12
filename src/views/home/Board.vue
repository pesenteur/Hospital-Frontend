<template>
    <el-card class="box-card" shadow="hover">
        <template #header>
            <div class="card-header">
                <span>通知</span>
                <el-link class="right">更多</el-link>
            </div>
        </template>
        <div v-for="o in 8" :key="o" class="text item">
            {{ '通知标题' + o }}
        </div>
    </el-card>
</template>

<script setup>

</script>

<style>
.box-card {
    width: 450px;
}

.text {
    font-size: 14px;
}

.right {
    float: right;
}

.item {
    margin-bottom: 18px;
}

.el-row {
    display: flex;
    align-items: center;
}
</style>