import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockItemUnique } from "../../services/Stock/stock-item-unique-service";


interface StockItemuniqueContextType{
    stockItemsUnique:StockItemUnique[];
    setStockItemsUnique:Dispatch<SetStateAction<StockItemUnique[]>>;    
}

const StockItemUniqueContext = React.createContext<StockItemuniqueContextType>({} as StockItemuniqueContextType)

export default StockItemUniqueContext;