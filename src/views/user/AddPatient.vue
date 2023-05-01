<template>
    <el-dialog title="添加就诊者" v-model="props.display">
        <el-form label-width="80">
            <el-form-item label="姓名">
                <el-input v-model="name"/>
            </el-form-item>
            <el-form-item label="身份证号">
                <el-input
                        v-model="identification"
                        placeholder="请填写身份证号"
                />
            </el-form-item>
            <el-form-item label="手机号">
                <el-input
                        v-model="phone"
                        placeholder="请填写手机号"
                />
            </el-form-item>
            <el-form-item label="家庭住址">
                <el-input
                        v-model="address"
                        placeholder="请填写住址"
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
const name = ref();
const identification = ref();
const phone = ref();
const address = ref();
</script>

<style scoped>

</style>