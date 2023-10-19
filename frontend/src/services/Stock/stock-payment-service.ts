import create from "../http-service";

export interface StockPayment {
    id:number;
    is_cash:boolean;
    is_cheque:boolean;
    is_credit_card:boolean;
    amount:number;
    date:string;
    bank:string;
    branch:string;
    cheque_date:string;
    stock_invoice:string;
}


export default create('/stock-payment-list/')