import React, { Dispatch, SetStateAction } from "react";
import { Supplier } from "../../services/Registration/supplier-service";


interface SupplierContextType {
    allSuppliers:Supplier[];
    setAllSuppliers:Dispatch<SetStateAction<Supplier[]>>;
    errorFetchAllSupplier:string;
    setErrorFetchAllSupplier:Dispatch<SetStateAction<string>>;
    isLoadingAllSupplierPage:boolean;
}


const AllSupplierContext = React.createContext<SupplierContextType>({} as SupplierContextType)

export default AllSupplierContext;