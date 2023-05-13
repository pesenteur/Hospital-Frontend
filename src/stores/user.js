import {defineStore} from "pinia";

const state = ()=>{
    return {
        token: getToken(),
        userInfo: {}
    }
}

const actions = {

}

const getters = {

}

export const useUserStore= defineStore("user", {
    state,
    actions,
    getters
})