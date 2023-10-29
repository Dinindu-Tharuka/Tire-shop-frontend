import create from "../http-service";
import { StockPayment } from "./stock-payment-service";

interface Voucher{
    voucher:string;
    date:string;
    total_payment:number;
    stock_payments:StockPayment[]
}


export default create('/stock-payments-vouchers/')