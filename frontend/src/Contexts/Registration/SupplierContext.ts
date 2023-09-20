import React, { Dispatch, SetStateAction } from "react";
import { Supplier } from "../../services/Registration/supplier-service";


interface SupplierContextType {
    suppliers:Supplier[];
    setSuppliers:Dispatch<SetStateAction<Supplier[]>>;
    nextSupplierUrl:string|null;
    previousSupplierUrl:string|null;
    filterSupplierParams:string | null;
    setFilterSupplierParams:Dispatch<SetStateAction<string | null>>;
    suppliersCount:number;
    isLoadingSupplierPage:boolean;
    errorFetchSupplier:string;
    setErrorFetchSupplier:Dispatch<SetStateAction<string>>;
    setSupplierNameFilter:Dispatch<SetStateAction<string>>;
}


const SupplierContext = React.createContext<SupplierContextType>({} as SupplierContextType)

export default SupplierContext;