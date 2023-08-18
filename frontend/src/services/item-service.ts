import { FieldValues } from "react-hook-form";
import apiClient from "./api-client";
import create from "./http-service";
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
  


export default create('/items/');

