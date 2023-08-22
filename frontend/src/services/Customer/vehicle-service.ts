import create from "../http-service";

export interface Vehicle{
    vehical_no:string;
    type:string;
    madal:string;
    brand:string;
    customer:number;
}

export default create('/vehicles/')