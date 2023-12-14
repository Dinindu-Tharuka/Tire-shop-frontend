import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import useCustomer from "../../../hooks/Customer/useCustomer";
import { Bill } from "../../../services/Billing/bill-page-service";
import BillPaymentContext from "../../../Contexts/Bill/BillPaymentContext";
import { calculateTotalPayment } from "../Calculations/CalculateTotalPayment";
import BillShowTotalPayments from "../Calculations/BillShowTotalPayments";
import BillAddPayment from "../../BillPayments/BillAddPayment";
import BillShowItems from "./BillShowItems";
import BillShowServices from "./BillShowServices";
import BillShowDagPayments from "./BillShowDagPayments";
import DownloadPdf from "../../../PDF/DownloadPdf";
import UserMeContext from "../../../Contexts/User/UserMe";
import AllCustomerContext from "../../../Contexts/Customer/AllCustomerContext";
import VehicleContext from "../../../Contexts/Customer/VehicleContext";

interface Props {
  seletedBill: Bill;
}

const BillShowPage = ({ seletedBill }: Props) => {
  // Administration
  const userMe = useContext(UserMeContext)
  
  // For downloading pdf
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);

  useEffect(()=>{
    setCapture(pdfRef.current)
  },[])

  // contexts & hooks
  const { allCustomers } = useContext(AllCustomerContext)
  const { vehicles } = useContext(VehicleContext)
  const { billPayments } = useContext(BillPaymentContext);

 
  return (
    <Flex>
      <Flex flexDir="column" width="70vw" marginRight={10}>
        <div className="w-100 d-flex flex-column">
          <div ref={pdfRef}>
            <Table>
              <Tbody>
                <Tr >
                  <Th>Bill No</Th>
                  <Td>{seletedBill.invoice_id}</Td>
                </Tr>
                <Tr>
                  <Th>Customer</Th>
                  <Td>
                    {
                     allCustomers.find( customer => customer.id === vehicles.find(
                      (vehicle) =>
                        seletedBill.vehicle === vehicle.vehical_no
                    )?.customer )?.name
                    }
                  </Td>
                </Tr>
                <Tr>
                  <Th>Vehicle</Th>
                  <Td>{seletedBill.vehicle}</Td>
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
                      {seletedBill.sub_total-seletedBill.discount_amount}
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
            onClick={() => DownloadPdf(capture, setLoader)}
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

        {userMe.is_superuser && <BillAddPayment createdBill={seletedBill} />}
      </Flex>
    </Flex>
  );
};

export default BillShowPage;
