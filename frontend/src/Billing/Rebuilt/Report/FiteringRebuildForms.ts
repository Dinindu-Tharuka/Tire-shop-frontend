import React, { Dispatch, SetStateAction } from "react";

export const onChangRebuildId = (e : React.ChangeEvent<HTMLInputElement>, setPageReportsRebuildIdFilter:Dispatch<SetStateAction<string>>, setReportsRebuildIdFilter:Dispatch<SetStateAction<string>>)=>{
    setPageReportsRebuildIdFilter(e.currentTarget.value)
    setReportsRebuildIdFilter(e.currentTarget.value)
    
}

export const onChangeJobId = (e : React.ChangeEvent<HTMLInputElement>, setPageReportsJobNoFilter:Dispatch<SetStateAction<string>>, setReportsJobNoFilter:Dispatch<SetStateAction<string>>)=>{
    setPageReportsJobNoFilter(e.currentTarget.value)
    setReportsJobNoFilter(e.currentTarget.value)
}

export const onChangeStartDate = (e : React.ChangeEvent<HTMLInputElement>, setPageReportStartDateFilter:Dispatch<SetStateAction<string>>, setReportStartDateFilter:Dispatch<SetStateAction<string>>)=>{
    setPageReportStartDateFilter(e.currentTarget.value)
    setReportStartDateFilter(e.currentTarget.value)
}

export const onChangeEndDate = (e : React.ChangeEvent<HTMLInputElement>, setPageReportEndDateFilter:Dispatch<SetStateAction<string>>, setReportEndDateFilter:Dispatch<SetStateAction<string>>) =>{
    setPageReportEndDateFilter(e.currentTarget.value)
    setReportEndDateFilter(e.currentTarget.value)
}

