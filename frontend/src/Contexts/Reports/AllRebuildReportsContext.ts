import { Dispatch, SetStateAction } from "react";
import React from "react";
import { RebuildReport } from "../../services/Reports/rebuild-report-service";

interface AllRebuildReportsContextType{
    allRebuildReports:RebuildReport[];
    setAllRebuildReports:Dispatch<SetStateAction<RebuildReport[]>>;
    errorFetchRebuildAllReports:string;
    setErrorFetchRebuildAllReports:Dispatch<SetStateAction<string>>;
    isLoadingRebuildAllReportsPage:boolean;
    setRefetchRebuildAllReports:Dispatch<SetStateAction<string>>;
    setReportsRebuildIdFilter:Dispatch<SetStateAction<string>>;
    setReportsJobNoFilter:Dispatch<SetStateAction<string>>;
    setReportsCustomerFilter:Dispatch<SetStateAction<string>>;
    setReportVehicleFilter:Dispatch<SetStateAction<string>>;
    setReportStartDateFilter:Dispatch<SetStateAction<string>>; 
    setReportEndDateFilter :Dispatch<SetStateAction<string>>;
}

const AllRebuildReportsContext = React.createContext<AllRebuildReportsContextType>({} as AllRebuildReportsContextType)

export default AllRebuildReportsContext;