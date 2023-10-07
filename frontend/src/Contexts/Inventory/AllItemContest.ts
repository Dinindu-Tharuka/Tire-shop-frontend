import { Dispatch, SetStateAction } from "react";
import { Item } from "../../services/Inventory/item-page-service";
import React from "react";


interface AllItemContextType{
    allItems:Item[];
    setAllItems: Dispatch<SetStateAction<Item[]>>;   
    setAllItemQuery:Dispatch<SetStateAction<string>>;
    setAllItemSizeQuery:Dispatch<SetStateAction<string>>;
    setAllItemBrandQuery:Dispatch<SetStateAction<string>>
}

export const AllItemContext = React.createContext<AllItemContextType>({} as AllItemContextType)