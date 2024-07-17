import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://10.90.138.158:5000"
})

export default axiosInstance;