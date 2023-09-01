import axios, {AxiosError, AxiosRequestConfig, CanceledError, InternalAxiosRequestConfig} from 'axios'

const axiosInstance =  axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers:{
        Authorization:`Bearer ${localStorage.getItem('access')}`
    }
   
})
const onRequest = (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    console.log(config);
    
    return Promise.resolve(config);
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

axiosInstance.interceptors.request.use(onRequest, onRequestError)

export default axiosInstance