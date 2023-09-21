
import create from "../http-service";

export interface StockItemUnique{
    id:number;
    item:string;
    total_qty:number;
    unit_price:number;
}


export default create('/stock-item-unique-list/')