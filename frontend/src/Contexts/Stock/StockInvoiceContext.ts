import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";

interface StockInvoiceContextType{
    stockInvoices:StockInvoice[];
    setStockInvoices:Dispatch<SetStateAction<StockInvoice[]>>;
    isLoadingInvoices:boolean;
    errorFetchStockInvoice:string;
    setErrorFetchStockInvoice:Dispatch<SetStateAction<string>>;
}

const StockInvoiceContext = React.createContext<StockInvoiceContextType>({} as StockInvoiceContextType)

export default StockInvoiceContext;