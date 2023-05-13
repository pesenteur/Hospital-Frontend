import requests from "@/utils/request";

export default {
    requestDoctorList(keyWord) {
        return requests({
            url: '/doctorList',
            method: 'GET',
            params: {
                keyWord: keyWord || undefined
            }
        });
    },
    requestDoctorDetail() {
        return requests({
            url: '/doctorDetail',
            method: 'GET'
        });
    },
}