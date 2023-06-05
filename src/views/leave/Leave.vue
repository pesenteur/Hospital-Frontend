<template>
    <div class="main">
        <div class="option">
            <el-button type="primary" @click="display=true">请假申请</el-button>
        </div>
        <div class="leaves">
            <el-table
                :data="leaveList"
            >
                <el-table-column property="start_time" label="开始时间"/>
                <el-table-column property="end_time" label="结束时间"/>
                <el-table-column property="type" label="类型"/>
                <el-table-column property="reason" label="请假理由" show-overflow-tooltip/>
                <el-table-column property="leave_status" label="状态"/>
                <el-table-column label="操作">
                    <template #default="{row}">
                        <el-button
                            size="small"
                            type="danger"
                            @click="cancelLeave(row.leave_id)"
                        >
                            撤销请假
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <request-leave v-model="display" @request-leave="makeLeave"/>
    </div>
</template>

<script setup>
import RequestLeave from "@/views/leave/RequestLeave.vue";
import {inject, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import useCustomLoading from "@/utils/loading";

const $api = inject('$api');

// 存储请假信息
const leaveList = ref([]);
// 获取请假信息
async function getLeaveList() {
    const result = await $api.leave.requestLeaveList();
    if (result.result === '1') {
        leaveList.value = result.data;
    } else {
        ElMessage({
            message: result.message || '获取请假信息失败，请刷新重试',
            type: 'error'
        });
    }
    useCustomLoading().end();
}

// 新增请假申请
// 控制请假申请弹窗的显示
const display = ref(false);
// 发请求请假
async function makeLeave(data) {
    useCustomLoading().start({
        fullscreen: true,
        text: '加载中，请稍后'
    });
    const result = await $api.leave.makeLeave(
        data.dateRange[0],
        data.dateRange[1],
        data.type,
        data.reason
    );
    if (result.result === '1') {
        ElMessage({
            message: '操作成功',
            type: 'success'
        });
        await getLeaveList();
    } else {
        ElMessage({
            message: result.message || '操作失败，请重试',
            type: 'error'
        });
    }
}

// 发请求取消请假
async function cancelLeave(leaveID) {
    useCustomLoading().start({
        fullscreen: true,
        text: '加载中，请稍后'
    });
    const result = await $api.leave.cancelLeave(leaveID);
    if (result.result === '1') {
        ElMessage({
            message: '操作成功',
            type: 'success'
        });
        await getLeaveList();
    } else {
        ElMessage({
            message: result.message || '操作失败，请重试',
            type: 'error'
        });
    }
}

onMounted(()=>{
    getLeaveList();
});
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