import { Bill } from "../../../../services/Billing/bill-page-service";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, HStack, ModalHeader, Text } from "@chakra-ui/react";
import DownloadPdf from "../../../../PDF/DownloadPdf";
import {
  calculateCash,
  calculateCheque,
  calculateCreditCard,
} from "../../Calculations/PaymentCalculations";
import BillPaymentContext from "../../../../Contexts/Bill/BillPaymentContext";
import { calculateTotalPayment } from "../../Calculations/CalculateTotalPayment";
import AllCustomerContext from "../../../../Contexts/Customer/AllCustomerContext";
import { AllItemContext } from "../../../../Contexts/Inventory/AllItemContest";
import { makeUpDate } from "../../../UI/MakeUpDate";
import AllBillContext from "../../../../Contexts/Bill/AllBillContext";
import VehicleContext from "../../../../Contexts/Customer/VehicleContext";

interface Props {
  filteredBills: Bill[];
}

const DailyItemSaleReport = ({ filteredBills }: Props) => {
  const { billPayments } = useContext(BillPaymentContext);
  const { allCustomers } = useContext(AllCustomerContext);
  const { allItems } = useContext(AllItemContext);
  const { allBills } = useContext(AllBillContext);
  const { vehicles } = useContext(VehicleContext)

  // For downloading pdf
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setCapture(pdfRef.current);
  }, []);

  // date
  const currntDate = new Date();
  return (
    <>
      <div ref={pdfRef}>
        <ModalHeader>Daily Item Sale</ModalHeader>
        <Text marginLeft={10}>
          {currntDate.getFullYear()}-{currntDate.getMonth() + 1}-
          {currntDate.getDate()}
        </Text>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Invoice No</th>
              <th scope="col">Invoice Date</th>
              <th scope="col">Customer</th>
              <th scope="col">Brand</th>
              <th scope="col">Item Name</th>
              <th scope="col">Size</th>
              <th scope="col">PR</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills?.map((bill) =>
              bill.bill_items.map((billItem, index) => (
                <tr key={index}>
                  <td>{bill.invoice_id}</td>
                  <td>{makeUpDate(bill.date)}</td>
                  <td>
                    {
                       allCustomers.find( customer => customer.id === vehicles.find(
                        (vehicle) =>
                          bill.vehicle === vehicle.vehical_no
                      )?.customer )?.name
                    }
                  </td>
                  <td>
                    {
                      allItems.find((item) => item.item_id === billItem.item)
                        ?.brand
                    }
                  </td>
                  <td>
                    {
                      allItems.find((item) => item.item_id === billItem.item)
                        ?.name
                    }
                  </td>
                  <td>
                    {
                      allItems.find((item) => item.item_id === billItem.item)
                        ?.size
                    }
                  </td>
                  <td>
                    {
                      allItems.find((item) => item.item_id === billItem.item)
                        ?.plyrating
                    }
                  </td>
                  <td>{billItem.qty}</td>
                  <td>{billItem.customer_price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <HStack>
        <Button onClick={() => DownloadPdf(capture, setLoader)} bg="red.300">
          PDF
        </Button>
      </HStack>
    </>
  );
};

export default DailyItemSaleReport;
