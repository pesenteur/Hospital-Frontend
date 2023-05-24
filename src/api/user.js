import requests from "@/utils/request";

export default {
    requestPatients() {
        return requests({
            url: '/patientList',
            method: 'GET'
        });
    },
    requestPatientDetail(patient_id) {
        return requests({
            url: `/patientDetail/${patient_id}`,
            method: 'GET'
        });
    },
    updatePatient(patient_id, patient_name, patient_gender, patient_identification, phone_number, address) {
        return requests({
            url: `/updatePatient/${patient_id}`,
            method: 'PUT',
            data: {
                patient_name, patient_gender, patient_identification, phone_number, address
            }
        });
    },
    addPatient(patient_name, identification, phone_number, address) {
        return requests({
            url: 'addPatient',
            method: 'POST',
            data: {
                patient_name, identification, phone_number, address
            }
        });
    },
    deletePatient(patient_ids) {
        return requests({
            url: `/deletePatient`,
            method: 'DELETE',
            data: {
                patient_ids
            }
        });
    },
    requestsRecord(patient_id) {
        return requests({
            url: `/getMedicalRecord/${patient_id}`,
            method: 'GET'
        });
    },
    requestsMessages() {
        return requests({
            url: '/getMessage',
            method: 'GET'
        });
    },
    readMessage(message_id) {
        return requests({
            url: `/readMessage/${message_id}`,
            method: 'GET'
        });
    }
}