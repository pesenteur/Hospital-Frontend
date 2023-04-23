<template>
    <div class="main">
        <div class="filter">
            <div class="filter-item">
                <span>就诊人：</span>
                <el-select
                        :filterable="true"
                        placeholder="选择就诊人"
                        no-data-text="未添加就诊人"
                >
                    <el-option>患者一</el-option>
                </el-select>
            </div>
            <div class="filter-item">
                <el-button>查询</el-button>
            </div>
        </div>
        <div class="appointments">
            <el-table
                    :data="tableData"
            >
                <el-table-column property="date" label="日期"/>
                <el-table-column property="patient" label="就诊人"/>
                <el-table-column property="department" label="科室"/>
                <el-table-column property="doctor" label="预约医生"/>
                <el-table-column property="status" label="预约状态"/>
            </el-table>
        </div>
    </div>
</template>

<script setup>
const tableData = [{
    date: '2023-04-12',
    patient: '患者一',
    department: '全科',
    doctor: '医生一',
    status: '待就医'
}, {
    date: '2023-04-10',
    patient: '患者一',
    department: '全科',
    doctor: '医生一',
    status: '已就医'
}, {
    date: '2023-04-01',
    patient: '患者一',
    department: '全科',
    doctor: '医生一',
    status: '失约'
}]
</script>

<style scoped>
.main {
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
}

.filter, .filter-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.filter-item {
    margin-right: 40px;
}

.appointments {
    margin-top: 20px;
}
</style>