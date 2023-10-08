import createPagination from "../http-pagination-service";

export interface RebuildReport{
    rebuild_id:string;
    customer: number;
    vehicle: number;
    taken_date: string; 
    tyre_no : string; 
    size : string;  
    brand : string; 
    supplier : number;  
    send_date: string; 
    order_no : string; 
    job_no : string; 
    status : string;  
    invoice_date : string; 
    cost : number;
    received_date: string;
}

export interface RebuildReportPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:RebuildReport[]
}

export default createPagination('/rebuild-page-reports/')