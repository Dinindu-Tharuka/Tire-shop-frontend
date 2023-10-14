import {
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import AllCustomerContext from "../../Contexts/Customer/AllCustomerContext";
import AllBillContext from "../../Contexts/Bill/AllBillContext";
import { PaymentCheque } from "../../services/Billing/bill-page-service";

const ChequesTable = () => {
  const { allBills } = useContext(AllBillContext);
  const { allCustomers } = useContext(AllCustomerContext);
  const { billPayments } = useContext(BillPaymentContext);
  const [selectedDate, setSelectedDate] = useState('')
  const [filteredCheques, setFilteredCheques] = useState<PaymentCheque[]>([])



  


  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.currentTarget.value);
  };

  return (
    <Flex flexDir="column">
      <Flex>
        <Input
          type="date"
          width="20vw"
          marginRight={10}
          onChange={onChangeDate}
        />
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Cheque Date</Th>
              <Th>Amount</Th>
              <Th>Cheque Number</Th>
              <Th>Bank</Th>
              <Th>Branch</Th>
              <Th>Customer Name</Th>
            </Tr>
          </Thead>
          <Tbody>
            {billPayments.map((payment) => (
              <>
                {payment.payment_cheques.map((cheque) => (
                  <Tr>
                    <Td>{cheque.cheque_date}</Td>
                    <Td>{cheque.amount}</Td>
                    <Td>{cheque.cheque_no}</Td>
                    <Td>{cheque.bank}</Td>
                    <Td>{cheque.branch}</Td>
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
                  </Tr>
                ))}
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default ChequesTable;
