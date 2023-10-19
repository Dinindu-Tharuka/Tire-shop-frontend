import { StockInvoice } from "../../../services/Stock/stock-invoice-page-service";
import { StockPayment } from "../../../services/Stock/stock-payment-service";


export const stockInvoicePaymentTotal = (stockPayments:StockPayment[], seletedStockInvoice:StockInvoice)=>{

    const total = stockPayments.filter((payment) =>
                      seletedStockInvoice.invoice_no === payment.stock_invoice
                  )
                  .reduce(
                    (currentValue, stockPayment) =>
                      currentValue + parseFloat(stockPayment.amount + ""),
                    0
                  )

    return total

}

export const stockInvoiceTotal = (stockPayments:StockPayment[], seletedStockInvoices:StockInvoice[])=>{
    let sub_total = 0
    for (const seletedStockInvoice of seletedStockInvoices){
        sub_total = sub_total + parseFloat(seletedStockInvoice.total_amount+'') - stockInvoicePaymentTotal(stockPayments, seletedStockInvoice)
    }
    return sub_total
    
}

