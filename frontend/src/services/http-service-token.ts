import { LoginForm } from "../Authentication/Login";
import axiosInstance from "./api-client";


class HttpServiceToken{
    endpoint:string
    constructor(endpoint:string){
        this.endpoint = endpoint

    }
    

    getTokens<T>( form : LoginForm){
        return axiosInstance.post<T>(`${this.endpoint}`, form)
    }
}

const createTokens = (endpoint:string) => new HttpServiceToken(endpoint)

export default createTokens