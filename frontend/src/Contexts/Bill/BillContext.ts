import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Bill } from "../../services/Billing/bill-page-service";

interface BillPageContextType{
    bills:Bill[];
    setBills:Dispatch<SetStateAction<Bill[]>>;
    nextBillPageUrl:string|null;
    previousBillPageUrl:string|null;
    setFilterBillPageParams:Dispatch<SetStateAction<string | null>>;
    filterBillPageParams:string | null;
    billFetchError:string;
    isLoadingBills:boolean;
    billCount:number;
    setBillFetchError: Dispatch<SetStateAction<string>>;
    setBillIdFilter:Dispatch<SetStateAction<string>>;
    setBillFilterCustomer:Dispatch<SetStateAction<string>>;
    setBillVehicleFilter:Dispatch<SetStateAction<string>>
    setBillStartDateFilter:Dispatch<SetStateAction<string>>; 
    setBillEndDateFilter:Dispatch<SetStateAction<string>>
}

const BillPageContext = React.createContext<BillPageContextType>({} as BillPageContextType)

export default BillPageContext;