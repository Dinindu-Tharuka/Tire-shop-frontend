import { LoginForm } from "../Authentication/Login";
import apiClientBase from "./api-client-base"

class HttpServiceToken{
    endpoint:string
    constructor(endpoint:string){
        this.endpoint = endpoint

    }

    getTokens<T>( form : LoginForm){
        return apiClientBase.post<T>(`${this.endpoint}`, form)
    }
}

const createTokens = (endpoint:string) => new HttpServiceToken(endpoint)

export default createTokens