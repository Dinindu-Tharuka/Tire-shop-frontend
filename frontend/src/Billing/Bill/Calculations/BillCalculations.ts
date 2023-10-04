import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Bill } from "../../../services/Billing/bill-page-service";
import { Service } from "../../../services/Registration/services-service";
import { StockItemUnique } from "../../../services/Stock/stock-item-unique-service";
import { StockItemDefault } from "../../../services/Stock/stock-item-service";
import { ReceiveTyreNew } from "../BillAddForm";


let currentPrice = 0
let discountList:number[] = []
let seletedStockItemUnique : StockItemUnique | undefined;
export const onchangeBillStockItemUnique = (
    e:React.ChangeEvent<HTMLSelectElement>, 
    setValue:UseFormSetValue<Bill>,
    stockItemsUnique:StockItemUnique[],
    stockItems:StockItemDefault[],
    index:number,
    watch:UseFormWatch<Bill>,
    )=>{
    
    const seletedStockItemIndex = parseInt(e.currentTarget.value)

    seletedStockItemUnique = stockItemsUnique.find(item => item.id === seletedStockItemIndex)
    
    if (seletedStockItemUnique !== undefined){
        const qty = seletedStockItemUnique?.total_qty
        const customerPrice = seletedStockItemUnique?.unit_price * qty
        currentPrice = customerPrice
        const customerDiscount = calculateCustomerDiscount(seletedStockItemUnique, stockItems, watch, index, qty)
        
        setValue(`bill_items.${index}.qty`, qty)
        setValue(`bill_items.${index}.customer_discount`, customerDiscount)
        setValue(`bill_items.${index}.customer_price`, customerPrice)

    }
}

const calculateCustomerDiscount = (selectedStockItemUnique:StockItemUnique, stockItems:StockItemDefault[], watch:UseFormWatch<Bill>, index:number, currentQtyValue:number)=>{
    
    let discount = 0
   
    stockItems.filter(itemFilter => itemFilter.qty !== 0 && selectedStockItemUnique.item === itemFilter.item && selectedStockItemUnique.id === itemFilter.stock_item_unique).forEach((item, index)=>{
        const customerUnitDiscount = (((item.retail_price/item.max_qty)*item.customer_discount)/100)
        discountList[index] = customerUnitDiscount        
    }) 
      
    
    discount = (discount + (currentQtyValue * discountList[index])) || 0  

    return Math.round(discount*100)/100
}

export const onChangeBillQty = (
    e:React.ChangeEvent<HTMLInputElement>, 
    setValue:UseFormSetValue<Bill>,
    watch:UseFormWatch<Bill>,
    index:number,
    stockItems:StockItemDefault[],

)=>{
    
    const qty = parseInt(e.currentTarget.value)
    if (seletedStockItemUnique !== undefined){
        const discount = calculateCustomerDiscount(seletedStockItemUnique, stockItems, watch, index, qty) && 0
        
        setValue(`bill_items.${index}.customer_discount`, discount)
        
        setValue(`bill_items.${index}.customer_price`, (seletedStockItemUnique?.unit_price * qty))
    }

}

export const onChangeService = (
    e:React.ChangeEvent<HTMLSelectElement>,
    setValue:UseFormSetValue<Bill>,
    index:number,
    services:Service[],
    setServices:React.Dispatch<React.SetStateAction<number[]>>,
    seletedServicesPrice:number[]
)=>{

    const seletedServiceId = parseInt(e.currentTarget.value)

    const seletedService = services.find(service => service.id === seletedServiceId)
    if (seletedService !== undefined){
        let services = [...seletedServicesPrice]
        services[index] = seletedService.service_value
        setServices([...services])}
    

}

export const onChangeBillCustomItemValue = (
    e:React.ChangeEvent<HTMLInputElement>, 
    setValue:UseFormSetValue<Bill>,
    subTotalVal:number,
)=>{
    const customItemVlaue = parseFloat(e.currentTarget.value)
    console.log(customItemVlaue);
    setValue('sub_total', subTotalVal-customItemVlaue)  
}

export const onChangeCustomerPrice = (
    e:React.ChangeEvent<HTMLInputElement>, 
    setValue:UseFormSetValue<Bill>,
    subTotalVal:number,
)=>{
    const value = parseInt(e.currentTarget.value)
    setValue('sub_total', (subTotalVal + value))
    
    

}

export const onChangeDagTyreChange = (
    e:React.ChangeEvent<HTMLSelectElement>, 
    setValue:UseFormSetValue<Bill>,
    subTotalVal:number,
    index:number,
    filteredSupplierTyres:ReceiveTyreNew[]
)=>{

    const cost = filteredSupplierTyres[e.currentTarget.selectedIndex] !== undefined ? filteredSupplierTyres[e.currentTarget.selectedIndex].cost: 0

    setValue(`dag_payments.${index}.cost`, cost)
    setValue(`dag_payments.${index}.customer_price`, cost)
    setValue('sub_total', (parseFloat(subTotalVal+'') + parseFloat(cost+'.00')))
}