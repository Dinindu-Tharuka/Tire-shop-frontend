import { Dispatch, SetStateAction } from "react"
import React from "react";
import { SendTyre } from "../../services/Rebuild/send-tyre-service";

interface SendTakenContextType{
    sendTyres:SendTyre[];
    setSendTyres:Dispatch<SetStateAction<SendTyre[]>>;
    errorFetchSendTyres:string;
    setErrorFetchSendTyres:Dispatch<SetStateAction<string>>;
    nextSendTyresUrl:string | null;
    previousSendTyresUrl:string | null;
    filterSendTyreParams:string | null;
    setFilterSendTyreParams:Dispatch<SetStateAction<string | null>>;
    isLoadingSendTyre:boolean;
    sendTyreCount:number;
    setSendTyreNameFilter:Dispatch<SetStateAction<string>>;
}

const SendTyreContext = React.createContext<SendTakenContextType>({} as SendTakenContextType)

export default SendTyreContext;