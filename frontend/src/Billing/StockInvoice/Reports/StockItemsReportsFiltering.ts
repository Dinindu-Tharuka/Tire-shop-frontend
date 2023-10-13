import { Dispatch, SetStateAction } from "react"

export const onChangeInvoiceNo = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsInvoiceNoFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsInvoiceNoFilter(e.currentTarget.value)
}

export const onChangeItemId = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsItemIdFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsItemIdFilter(e.currentTarget.value)
}

export const onChangeBrand = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsBrandFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsBrandFilter(e.currentTarget.value)
}

export const onChangeSize = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsSizeFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsSizeFilter(e.currentTarget.value)
}


export const onChangeStartDate = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsStartDateFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsStartDateFilter(e.currentTarget.value)
}

export const onChangeEndDate = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsEndDateFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsEndDateFilter(e.currentTarget.value)
}