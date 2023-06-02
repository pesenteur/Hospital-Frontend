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
        });
    },
    makeAppointment(patient_id, start_time, doctor_id) {
        return requests({
            url: '/makeAppointment',
            method: 'POST',
            data: {
                patient_id, start_time, doctor_id
            }
        });
    },
    requestAppointmentList(patient_id) {
        return requests({
            url: `/patientAppointment/${patient_id}`,
            method: 'GET'
        });
    },
    cancelAppointment(appointment_id) {
        return requests({
            url: '/cancelAppointment',
            method: 'POST',
            data: {
                appointment_id
            }
        });
    },
    requestPayStatus(payment_id) {
        return requests({
            url: `/getPaymentStatus/${payment_id}`,
            method: 'GET'
        });
    },
    requestPay(payment_id) {
        return requests({
            url: `/pay/${payment_id}`,
            method: 'POST'
        });
    },
    requestPayment(appointment_id) {
        return requests({
            url: `/paymentList/${appointment_id}`,
            method: 'get'
        });
    }
}