<template>
    <div class="main">
        <el-descriptions
                :column="2"
                size="large"
                border
        >
            <template #extra>
                <el-button type="primary">修改密码</el-button>
            </template>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon class="icon">
                            <iphone/>
                        </el-icon>
                        手机号
                    </div>
                </template>
                <div class="info">
                    18100000000
                    <el-icon class="edit"><Edit/></el-icon>
                </div>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon class="icon">
                            <office-building/>
                        </el-icon>
                        住址
                    </div>
                </template>
                <div class="info">
                    北京市海淀区学院路37号北京航空航天大学
                    <el-icon class="edit"><Edit/></el-icon>
                </div>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup>
import {Edit, Iphone, OfficeBuilding} from "@element-plus/icons-vue";
</script>

<style scoped>
.main {
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
}
.cell-item {
    display: flex;
    align-items: center;
}
.icon {
    margin-right: 8px;;
}
.info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.edit:hover {
    cursor: pointer;
}
</style>