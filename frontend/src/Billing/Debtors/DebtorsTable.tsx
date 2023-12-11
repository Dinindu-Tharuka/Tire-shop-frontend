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
import { useContext, useState } from "react";
import BillPageContext from "../../Contexts/Bill/BillContext";
import CustomerContext from "../../Contexts/Customer/CustomerContext";
import { calculateTotalPayment } from "../Bill/Calculations/CalculateTotalPayment";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import { makeUpDate } from "../UI/MakeUpDate";
import AllCustomerContext from "../../Contexts/Customer/AllCustomerContext";

const DebtorsTable = () => {
  const { bills } = useContext(BillPageContext);
  const { allCustomers } = useContext(AllCustomerContext);
  const { billPayments } = useContext(BillPaymentContext);

  // Filter Creditors values
  const [billIdFilter, setBillIdFilter] = useState("");
  const [billCustomerFilter, setBillCustomerFilter] = useState("");

  const onTypeFilterBillNo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setBillIdFilter(event.currentTarget.value);
  };
  const onTypeFilterCustomer = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setBillCustomerFilter(event.currentTarget.value);
  };

  return (
    <Flex flexDir="column">
      <Flex>
        <Input
          placeholder="Search Bill No"
          onKeyUp={onTypeFilterBillNo}
          width="20vw"
          marginRight={10}
        />
        <Input
          placeholder="Search Customer"
          onKeyUp={onTypeFilterCustomer}
          width="20vw"
        />
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Bill No</Th>
              <Th>Customer</Th>
              <Th>Sub Total</Th>
              <Th>Total Payment</Th>
              <Th>Credit</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bills
              .filter(
                (bill) =>
                  bill.sub_total > calculateTotalPayment(billPayments, bill)
              )   
              .filter((bill) => bill.invoice_id.startsWith(billIdFilter))
              .filter((bill) =>
                allCustomers
                  .find((customer) => customer.id === bill.customer)
                  ?.name.startsWith(billCustomerFilter)
              )           
              .map((bill, index) => (
                <Tr key={index}>
                  <Td>{bill.invoice_id}</Td>
                  <Td>
                    {
                      allCustomers.find(
                        (customer) => customer.id === bill.customer
                      )?.name
                    }
                  </Td>
                  <Td>{bill.sub_total}</Td>
                  <Td>{calculateTotalPayment(billPayments, bill)}</Td>
                  <Td>
                    {bill.sub_total - calculateTotalPayment(billPayments, bill)}
                  </Td>
                  <Td>{makeUpDate(bill.date)}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default DebtorsTable;
