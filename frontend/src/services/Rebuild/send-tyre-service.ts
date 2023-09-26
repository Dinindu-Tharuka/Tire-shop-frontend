import createPagination from "../http-pagination-service";

export interface SendSupplierTyre{
    id:number;
    job_no:string;
    customer_taken_tyre:string;
    status:string;
}

export interface SendTyre{
    order_no:string;
    supplier:number;
    taken_date:string;
    send_tyres:SendSupplierTyre[]
}

export interface SendTakenPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:SendTyre[]
}


export default createPagination('/send-tyres-list/')