import createPagination from "../http-pagination-service";

export interface StockInvoice{
    invoice_no:string;
    date:string;
    total_amount:number;   
    total_discount:number;   
    supplier:number;
}

export interface StockInvoicePageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:StockInvoice[]
}

export default createPagination('/stock-items-invoices/')