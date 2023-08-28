import create from "../http-service";

export interface StockItem{
    id:number;
    item:number;
    retail_price:number;
    date:string;
    stock_item_invoice:string;
    cost:number;
    selling_price:number;
    discount:number;
    qty:number;
    sold_qty:number;
}

export default create('/stock-item-list/')