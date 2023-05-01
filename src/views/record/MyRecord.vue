<template>
    <div class="main">
        <div class="filter">
            <div class="filter-item">
                <span>就诊人：</span>
                <el-cascader
                        :options="options"
                        :props="props"
                        :show-all-levels="false"
                        :filterable="true"
                />
            </div>
            <div class="filter-item">
                <el-button>查询</el-button>
            </div>
        </div>
        <div class="record">
            <record-detail/>
        </div>
    </div>
</template>

<script setup>
import RecordDetail from "@/views/record/RecordDetail.vue";

const props = {
    expandTrigger: 'hover',
    label: 'value'
}
const options = [{
    value: '患者一'
}]
</script>

<style scoped>
.main {
    width: 60%;
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

.record {
    margin-top: 30px;
}
</style>