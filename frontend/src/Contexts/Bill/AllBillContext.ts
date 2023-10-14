import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Bill } from "../../services/Billing/bill-page-service";


interface AllBillContextType{
    allBills:Bill[];
    setAllBills:Dispatch<SetStateAction<Bill[]>>;    
    isLoadingBills:boolean; 
    allBillFetchError:string;
    setAllBillIdFilter:Dispatch<SetStateAction<string>>;
    setAllBillFilterCustomer:Dispatch<SetStateAction<string>>; 
    setAllBillVehicleFilter:Dispatch<SetStateAction<string>> 
    setAllBillStartDateFilter:Dispatch<SetStateAction<string>>;
    setAllBillEndDateFilter:Dispatch<SetStateAction<string>>
    
}

const AllBillContext = React.createContext<AllBillContextType>({} as AllBillContextType)

export default AllBillContext;