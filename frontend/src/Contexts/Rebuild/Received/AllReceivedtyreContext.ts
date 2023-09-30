import { Dispatch, SetStateAction } from "react"
import React from "react";
import { ReceivedTyre } from "../../../services/Rebuild/Received/received-tyre-service";

interface AllReceivedTyreContextType{
    allReceivedTyres:ReceivedTyre[];
    setAllReceivedTyres:Dispatch<SetStateAction<ReceivedTyre[]>>;
    allReceivedTyresFetchError:string;
    setAllReceivedTyresFetchError:Dispatch<SetStateAction<string>>;
}

const AllReceivedTyresContext = React.createContext<AllReceivedTyreContextType>({} as AllReceivedTyreContextType)

export default AllReceivedTyresContext;