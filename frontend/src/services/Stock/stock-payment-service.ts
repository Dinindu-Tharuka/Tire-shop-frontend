import create from "../http-service";

export interface StockPayment {
    id:number;
    payment_method:string;
    stock_invoice:string;
}


export default create('/stock-payment-list/')