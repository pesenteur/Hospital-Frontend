import {defineStore} from "pinia";
import userAPI from "@/api/user";
import {getToken, setToken} from "@/utils/token";

const state = ()=>{
    return {
        code: '',
        token: getToken(),
        userInfo: {}
    }
}

const actions = {
    async loginWithCode(phone_number, code) {
        const result = await userAPI.loginWithCode(phone_number, code);
        if (result.result === '1') {
            this.token = result.data.token;
            setToken(result.data.token);
            return "登录成功";
        }
        return Promise.reject(result.reason);
    },
    async loginWithPassword(phone_number, password) {
        const result = await userAPI.loginWithPassword(phone_number, password);
        if (result.result === '1') {
            this.token = result.data.token;
            setToken(result.data.token);
            return "登录成功";
        }
        return Promise.reject(result.reason);
    },
    async register(phone_number, verification_code, password) {
        const result = await userAPI.register(phone_number, verification_code, password);
        if (result.result === '1') {
            return "注册成功";
        }
        return Promise.reject(result.reason);
    },
    async getCode(phone_number) {
        const result = await userAPI.requestCode(phone_number);
        if (result.result === '1') {
            this.code = result.vertification_code;
            return "验证码已发送";
        }
        return Promise.reject(result.message);
    }
}

const getters = {

}

export const useAccountStore= defineStore("account", {
    state,
    actions,
    getters
})