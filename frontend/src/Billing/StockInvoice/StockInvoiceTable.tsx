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
} from "@chakra-ui/react";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useContext } from "react";
import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";
import getStockInvoiceCutUrl from "../Cut URLs/stock-invoice-cut-url";
import StockInvoiceDelete from "./StockInvoiceDelete";
import UpdateStockInvoiceDrawer from "./UpdateStockInvoiceDrawer";
import useSupplier from "../../hooks/Registration/useSupplier";

const StockInvoiceTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    stockInvoices,
    setStockInvoices,
    nextStockInvoiceUrl,
    previousStockInvoiceUrl,
    filterStockInvoiceParams,
    setFilterStockInvoiceParams,
  } = useContext(StockInvoiceContext);

  const {suppliers} = useSupplier();


  return (
    <Flex alignItems="center" flexDir="column">
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
          onClick={() =>
            setFilterStockInvoiceParams(
              getStockInvoiceCutUrl(previousStockInvoiceUrl) + ""
            )
          }
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          onClick={() =>
            setFilterStockInvoiceParams(
              getStockInvoiceCutUrl(nextStockInvoiceUrl) + ""
            )
          }
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default StockInvoiceTable;
