import { Dispatch, SetStateAction } from "react";
import React from "react";
import { RebuildReport } from "../../services/Reports/rebuild-report-service";

interface AllRebuildReportsContextType{
    allRebuildReports:RebuildReport[];
    setAllRebuildReports:Dispatch<SetStateAction<RebuildReport[]>>;
    errorFetchRebuildAllReports:string;
    setErrorFetchRebuildAllReports:Dispatch<SetStateAction<string>>;
    isLoadingRebuildAllReportsPage:boolean;
}

const AllRebuildReportsContext = React.createContext<AllRebuildReportsContextType>({} as AllRebuildReportsContextType)

export default AllRebuildReportsContext;