import createPagination from "../../http-pagination-service";
import { PaymentCheque } from "../bill-page-service";

export interface PaymentChequePapeStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:PaymentCheque[];
}


export default createPagination('payments-page-cheque')