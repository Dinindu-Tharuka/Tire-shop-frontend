import { Dispatch, SetStateAction } from "react"
import React from "react";
import { CustomerTakenTyre } from "../../services/Rebuild/tyre-taken-service";

interface CustomerTakenContextType{
    customerTyresTaken:CustomerTakenTyre[];
    setCustomerTyresTaken:Dispatch<SetStateAction<CustomerTakenTyre[]>>;
    customerTyresTakenFetchError:string;
    setCustomerTyresTakenFetchError:Dispatch<SetStateAction<string>>;
}

const AllCustomerTakenTyresContext = React.createContext<CustomerTakenContextType>({} as CustomerTakenContextType)

export default AllCustomerTakenTyresContext;

