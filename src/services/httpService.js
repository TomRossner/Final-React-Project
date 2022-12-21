import axios from "axios";
axios.defaults.baseURL = "https://hammerhead-app-bry9f.ondigitalocean.app/api";

export const setCommonHeader = (headerName, value) => {
    axios.defaults.headers.common[headerName] = value;
}

const httpService = {
    get: axios.get,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete,
    post: axios.post,
}

export default httpService;