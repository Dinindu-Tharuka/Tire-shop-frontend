import create from "../http-service";

export interface StockItem{
    id:number;
    item:string;
    retail_price:number;
    date:string;
    stock_item_invoice:string;
    cost:number;
    selling_price:number;
    supplier_discount:number;
    sales_discount:number;
    customer_discount:number;
    qty:number;
    sold_qty:number;
}

export default create('/stock-item-list/')