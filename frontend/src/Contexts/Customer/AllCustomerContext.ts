import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Customer } from "../../services/Customer/customer-service";

interface AllCustomerContextType{
    allCustomers:Customer[];
    setAllCustomers:Dispatch<SetStateAction<Customer[]>>;
    errorAllCustomerFetch:string;
    setErrorAllCustomerFetch:Dispatch<SetStateAction<string>>;
    setAllCustomerNameFilter:Dispatch<SetStateAction<string>>;
}

const AllCustomerContext = React.createContext<AllCustomerContextType>({} as AllCustomerContextType)

export default AllCustomerContext;