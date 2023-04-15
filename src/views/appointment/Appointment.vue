<template>
  <div class="main">
      <div class="filter">
          <div class="filter-item">
              <span>科室：</span>
              <el-cascader
                      :options="options"
                      :props="props"
                      :show-all-levels="false"
                      :filterable="true"
              />
          </div>
          <div class="filter-item">
              <span>就诊日期：</span>
              <el-date-picker
                      v-model="date"
                      type="date"
                      placeholder="请选择日期"
                      :editable="false"
                      :clearable="false"
                      :disabled-date="checkDate"
              />
          </div>
          <div class="filter-item">
              <el-button>查询</el-button>
          </div>
      </div>
      <el-empty description="暂无放号信息" v-if="false"/>
      <div class="vacancy">
          <Vacancy/>
          <Vacancy/>
          <Vacancy/>
      </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Vacancy from "@/views/appointment/Vacancy.vue";

const props = {
    expandTrigger: 'hover',
    label: 'value'
}
const options = [{
    value: '内科',
    children: [{
        value: '消化内科'
    }, {
        value: '呼吸内科'
    }]
}, {
    value: '外科',
    children: [{
        value: '骨科'
    }, {
        value: '神经外科'
    }]
}];
const date = ref('');
function checkDate(selectDate) {
    const today = new Date();
    const latest = new Date();
    latest.setDate(latest.getDate() + 7);
    return selectDate <= today || selectDate >= latest;
}
</script>

<style scoped>
.main {
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
}
.filter, .filter-item{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.filter-item {
    margin-right: 40px;
}
.vacancy {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
}
</style>