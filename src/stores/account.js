import {defineStore} from "pinia";
import accountAPI from "@/api/account";
import {getToken, setToken, clearToken} from "@/utils/token";

const state = ()=>{
    return {
        code: '',
        token: getToken(),
        userInfo: {},
        unreadMessage: false
    }
}

const actions = {
    async loginWithCode(phone_number, code) {
        const result = await accountAPI.loginWithCode(phone_number, code);
        if (result.result === '1') {
            this.token = result.data.token;
            setToken(result.data.token);
            return "登录成功";
        }
        return Promise.reject(result.message);
    },
    async loginWithPassword(phone_number, password) {
        const result = await accountAPI.loginWithPassword(phone_number, password);
        if (result.result === '1') {
            this.token = result.data.token;
            setToken(result.data.token);
            return "登录成功";
        }
        return Promise.reject(result.message);
    },
    async register(phone_number, verification_code, password) {
        const result = await accountAPI.register(phone_number, verification_code, password);
        if (result.result === '1') {
            return "注册成功";
        }
        return Promise.reject(result.message);
    },
    async getCode(phone_number) {
        const result = await accountAPI.requestCode(phone_number);
        if (result.result === '1') {
            this.code = result.vertification_code;
            return "验证码已发送";
        }
        return Promise.reject(result.message);
    },
    logout() {
        this.token = undefined;
        this.userInfo = {};
        clearToken();
    },
    async getUserInfo() {
        let result = await accountAPI.requestUserInfo();
        if (result.result === '1') {
            this.userInfo = result.data;
        } else {
            return Promise.reject(result.message);
        }
        result = await accountAPI.requestUnread();
        if (result.result === '1') {
            this.unreadMessage = result.unread;
        } else {
            return Promise.reject(result.message);
        }
    },
    async updatePassword(old_password, new_password) {
        const result = await accountAPI.updatePassword(old_password, new_password);
        if (result.result === '1') {
            return '修改成功'
        } else {
            return Promise.reject(result.message);
        }
    },
    async resetPassword(phone_number, vertification_code, new_password) {
        const result = await accountAPI.resetPassword(phone_number, vertification_code, new_password);
        if (result.result === '1') {
            return '修改成功'
        } else {
            return Promise.reject(result.message);
        }
    },
    async updatePhone(new_phone_number, vertification_code) {
        const result = await accountAPI.updatePhone(new_phone_number, vertification_code);
        if (result.result === '1') {
            this.token = result.token;
            clearToken();
            setToken(result.token);
            return '修改成功'
        } else {
            return Promise.reject(result.message);
        }
    }
}

export const useAccountStore= defineStore("account", {
    state,
    actions
})