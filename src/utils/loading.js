import {ElLoading} from "element-plus";

let loading;

function start(options) {
    loading = ElLoading.service(options);
}

function end() {
    if (loading) {
        loading.close();
        loading = null;
    }
}

function useCustomLoading() {
    return {start, end}
}

export default useCustomLoading;