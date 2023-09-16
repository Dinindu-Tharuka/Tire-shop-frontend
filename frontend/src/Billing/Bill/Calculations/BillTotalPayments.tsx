import { Text } from "@chakra-ui/react";
import { Bill, BillPayment } from "../../../services/Billing/bill-page-service";
interface Props{
    payments: BillPayment[]; 
    seletedBill: Bill;
}

const CalculateBillPayments = ({ payments, seletedBill}:Props) => {
  let totalPaidPrice = 0;

  const billPayment = payments.find(
    (payment) => payment.bill_id === seletedBill.invoice_id
  );
  const cashTotal = billPayment?.payments_cash.reduce(
    (currentValue, currentCash) =>
      currentValue + parseFloat(currentCash.amount + ""),
    0
  );
  const chequeTotal = billPayment?.payment_cheques.reduce(
    (currentValue, currentCheque) =>
      currentValue + parseFloat(currentCheque.amount + ""),
    0
  );
  const creditCardTotal = billPayment?.payments_credit_card.reduce(
    (currentValue, currentCreditCardValue) =>
      currentValue + parseFloat(currentCreditCardValue.amount + ""),
    0
  );
  if (billPayment === undefined) {
    return "No Payments yet.";
  } else {
    console.log("payments", billPayment);
    console.log("cash", cashTotal);
    console.log("cheque", chequeTotal);
    console.log("credit card", creditCardTotal);
    if (
      cashTotal !== undefined &&
      chequeTotal !== undefined &&
      creditCardTotal !== undefined
    )
      totalPaidPrice = +(cashTotal + chequeTotal + creditCardTotal);

    return (
      <>
        <Text>Paid Total : {totalPaidPrice}</Text>
        <Text>Credit     : {seletedBill.sub_total  - totalPaidPrice}</Text>
      </>
    );
  }
};

export default CalculateBillPayments;
