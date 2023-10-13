import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockItem, StockItemDefault } from "../../services/Stock/stock-item-service";

interface StockItemsPageContextType{
    pageStockItems:StockItemDefault[];
    setPageStockItems:Dispatch<SetStateAction<StockItemDefault[]>>;
    errorFetchPageStockItems:string;
    setErrorFetchPageStockItems:Dispatch<SetStateAction<string>>;
    nextPageStockItemsTyresUrl:string|null;
    previousPageStockItemsUrl:string|null;
    setFilterPageStockItemsParams:Dispatch<SetStateAction<string | null>>;
    isLoadingPageStockItems:boolean;
    pageStockItemsCount:number;
    setPageStockItemsInvoiceNoFilter:Dispatch<SetStateAction<string>>;
    setPageStockItemsItemIdFilter:Dispatch<SetStateAction<string>>;
    setPageStockItemsBrandFilter:Dispatch<SetStateAction<string>>;
    setPageStockItemsSizeFilter:Dispatch<SetStateAction<string>>;
    setPageStockItemsStartDateFilter:Dispatch<SetStateAction<string>>;
    setPageStockItemsEndDateFilter:Dispatch<SetStateAction<string>>;
}

const StockItemsPageContext = React.createContext<StockItemsPageContextType>({} as StockItemsPageContextType)

export default StockItemsPageContext;