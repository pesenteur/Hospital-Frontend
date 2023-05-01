<template>
    <el-dialog title="请假申请" v-model="props.display">
        <el-form label-width="80">
            <el-form-item label="请假时间">
                <el-date-picker
                        v-model="date"
                        type="datetimerange"
                        range-separator="到"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                />
            </el-form-item>
            <el-form-item label="请假类别">
                <el-select v-model="type">
                    <el-option value="事假"/>
                    <el-option value="病假"/>
                    <el-option value="其他"/>
                </el-select>
            </el-form-item>
            <el-form-item label="请假原因">
                <el-input type="textarea" :rows="6" resize="none"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps(['display']);
const date = ref();
const type = ref();
</script>

<style scoped>

</style>