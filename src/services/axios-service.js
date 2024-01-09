import axios from "axios";


const axiosClient = axios.create({
    baseURL : "http://127.0.0.1:8000/api/v1"
});

axiosClient.interceptors.request.use((config) =>{
    const token = localStorage.getItem('apiToken');
    config.headers.Authorization = `Bearer ${token} `
    return config

})

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if(response && response.status === 401){
        localStorage.clear();
    }else {
        throw error;
    }
})



export default axiosClient;