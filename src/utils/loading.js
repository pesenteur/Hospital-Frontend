import {ElLoading} from "element-plus";

let loading, timer;

function start(options) {
    timer = setTimeout(()=> {
        loading = ElLoading.service(options)
    }, 300);
}

function end() {
    clearTimeout(timer);
    if (loading) {
        loading.close();
        loading = null;
    }
}

function useCustomLoading() {
    return {start, end}
}

export default useCustomLoading;