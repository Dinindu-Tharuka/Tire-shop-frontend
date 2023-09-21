import { Dispatch, SetStateAction } from "react";
import { StockPayment } from "../../services/Stock/stock-payment-service";
import React from "react";


interface StockPaymentContextType{
    stockPayments:StockPayment[];
    setStockPayments:Dispatch<SetStateAction<StockPayment[]>>; 
    stockPaymentsFetchError:string;
    setStockPaymentsFetchError:Dispatch<SetStateAction<string>>;
}

const StockPaymentContext = React.createContext<StockPaymentContextType>({} as StockPaymentContextType)

export default StockPaymentContext