import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { StockInvoice } from "../../../services/Stock/stock-invoice-page-service";

//Cost

export const onchangeCostValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    watch:UseFormWatch<StockInvoice>,
    setValue:UseFormSetValue<StockInvoice>
  ) => {
    let cost = parseInt(e.currentTarget.value);
    const customerDiscount = watch(`stockitems.${index}.customer_discount`);
    if (customerDiscount) {
      cost = ((100 - customerDiscount) * cost) / 100;
    }

    setValue(`stockitems.${index}.selling_price`, cost);
   
  };

  //Retail Price
  export const onChangeRetailPrice = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    watch:UseFormWatch<StockInvoice>,
    setValue:UseFormSetValue<StockInvoice>
  ) => {
    let retailPrice = parseInt(e.currentTarget.value);
    const customerDiscount = watch(`stockitems.${index}.customer_discount`);
    const supplierDiscount = watch(`stockitems.${index}.supplier_discount`);
    if (customerDiscount) {
      const customerPrice = ((100 - customerDiscount) * retailPrice) / 100;

      setValue(`stockitems.${index}.selling_price`, customerPrice);
    }

    if (supplierDiscount) {
      const cost = ((100 - supplierDiscount) * retailPrice) / 100;

      setValue(`stockitems.${index}.cost`, cost);
    }
  };

  //Supplier Discount
  export const onChangeSupplierDiscount = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    watch:UseFormWatch<StockInvoice>,
    setValue:UseFormSetValue<StockInvoice>
  ) => {
    const suplierDiscount = parseInt(e.currentTarget.value);
    const retailPrice = watch(`stockitems.${index}.retail_price`);

    if (retailPrice) {
      const cost = ((100 - suplierDiscount) * retailPrice) / 100;

      setValue(`stockitems.${index}.cost`, cost);
    }
  };

  //Customer Discount
  export const onChangeCustomerPrice = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    watch:UseFormWatch<StockInvoice>,
    setValue:UseFormSetValue<StockInvoice>
  ) => {
    const customerDiscount = parseInt(e.currentTarget.value)
    const retailPrice = parseInt(watch(`stockitems.${index}.retail_price`)+'')
    const cost = watch(`stockitems.${index}.cost`)

    if (retailPrice !== 0){
      const customerPrice = ((100-customerDiscount)* retailPrice)/100;
      setValue(`stockitems.${index}.selling_price`, customerPrice)
    }else if(cost){
      const customerPrice = ((100-customerDiscount)* cost)/100;
      setValue(`stockitems.${index}.selling_price`, customerPrice)
    }
  };

  // Total Discount
  export const onChangeStockItemDiscount = (
    e: React.ChangeEvent<HTMLInputElement>,
    watch:UseFormWatch<StockInvoice>,
    setValue:UseFormSetValue<StockInvoice>,
    totalAmount:number
  )=>{
    const totalDiscount = parseInt(e.currentTarget.value)
    // let totalAmount = watch('total_amount')
    const originalTotalAmount = totalAmount

    console.log(totalDiscount);
    console.log(totalAmount);
    
    let newAmount = 0

    if (totalDiscount){
      newAmount = ((100 - totalDiscount) * totalAmount) / 100
    }else{
      setValue('total_amount', originalTotalAmount)
    }

    setValue('total_amount', newAmount !== 0 ? newAmount:totalAmount)

  }

