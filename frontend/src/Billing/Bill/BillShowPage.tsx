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
} from "@chakra-ui/react";
import { Bill } from "../../services/Billing/bill-page-service";
import useCustomer from "../../hooks/Customer/useCustomer";
import useService from "../../hooks/Registration/useService";
import { useContext, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useBillPayment from "../../hooks/Billing/useBillPayment";
import BillAddPayment from "../BillPayments/BillAddPayment";
import BillShowTotalPayments from "./Calculations/BillShowTotalPayments";
import { calculateTotalPayment } from "./Calculations/CalculateTotalPayment";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";

interface Props {
  seletedBill: Bill;
}

const BillShowPage = ({ seletedBill }: Props) => {
  const [loader, setLoader] = useState(false);
  const { customers } = useCustomer();
  const { services } = useService();
  const pdfRef = useRef<HTMLDivElement>(null);
  const { billPayments } = useContext(BillPaymentContext)
  

  const dowloadPdf = () => {
    let capture = pdfRef.current;

    setLoader(true);
    if (capture)
      html2canvas(capture).then(async (canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF("p", "mm", "a4");
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 5;
        doc.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );

        const fileName = String(new Date().valueOf());
        await doc.save(fileName, { returnPromise: true });
        window.open(doc.output("bloburl", { filename: fileName }), "_blank");

        setLoader(false);
      });
  };
  return (
    <Flex>
      <Flex flexDir="column" width="70vw" marginRight={10}>
        <div className="w-100 d-flex flex-column">
          <div ref={pdfRef}>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Th>Bill No</Th>
                    <Td>{seletedBill.invoice_id}</Td>
                  </Tr>
                  <Tr>
                    <Th>Customer</Th>
                    <Td>
                      {
                        customers.find((cus) => cus.id === seletedBill.customer)
                          ?.name
                      }
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            {/* Items List  */}
            {seletedBill.bill_items.length !== 0 && (
              <TableContainer>
                <Text
                  bg="#f1cac1"
                  padding={3}
                  borderRadius={10}
                  fontWeight="bold"
                >
                  Item List
                </Text>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Item</Th>
                      <Th>QTY</Th>
                      <Th>customer Discount</Th>
                      <Th>customer Price</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {seletedBill.bill_items.map((item, index) => (
                      <Tr key={index}>
                        <Td>
                          <Text>{item.item}</Text>
                        </Td>
                        <Td>
                          <Text>{item.qty}</Text>
                        </Td>
                        <Td>
                          <Text>{item.customer_discount}</Text>
                        </Td>
                        <Td>
                          <Text>{item.customer_price}</Text>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}

            {/* Services List */}
            {seletedBill.bill_services.length !== 0 && (
              <TableContainer>
                <Text
                  padding={3}
                  bg="#f1cac1"
                  borderRadius={10}
                  fontWeight="bold"
                >
                  Services List
                </Text>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Service</Th>
                      <Th>Employee</Th>
                      <Th> Price</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {seletedBill.bill_services.map((service, index) => (
                      <Tr key={index}>
                        <Td>
                          {
                            services.find((ser) => ser.id === service.service)
                              ?.description
                          }
                        </Td>
                        <Td>{service.employee}</Td>
                        <Td>
                          {
                            services.find((ser) => ser.id === service.service)
                              ?.service_value
                          }
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            )}

            {/* Payment List */}
            

            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Th>Total Discount</Th>
                    <Td paddingRight={100} textAlign='right'>{seletedBill.discount_amount}</Td>
                  </Tr>
                  <Tr>
                    <Th>Customer Item Value</Th>
                    <Td paddingRight={100} textAlign='right'>{seletedBill.custome_item_value}</Td>
                  </Tr>
                  <Tr>
                    <Th>Sub Total</Th>
                    <Td paddingRight={100} textAlign='right'>{seletedBill.sub_total}</Td>
                  </Tr>
                  <Tr>
                    <Th>Total Payment</Th>
                    <Td paddingRight={100} textAlign='right'>{calculateTotalPayment(billPayments, seletedBill)}.00</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </div>

          <Button
            alignSelf="center"
            width="300px"
            disabled={!(loader === false)}
            onClick={() => dowloadPdf()}
            marginTop={5}
          >
            {loader ? "Downloading" : "Print"}
          </Button>
        </div>
      </Flex>
      <Flex width="30vw" flexDir="column">
        <Table>
          <Th>Sub Total</Th>
          <Td>{seletedBill.sub_total}</Td>
        </Table>
        <BillShowTotalPayments
          payments={billPayments}
          seletedBill={seletedBill}
        />
        <BillAddPayment createdBill={seletedBill} />
      </Flex>
    </Flex>
  );
};

export default BillShowPage;
