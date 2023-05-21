<template>
    <div class="main">
        <div class="option">
            <el-button type="primary">请假申请</el-button>
        </div>
        <div class="leaves">
            <el-table
                    :data="tableData"
            >
                <el-table-column property="start" label="开始时间"/>
                <el-table-column property="end" label="结束时间"/>
                <el-table-column property="type" label="类型"/>
                <el-table-column property="reason" label="请假理由" show-overflow-tooltip/>
                <el-table-column property="status" label="状态"/>
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="danger"
                        >
                            撤销请假
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <request-leave display="true"/>
    </div>
</template>

<script setup>
import RequestLeave from "@/views/leave/RequestLeave.vue";

const tableData = [{
    start: '2023-04-12 08:00',
    end: '2023-04-12 12:00',
    type: '事假',
    reason: '具体原因',
    status: '申请中'
}, {
    start: '2023-04-10 08:00',
    end: '2023-04-10 12:00',
    type: '病假',
    reason: '具体原因',
    status: '已通过'
}, {
    start: '2023-04-01 08:00',
    end: '2023-04-01 12:00',
    type: '事假',
    reason: '具体原因',
    status: '已结束'
}]
</script>

<style scoped>
.main {
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
}

.leaves {
    margin-top: 20px;
}
</style>