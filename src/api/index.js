import home from "@/api/home"
import doctor from "@/api/doctor"
import appointment from "@/api/appointment";
import user from "@/api/user"
import diagnose from "@/api/diagnose";
import leave from "@/api/leave";

const api = {
    install(app) {
        app.provide('$api', {
            home, doctor, appointment, user, diagnose, leave
        });
    }
};

export default api;