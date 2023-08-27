import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockItem } from "../../services/Stock/stock-item-service";

interface StockItemContextType{
    stockItems:StockItem[];
    setStockItems:Dispatch<SetStateAction<StockItem[]>>;    
}

const StockItemContext = React.createContext<StockItemContextType>({} as StockItemContextType)

export default StockItemContext;