import { Dispatch, SetStateAction } from "react";
import React from "react";
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";

interface AllStockInvoiceContextType{
    stockAllInvoices:StockInvoice[];
    setStockAllInvoices:Dispatch<SetStateAction<StockInvoice[]>>;
    isLoadingAllInvoices:boolean;
    errorFetchStockAllInvoice:string;
    setErrorFetchAllStockInvoice:Dispatch<SetStateAction<string>>;
    setFilterGrnNo:Dispatch<SetStateAction<string>>; 
    setFilterInvoiceNo:Dispatch<SetStateAction<string>>;
}

const AllStockInvoiceContext = React.createContext<AllStockInvoiceContextType>({} as AllStockInvoiceContextType)

export default AllStockInvoiceContext;