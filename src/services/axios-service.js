import axios from "axios";

console.log('📍 axios-service.js: baseURL:', process.env.REACT_APP_API_URL);
const axiosClient = axios.create({
    baseURL : process.env.REACT_APP_API_URL
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
    if (response) {
        if (response.status >= 500) {
            console.log('Server error:', response);
            // window.location.replace(`/errorPage?errorCode=${response.status}&errorMessage=${response.statusText}`);
        } else if (response.status === 401) {
            console.error('Unauthorized:', response);
            localStorage.removeItem('apiToken'); // Nettoyer le token invalide
            window.location.replace("/");
        } else if (response.status === 302) {
            console.warn('Redirect detected:', response);
            // Gérer la redirection si nécessaire
        } else {
            throw error; // Relancer les autres erreurs (ex. 422)
        }
    } else {
        console.error('Network error:', error);
        throw error;
    }
    
})



export default axiosClient;