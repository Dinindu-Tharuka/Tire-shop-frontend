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
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import BillDelete from "./BillDelete";
import BillShowDrawer from "./BillShow/BillShowDrawer";
import BillPageContext from "../../Contexts/Bill/BillContext";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../services/pagination-cut-link";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { makeUpDate } from "../UI/MakeUpDate";
import {
  onTypeBillIdFilter,
  onTypeCustomerFilter,
  onTypeEndDateFilter,
  onTypeStartDateFilter,
  onTypeVehicleFilter,
} from "./Filtering/BillTableFiltering";
import BillPaidHistoryModel from "./Reports/PaidHistory/BillPaidHistoryModel";
import AllBillContext from "../../Contexts/Bill/AllBillContext";
import DailyItemSaleReportModel from "./Reports/DailyItemSale/DailyItemSaleReportModel";
import UserMeContext from "../../Contexts/User/UserMe";

const BillTable = () => {
  // Administration
  const userMe = useContext(UserMeContext);

  const { colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const {
    allBills,
    setAllBillIdFilter,
    setAllBillFilterCustomer,
    setAllBillVehicleFilter,
    setAllBillStartDateFilter,
    setAllBillEndDateFilter,
  } = useContext(AllBillContext);

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
    setBillFilterCustomer,
    setBillVehicleFilter,
    setBillStartDateFilter,
    setBillEndDateFilter,
  } = useContext(BillPageContext);

  const numOfPages = Math.ceil(billCount / MAXIMUM_PAGES_PER_PAGE);

  return (
    <Flex alignItems="center" flexDir="column">
      <HStack width="58vw" marginBottom={2}>
        <Input
          placeholder="Bill No"
          onKeyUp={(e) => {
            setBillFetchError("");
            onTypeBillIdFilter(e, setBillIdFilter, setAllBillIdFilter);
          }}
        />
        <Input
          placeholder="Customer"
          onKeyUp={(e) => {
            setBillFetchError("");
            onTypeCustomerFilter(
              e,
              setBillFilterCustomer,
              setAllBillFilterCustomer
            );
          }}
        />
        <Input
          placeholder="Vehicle"
          onKeyUp={(e) => {
            setBillFetchError("");
            onTypeVehicleFilter(
              e,
              setBillVehicleFilter,
              setAllBillVehicleFilter
            );
          }}
        />
      </HStack>
      <HStack width="58vw" marginBottom={5}>
        <InputGroup>
          <InputLeftAddon children="Start" />
          <Input
            type="date"
            onChange={(e) => {
              setBillFetchError("");
              onTypeStartDateFilter(
                e,
                setBillStartDateFilter,
                setAllBillStartDateFilter
              );
            }}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="End" />
          <Input
            type="date"
            onChange={(e) => {
              setBillFetchError("");
              onTypeEndDateFilter(
                e,
                setBillEndDateFilter,
                setAllBillEndDateFilter
              );
            }}
          />
        </InputGroup>
      </HStack>
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
              <Th>Vehicle</Th>
              <Th>Date</Th>
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
                <Td>{bill.vehicle}</Td>
                <Td>{makeUpDate(bill.date)}</Td>
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
      {(userMe.is_superuser || userMe.is_manager) && (
        <HStack width="58vw" marginTop={2}>
          <BillPaidHistoryModel filteredBills={allBills} />
          <DailyItemSaleReportModel filteredBills={allBills} />
        </HStack>
      )}
    </Flex>
  );
};

export default BillTable;
