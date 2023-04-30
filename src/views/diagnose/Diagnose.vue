<template>
  <div class="main">
      <div class="filter">
          选择患者
          <el-select
                  :filterable="true"
                  placeholder="选择就诊患者"
                  no-data-text="今日无就诊患者"
          >
              <el-option-group label="已过号患者">
                  <el-option>患者一</el-option>
              </el-option-group>
              <el-option-group label="未过号患者">
                  <el-option>患者二</el-option>
              </el-option-group>
          </el-select>
          <div class="flex-grow"/>
          <div>
              <el-button type="primary">下一位</el-button>
              <el-button type="success">诊断</el-button>
              <el-button>修改诊断</el-button>
          </div>
      </div>
      <el-divider/>
      <div class="info">
          <div class="title">患者信息</div>
          <el-descriptions
              :column="2"
              size="large"
              border
          >
              <el-descriptions-item>
                  <template #label>
                      <div class="cell-item">
                          <el-icon class="icon">
                              <User/>
                          </el-icon>
                          姓名
                      </div>
                  </template>
                  患者一
              </el-descriptions-item>
              <el-descriptions-item>
                  <template #label>
                      <div class="cell-item">
                          <el-icon class="icon">
                              <Male/>
                          </el-icon>
                          性别
                      </div>
                  </template>
                  男
              </el-descriptions-item>
              <el-descriptions-item>
                  <template #label>
                      <div class="cell-item">
                          <el-icon class="icon">
                              <iphone/>
                          </el-icon>
                          身份证号
                      </div>
                  </template>
                  <div class="info">
                      139201200011081234
                  </div>
              </el-descriptions-item>
              <el-descriptions-item>
                  <template #label>
                      <div class="cell-item">
                          <el-icon class="icon">
                              <iphone/>
                          </el-icon>
                          年龄
                      </div>
                  </template>
                  18
              </el-descriptions-item>
              <el-descriptions-item>
                  <template #label>
                      <div class="cell-item">
                          <el-icon class="icon">
                              <WarningFilled/>
                          </el-icon>
                          失约次数
                      </div>
                  </template>
                  0
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
                      北京市海淀区北京航空航天大学
                  </div>
              </el-descriptions-item>
          </el-descriptions>
      </div>
      <el-divider/>
      <div class="records">
          <div class="title">既往病历</div>
          <record-detail/>
      </div>
      <add-record :display="true"/>
  </div>
</template>

<script setup>

import RecordDetail from "@/views/record/RecordDetail.vue";
import {Edit, Iphone, Male, OfficeBuilding, User, WarningFilled} from "@element-plus/icons-vue";
import AddRecord from "@/views/diagnose/AddRecord.vue";
</script>

<style scoped>
.main {
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
}
.filter {
    display: flex;
    align-items: center;
}
.cell-item {
    display: flex;
    align-items: center;
}
.icon {
    margin-right: 8px;;
}
.records {
    margin-top: 30px;;
}
.title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 30px;
}
</style>