import axios, { isAxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    withCredentials: true, // Allow cookies to be sent with requests
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
       if (error.response) {
        const {status, data} = error.response;
        switch (status) {
            case 400:
               console.error("Bad Request:", data);
                break;
            case 401:
                console.error("Unauthorized:", data);
                break;
            case 403:
                console.error("Forbidden:", data);
                break;
            case 404:
                console.error("Not Found:", data);
                break;
            case 500:
                console.error("Internal Server Error:", data);
                break;
            default:
                console.error("An unexpected error occurred:", data);
        }
       }else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }
        return Promise.reject({
            // isAxiosError: true,
            message: error.response ?.data?.message||error.message || 'An error occurred',
            status: error.response ?.status,
            data: error.response ?.data,
            // originalError: error
        });
    }
);

export default axiosInstance;