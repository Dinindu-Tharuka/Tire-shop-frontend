import { Dispatch, SetStateAction } from "react";
import { Item } from "../services/Inventory/item-service";
import React from "react";


interface ItemContextType{
    items:Item[];
    setItems: Dispatch<SetStateAction<Item[]>>;
    nextItemPageUrl:string|null;
    previousItemPageUrl:string|null;
    filterItemPageParams:string | null
    setFilterItemPageParams:Dispatch<SetStateAction<string | null>>;
}

const ItemContext = React.createContext<ItemContextType>({} as ItemContextType)

export default ItemContext;