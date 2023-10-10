import React, { Dispatch, SetStateAction } from "react";

export const onChangRebuildId = (e : React.ChangeEvent<HTMLInputElement>, setPageReportsRebuildIdFilter:Dispatch<SetStateAction<string>>)=>{
    setPageReportsRebuildIdFilter(e.currentTarget.value)
}

export const onChangeJobId = (e : React.ChangeEvent<HTMLInputElement>, setPageReportsJobNoFilter:Dispatch<SetStateAction<string>>)=>{
    setPageReportsJobNoFilter(e.currentTarget.value)
}