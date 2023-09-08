import { Dispatch, SetStateAction } from "react"
import React from "react";
import { BillPayment } from "../../services/Billing/bill-service";

interface BillPaymentsContextType{
    billPayments:BillPayment[];
    setBillPayments:Dispatch<SetStateAction<BillPayment[]>>;   
    billPaymentFetchError:string;
    setBillPaymentFetchError:Dispatch<SetStateAction<string>>
    isLoadingBillPayments:boolean;
    
}

const BillPaymentContext = React.createContext<BillPaymentsContextType>({} as BillPaymentsContextType)

export default BillPaymentContext;