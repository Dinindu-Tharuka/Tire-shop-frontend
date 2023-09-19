import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Bill } from "../../../services/Billing/bill-page-service";
import { StockItem } from "../../../services/Stock/stock-item-service";
import { Service } from "../../../services/Registration/services-service";

let qtyItmes = 0
let currentPrice = 0
export const onchangeBillStockItem = (
    e:React.ChangeEvent<HTMLSelectElement>, 
    setValue:UseFormSetValue<Bill>,
    stockItems:StockItem[],
    index:number
    )=>{
    
    const seletedStockItemIndex = parseInt(e.currentTarget.value)

    console.log(e.currentTarget.value);

    const seletedStockItem = stockItems.find(item => item.id === seletedStockItemIndex)
    console.log(seletedStockItem);
    if (seletedStockItem !== undefined){
        const qty = seletedStockItem?.qty
        qtyItmes = qty
        const customerPrice = seletedStockItem?.customer_price
        currentPrice = customerPrice
        const customerDiscount = seletedStockItem?.customer_discount
        setValue(`bill_items.${index}.qty`, qty)
        setValue(`bill_items.${index}.customer_discount`, customerDiscount)
        setValue(`bill_items.${index}.customer_price`, customerPrice)

    }
    

}

export const onChangeBillQty = (
    e:React.ChangeEvent<HTMLInputElement>, 
    setValue:UseFormSetValue<Bill>,
    watch:UseFormWatch<Bill>,
    index:number

)=>{
    console.log('currentqty', qtyItmes);
    
    const qty = parseInt(e.currentTarget.value)
    if(qtyItmes){
        setValue(`bill_items.${index}.customer_price`, parseFloat(((currentPrice/qtyItmes)*qty).toFixed(2)))
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
    console.log(subTotalVal);
    

    console.log(customItemVlaue);
    setValue('sub_total', subTotalVal-customItemVlaue)
    
    

}