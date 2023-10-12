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
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import StockInvoiceDelete from "./StockInvoiceDelete";
import useSupplier from "../../hooks/Registration/useSupplier";
import StockInvoicePageContext from "../../Contexts/Stock/StockInvoicePageContext";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../services/pagination-cut-link";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import StockInvoiceShowPage from "./StockInvoiceShowPage";
import StockInvoiceShowDrawer from "./StockInvoiceShowDrawer";
import { makeUpDate } from "../UI/MakeUpDate";

const StockInvoiceTable = () => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const { colorMode } = useColorMode();
  const {
    stockInvoices,
    setStockInvoices,
    errorFetchStockInvoice,
    nextStockInvoiceUrl,
    previousStockInvoiceUrl,
    filterStockInvoiceParams,
    setFilterStockInvoiceParams,
    isLoadingInvoices,
    invoicesCount,
    setErrorFetchStockInvoice,
    setInvoiceIdFilter,
  } = useContext(StockInvoicePageContext);

  const numOfPages = Math.ceil(invoicesCount / MAXIMUM_PAGES_PER_PAGE);

  const { suppliers } = useSupplier();
  const onTypeFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setInvoiceIdFilter(event.currentTarget.value);
  };

  return (
    <Flex alignItems="center" flexDir="column">
      <Input placeholder="Search Bill No" onKeyUp={onTypeFilter} />
      {errorFetchStockInvoice && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Bill No</Th>
              <Th>Date</Th>
              <Th>Total Amount</Th>
              <Th>supplier</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stockInvoices?.map((invoice, index) => (
              <Tr key={index}>
                <Th>
                  <StockInvoiceShowDrawer selectedStockInvoice={invoice} />
                </Th>
                <Th>
                  <StockInvoiceDelete selectedStockInvoice={invoice} />
                </Th>
                <Td>{invoice.invoice_no}</Td>
                <Td>{makeUpDate(invoice.date)}</Td>
                <Td>{invoice.total_amount}</Td>
                <Td>
                  {suppliers.find((sup) => sup.id === invoice.supplier)?.name}
                </Td>
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
            setFilterStockInvoiceParams(
              getCutUrl(previousStockInvoiceUrl, "stock-items-invoices") + ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setErrorFetchStockInvoice("");
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
            setFilterStockInvoiceParams(
              getCutUrl(nextStockInvoiceUrl, "stock-items-invoices") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setErrorFetchStockInvoice("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default StockInvoiceTable;
