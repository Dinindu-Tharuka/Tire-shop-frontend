import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";

interface StockInvoicePageContextType{
    stockInvoices:StockInvoice[];
    setStockInvoices:Dispatch<SetStateAction<StockInvoice[]>>;
    nextStockInvoiceUrl:string|null;
    previousStockInvoiceUrl:string|null;
    filterStockInvoiceParams:string | null
    setFilterStockInvoiceParams:Dispatch<SetStateAction<string | null>>;
    isLoadingInvoices:boolean;
    invoicesCount:number;
    errorFetchStockInvoice:string;
    setErrorFetchStockInvoice:Dispatch<SetStateAction<string>>;
    setInvoiceIdFilter:Dispatch<SetStateAction<string>>;
    setInvoiceBillIdFilter:Dispatch<SetStateAction<string>>;
}

const StockInvoicePageContext = React.createContext<StockInvoicePageContextType>({} as StockInvoicePageContextType)

export default StockInvoicePageContext;