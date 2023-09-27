import { Dispatch, SetStateAction } from "react"
import React from "react";
import { SendSupplierTyre } from "../../services/Rebuild/send-tyre-service";

interface AllSendSupplierTyreContextType{
    allSendSupplierTyres:SendSupplierTyre[];
    setAllSendSupplierTyres:Dispatch<SetStateAction<SendSupplierTyre[]>>;
    allSendTyresSupplierFetchError:string;
    setAllSendSupplierTyresFetchError:Dispatch<SetStateAction<string>>;
}

const AllSendSupplierTyresContext = React.createContext<AllSendSupplierTyreContextType>({} as AllSendSupplierTyreContextType)

export default AllSendSupplierTyresContext;