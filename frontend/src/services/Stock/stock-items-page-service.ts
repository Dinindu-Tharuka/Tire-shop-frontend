import createPagination from "../http-pagination-service";
import { StockItem, StockItemDefault } from "./stock-item-service";

export interface StockItemsPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:StockItemDefault[]
}


export default createPagination('/stock-item-page-list/')