import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Bill } from "../../services/Billing/bill-page-service";

interface AllBillContextType{
    bills:Bill[];
    setBills:Dispatch<SetStateAction<Bill[]>>;    
    isLoadingBills:boolean; 
    
}

const AllBillContext = React.createContext<AllBillContextType>({} as AllBillContextType)

export default AllBillContext;