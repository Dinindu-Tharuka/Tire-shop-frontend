import apiClient from "./api-client";
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
  
class ItemService{
    getAllItems(){
        const controller = new AbortController();
        const request =apiClient
                        .get<Item[]>('/items/', {signal:controller.signal})

        return {request, cancel:()=>controller.abort()}
    }
}

export default new ItemService;

