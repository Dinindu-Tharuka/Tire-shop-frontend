import createPagination from "../http-pagination-service";
import create from "../http-service";
export interface Item{
    item_id:string;
    name:string;
    size:string;
    brand:string;
    type:string;
    plyrating:string;
    country:string;
    vale_type:string;
    item_category:number;
    supplier:number;
  }

export interface ItemPageStructure{
  count:number;
  next:string | null;
  previous:string | null;
  results:Item[]
}
  


export default createPagination('/items/');

