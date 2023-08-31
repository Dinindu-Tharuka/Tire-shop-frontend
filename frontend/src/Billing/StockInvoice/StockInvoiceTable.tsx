import {
  Button,
  Flex,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  Text,
} from "@chakra-ui/react";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useContext, useState } from "react";
import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";
import StockInvoiceDelete from "./StockInvoiceDelete";
import UpdateStockInvoiceDrawer from "./UpdateStockInvoiceDrawer";
import useSupplier from "../../hooks/Registration/useSupplier";
import getCutUrl, { MAXIMUM_PAGES_PER_PAGE } from "../../services/pagination-cut-link";

const StockInvoiceTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const {
    stockInvoices,
    nextStockInvoiceUrl,
    previousStockInvoiceUrl,
    setFilterStockInvoiceParams,
    isLoadingInvoices,
    errorFetchStockInvoice,
    invoicesCount
  } = useContext(StockInvoiceContext);

  const {suppliers} = useSupplier();
  const numOfPages = Math.ceil(invoicesCount/MAXIMUM_PAGES_PER_PAGE)
  
  

  if (isLoadingInvoices)
    return <Spinner/>


  return (
    <Flex alignItems="center" flexDir="column">
      {errorFetchStockInvoice && <Text textColor='red'>Unable to fetch data from the internet.</Text>}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Bill No</Th>
              <Th>Date</Th>
              <Th>Total Amount</Th>
              <Th>Total Discount</Th>
              <Th>supplier</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stockInvoices?.map((invoice, index) => (
              <Tr key={index}>
                <Th>
                  <UpdateStockInvoiceDrawer selectedUpdateStockInvoice={invoice}/>
                </Th>
                <Th>
                  <StockInvoiceDelete selectedStockInvoice={invoice}/>
                </Th>
                <Td>{invoice.invoice_no}</Td>
                <Td>{invoice.date}</Td>
                <Td>{invoice.total_amount}</Td>
                <Td>{invoice.total_discount}</Td>
                <Td>{suppliers.find(sup => sup.id === invoice.supplier)?.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled = {currentPageNum === 1 ? true:false}
          onClick={() =>{
            setFilterStockInvoiceParams(
              getCutUrl(previousStockInvoiceUrl, 'stock-items-invoices') + ""

            )
            setCurrentPageNum(currentPageNum - 1 )
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight='semibold'>page {currentPageNum} of {numOfPages}</Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled = {currentPageNum === numOfPages ? true:false}
          onClick={() =>{
            setFilterStockInvoiceParams(
              getCutUrl(nextStockInvoiceUrl, 'stock-items-invoices') + ""
            )
            setCurrentPageNum(currentPageNum + 1)
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default StockInvoiceTable;
