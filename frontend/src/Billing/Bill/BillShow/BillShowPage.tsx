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
import { useContext, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import useCustomer from "../../../hooks/Customer/useCustomer";
import { Bill } from "../../../services/Billing/bill-page-service";
import BillPaymentContext from "../../../Contexts/Bill/BillPaymentContext";
import { calculateTotalPayment } from "../Calculations/CalculateTotalPayment";
import BillShowTotalPayments from "../Calculations/BillShowTotalPayments";
import BillAddPayment from "../../BillPayments/BillAddPayment";
import BillShowItems from "./BillShowItems";
import BillShowServices from "./BillShowServices";
import BillShowDagPayments from "./BillShowDagPayments";

interface Props {
  seletedBill: Bill;
}

const BillShowPage = ({ seletedBill }: Props) => {
  // For downloading pdf
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  // contexts & hooks
  const { customers } = useCustomer();
  const { billPayments } = useContext(BillPaymentContext);

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

            {/* Items List  */}
            <BillShowItems selectedBill={seletedBill} />

            {/* Services List */}
            <BillShowServices selectedBill={seletedBill} />

            {/* Dag Payment List */}
            <BillShowDagPayments selectedBill={seletedBill}/>

            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Th>Total Discount</Th>
                    <Td paddingRight={100} textAlign="right">
                      {seletedBill.discount_amount}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Customer Item Value</Th>
                    <Td paddingRight={100} textAlign="right">
                      {seletedBill.custome_item_value}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Sub Total</Th>
                    <Td paddingRight={100} textAlign="right">
                      {seletedBill.sub_total}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Total Payment</Th>
                    <Td paddingRight={100} textAlign="right">
                      {calculateTotalPayment(billPayments, seletedBill)}.00
                    </Td>
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
