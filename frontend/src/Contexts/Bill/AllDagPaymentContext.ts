import { Dispatch, SetStateAction } from "react";
import { DagPayment } from "../../services/Billing/bill-page-service";
import React from "react";

interface AllDagPaymentContextType{
    allDagPayments:DagPayment[];
    setAllDagPayments:Dispatch<SetStateAction<DagPayment[]>>;    
    isLoadingallDagPayments:boolean; 
    allDagPaymentsFetchError:string
    
}

const AllDagPaymentContext = React.createContext<AllDagPaymentContextType>({} as AllDagPaymentContextType)

export default AllDagPaymentContext;