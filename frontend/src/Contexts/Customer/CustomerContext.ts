import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Customer } from "../../services/Customer/customer-service";

interface CustomerContextType{
    customers:Customer[];
    setCustomers:Dispatch<SetStateAction<Customer[]>>
}

const CustomerContext = React.createContext<CustomerContextType>({} as CustomerContextType)

export default CustomerContext;