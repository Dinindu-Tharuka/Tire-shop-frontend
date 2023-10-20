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
  Select,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import StockInvoiceDelete from "./StockInvoiceDelete";
import StockInvoicePageContext from "../../Contexts/Stock/StockInvoicePageContext";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../services/pagination-cut-link";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import StockInvoiceShowDrawer from "./StockInvoiceShowDrawer";
import { makeUpDate } from "../UI/MakeUpDate";
import AllSupplierContext from "../../Contexts/Registration/AllSupplierContext";
import PayMultipleStockInvoicesModel from "./Payments/Multiple/PayMultipleStockInvoicesModel";

const StockInvoiceTable = () => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const { colorMode } = useColorMode();
  const {
    stockInvoices,
    errorFetchStockInvoice,
    nextStockInvoiceUrl,
    previousStockInvoiceUrl,
    setFilterStockInvoiceParams,
    invoicesCount,
    setErrorFetchStockInvoice,
    setInvoiceIdFilter,
    setInvoiceBillIdFilter,
    setInvoiceStockSupplierFilter,
  } = useContext(StockInvoicePageContext);

  const numOfPages = Math.ceil(invoicesCount / MAXIMUM_PAGES_PER_PAGE);

  const { allSuppliers } = useContext(AllSupplierContext);
  const onTypeGRnNoFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setInvoiceIdFilter(event.currentTarget.value);
  };

  const onTypeInvoiceNoFilter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setInvoiceBillIdFilter(event.currentTarget.value);
  };

  return (
    <Flex alignItems="center" flexDir="column">
      <HStack>
        <Flex>
          <PayMultipleStockInvoicesModel />
        </Flex>
        <Input placeholder="GRN No" onKeyUp={onTypeGRnNoFilter} />
        <Input placeholder="Invoice No" onKeyUp={onTypeInvoiceNoFilter} />
        <Select
          onChange={(e) => {
            setErrorFetchStockInvoice("");
            setInvoiceStockSupplierFilter(e.currentTarget.value);
          }}
        >
          <option value="">Supplier</option>
          {allSuppliers.map((supplier) => (
            <option value={supplier.id}>{supplier.name}</option>
          ))}
        </Select>
      </HStack>
      {errorFetchStockInvoice && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>GRN No</Th>
              <Th>Invoice No</Th>
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
                <Td>{invoice.bill_invoice_no}</Td>
                <Td>{makeUpDate(invoice.date)}</Td>
                <Td>{invoice.total_amount}</Td>
                <Td>
                  {
                    allSuppliers.find((sup) => sup.id === invoice.supplier)
                      ?.name
                  }
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
