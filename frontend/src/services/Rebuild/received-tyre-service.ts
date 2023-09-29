import createPagination from "../http-pagination-service";

export interface ReceivedSupplierTyre{
    id:number;
    cost:number;
    status:string;
    send_supplier_tyre:string;
}

export interface ReceivedTyre{
    invoice_no:string;
    date:string;
    received_tyres:ReceivedSupplierTyre[]
}

export interface ReceivedtyrePageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:ReceivedTyre[]
}


export default createPagination('/received-tyres-list/')