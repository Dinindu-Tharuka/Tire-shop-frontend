import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Customer } from "../../services/Customer/customer-service";

interface CustomerContextType{
    categories:Customer[];
    setCategories:Dispatch<SetStateAction<Customer[]>>
}

const ItemCategoryContext = React.createContext<CustomerContextType>({} as CustomerContextType)

export default ItemCategoryContext;