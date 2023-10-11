import React, { Dispatch, SetStateAction } from "react";

export const onChangRebuildId = (e : React.ChangeEvent<HTMLInputElement>, setPageReportsRebuildIdFilter:Dispatch<SetStateAction<string>>, setReportsRebuildIdFilter:Dispatch<SetStateAction<string>>)=>{
    setPageReportsRebuildIdFilter(e.currentTarget.value)
    setReportsRebuildIdFilter(e.currentTarget.value)
    
}

export const onChangeJobId = (e : React.ChangeEvent<HTMLInputElement>, setPageReportsJobNoFilter:Dispatch<SetStateAction<string>>, setReportsJobNoFilter:Dispatch<SetStateAction<string>>)=>{
    setPageReportsJobNoFilter(e.currentTarget.value)
    setReportsJobNoFilter(e.currentTarget.value)
}

