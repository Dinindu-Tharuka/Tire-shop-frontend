import apiClient from "./api-client";


class HttpServicePagination{
    endpoint:string;

    constructor(endpoint:string){
        this.endpoint = endpoint
    }

    getAll<T>(filter:string | null){
        const controller = new AbortController();
        const request =apiClient
                        .get<T>(`${this.endpoint}${filter}`, {signal:controller.signal})

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