<template>
    <div class="main">
        <el-card shadow="never" class="card">
            <div class="introduction">
                <el-avatar size="large"/>
                <div class="text">
                    <div class="name">医生名</div>
                    <div>科室</div>
                    <el-scrollbar>
                        <div class="detail">这是医生的具体介绍</div>
                    </el-scrollbar>
                </div>
            </div>
            <el-divider/>
            <div class="info">
                <div>就诊医区</div>
                <div>某某某医院</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>就诊日期</div>
                <div>{{ appointment_date }}</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>诊查费</div>
                <div>20.00 元</div>
            </div>
            <el-divider/>
            <div class="info">
                <div>选择就诊人</div>
                <el-select>
                    <el-option value="add">
                        <el-icon>
                            <Plus/>
                        </el-icon>
                        添加就诊人
                    </el-option>
                </el-select>
            </div>
            <el-divider/>
            <div class="info">
                <div>
                    预约时间段
                </div>
                <el-radio-group class="available" v-model="time">
                    <el-radio-button class="available-item" label="8">
                        <div>08:01-08:30</div>
                        <div>余10</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" disabled label="8.5">
                        <div>08:31-09:00</div>
                        <div>约满</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" label="9">
                        <div>09:01-09:30</div>
                        <div>余10</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" label="9.5">
                        <div>09:31-10:00</div>
                        <div>余10</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" label="10">
                        <div>10:01-10:30</div>
                        <div>余10</div>
                    </el-radio-button>
                    <el-radio-button class="available-item" label="10.5">
                        <div>10:31-11:00</div>
                        <div>余10</div>
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div class="button">
                <el-button type="primary" size="large">确认</el-button>
                <el-button size="large" :plain="true">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import {Plus} from "@element-plus/icons-vue";
import {computed, inject, onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const $api = inject('$api');
const route = useRoute();
const {doctorID, date, half} = route.params;

const time = ref();

const appointment_date = computed(()=>{
    const chinese = ['日', '一', '二', '三', '四', '五', '六'];
    const temp = new Date(date);
    const year = temp.getUTCFullYear();
    const month = temp.getMonth();
    const day = temp.getDate();
    const weekday = temp.getDay();
    return `${year}年${month}月${day}日（星期${chinese[weekday]}）${half}`;
});

// 存储就诊人列表
const patients = ref([]);
// 获取就诊人列表
async function getPatients() {

}

// 存储放号信息
const vacancyDetail = ref([]);
// 获取放号信息
async function getVacancyDetail() {
    const result = await $api.appointment.requestVacancyDetail(
        doctorID,
        date,
        half === '上午' ? 1:0
    );
    if (result.result === 1) {
        vacancyDetail.value = result.data;
    } else {
        ElMessage({
            message: "获取放号数据失败，请刷新页面",
            type: 'error'
        });
    }
}

onMounted(async ()=>{
    await getVacancyDetail();
})
</script>

<style scoped>
.main {
    width: 60%;
    margin: 0 auto;
    padding-top: 40px;
}

.introduction {
    display: flex;
}

.text {
    margin-left: 30px;
}

.name {
    font-weight: bold;
    font-size: 1.2em;
}

.detail {
    font-size: 0.8em;
    width: 200px;
    height: 60px;
}

.info {
    display: flex;
}

.info>div:first-child{
    margin-right: 30px;
    width: 100px;
}

.available {
    display: flex;
    flex-wrap: wrap;
}

.available-item {
    margin: 0 30px 20px 0;
}

.button {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 30px;
}
</style>