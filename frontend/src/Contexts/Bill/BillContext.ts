import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Bill } from "../../services/Billing/bill-service";

interface BillContextType{
    bills:Bill[];
    setBills:Dispatch<SetStateAction<Bill[]>>;
    nextBillPageUrl:string|null;
    previousBillPageUrl:string|null;
    setFilterBillPageParams:Dispatch<SetStateAction<string | null>>;
    filterBillPageParams:string | null
}

const BillContext = React.createContext<BillContextType>({} as BillContextType)

export default BillContext;