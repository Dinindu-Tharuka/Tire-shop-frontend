
import createPagination from "../http-pagination-service";


export interface Customer{
    id:number;
    name:string;
    address:string;
    telephone:string;
    mobile:string;
    email:string;
}
export interface CustomerPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:Customer[]
}


export default createPagination('/customers/')