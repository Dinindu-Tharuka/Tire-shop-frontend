import createPagination from "../http-pagination-service";
import create from "../http-service";

export interface Supplier{
    id:number;
    name:string;
    address:string;
    telephone:string;
    mobile:string;
    email:string;
}

export interface SupplierPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:Supplier[]
  }

export default createPagination('/suppliers/')