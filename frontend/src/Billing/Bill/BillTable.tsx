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
import BillContext from "../../Contexts/Bill/BillContext";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../services/pagination-cut-link";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { makeUpDate } from "../UI/MakeUpDate";
import AllCustomerContext from "../../Contexts/Customer/AllCustomerContext";

const BillTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const {
    bills,
    setBills,
    nextBillPageUrl,
    previousBillPageUrl,
    setFilterBillPageParams,
    billFetchError,
    billCount,
    setBillFetchError,
    setBillIdFilter,
  } = useContext(BillContext);
  const { allCustomers } = useContext(AllCustomerContext);

  const numOfPages = Math.ceil(billCount / MAXIMUM_PAGES_PER_PAGE);

  const onTypeFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setBillIdFilter(event.currentTarget.value);
  };

  return (
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
            {bills.map((bill, index) => (
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
                    allCustomers.find((customer) => customer.id === bill.customer)
                      ?.name
                  }
                </Td>
                <Td>{makeUpDate(bill.date)}</Td>
                <Td>{bill.discount_amount}</Td>
                <Td>{bill.sub_total}</Td>
                <Td>{bill.custome_item_value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === 1 ? true : false}
          onClick={() => {
            setFilterBillPageParams(
              getCutUrl(previousBillPageUrl, "bills") + ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setBillFetchError("");
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight="semibold">
          page {currentPageNum} of {numOfPages}
        </Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === numOfPages ? true : false}
          onClick={() => {
            setFilterBillPageParams(getCutUrl(nextBillPageUrl, "bills") + "");
            setCurrentPageNum(currentPageNum + 1);
            setBillFetchError("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default BillTable;
