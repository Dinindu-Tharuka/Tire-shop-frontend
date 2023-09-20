import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import SupplierContext from "../../Contexts/Registration/SupplierContext";

interface Props {
  seletedStockInvoice: StockInvoice;
}

const StockInvoiceShowPage = ({ seletedStockInvoice }: Props) => {
  const { billPayments } = useContext(BillPaymentContext);
  const { suppliers } = useContext(SupplierContext);
  const { colorMode } = useColorMode();
  return (
    <Flex flexDir='column'>
      <Flex flexDir="column" width="70vw" marginRight={10}>
        <div className="w-100 d-flex flex-column">
          <div>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Th>Bill No</Th>
                    <Td>{seletedStockInvoice.invoice_no}</Td>
                  </Tr>
                  <Tr>
                    <Th>Supplier</Th>
                    <Td>
                      {
                        suppliers.find(
                          (sup) => sup.id === seletedStockInvoice.supplier
                        )?.name
                      }
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            {/* Items List  */}
            <TableContainer>
              <Text
                bg="#f1cac1"
                padding={3}
                borderRadius={10}
                fontWeight="bold"
                textColor={colorMode === 'dark'? '#4d0012':''}
              >
                Item List
              </Text>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Retail Price</Th>
                    <Th>Supplier Discount</Th>
                    <Th>Customer Discount</Th>
                    <Th>Sales Discount</Th>
                    <Th>Cost</Th>
                    <Th>QTY</Th>
                    <Th>Customer Price</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {seletedStockInvoice.stock_items.map((item, index) => (
                    <Tr key={index}>
                      <Td>
                        <Text>{item.retail_price}</Text>
                      </Td>
                      <Td>
                        <Text>{item.supplier_discount}</Text>
                      </Td>
                      <Td>
                        <Text>{item.customer_discount}</Text>
                      </Td>
                      <Td>
                        <Text>{item.sales_discount}</Text>
                      </Td>
                      <Td>
                        <Text>{item.cost}</Text>
                      </Td>
                      <Td>
                        <Text>{item.qty}</Text>
                      </Td>
                      <Td>
                        <Text>{item.customer_price}</Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            
          </div>
        </div>
      </Flex>
      <Flex width="30vw" flexDir="column">
        <Table>
          <Th whiteSpace='nowrap'>Total Discount</Th>
          <Td>{seletedStockInvoice.total_discount}</Td>
          <Th whiteSpace='nowrap'>Sub Total</Th>
          <Td>{seletedStockInvoice.total_amount}</Td>
        </Table>
      </Flex>
    </Flex>
  );
};

export default StockInvoiceShowPage;
