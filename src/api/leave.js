import requests from "@/utils/request";

export default {
    requestLeaveList() {
        return requests({
            url: '/leaveList',
            method: 'GET'
        });
    },
    makeLeave(start_time, end_time, type, reason) {
        return requests({
            url: '/makeLeave',
            method: 'POST',
            data: {
                start_time, end_time, type, reason
            }
        });
    },
    cancelLeave(leave_id) {
        return requests({
            url: '/cancelLeave',
            method: 'DELETE',
            data: {
                leave_id
            }
        });
    }
}