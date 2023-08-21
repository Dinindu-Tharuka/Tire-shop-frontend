import React, { Dispatch, SetStateAction } from "react";
import { Supplier } from "../services/Inventory/supplier-service";


interface SupplierContextType {
    suppliers:Supplier[];
    setSuppliers:Dispatch<SetStateAction<Supplier[]>>;
}


const SupplierContext = React.createContext<SupplierContextType>({} as SupplierContextType)

export default SupplierContext;