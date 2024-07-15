import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "http://10.90.137.148:8000"
})

export default axiosInstance;