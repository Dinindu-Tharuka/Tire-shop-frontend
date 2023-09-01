import createTokens from "../http-service-token";

export interface Token{
    refresh:string;
    access:string;
}


export default createTokens('/token/')