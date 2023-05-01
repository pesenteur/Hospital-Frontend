<template>
    <el-card shadow="hover">
        <template #header>
            <div class="title">
                <el-tag type="danger" class="status">未读</el-tag>
                <div class="title-content">预约挂号成功提醒</div>
            </div>
        </template>
        <div class="content">
            您已预约成功，预约详情如下：<br/>
            就诊人：患者一<br/>
            时间：2023年4月28日<br/>
            预约医生：医生一<br/>
            请及时前往医院就诊，感谢您的配合。
        </div>
    </el-card>
</template>

<script setup>

</script>

<style scoped>
.title {
    display: flex;
    justify-items: center;
}

.status {
    margin-right: 15px;
}

.content {
    line-height: 30px;
}
</style>