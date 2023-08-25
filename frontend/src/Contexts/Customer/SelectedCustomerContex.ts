import React, { Dispatch, SetStateAction } from "react";
import { Customer } from "../../services/Customer/customer-service";


interface SelectedCustomerType{
    selectedCustomer:Customer;
    setSelectedCustomer:Dispatch<SetStateAction<Customer>>;
}

const SelectedCustomerContext = React.createContext<SelectedCustomerType>({} as SelectedCustomerType)

export default SelectedCustomerContext