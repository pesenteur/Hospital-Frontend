import requests from "@/utils/request";

export default {
    requestDepartmentList() {
        return requests({
            url: '/departmentList',
            method: 'GET'
        });
    },
    requestVacancyList(department, date) {
        return requests({
            url: '/vacancyList',
            method: 'GET',
            params: {
                department, date
            }
        });
    },
    requestVacancyDetail(doctor_id, date, is_morning) {
        return requests({
            url: '/vacancyDetail',
            method: 'GET',
            params:{
                doctor_id, date, is_morning
            }
        })
    }
}