import home from './home'
import doctor from './doctor'
import appointment from "./appointment";

const api = {
    install(app) {
        app.provide('$api', {
            home, doctor, appointment
        });
    }
};

export default api;