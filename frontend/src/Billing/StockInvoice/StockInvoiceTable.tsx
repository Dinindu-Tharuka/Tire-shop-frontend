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
  Input,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import StockInvoiceDelete from "./StockInvoiceDelete";
import UpdateStockInvoiceDrawer from "./UpdateStockInvoiceDrawer";
import useSupplier from "../../hooks/Registration/useSupplier";

import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";

const StockInvoiceTable = () => {
  const [stockBillNoValue, setStockBillNoValue] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();
  const { stockInvoices, isLoadingInvoices, errorFetchStockInvoice } =
    useContext(StockInvoiceContext);

  const { suppliers } = useSupplier();
  const onTypeFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setStockBillNoValue(event.currentTarget.value);
  };

  if (isLoadingInvoices) return <Spinner />;

  return (
    <Flex alignItems="center" flexDir="column">
      <Input placeholder="Search Stock Bill No" onKeyUp={onTypeFilter} />
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
              <Th>Total Discount</Th>
              <Th>supplier</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stockInvoices
              ?.filter((stock) =>
                stockBillNoValue
                  ? stock.invoice_no
                      .toLowerCase()
                      .startsWith(stockBillNoValue.toLowerCase())
                  : true
              )
              .map((invoice, index) => (
                <Tr key={index}>
                  <Th>
                    <UpdateStockInvoiceDrawer
                      selectedUpdateStockInvoice={invoice}
                    />
                  </Th>
                  <Th>
                    <StockInvoiceDelete selectedStockInvoice={invoice} />
                  </Th>
                  <Td>{invoice.invoice_no}</Td>
                  <Td>{invoice.date}</Td>
                  <Td>{invoice.total_amount}</Td>
                  <Td>{invoice.total_discount}</Td>
                  <Td>
                    {suppliers.find((sup) => sup.id === invoice.supplier)?.name}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default StockInvoiceTable;
