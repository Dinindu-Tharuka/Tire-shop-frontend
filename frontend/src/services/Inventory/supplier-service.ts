import create from "../http-service";

export interface Supplier{
    id:number;
    name:string;
    address:string;
    telephone:string;
    mobile:string;
    email:string;
}

export default create('/suppliers/')