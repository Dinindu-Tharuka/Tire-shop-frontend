import { Dispatch, SetStateAction } from "react"
import React from "react";
import { PaymentCheque } from "../../../services/Billing/bill-page-service";


interface AllPaymentChequeContextType{
    allPaymentCheques:PaymentCheque[];
    setAllPaymentCheques:Dispatch<SetStateAction<PaymentCheque[]>>; 
    allPaymentChequesFetchError:string;   
    setAllPaymentChequesFetchError:Dispatch<SetStateAction<string>>;
    isLoadingAllPaymentCheques:boolean;     
    allBillFetchError:string;
    setPaymentChequesBillStartDateFilter:Dispatch<SetStateAction<string>>;
    setAllPaymentChequesEndDateFilter:Dispatch<SetStateAction<string>>;
    
}

const AllPaymentChequeContext = React.createContext<AllPaymentChequeContextType>({} as AllPaymentChequeContextType)

export default AllPaymentChequeContext;