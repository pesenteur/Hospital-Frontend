<template>
  <el-dialog title="诊断结果" v-model="props.display" align-center>
      <el-form label-width="80">
          <el-form-item label="姓名">
              <el-input v-model="name"/>
          </el-form-item>
          <el-form-item label="年龄">
              <el-input-number
                      v-model="age"
                      controls-position="right"
              />
          </el-form-item>
          <el-form-item label="性别">
              <el-select v-model="sex">
                  <el-option>男</el-option>
                  <el-option>女</el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="就诊日期">
              <el-date-picker v-model="date"/>
          </el-form-item>
          <el-form-item label="症状">
              <el-input
                      v-model="symptom"
                      type="textarea"
                      placeholder="请填写患者症状"
                      :rows="6"
                      resize="none"
              />
          </el-form-item>
          <el-form-item label="诊断结果">
              <el-input
                      v-model="result"
                      type="textarea"
                      placeholder="请填写诊断结果"
                      :rows="6"
                      resize="none"
              />
          </el-form-item>
          <el-form-item label="处方">
              <el-input
                      v-model="prescription"
                      type="textarea"
                      placeholder="请开具处方"
                      :rows="6"
                      resize="none"
              />
          </el-form-item>
          <el-form-item label="医嘱">
              <el-input
                      v-model="symptom"
                      type="textarea"
                      placeholder="请填写医嘱"
                      :rows="6"
                      resize="none"
              />
          </el-form-item>
          <el-form-item>
              <el-button type="primary">确定</el-button>
              <el-button>取消</el-button>
          </el-form-item>
      </el-form>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps(['display']);
const name = ref('患者一');
const age = ref(18);
const sex = ref('男');
const date = ref(new Date().toDateString());
const symptom = ref();
const result = ref();
const prescription = ref();
const advice = ref();
</script>

<style scoped>

</style>