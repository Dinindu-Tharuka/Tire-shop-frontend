import { Dispatch, SetStateAction } from "react"
import React from "react";
import { TyreTaken } from "../../services/Rebuild/tyre-taken-service";

interface TyreTakenContextType{
    takenTyres:TyreTaken[];
    setTakenTyres:Dispatch<SetStateAction<TyreTaken[]>>;
    errorFetchTakenTyres:string;
    setErrorFetchTakenTyres:Dispatch<SetStateAction<string>>;
    nextTakenTyresUrl:string | null;
    previousTakenTyresUrl:string | null;
    filterTakenTyreParams:string | null;
    setFilterTakenTyreParams:Dispatch<SetStateAction<string | null>>;
    isLoadingTakenTyre:boolean;
    takenTyreCount:number;
    setTakenTyreNameFilter:Dispatch<SetStateAction<string>>;
}

const TakenTyreContext = React.createContext<TyreTakenContextType>({} as TyreTakenContextType)

export default TakenTyreContext;