import createPagination from "../http-pagination-service";
import { StockItem } from "./stock-item-service";

export interface StockItemsPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:StockItem[]
}


export default createPagination('/stock-item-page-list/')