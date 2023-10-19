import {
  Divider,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import BillPaymentContext from "../../../../../Contexts/Bill/BillPaymentContext";
import AllBillContext from "../../../../../Contexts/Bill/AllBillContext";
import AllCustomerContext from "../../../../../Contexts/Customer/AllCustomerContext";

interface Props {
  startDate: string;
  endDate: string;
}

const ChequeReport = ({ startDate, endDate }: Props) => {
    const [totalAmount, setTotalAmount] = useState(0.00);
    const { billPayments } = useContext(BillPaymentContext);
    const { allBills } = useContext(AllBillContext);
    const { allCustomers } = useContext(AllCustomerContext);
    let start = new Date(startDate);
    let end = new Date(endDate);
  
    if (start > end) {
      end.setDate(start.getDate() + 1);
    }
    if (isNaN(end.getTime()) && isNaN(start.getTime())) {
      end = new Date();
      start = new Date();
    } else if (isNaN(end.getTime())) {
      end = new Date();
      end.setDate(start.getDate());
    }
    // For Calculatons
  
    useEffect(() => {
      let total: number[] = [];
      setTotalAmount(0);
      let index = 0;
      billPayments.forEach((payment) =>
        payment.payment_cheques
          .filter((c) => new Date(c.date) >= start && new Date(c.date) < end)
          .forEach((cheque) => {
            console.log("cash", cheque);
            total[index] = cheque.amount;
            setTotalAmount(
              total.reduce(
                (currentValue, cas) => currentValue + parseFloat(cas + ""),
                0
              )
            );
            index++;
          })
      );
    }, [startDate, endDate]);
  return (
    <>
    <Tag padding={5} width="58vw" fontWeight="bold">
      Daily Cheque Payment
    </Tag>

    <TableContainer width="58vw">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Date</Th>
            <Th>Bank Date</Th>
            <Th>Customer</Th>
            <Th>Payee Name</Th>
            <Th>Amount</Th>
            <Th>Bank</Th>
            <Th>Branch</Th>
          </Tr>
        </Thead>
        <Tbody>
          {billPayments.map((payment, index) => (
            <>
              {payment.payment_cheques
                .filter(
                  (c) => new Date(c.date) >= start && new Date(c.date) < end
                )
                .map((cheque) => (
                  <Tr>
                    <Td>{payment.bill_id}</Td>
                    <Td>{cheque.date}</Td>
                    <Td>{cheque.cheque_date}</Td>
                    <Td>
                      {
                        allCustomers.find(
                          (customer) =>
                            allBills.find(
                              (bill) => bill.invoice_id === payment.bill_id
                            )?.customer === customer.id
                        )?.name
                      }
                    </Td>
                    <Td>{cheque.payeename}</Td>
                    <Td textAlign='right'>{cheque.amount}</Td>
                    <Td>{cheque.bank}</Td>
                    <Td>{cheque.branch}</Td>
                  </Tr>
                ))}
            </>
          ))}
          <Tr>
            <Th>Total Amount</Th>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td textAlign='right'>{totalAmount}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
    <Divider orientation="horizontal" />
  </>
  );
};

export default ChequeReport;
