<template>
    <el-descriptions
            :column="2"
            size="large"
            border
    >
        <el-descriptions-item class-name="first" label-class-name="first-label">
            <template #label>
                <div class="cell-item">
                    <el-icon class="icon">
                        <User/>
                    </el-icon>
                    姓名
                </div>
            </template>
            <div class="info" v-if="!isEditing('name')">
                <div>{{ data.name }}</div>
                <el-icon class="operation" v-show="editable" @click="editInfo('name')">
                    <Edit/>
                </el-icon>
            </div>
            <div class="info" v-else>
                <el-input v-model="editBuf.name" class="input"/>
                <div class="operations">
                    <el-icon class="operation" @click="confirmEdit">
                        <CircleCheck/>
                    </el-icon>
                    <el-icon class="operation" @click="cancelEdit">
                        <CircleClose/>
                    </el-icon>
                </div>
            </div>
        </el-descriptions-item>
        <el-descriptions-item class-name="second" label-class-name="second-label">
            <template #label>
                <div class="cell-item">
                    <el-icon class="icon">
                        <Male/>
                    </el-icon>
                    性别
                </div>
            </template>
            <div class="info" v-if="!isEditing('gender')">
                <div>{{ data.gender }}</div>
                <el-icon class="operation" v-show="editable" @click="editInfo('gender')">
                    <Edit/>
                </el-icon>
            </div>
            <div class="info" v-else>
                <el-input v-model="editBuf.gender" class="input"/>
                <div class="operations">
                    <el-icon class="operation" @click="confirmEdit">
                        <CircleCheck/>
                    </el-icon>
                    <el-icon class="operation" @click="cancelEdit">
                        <CircleClose/>
                    </el-icon>
                </div>
            </div>
        </el-descriptions-item>
        <el-descriptions-item class-name="first" label-class-name="first-label">
            <template #label>
                <div class="cell-item">
                    <el-icon class="icon">
                        <postcard/>
                    </el-icon>
                    身份证号
                </div>
            </template>
            <div class="info" v-if="!isEditing('identification')">
                <div>{{ data.identification }}</div>
                <el-icon class="operation" v-show="editable" @click="editInfo('identification')">
                    <Edit/>
                </el-icon>
            </div>
            <div class="info" v-else>
                <el-input v-model="editBuf.identification" class="input"/>
                <div class="operations">
                    <el-icon class="operation" @click="confirmEdit">
                        <CircleCheck/>
                    </el-icon>
                    <el-icon class="operation" @click="cancelEdit">
                        <CircleClose/>
                    </el-icon>
                </div>
            </div>
        </el-descriptions-item>
        <el-descriptions-item class-name="second" label-class-name="second-label">
            <template #label>
                <div class="cell-item">
                    <el-icon class="icon">
                        <iphone/>
                    </el-icon>
                    手机号
                </div>
            </template>
            <div class="info" v-if="!isEditing('phone')">
                <div>{{ data.phone }}</div>
                <el-icon class="operation" v-show="editable" @click="editInfo('phone')">
                    <Edit/>
                </el-icon>
            </div>
            <div class="info" v-else>
                <el-input v-model="editBuf.phone" class="input"/>
                <div class="operations">
                    <el-icon class="operation" @click="confirmEdit">
                        <CircleCheck/>
                    </el-icon>
                    <el-icon class="operation" @click="cancelEdit">
                        <CircleClose/>
                    </el-icon>
                </div>
            </div>
        </el-descriptions-item>
        <el-descriptions-item class-name="first" label-class-name="first-label">
            <template #label>
                <div class="cell-item">
                    <el-icon class="icon">
                        <WarningFilled/>
                    </el-icon>
                    失约次数
                </div>
            </template>
            {{ data.cnt }}
        </el-descriptions-item>
        <el-descriptions-item class-name="second" label-class-name="second-label">
            <template #label>
                <div class="cell-item">
                    <el-icon class="icon">
                        <office-building/>
                    </el-icon>
                    住址
                </div>
            </template>
            <div class="info" v-if="!isEditing('address')">
                <div>{{ data.address }}</div>
                <el-icon class="operation" v-show="editable" @click="editInfo('address')">
                    <Edit/>
                </el-icon>
            </div>
            <div class="info" v-else>
                <el-input v-model="editBuf.address" class="input"/>
                <div class="operations">
                    <el-icon class="operation" @click="confirmEdit">
                        <CircleCheck/>
                    </el-icon>
                    <el-icon class="operation" @click="cancelEdit">
                        <CircleClose/>
                    </el-icon>
                </div>
            </div>
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import {
    CircleCheck,
    CircleClose,
    Edit,
    Iphone,
    Male,
    OfficeBuilding, Postcard,
    User,
    WarningFilled
} from "@element-plus/icons-vue";
import {inject, reactive, ref} from "vue";

const props = defineProps({
    data: {
        required: true,
        type: Object
    },
    editable: {
        type: Boolean,
        default(rawProps) {
            return false;
        }
    },
});
const emit = defineEmits(['updatePatient']);
// 临时存储编辑时的数据，编辑时从data复制
const editBuf = ref();
// 记录处于编辑状态的信息
const editingInfo = ref();
// 判断某信息是否处于编辑状态
function isEditing(info) {
    return editingInfo.value === info;
}
// 开始编辑某条信息
function editInfo(info) {
    // 复制数据
    editBuf.value = Object.assign({}, props.data);
    // 记录处于编辑状态的信息
    editingInfo.value = info;
}
// 确认编辑
function confirmEdit() {
    emit('updatePatient', editBuf.value)
    editingInfo.value = null;
}

// 取消编辑
function cancelEdit() {
    editingInfo.value = null;
}
</script>

<style scoped>
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

.operation:hover {
    cursor: pointer;
}

.input {
    width: 80%;
}

.operations {
    width: 40px;
    display: flex;
    justify-content: space-between;
}
</style>

<style>
.first-label {
    width: 12%;
}

.first {
    width: 31%;
}

.second-label {
    width: 12%;
}

.second {
    width: 45%;
}
</style>