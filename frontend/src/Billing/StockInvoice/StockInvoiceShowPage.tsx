import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";
import SupplierContext from "../../Contexts/Registration/SupplierContext";
import StockPaymentContext from "../../Contexts/Stock/StockPaymentContext";
import UserMeContext from "../../Contexts/User/UserMe";
import DownloadPdf from "../../PDF/DownloadPdf";
import StockInvoicePayments from "./Payments/StockInvoicePayments";
import { stockInvoicePaymentTotal } from "./Calculations/StockInvoiceCalculation";

interface Props {
  seletedStockInvoice: StockInvoice;
}

const StockInvoiceShowPage = ({ seletedStockInvoice }: Props) => {
  // administration
  const userMe = useContext(UserMeContext);

  // For downloading pdf
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setCapture(pdfRef.current);
  }, []);

  const { suppliers } = useContext(SupplierContext);
  const { colorMode } = useColorMode();
  const { stockPayments, setStockPayments } = useContext(StockPaymentContext);

  return (
    <Flex>
      <Flex flexDir="column">
        <div ref={pdfRef}>
          <Flex flexDir="column" width="70vw" marginRight={10}>
            <div className="w-100 d-flex flex-column">
              <TableContainer>
                <Table>
                  <Tbody>
                    <Tr>
                      <Th>Bill No</Th>
                      <Td>{seletedStockInvoice?.invoice_no}</Td>
                    </Tr>
                    <Tr>
                      <Th>Supplier</Th>
                      <Td>
                        {
                          suppliers.find(
                            (sup) => sup.id === seletedStockInvoice?.supplier
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
                  textColor={colorMode === "dark" ? "#4d0012" : ""}
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
                    {seletedStockInvoice?.stock_items.map((item, index) => (
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
          </Flex>
          <Flex width="30vw" flexDir="column">
            <Table>
              <Tr>
                <Th whiteSpace="nowrap">Total Discount</Th>
                <Td>{seletedStockInvoice?.total_discount}</Td>
                <Th whiteSpace="nowrap">Total Payment</Th>
                <Td>
                  {stockInvoicePaymentTotal(stockPayments, seletedStockInvoice)}
                </Td>
              </Tr>
              <Tr>
                <Th whiteSpace="nowrap">Sub Total</Th>
                <Td>{seletedStockInvoice.total_amount}</Td>
                <Th></Th>
                <Td></Td>
              </Tr>
            </Table>
          </Flex>
        </div>

        <Button
          alignSelf="center"
          width="300px"
          disabled={!(loader === false)}
          onClick={() => DownloadPdf(capture, setLoader)}
          marginTop={5}
        >
          {loader ? "Downloading" : "Print"}
        </Button>
      </Flex>

      {userMe.is_superuser && (
        <StockInvoicePayments seletedStockInvoice={seletedStockInvoice} />
      )}
    </Flex>
  );
};

export default StockInvoiceShowPage;
