import {
  Button,
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
import { Bill } from "../../services/Billing/bill-service";
import useCustomer from "../../hooks/Customer/useCustomer";
import useService from "../../hooks/Registration/useService";
import { useContext, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BillPaymentContext from "../../Contexts/Bill/BillPAymentContext";
import useBillPayment from "../../hooks/Billing/useBillPayment";

interface Props {
  seletedBill: Bill;
}

const BillShowPage = ({ seletedBill }: Props) => {
  const [loader, setLoader] = useState(false);
  const { customers } = useCustomer();
  const { services } = useService();
  const { billPayments } = useBillPayment()

  console.log('bills', billPayments);
  

  console.log('selected_bill_id', seletedBill.invoice_id);
  

  console.log('payments',billPayments.forEach(pay => console.log(pay.bill_id)
  ))
  

  const accountNames = [
    ["", seletedBill.discount_amount],
    ["Customer Item Value", seletedBill.custome_item_value],
    ["Sub total", seletedBill.sub_total],
  ];
  const pdfRef = useRef<HTMLDivElement>(null)

  const dowloadPdf = () => {
    let capture = pdfRef.current
   
    setLoader(true);
    if (capture)
      html2canvas(capture).then(async (canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF("p", "mm", "a4");
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio)/2;
        const imgY = 5;
        doc.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);

        const fileName = String(new Date().valueOf());
        await doc.save(fileName, {returnPromise:true});
        window.open(doc.output('bloburl', { filename: fileName }), '_blank');
       
        setLoader(false);
      });
  };
  return (
    <>
      <div ref={pdfRef}>
        
        <TableContainer width="25%">
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>
                  <Text fontWeight="semibold">Bill No</Text>
                </Td>
                <Td>
                  <Text>{seletedBill.invoice_id}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Text fontWeight="semibold">Customer</Text>
                </Td>
                <Td>
                  <Text>
                    {
                      customers.find((cus) => cus.id === seletedBill.customer)
                        ?.name
                    }
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        {/* Items List  */}
        {seletedBill.bill_items.length !== 0 && (
          <TableContainer width="50%">
            <Text bg="#f1cac1" padding={3} borderRadius={10} fontWeight="bold">
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
          <TableContainer width="25%">
            <Text bg="#f1cac1" padding={3} borderRadius={10} fontWeight="bold">
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
                      <Text>{service.service}</Text>
                    </Td>
                    <Td>
                      <Text>{service.employee}</Text>
                    </Td>
                    <Td>
                      <Text>
                        {
                          services.find((ser) => ser.id === service.service)
                            ?.service_value
                        }
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
     

      {/* Payment List */}
      <TableContainer width="100%">
        <Text bg="#f1cac1" padding={3} borderRadius={10} fontWeight="bold">
          Payments
        </Text>
        <Table variant="simple">          

          <Tbody width='50vw'>
            {billPayments.filter(payment => (payment.bill_id) === seletedBill.invoice_id).map((payment, index) => (
              <div key={index}>
              <Tr width='25vw' >
                <Th>Date</Th>
                <Th>{payment.date}</Th>
              </Tr>
              <Tr width='25vw'>
                <Th>Discount</Th>
                <Th>{payment.discount}</Th>
              </Tr>
              <Tr>
                
                <Td>
                  {payment.payments_cash.length !== 0 && (
                    <TableContainer>
                      <Text
                        bg="#f1cac1"
                        padding={3}
                        borderRadius={10}
                        align="center"
                        fontWeight="bold"
                      >
                        Cash Payment
                      </Text>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Date</Th>
                            <Th>Payee Name</Th>
                            <Th>Amount</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {payment.payments_cash.map((cash, index) => (
                            <Tr key={index}>
                              <Td>{cash.date}</Td>
                              <Td>{cash.payeename}</Td>
                              <Td>{cash.amount}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  )}

                  {payment.payment_cheques.length !== 0 && (
                    <TableContainer>
                      <Text
                        bg="#f1cac1"
                        padding={3}
                        borderRadius={10}
                        align="center"
                        fontWeight="bold"
                      >
                        Cash Cheque
                      </Text>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Payment Date</Th>
                            <Th>Payee Name</Th>
                            <Th>Amount</Th>
                            <Th>Cheque No</Th>
                            <Th>Bank</Th>
                            <Th>Branch</Th>
                            <Th>Cheque Date</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {payment.payment_cheques.map((cheque, index) => (
                            <Tr key={index}>
                              <Td>{cheque.date}</Td>
                              <Td>{cheque.payeename}</Td>
                              <Td>{cheque.amount}</Td>
                              <Td>{cheque.cheque_no}</Td>
                              <Td>{cheque.bank}</Td>
                              <Td>{cheque.branch}</Td>
                              <Td>{cheque.cheque_date}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  )}

                  {payment.payments_credit_card.length !== 0 && (
                    <TableContainer>
                      <Text
                        bg="#f1cac1"
                        padding={3}
                        borderRadius={10}
                        align="center"
                        fontWeight="bold"
                      >
                        Credit Card Payment
                      </Text>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Date</Th>
                            <Th>Payee Name</Th>
                            <Th>Amount</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {payment.payments_credit_card.map(
                            (credit_card, index) => (
                              <Tr key={index}>
                                <Td>{credit_card.date}</Td>
                                <Td>{credit_card.payeename}</Td>
                                <Td>{credit_card.amount}</Td>
                              </Tr>
                            )
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  )}

                  {payment.payments_credit_card.length !== 0 && (
                    <TableContainer>
                      <Text
                        bg="#f1cac1"
                        padding={3}
                        borderRadius={10}
                        align="center"
                        fontWeight="bold"
                      >
                        Credit Payment
                      </Text>
                      <Table>
                        <Thead>
                          <Tr>
                            <Th>Date</Th>
                            <Th>Payee Name</Th>
                            <Th>Amount</Th>
                            <Th>Due Date</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {payment.payments_credit.map((credit, index) => (
                            <Tr key={index}>
                              <Td>{credit.date}</Td>
                              <Td>{credit.payeename}</Td>
                              <Td>{credit.amount}</Td>
                              <Td>{credit.due_date}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  )}
                </Td>
              </Tr>
              </div>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <TableContainer width="25%">
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>
                <Text fontWeight="semibold">Total Discount</Text>
              </Td>
              <Td>
                <Text>{seletedBill.discount_amount}</Text>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text fontWeight="semibold">Customer Item Value</Text>
              </Td>
              <Td>
                <Text>{seletedBill.custome_item_value}</Text>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text fontWeight="semibold">Sub Total</Text>
              </Td>
              <Td>
                <Text>{seletedBill.sub_total}</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      </div>

      <Button disabled={!(loader === false)} onClick={() => dowloadPdf()}>
        {loader ? "Downloading" : "Download"}
      </Button>
    </>
  );
};

export default BillShowPage;
