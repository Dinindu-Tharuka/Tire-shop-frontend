import { Dispatch, SetStateAction } from "react";
import { Item } from "../../services/Inventory/item-page-service";
import React from "react";


interface ItemContextType{
    items:Item[];
    setItems: Dispatch<SetStateAction<Item[]>>;
    nextItemPageUrl:string|null;
    previousItemPageUrl:string|null;
    filterItemPageParams:string | null
    setFilterItemPageParams:Dispatch<SetStateAction<string | null>>;
    isLoadingItems:boolean,
    setError:Dispatch<SetStateAction<string>>;
    error:string;
    itemCount:number;
}

const ItemContext = React.createContext<ItemContextType>({} as ItemContextType)

export default ItemContext;