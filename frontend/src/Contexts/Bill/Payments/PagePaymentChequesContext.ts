import { Dispatch, SetStateAction } from "react"
import React from "react";
import { PaymentCheque } from "../../../services/Billing/bill-page-service";

', , , , : , , , : , , , , '

interface PagePaymentChequeContextType{
    pagePaymentCheques:PaymentCheque[];
    setPagePaymentCheques:Dispatch<SetStateAction<PaymentCheque[]>>;
    nextpagePaymentChequesUrl:string|null;
    previousPagePaymentChequesUrl:string|null;
    pagePaymentChequesFetchError:string;
    setPagePaymentChequesFetchError:Dispatch<SetStateAction<string>>;
    setFilterPagePaymentChequesParams:Dispatch<SetStateAction<string | null>>;
    filterBillPageParams:string | null;
    isLoadingPagePaymentCheques:boolean;
    pagePaymentChequesCount:number;
    setPAgePaymentChequesBillStartDateFilter: Dispatch<SetStateAction<string>>;
    setPagePaymentChequesEndDateFilter:Dispatch<SetStateAction<string>>;
   
}

const PagePaymentChequeContext = React.createContext<PagePaymentChequeContextType>({} as PagePaymentChequeContextType)

export default PagePaymentChequeContext;