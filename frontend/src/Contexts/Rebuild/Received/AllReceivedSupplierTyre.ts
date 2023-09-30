import { Dispatch, SetStateAction } from "react"
import React from "react";
import { ReceivedSupplierTyre } from "../../../services/Rebuild/Received/received-tyre-service";
interface AllReceivedSupplierTyreContextType{
    allReceivedSupplierTyres:ReceivedSupplierTyre[];
    setAllReceivedSupplierTyres:Dispatch<SetStateAction<ReceivedSupplierTyre[]>>;
    allReceivedSupplierTyresFetchError:string;
    setAllReceivedSupplierTyresFetchError:Dispatch<SetStateAction<string>>;
}

const AllReceivedSupplierTyresContext = React.createContext<AllReceivedSupplierTyreContextType>({} as AllReceivedSupplierTyreContextType)

export default AllReceivedSupplierTyresContext;