import { Dispatch, SetStateAction } from "react";
import { Category } from "../services/Inventory/category-service";
import React from "react";

interface ItemCategoryContextType{
    categories:Category[];
    setCategories:Dispatch<SetStateAction<Category[]>>
}

const ItemCategoryContext = React.createContext<ItemCategoryContextType>({} as ItemCategoryContextType)

export default ItemCategoryContext;