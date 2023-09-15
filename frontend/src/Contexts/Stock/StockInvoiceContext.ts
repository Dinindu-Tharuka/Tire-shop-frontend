import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";

interface StockInvoiceContextType{
    stockAllInvoices:StockInvoice[];
    setStockAllInvoices:Dispatch<SetStateAction<StockInvoice[]>>;
    isLoadingAllInvoices:boolean;
    errorFetchStockAllInvoice:string;
    setErrorFetchAllStockInvoice:Dispatch<SetStateAction<string>>;
}

const StockInvoiceContext = React.createContext<StockInvoiceContextType>({} as StockInvoiceContextType)

export default StockInvoiceContext;