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
    const retailPrice = watch(`stockitems.${index}.retail_price`)
    const cost = watch(`stockitems.${index}.cost`)

    if (retailPrice){
      const customerPrice = ((100-customerDiscount)* retailPrice)/100;
      setValue(`stockitems.${index}.selling_price`, customerPrice)
    }else if(cost){
      const customerPrice = ((100-customerDiscount)* cost)/100;
      setValue(`stockitems.${index}.selling_price`, customerPrice)
    }
  };

