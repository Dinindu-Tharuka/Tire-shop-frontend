import createPagination from "../http-pagination-service";
import create from "../http-service";
export interface Category{
    id:number;
    category_name:string;
    description:string;
  }

export interface CategoryPageStructure{
  count:number;
  next:string | null;
  previous:string | null;
  results:Category[]
}
  
export default createPagination('/item-categories/');