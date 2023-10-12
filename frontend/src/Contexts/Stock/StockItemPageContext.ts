import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockItem } from "../../services/Stock/stock-item-service";

interface StockItemsPageContextType{
    pageStockItems:StockItem[];
    setPageStockItems:Dispatch<SetStateAction<StockItem[]>>;
    errorFetchPageStockItems:string;
    setErrorFetchPageStockItems:Dispatch<SetStateAction<string>>;
    nextPageStockItemsTyresUrl:string|null;
    previousPageStockItemsUrl:string|null;
    setFilterPageStockItemsParams:Dispatch<SetStateAction<string | null>>;
    isLoadingPageStockItems:boolean;
    pageStockItemsCount:number;
}

const StockItemsPageContext = React.createContext<StockItemsPageContextType>({} as StockItemsPageContextType)

export default StockItemsPageContext;