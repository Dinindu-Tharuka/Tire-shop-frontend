import { Bill } from "../../../../services/Billing/bill-page-service"
import { useContext, useEffect, useRef, useState } from "react";
import { Button, HStack, ModalHeader, Text } from "@chakra-ui/react";
import DownloadPdf from '../../../../PDF/DownloadPdf'
import { calculateCash, calculateCheque, calculateCreditCard } from "../../Calculations/PaymentCalculations";
import BillPaymentContext from "../../../../Contexts/Bill/BillPaymentContext";
import { calculateTotalPayment } from "../../Calculations/CalculateTotalPayment";


interface Props{
    filteredBills:Bill[]
}

const BillPaidHistoryReport = ({ filteredBills }:Props) => {
       // For downloading pdf
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);
  const { billPayments } = useContext(BillPaymentContext)
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setCapture(pdfRef.current);
  }, []);

  // date
  const currntDate = new Date();
  return (
    <>
      <div ref={pdfRef}>
        <ModalHeader>Paid History Report</ModalHeader>
        <Text marginLeft={10}>
          {currntDate.getFullYear()}-{currntDate.getMonth() + 1}-
          {currntDate.getDate()}
        </Text>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Invoice No</th>
              <th scope="col">Cash</th>
              <th scope="col">Cheque</th>
              <th scope="col">Credit Card</th>
              <th scope="col">Credit</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills?.map((bill) => (
              <tr key={bill.invoice_id}>
                <td>{bill.invoice_id}</td>
                <td>{calculateCash(bill, billPayments)}</td>
                <td>{calculateCheque(bill, billPayments)}</td>
                <td>{calculateCreditCard(bill, billPayments)}</td>
                <td>{bill.sub_total-calculateTotalPayment(billPayments, bill)}</td>
                <td>{bill.sub_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <HStack>
        <Button onClick={() => DownloadPdf(capture, setLoader)} bg="red.300">
          PDF
        </Button>
      </HStack>
    </>
  )
}

export default BillPaidHistoryReport