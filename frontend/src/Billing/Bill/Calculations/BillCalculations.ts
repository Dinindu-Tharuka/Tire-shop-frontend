import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Bill } from "../../../services/Billing/bill-page-service";
import { Service } from "../../../services/Registration/services-service";
import { StockItemUnique } from "../../../services/Stock/stock-item-unique-service";
import { StockItem } from "../../../services/Stock/stock-item-service";

let currentPrice = 0
let discountList:number[] = []
let qtyList:number[] = []
let seletedStockItemUnique : StockItemUnique | undefined;
export const onchangeBillStockItemUnique = (
    e:React.ChangeEvent<HTMLSelectElement>, 
    setValue:UseFormSetValue<Bill>,
    stockItemsUnique:StockItemUnique[],
    stockItems:StockItem[],
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

const calculateCustomerDiscount = (selectedStockItemUnique:StockItemUnique, stockItems:StockItem[], watch:UseFormWatch<Bill>, index:number, currentQtyValue:number)=>{
    
    
    let qtyValue = currentQtyValue
    let discount = 0
   
    stockItems.filter(itemFilter => itemFilter.qty !== 0 && selectedStockItemUnique.item === itemFilter.item).forEach((item, index)=>{
        const customerUnitDiscount = (((item.retail_price/item.qty)*item.customer_discount)/100)
        discountList[index] = customerUnitDiscount
        qtyList[index] = item.qty    
        
    })

    qtyList.forEach((qty, index) => {
        
        if (qty >= currentQtyValue){            
            discount = discount + currentQtyValue * discountList[index]
        }
        else{
            discount = discount + qty * discountList[index]
            qtyValue = qtyValue - qty
        }
    })

    
    

    return Math.round(discount*100)/100
}

export const onChangeBillQty = (
    e:React.ChangeEvent<HTMLInputElement>, 
    setValue:UseFormSetValue<Bill>,
    watch:UseFormWatch<Bill>,
    index:number,
    stockItems:StockItem[],

)=>{
    
    const qty = parseInt(e.currentTarget.value)
    if (seletedStockItemUnique !== undefined){
        const discount = calculateCustomerDiscount(seletedStockItemUnique, stockItems, watch, index, qty)
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