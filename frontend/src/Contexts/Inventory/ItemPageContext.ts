import { Dispatch, SetStateAction } from "react";
import { Item } from "../../services/Inventory/item-page-service";
import React from "react";


interface ItemPAgeContextType{
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
    setItemQuery:Dispatch<SetStateAction<string>>;
    setItemSizeQuery:Dispatch<SetStateAction<string>>;
    setItemBrandQuery:Dispatch<SetStateAction<string>>
}

const ItemPageContext = React.createContext<ItemPAgeContextType>({} as ItemPAgeContextType)

export default ItemPageContext;