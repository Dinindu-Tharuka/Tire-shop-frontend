import {
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import AllStockInvoiceContext from "../../../Contexts/Stock/AllStockInvoiceContext";
import { StockInvoice } from "../../../services/Stock/stock-invoice-page-service";

const PayMultipleStockInvoicesPage = () => {
  const { stockAllInvoices } = useContext(AllStockInvoiceContext);
  const [selectedStockInvoices, setSelectedStockInvoices] = useState<
    StockInvoice[]
  >([]);
  return (
    <Flex flexDir="column">
      <HStack width="35vw">
        <Input placeholder="GRN No" />
        <Input placeholder="Invoice No" />
        <Input placeholder="Supplier" />
      </HStack>
      <Flex flexDir="row">
        <Flex
          flexDir="column"
          marginRight={20}
          height="80vh"
          overflow="auto"
          width="35vw"
        >
          <Text textAlign="center">All Invoices</Text>
          <Table>
            <Thead>
              <Th>GRN NO</Th>
              <Th>Invoice No</Th>
            </Thead>
            <Tbody>
              {stockAllInvoices.map((invoice) => (
                <Tr
                  _hover={{
                    backgroundColor: "#f1cac1",
                  }}
                  onClick={() =>
                    setSelectedStockInvoices([
                      ...selectedStockInvoices,
                      invoice,
                    ])
                  }
                >
                  <Td>{invoice.invoice_no}</Td>
                  <Td>{invoice.bill_invoice_no}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
        <Flex flexDir="column">
          <Text textAlign="center">Selected Invoices</Text>

          <Table>
            <Thead>
              <Th>GRN NO</Th>
              <Th>Invoice No</Th>
            </Thead>
            <Tbody>
              {selectedStockInvoices.map((invoice) => (
                <Tr>
                  <Td>{invoice.invoice_no}</Td>
                  <Td>{invoice.bill_invoice_no}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PayMultipleStockInvoicesPage;
