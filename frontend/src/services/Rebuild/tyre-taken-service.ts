import createPagination from "../http-pagination-service";

export interface CustomerTakenTyre{
    rebuild_id:string;
    tyre_taken:string;
    tyre_no:string;
    size:string;
    brand:string;
}

export interface TyreTaken{
    id:number;
    customer:number;
    vehicle:number;
    customer_tyres:CustomerTakenTyre[];
}

export interface TyreTakenPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:TyreTaken[]
}


export default createPagination('/taken-tyres-list/')