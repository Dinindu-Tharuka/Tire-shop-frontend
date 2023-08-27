import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockInvoice } from "../../services/Stock/stock-invoice-service";

interface StockInvoiceContextType{
    stockInvoices:StockInvoice[];
    setStockInvoices:Dispatch<SetStateAction<StockInvoice[]>>;
    nextStockInvoiceUrl:string|null;
    previousStockInvoiceUrl:string|null;
    filterStockInvoiceParams:string | null
    setFilterStockInvoiceParams:Dispatch<SetStateAction<string | null>>;
}

const StockInvoiceContext = React.createContext<StockInvoiceContextType>({} as StockInvoiceContextType)

export default StockInvoiceContext;