import { Dispatch, SetStateAction } from "react"

export const onChangeInvoiceNo = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsInvoiceNoFilter:Dispatch<SetStateAction<string>>, setStockItemsInvoiceNoFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsInvoiceNoFilter(e.currentTarget.value)
    setStockItemsInvoiceNoFilter(e.currentTarget.value)
}

export const onChangeItemId = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsItemIdFilter:Dispatch<SetStateAction<string>>, setStockItemsItemIdFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsItemIdFilter(e.currentTarget.value)
    setStockItemsItemIdFilter(e.currentTarget.value)
}

export const onChangeBrand = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsBrandFilter:Dispatch<SetStateAction<string>>, setStockItemsBrandFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsBrandFilter(e.currentTarget.value)
    setStockItemsBrandFilter(e.currentTarget.value)
}

export const onChangeSize = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsSizeFilter:Dispatch<SetStateAction<string>>, setStockItemsSizeFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsSizeFilter(e.currentTarget.value)
    setStockItemsSizeFilter(e.currentTarget.value)
}


export const onChangeStartDate = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsStartDateFilter:Dispatch<SetStateAction<string>>, setStockItemsStartDateFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsStartDateFilter(e.currentTarget.value)
    setStockItemsStartDateFilter(e.currentTarget.value)
}

export const onChangeEndDate = (e:React.ChangeEvent<HTMLInputElement>, setPageStockItemsEndDateFilter:Dispatch<SetStateAction<string>>, setStockItemsEndDateFilter:Dispatch<SetStateAction<string>>)=>{
    setPageStockItemsEndDateFilter(e.currentTarget.value)
    setStockItemsEndDateFilter(e.currentTarget.value)    
}