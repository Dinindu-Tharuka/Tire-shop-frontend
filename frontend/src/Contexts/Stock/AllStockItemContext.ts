import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockItemDefault } from "../../services/Stock/stock-item-service";

interface AllStockItemsContextType{
    stockItems:StockItemDefault[];
    setStockItems:Dispatch<SetStateAction<StockItemDefault[]>>;
    errorFetchStockItems:string;
    setErrorFetchStockItems:Dispatch<SetStateAction<string>>;    
}

const AllStockItemsContext = React.createContext<AllStockItemsContextType>({} as AllStockItemsContextType)

export default AllStockItemsContext;