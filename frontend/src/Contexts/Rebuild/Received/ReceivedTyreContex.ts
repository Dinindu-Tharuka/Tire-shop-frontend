import { Dispatch, SetStateAction } from "react"
import React from "react";
import { ReceivedTyre } from "../../../services/Rebuild/Received/received-tyre-service";

interface TyreReceivedContextType{
    receivedTyres:ReceivedTyre[];
    setReceivedTyres:Dispatch<SetStateAction<ReceivedTyre[]>>;
    errorFetchReceivedTyres:string;
    setErrorFetchReceivedTyres:Dispatch<SetStateAction<string>>;
    nextReceivedTyresUrl:string | null;
    previousReceivedTyresUrl:string | null;
    filterReceivedTyreParams:string | null;
    setFilterReceivedTyreParams:Dispatch<SetStateAction<string | null>>;
    isLoadingReceivedTyre:boolean;
    receivedTyreCount:number;
    setReceivedTyreNameFilter:Dispatch<SetStateAction<string>>;
}

const ReceivedTyreContext = React.createContext<TyreReceivedContextType>({} as TyreReceivedContextType)

export default ReceivedTyreContext;