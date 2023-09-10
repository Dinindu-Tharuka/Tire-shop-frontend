import {
  Button,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  Text,
  Spinner,
  Input,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import BillDelete from "./BillDelete";
import useCustomer from "../../hooks/Customer/useCustomer";
import BillShowDrawer from "./BillShowDrawer";
import AllBillContext from "../../Contexts/Bill/AllBillContext";

const BillTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [billNoValue, setBillNoValue] = useState("");

  const { bills, setBills, isLoadingBills, billFetchError } = useContext(AllBillContext)
  const { customers } = useCustomer();

  const onTypeFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setBillNoValue(event.currentTarget.value);
  };
  if (isLoadingBills) return <Spinner />;

  return (
    <>
      <Flex alignItems="center" flexDir="column">
        <Input placeholder="Search Bill No" onKeyUp={onTypeFilter} />
        {billFetchError && (
          <Text textColor="red">Unable to fetch data from the internet.</Text>
        )}
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th>Bill No</Th>
                <Th>Customer</Th>
                <Th>Date</Th>
                <Th>Discount Amount</Th>
                <Th>Sub Total</Th>
                <Th>Customer Item Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bills
                .filter((bill) =>
                  billNoValue
                    ? bill.invoice_id.toLowerCase().startsWith(billNoValue.toLowerCase())
                    : true
                )
                .map((bill, index) => (
                  <Tr key={index}>
                    <Th>
                      <BillShowDrawer selectedBill={bill} />
                    </Th>
                    <Th>
                      <BillDelete selectedDeleteBill={bill} />
                    </Th>
                    <Td>{bill.invoice_id}</Td>
                    <Td>
                      {
                        customers.find(
                          (customer) => customer.id === bill.customer
                        )?.name
                      }
                    </Td>
                    <Td>{bill.date}</Td>
                    <Td>{bill.discount_amount}</Td>
                    <Td>{bill.sub_total}</Td>
                    <Td>{bill.custome_item_value}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default BillTable;
