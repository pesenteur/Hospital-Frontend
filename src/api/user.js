import requests from "@/utils/request";

export default {
    loginWithCode(phone_number, code){
        return requests({
            url: '/loginWithCode',
            method: 'POST',
            data: {
                phone_number, code
            }
        });
    },
    loginWithPassword(phone_number, password){
        return requests({
            url: '/loginWithPassword',
            method: 'POST',
            data: {
                phone_number, password
            }
        });
    },
    register(phone_number, verification_code, password){
        return requests({
            url: '/register',
            method: 'POST',
            data: {
                phone_number, verification_code, password
            }
        });
    },
    requestCode(phone_number) {
        return requests({
            url: `/sendCode/${phone_number}`,
            method: 'GET'
        });
    },
    requestPatients() {
        return requests({
            url: '/patientList',
            method: 'GET'
        });
    }
}