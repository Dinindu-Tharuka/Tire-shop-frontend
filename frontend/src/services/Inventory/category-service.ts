import create from "../http-service";
export interface Category{
    id:number;
    category_name:string;
    description:string;
  }
  
export default create('/item-categories/');