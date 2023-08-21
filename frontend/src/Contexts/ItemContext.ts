import { Dispatch, SetStateAction } from "react";
import { Item } from "../services/Inventory/item-service";
import React from "react";


interface ItemContextType{
    items:Item[];
    setItems: Dispatch<SetStateAction<Item[]>>
}

const ItemContext = React.createContext<ItemContextType>({} as ItemContextType)

export default ItemContext;