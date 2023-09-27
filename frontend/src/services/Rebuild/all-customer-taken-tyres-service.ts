import create from "../http-service";

export interface CustomerTakenTyre{
    rebuild_id:string;
    tyre_taken:number;
    tyre_no:string;
    size:string;
    brand:string;
}


export default create('/customer-taken-tyres-list/')