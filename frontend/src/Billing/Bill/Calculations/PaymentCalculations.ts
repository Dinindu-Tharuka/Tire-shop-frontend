import { Bill, BillPayment } from "../../../services/Billing/bill-page-service";

export const calculateCash = (selectedBill:Bill, allPayments:BillPayment[])=>{
    let cashTotal = 0

    // console.log('selectedBill', selectedBill)
   allPayments.forEach(payment =>{
    if (payment.bill_id === selectedBill.invoice_id){
        cashTotal = payment.payments_cash.reduce((current, cash)=>current+parseFloat(cash.amount+'') , 0)
    }
   })

    return cashTotal

}

export const calculateCheque = (selectedBill:Bill, allPayments:BillPayment[])=>{
    let chequeTotal = 0

    // console.log('selectedBill', selectedBill)
   allPayments.forEach(payment =>{
    if (payment.bill_id === selectedBill.invoice_id){
        chequeTotal = payment.payment_cheques.reduce((current, cheque)=>current+parseFloat(cheque.amount+'') , 0)
    }
   })

    return chequeTotal

}

export const calculateCreditCard = (selectedBill:Bill, allPayments:BillPayment[])=>{
    let creditCardTotal = 0

    // console.log('selectedBill', selectedBill)
   allPayments.forEach(payment =>{
    if (payment.bill_id === selectedBill.invoice_id){
        creditCardTotal = payment.payments_credit_card.reduce((current, cheque)=>current+parseFloat(cheque.amount+'') , 0)
    }
   })

    return creditCardTotal

}