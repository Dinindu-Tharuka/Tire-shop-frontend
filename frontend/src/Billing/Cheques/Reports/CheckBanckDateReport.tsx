import { useContext, useEffect, useRef, useState } from "react";
import { Button, HStack, ModalHeader, Text } from "@chakra-ui/react";
import { PaymentCheque } from "../../../services/Billing/bill-page-service";
import { makeUpDate } from "../../UI/MakeUpDate";
import AllCustomerContext from "../../../Contexts/Customer/AllCustomerContext";
import AllBillContext from "../../../Contexts/Bill/AllBillContext";
import BillPaymentContext from "../../../Contexts/Bill/BillPaymentContext";
import DownloadPdf from "../../../PDF/DownloadPdf";
import VehicleContext from "../../../Contexts/Customer/VehicleContext";

interface Props {
  filteredChecks: PaymentCheque[];
}

const CheckBanckDateReport = ({ filteredChecks }: Props) => {
  const { allCustomers } = useContext(AllCustomerContext)
  const { vehicles } = useContext(VehicleContext)
  const { allBills } = useContext(AllBillContext)
  const { billPayments } = useContext(BillPaymentContext)
  // For downloading pdf
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);
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
        <ModalHeader>Daily Item Sale</ModalHeader>
        <Text marginLeft={10}>
          {currntDate.getFullYear()}-{currntDate.getMonth() + 1}-
          {currntDate.getDate()}
        </Text>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Cheque Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Cheque Number</th>
              <th scope="col">Bank</th>
              <th scope="col">Branch</th>
              <th scope="col">Customer Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredChecks?.map((cheque, index) => (
              <tr key={index}>
                <td>{makeUpDate(cheque.date)}</td>
                <td>{cheque.amount}</td>
                <td>{cheque.cheque_no}</td>
                <td>{cheque.bank}</td>
                <td>{cheque.branch}</td>
                <td>{
                      vehicles.find(
                        (vehicle) =>
                          allBills.find(
                            (bill) =>
                              bill.invoice_id ===
                              billPayments.find(
                                (payment) =>
                                  payment.id ===
                                  parseInt(cheque.bill_payment_id + "")
                              )?.bill_id
                          )?.vehicle === vehicle.vehical_no
                      )?.vehical_no
                    }</td>
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
  );
};

export default CheckBanckDateReport;
