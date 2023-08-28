import createPagination from "../http-pagination-service";

export interface StockItem{
    id:number;
    item:number;
    retail_price:number;
    date:string;
    stock_item_invoice:number;
    cost:number;
    selling_price:number;
    discount:number;
    qty:number;
    sold_qty:number;
}

export interface StockInvoice{
    invoice_no:string;
    date:string;
    total_amount:number;   
    total_discount:number;   
    supplier:number;
    stockitems:StockItem[]
}

export interface StockInvoicePageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:StockInvoice[]
}

export default createPagination('/stock-items-invoices/')