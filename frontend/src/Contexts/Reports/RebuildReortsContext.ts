import { Dispatch, SetStateAction } from "react";
import React from "react";
import { RebuildReport } from "../../services/Reports/rebuild-report-service";

interface RebuildReportsPageContextType{
    rebuildPageReports:RebuildReport[];
    setRebuildPageReports:Dispatch<SetStateAction<RebuildReport[]>>;
    errorFetchRebuildPageReports:string;
    setErrorFetchRebuildPageReports:Dispatch<SetStateAction<string>>;
    nextRebuildPageReportsUrl:string|null;
    previousRebuildPageReportsUrl:string|null;
    setFilterRebuildPageReportsParams:Dispatch<SetStateAction<string | null>>;
    rebuildPageReportsCount:number;
    isLoadingRebuildPageReportsPage:boolean;
    setReFetchPageReports:Dispatch<SetStateAction<string>>;
    // filter
    setPageReportsRebuildIdFilter:Dispatch<SetStateAction<string>>;
    setPageReportsJobNoFilter:Dispatch<SetStateAction<string>>;
    setPageReportsCustomerFilter:Dispatch<SetStateAction<string>>;
    setPageReportVehicleFilter:Dispatch<SetStateAction<string>>;
    setPageReportStartDateFilter:Dispatch<SetStateAction<string>>; 
    setPageReportEndDateFilter:Dispatch<SetStateAction<string>>;
}

const RebuildReportsPageContext = React.createContext<RebuildReportsPageContextType>({} as RebuildReportsPageContextType)

export default RebuildReportsPageContext;