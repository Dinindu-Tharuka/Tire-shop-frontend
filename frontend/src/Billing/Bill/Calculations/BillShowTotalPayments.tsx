import { Table, Td, Text, Th, Tr } from "@chakra-ui/react";
import { Bill, BillPayment } from "../../../services/Billing/bill-page-service";
import { calculateTotalPayment } from "./CalculateTotalPayment";
interface Props {
  payments: BillPayment[];
  seletedBill: Bill;
}

const BillShowTotalPayments = ({ payments, seletedBill }: Props) => {
    const totalPaidPrice = calculateTotalPayment(payments, seletedBill)
    return (
      <>
      <Table>
        <Tr>
          <Th>Paid Total</Th>
          <Td>{totalPaidPrice}.00</Td>
        </Tr>
        <Tr>
        <Th>Credit</Th>
          <Td>{seletedBill.sub_total - totalPaidPrice}.00</Td>
        </Tr>
      </Table>
      </>
    );
  }

export default BillShowTotalPayments;
