import requests from "@/utils/request";

export default {
    requestPatients() {
        return requests({
            url: '/patientList',
            method: 'GET'
        })
    }
}