import { Dispatch, SetStateAction } from "react"
import React from "react";
import { SendTyre } from "../../services/Rebuild/send-tyre-service";

interface AllSendTyreContextType{
    allSendTyres:SendTyre[];
    setAllSendTyres:Dispatch<SetStateAction<SendTyre[]>>;
    allSendTyresFetchError:string;
    setAllSendTyresFetchError:Dispatch<SetStateAction<string>>;
}

const AllSendTyresContext = React.createContext<AllSendTyreContextType>({} as AllSendTyreContextType)

export default AllSendTyresContext;