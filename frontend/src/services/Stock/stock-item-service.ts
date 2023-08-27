
import create from "../http-service";

export interface StockItem{
    invoice_no:string;
    date:string;
    total_amount:number;   
    total_discount:number;   
    supplier:number;
}



export default create('/stock-items-invoices/')