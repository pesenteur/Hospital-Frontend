<template>
    <div class="main">
        <el-table
                ref="multipleTableRef"
                :data="tableData"
        >
            <el-table-column type="selection" width="30"/>
            <el-table-column type="expand" width="30">
                <template #default="props">
                    <div class="more">
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
                                <div class="info">
                                    {{ props.row.name }}
                                    <el-icon class="edit">
                                        <Edit/>
                                    </el-icon>
                                </div>
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
                                <div class="info">
                                    {{ props.row.sex }}
                                    <el-icon class="edit">
                                        <Edit/>
                                    </el-icon>
                                </div>
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
                                    {{ props.row.identification }}
                                    <el-icon class="edit">
                                        <Edit/>
                                    </el-icon>
                                </div>
                            </el-descriptions-item>
                            <el-descriptions-item>
                                <template #label>
                                    <div class="cell-item">
                                        <el-icon class="icon">
                                            <iphone/>
                                        </el-icon>
                                        手机号
                                    </div>
                                </template>
                                <div class="info">
                                    {{ props.row.phone }}
                                    <el-icon class="edit">
                                        <Edit/>
                                    </el-icon>
                                </div>
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
                                {{ props.row.absence }}
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
                                    <div>{{ props.row.address }}</div>
                                    <el-icon class="edit">
                                        <Edit/>
                                    </el-icon>
                                </div>
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="name" label="就诊者姓名"/>
            <el-table-column property="identification" label="身份证号"/>
            <el-table-column align="right">
                <template #header>
                    <el-button type="primary">添加就诊者</el-button>
                    <el-button type="danger">删除所选</el-button>
                </template>
                <template #default="scope">
                    <el-button type="danger" :icon="Delete" circle/>
                </template>
            </el-table-column>
        </el-table>
        <add-patient :display="true"/>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {Delete, Edit, Iphone, Male, OfficeBuilding, User, UserFilled, WarningFilled} from "@element-plus/icons-vue";
import AddPatient from "@/views/user/AddPatient.vue";

const multipleTableRef = ref();
const tableData = ref([{
    name: '患者一',
    identification: '130100200011084321',
    sex: '男',
    phone: '1234567890',
    address: '北京市海淀区学院路37号北京航空航天大学',
    absence: 0
}, {
    name: '患者二',
    identification: '130100200011084321',
    sex: '男',
    phone: '1234567890',
    address: null,
    absence: 0
}]);
</script>

<style scoped>
.main {
    width: 80%;
    margin: 0 auto;
    padding-top: 40px;
}

.more {
    margin-left: 60px;
}

.cell-item {
    display: flex;
    align-items: center;
}

.icon {
    margin-right: 8px;;
}

.info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.edit:hover {
    cursor: pointer;
}
</style>