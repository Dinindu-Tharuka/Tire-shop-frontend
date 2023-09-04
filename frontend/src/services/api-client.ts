import axios, {AxiosError, AxiosRequestConfig, CanceledError, InternalAxiosRequestConfig} from 'axios'
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';
import apiClientBase from './api-client-base';
import { useEffect, useState } from 'react';

export interface User{    
        token_type: string;
        exp: number,
        iat: number,
        jti: string,
        user_id: number
      
}


const axiosInstance =  axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers:{
        "Authorization":`Bearer ${localStorage.getItem('access') ? localStorage.getItem('access') : null}`,
        "Content-Type":'application/json',
    }
   
   
})
// const onRequest =(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>  => {
//     let access_token = localStorage.getItem('access')
    
//     console.log('acces_token111',access_token);
    
//     // const access_token = localStorage.getItem('access')    
//     const refresh_token = localStorage.getItem('refresh')    
//     const user:User = jwtDecode(access_token ? access_token : '')
//     const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;

//     if (!isExpired)
//         return Promise.resolve(config);
//     else{
//         apiClientBase.post('/token/refresh/',  {
//             refresh:refresh_token
//         }).then(res =>{ 
//             console.log(res.data)
//             localStorage.setItem('access', res.data.access)
//             localStorage.setItem('refresh', res.data.refresh)
//             config.headers.Authorization = `Bearer ${res.data.access}`
//         }
//         )

//     }
    
//     return Promise.resolve(config)
    
// }

// const onRequestError = (error: AxiosError): Promise<AxiosError> => {
//     console.error(`[request error] [${JSON.stringify(error)}]`);
//     return Promise.reject(error);
// }

// axiosInstance.interceptors.request.use(onRequest, onRequestError)

export default axiosInstance


