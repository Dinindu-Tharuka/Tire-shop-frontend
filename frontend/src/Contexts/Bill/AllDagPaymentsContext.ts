import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Bill, DagPayment } from "../../services/Billing/bill-page-service";

interface AllDagPaymentsContextType{
    allDagPayments:DagPayment[];
    setAllDagPayments:Dispatch<SetStateAction<DagPayment[]>>;    
    isLoadingallDagPayments:boolean; 
    allDagPaymentsFetchError:string
    
}

const AllDagPaymentsContext = React.createContext<AllDagPaymentsContextType>({} as AllDagPaymentsContextType)

export default AllDagPaymentsContext;