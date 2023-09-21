import create from "../http-service";

export interface StockPayment {
    id:number;
    payment_method:string;
    amount:number;
    stock_invoice:string;
}


export default create('/stock-payment-list/')