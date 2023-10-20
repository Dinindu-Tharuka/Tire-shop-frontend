import {
  Flex,
  HStack,
  IconButton,
  Input,
  Select,
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
import {
  stockInvoicePaymentTotal,
  stockInvoiceTotal,
} from "../Calculations/StockInvoiceCalculation";
import StockPaymentContext from "../../../Contexts/Stock/StockPaymentContext";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AllSupplierContext from "../../../Contexts/Registration/AllSupplierContext";
import DoMultiplePaymentModel from "./DoMultiplePaymentModel";
const PayMultipleStockInvoicesPage = () => {
  const {
    stockAllInvoices,
    setFilterGrnNo,
    setFilterSupplier,
    setFilterInvoiceNo,
  } = useContext(AllStockInvoiceContext);
  const [selectedStockInvoices, setSelectedStockInvoices] = useState<
    StockInvoice[]
  >([]);
  const { stockPayments } = useContext(StockPaymentContext);
  const { allSuppliers } = useContext(AllSupplierContext);

  return (
    <Flex flexDir="column">
      <HStack width="35vw">
        <Input
          placeholder="GRN No"
          onChange={(e) => setFilterGrnNo(e.currentTarget.value)}
        />
        <Input
          placeholder="Invoice No"
          onChange={(e) => setFilterInvoiceNo(e.currentTarget.value)}
        />
        

        <Select onChange={(e)=> setFilterSupplier(e.currentTarget.value)}>
          <option value=''>Supplier</option>
          {allSuppliers.map((supplier) => (
            <option value={supplier.id}>{supplier.name}</option>
          ))}
        </Select>
      </HStack>
      <Flex flexDir="row">
        <Flex flexDir="column" height="80vh" overflow="auto" width="35vw">
          <Text textAlign="center">All Invoices</Text>
          <Table>
            <Thead>
              <Th>GRN NO</Th>
              <Th>Invoice No</Th>
            </Thead>
            <Tbody>
              {stockAllInvoices
                .filter(
                  (inv) =>
                    parseFloat(inv.total_amount + "") >
                    parseFloat(
                      stockInvoicePaymentTotal(stockPayments, inv) + ""
                    )
                )
                .map((invoice) => (
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
              <Th>Payment</Th>
              <Th></Th>
            </Thead>
            <Tbody>
              {selectedStockInvoices.map((invoice) => (
                <Tr>
                  <Td>{invoice.invoice_no}</Td>
                  <Td>{invoice.bill_invoice_no}</Td>
                  <Td>
                    {invoice.total_amount -
                      stockInvoicePaymentTotal(stockPayments, invoice)}
                  </Td>
                  <Td>
                    <IconButton
                      icon={<AiOutlineCloseCircle />}
                      aria-label=""
                      _hover={{
                        backgroundColor:"orange"
                      }}
                      onClick={() =>
                        setSelectedStockInvoices([
                          ...selectedStockInvoices.filter(
                            (inv) => inv.invoice_no !== invoice.invoice_no
                          ),
                        ])
                      }
                    />
                  </Td>
                </Tr>
              ))}
              <Tr>
                <Td>Total Payment</Td>
                <Td></Td>
                <Td>
                  {stockInvoiceTotal(stockPayments, selectedStockInvoices)}
                </Td>
                <Td>
                  {stockInvoiceTotal(stockPayments, selectedStockInvoices) > 0 && <DoMultiplePaymentModel selectedInvoices={selectedStockInvoices}/>}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PayMultipleStockInvoicesPage;
