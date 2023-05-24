import requests from "@/utils/request";

export default {
    requestWaitingPatients() {
        return requests({
            url: '/patientWaiting',
            method: 'GET'
        });
    },
    makeMedicalrecord(data) {
        return requests({
            url: '/makeMedicalrecord',
            method: 'POST',
            data
        });
    }
}