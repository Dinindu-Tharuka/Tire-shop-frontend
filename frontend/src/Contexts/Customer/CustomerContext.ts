import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Customer } from "../../services/Customer/customer-service";

interface CustomerContextType{
    customers:Customer[];
    setCustomers:Dispatch<SetStateAction<Customer[]>>;
    nextUrl:string|null;
    previousUrl:string|null;
    setFilterParams:Dispatch<SetStateAction<string | null>>;
    filterParams:string | null;
    errorCustomerFetch:string;
    setErrorCustomerFetch:Dispatch<SetStateAction<string>>;
    isLoadingCustomer:boolean;
    customerCount:number;
    setCustomerNameFilter:Dispatch<SetStateAction<string>>;
}

const CustomerContext = React.createContext<CustomerContextType>({} as CustomerContextType)

export default CustomerContext;