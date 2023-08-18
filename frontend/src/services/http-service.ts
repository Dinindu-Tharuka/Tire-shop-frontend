import { FieldValues } from "react-hook-form";
import apiClient from "./api-client";

  
class HttpService{
    endpoint:string;

    constructor(endpoint:string){
        this.endpoint = endpoint
    }

    getAll<T>(){
        const controller = new AbortController();
        const request =apiClient
                        .get<T[]>(this.endpoint, {signal:controller.signal})

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
const create = (endpoint:string)=>new HttpService(endpoint)

export default create;