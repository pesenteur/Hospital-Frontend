import home from "./home"
import doctor from "./doctor"
import appointment from "./appointment";
import user from "./user"

const api = {
    install(app) {
        app.provide('$api', {
            home, doctor, appointment, user
        });
    }
};

export default api;