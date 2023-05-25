import {createRouter, createWebHistory} from 'vue-router'
import {useAccountStore} from "@/stores/account";
import {ElMessage} from "element-plus";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        component: () => import('@/views/home/Home.vue')
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/views/account/Login.vue'),
        meta: {
            'hidden': true
        }
    }, {
        path: '/register',
        name: 'register',
        component: () => import('@/views/account/Register.vue'),
        meta: {
            'hidden': true
        }
    }, {
        path: '/doctor',
        name: 'doctor',
        component: () => import('@/views/doctor/Doctor.vue')
    }, {
        path: '/doctor-detail/:doctorID',
        name: 'doctor-detail',
        component: () => import('@/views/doctor/DoctorDetail.vue')
    }, {
        path: '/appointment',
        name: 'appointment',
        component: () => import('@/views/appointment/Appointment.vue')
    }, {
        path: '/appointment-detail/:doctorID/:date/:half',
        name: 'appointment-detail',
        component: () => import('@/views/appointment/AppointmentDetail.vue'),
        meta: {
            perm: 'user'
        }
    }, {
        path: '/userinfo',
        name: 'userinfo',
        component: () => import('@/views/user/UserInfo.vue'),
        meta: {
            perm: 'user'
        }
    }, {
        path: '/patient',
        name: 'patient',
        component: () => import('@/views/user/Patient.vue'),
        meta: {
            perm: 'user'
        }
    }, {
        path: '/my-appointment',
        name: 'my-appointment',
        component: () => import('@/views/user/MyAppointment.vue'),
        meta: {
            perm: 'user'
        }
    }, {
        path: '/my-record',
        name: 'my-record',
        component: () => import('@/views/record/MyRecord.vue'),
        meta: {
            perm: 'user'
        }
    }, {
        path: '/diagnose',
        name: 'diagnose',
        component: () => import('@/views/diagnose/Diagnose.vue'),
        meta: {
            perm: 'doctor'
        }
    }, {
        path: '/leave',
        name: 'leave',
        component: () => import('@/views/leave/Leave.vue'),
        meta: {
            perm: 'doctor'
        }
    }, {
        path: '/message',
        name: 'message',
        component: () => import('@/views/message/Message.vue'),
        meta: {
            perm: 'user'
        }
    }]
})

// 路由守卫，实现权限管理
router.beforeEach(async (to, from)=>{
    const accountStore = useAccountStore();
    if (accountStore.token) {
        if (!accountStore.userInfo.type) {
            try {
                await accountStore.getUserInfo();
            } catch (error) {
            }
        }
        if (to.path === '/login') {
            ElMessage({
                message: '已处于登录状态',
                type: 'warning'
            });
            return from;
        }
        if (to.meta.perm === 'doctor' && accountStore.userInfo.type !== 'doctor') {
            ElMessage({
                message: '无权限',
                type: 'warning'
            });
            return '/';
        }
    } else if (to.meta.perm) {
        ElMessage({
            message: '请登录后继续操作',
            type: 'warning'
        });
        return {
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        };
    }
})

export default router
