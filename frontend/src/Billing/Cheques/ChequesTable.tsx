import {
  Button,
  Flex,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  Text,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import AllCustomerContext from "../../Contexts/Customer/AllCustomerContext";
import AllBillContext from "../../Contexts/Bill/AllBillContext";
import AllPaymentChequeContext from "../../Contexts/Bill/Payments/AllPaymentsChequesContext";
import PagePaymentChequeContext from "../../Contexts/Bill/Payments/PagePaymentChequesContext";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../services/pagination-cut-link";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const ChequesTable = () => {
  const { allBills } = useContext(AllBillContext);
  const { allCustomers } = useContext(AllCustomerContext);
  const { billPayments } = useContext(BillPaymentContext);
  const { allPaymentCheques } = useContext(AllPaymentChequeContext);

  const {
    pagePaymentCheques,
    pagePaymentChequesCount,
    setFilterPagePaymentChequesParams,
    previousPagePaymentChequesUrl,
    nextpagePaymentChequesUrl,
    setPagePaymentChequesFetchError,
    setPAgePaymentChequesBillStartDateFilter,
    setPagePaymentChequesEndDateFilter
  } = useContext(PagePaymentChequeContext);

  const { colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const numOfPages = Math.ceil(
    pagePaymentChequesCount / MAXIMUM_PAGES_PER_PAGE
  );

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPAgePaymentChequesBillStartDateFilter(event.currentTarget.value);
    setPagePaymentChequesEndDateFilter(event.currentTarget.value);
  };

  return (
    <Flex alignItems="center" flexDir="column">
      <Flex>
        <InputGroup>
          <InputLeftAddon children="SELECT" />
          <Input
            type="date"
            width="20vw"
            marginRight={10}
            onChange={onChangeDate}
          />
        </InputGroup>
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
            {pagePaymentCheques.map((cheque) => (
              <>
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
                            (bill) =>
                              bill.invoice_id ===
                              billPayments.find(
                                (payment) =>
                                  payment.id ===
                                  parseInt(cheque.bill_payment_id + "")
                              )?.bill_id
                          )?.customer === customer.id
                      )?.name
                    }
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === 1 ? true : false}
          onClick={() => {
            setFilterPagePaymentChequesParams(
              getCutUrl(previousPagePaymentChequesUrl, "payments-page-cheque") +
                ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setPagePaymentChequesFetchError("");
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
            setFilterPagePaymentChequesParams(
              getCutUrl(nextpagePaymentChequesUrl, "payments-page-cheque") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setPagePaymentChequesFetchError("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default ChequesTable;
