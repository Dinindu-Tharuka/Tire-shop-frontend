import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockItem, StockItemDefault } from "../../services/Stock/stock-item-service";


interface StockItemContextType{
    stockItems:StockItemDefault[];
    setStockItems:Dispatch<SetStateAction<StockItemDefault[]>>;    
}

const StockItemContext = React.createContext<StockItemContextType>({} as StockItemContextType)

export default StockItemContext;