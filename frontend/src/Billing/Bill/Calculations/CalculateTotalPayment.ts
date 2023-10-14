import { Bill, BillPayment } from "../../../services/Billing/bill-page-service";



export const calculateTotalPayment = (payments : BillPayment[], seletedBill:Bill)=>{
    let totalPaidPrice = 0;

  const billPayments = payments.filter(
    (payment) => payment.bill_id === seletedBill.invoice_id
  );
  const cashTotal = billPayments.reduce(
    (currentValue, billPayment) =>
      currentValue +
      billPayment.payments_cash.reduce(
        (current, cash) => current + parseFloat(cash.amount + ""),
        0
      ),
    0
  );

  const chequeTotal = billPayments.reduce(
    (currentValue, billPayment) =>
      currentValue +
      billPayment.payment_cheques.reduce(
        (current, cheque) => current + parseFloat(cheque.amount + ""),
        0
      ),
    0
  );
  const creditCardTotal = billPayments.reduce(
    (currentValue, billPayment) =>
      currentValue +
      billPayment.payments_credit_card.reduce(
        (current, creditCard) => current + parseFloat(creditCard.amount + ""),
        0
      ),
    0
  );
  if (billPayments === undefined) {
    return 0;
  } else {
    console.log("payments", billPayments);
    console.log("cash", cashTotal);
    console.log("cheque", chequeTotal);
    console.log("credit card", creditCardTotal);
    if (
      cashTotal !== undefined &&
      chequeTotal !== undefined &&
      creditCardTotal !== undefined
    )
      totalPaidPrice = +(cashTotal + chequeTotal + creditCardTotal);
    }
    return  totalPaidPrice 
}