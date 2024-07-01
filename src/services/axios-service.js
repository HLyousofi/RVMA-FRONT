import axios from "axios";
import { Navigate } from "react-router-dom";



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
    if(response && response.status >= 500){
        localStorage.clear();
       const  params = {errorCode : response.status, errorMessage : response.statusText};
       const queryString = new URLSearchParams(params).toString();
       window.location.replace(`/errorPage?${queryString}`);
    }else if(response.status == 401){
        console.error(response);
        window.location.replace("/");
        
    }else{
        throw error;
    }
})



export default axiosClient;