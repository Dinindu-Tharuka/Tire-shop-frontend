import { AxiosRequestConfig } from "axios";
import axiosInstance from "./api-client";
import apiClient from "./api-client";


class HttpServicePagination{
    endpoint:string;

    constructor(endpoint:string){
        this.endpoint = endpoint
    }

    getAll<T>(filter:string | null, requestConfig?:AxiosRequestConfig){
        const controller = new AbortController();
        const request =axiosInstance
                        .get<T>(`${this.endpoint}${filter}`, {signal:controller.signal, ...requestConfig})
                        

        return {request, cancel:()=>controller.abort()}
    }

    delete(id:string){
        return apiClient.delete(`${this.endpoint}${id}/`)
    }

    create<T>(entity:T){
        return apiClient.post(this.endpoint, entity)

    }
    update<T>(entity:T, id:string){
        return apiClient.put(`${this.endpoint}${id}/`, entity)
    }
}
const createPagination = (endpoint:string)=>new HttpServicePagination(endpoint)

export default createPagination;