import React, { Dispatch, SetStateAction } from "react";

export const onChangRebuildId = (e : React.ChangeEvent<HTMLInputElement>, setPageReportsRebuildIdFilter:Dispatch<SetStateAction<string>>)=>{
    console.log(e.currentTarget.value)
    setPageReportsRebuildIdFilter(e.currentTarget.value)

}