import {
  Button,
  Flex,
  Input,
  Select,
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
import { useContext, useEffect, useRef, useState } from "react";
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";
import SupplierContext from "../../Contexts/Registration/SupplierContext";
import { useForm } from "react-hook-form";
import stockPaymentService, {
  StockPayment,
} from "../../services/Stock/stock-payment-service";
import StockPaymentContext from "../../Contexts/Stock/StockPaymentContext";
import UserMeContext from "../../Contexts/User/UserMe";
import DownloadPdf from "../../PDF/DownloadPdf";

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

  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const { suppliers } = useContext(SupplierContext);
  const { colorMode } = useColorMode();
  const { handleSubmit, register } = useForm<StockPayment>();
  const { stockPayments, setStockPayments } = useContext(StockPaymentContext);

  const onSubmit = (data: StockPayment) => {
    const newly = { ...data, stock_invoice: seletedStockInvoice.invoice_no };
    console.log("payments", newly);

    stockPaymentService
      .create(newly)
      .then((res) => {
        setStockPayments([...stockPayments, res.data]);
        setPaymentSuccess("Payment Succesfull.");
      })
      .catch((err) => setPaymentError(err.message));
  };

  return (
    <Flex>
      <Flex flexDir="column">
        <Flex flexDir="column" width="70vw" marginRight={10}>
          <div className="w-100 d-flex flex-column">
            <div ref={pdfRef}>
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
            <Tr>
              <Th whiteSpace="nowrap">Total Discount</Th>
              <Td>{seletedStockInvoice.total_discount}</Td>
              <Th whiteSpace="nowrap">Total Payment</Th>
              <Td>
                {stockPayments
                  .filter(
                    (payment) =>
                      seletedStockInvoice.invoice_no === payment.stock_invoice
                  )
                  .reduce(
                    (currentValue, stockPayment) =>
                      currentValue + parseFloat(stockPayment.amount + ""),
                    0
                  )}
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
        <Flex fontWeight="bold" flexDir="column">
          {paymentSuccess && (
            <Text textColor="green.800">{paymentSuccess}</Text>
          )}
          {paymentError && <Text textColor="red.700">{paymentError}</Text>}
          <Text>PAYMENTS</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              marginBottom={5}
              fontWeight="medium"
              {...register("payment_method")}
            >
              <option value="select">PAYMENT METHOD</option>
              <option value="cash">CASH</option>
              <option value="cheque">CHEQUE</option>
              <option value="credit_card">CREDIT CARD</option>
            </Select>
            <Input
              placeholder="Amount"
              marginBottom={5}
              {...register("amount")}
            ></Input>

            <Button type="submit" bg="#f87454">
              Pay
            </Button>
          </form>
        </Flex>
      )}
    </Flex>
  );
};

export default StockInvoiceShowPage;
