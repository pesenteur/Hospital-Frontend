<template>
    <div class="avatar" @click="showDialog">
        <el-avatar :size="100" :src="avatarImg" />
        <span class="avatar-edit">
								<el-icon><Camera/></el-icon>
							</span>
    </div>
    <el-dialog title="设置头像" v-model="display" width="600px" align-center>
        <vue-cropper
            ref="cropper"
            :viewMode="1"
            :aspectRatio="1"
            dragMode="move"
            :ready="cropImage"
            :zoom="cropImage"
            :crop="cropImage"
            style="width: 100%; height: 512px; text-align: center"
            v-if="selected"
        ></vue-cropper>
        <el-upload
            drag
            :on-change="setImage"
            :auto-upload="false"
            accept="image/*"
            :show-file-list="false"
            v-else
        >
            <el-icon class="el-icon--upload"><upload-filled/></el-icon>
            <div>
                请选择一张图片
            </div>
        </el-upload>
        <template #footer>
            <el-button type="primary" @click="saveAvatar" :disabled="!selected">上传并保存</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import {Camera, UploadFilled} from "@element-plus/icons-vue";
import {computed, ref} from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import axios from "axios";
import {useAccountStore} from "@/stores/account";
import {ElMessage} from "element-plus";

const accountStore = useAccountStore();
const props = defineProps(['src']);

const avatarImg = computed(()=>props.src);
const display = ref(false);
const cropper = ref();
let imageFile;
const selected = ref();

const showDialog = () => {
    display.value = true;
    selected.value = false;
};
const setImage = uploadFile => {
    const reader = new FileReader();
    reader.onload = event => {
        cropper.value && cropper.value.replace(event.target.result);
    };
    reader.readAsDataURL(uploadFile.raw);
    selected.value = true;
};
const cropImage = () => {
    cropper.value.getCroppedCanvas({
        width: 512,
        height: 512,
        imageSmoothingQuality: "high"
    }).toBlob(blob => imageFile = new File([blob], "avatar.png"));
};
const saveAvatar = async () => {
    const formData = new FormData();
    formData.append("avatar", imageFile);
    try {
        const result = await axios.post("http://azure.pesenteur.eu.org:5555/api/uploadAvatar", formData, {
            headers: {
                'Content-type' : 'multipart/form-data',
                Authorization: accountStore.token
            }
        });
        if (result.data.result === '1') {
            ElMessage({
                message: '上传成功',
                type: 'success'
            });
            await accountStore.getUserInfo();
        } else {
            ElMessage({
                message: '上传失败，请稍后重试',
                type: 'error'
            });
        }
    } catch (error) {
        ElMessage({
            message: '遇到问题，请刷新',
            type: 'error'
        });
    }
    display.value = false;
};
</script>

<style scoped>
.avatar {
    position: relative;
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 50%;
    overflow: hidden;
}
.avatar-edit {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
}
.avatar-edit i {
    color: #eee;
    font-size: 25px;
}
.avatar:hover .avatar-edit {
    opacity: 1;
}
</style>