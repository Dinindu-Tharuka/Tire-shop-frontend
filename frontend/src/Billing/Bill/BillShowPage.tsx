import {
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

interface Props {
  seletedBill: Bill;
}

const BillShowPage = ({ seletedBill }: Props) => {
  const { customers } = useCustomer();
  const { services } = useService();

  const accountNames = [
    ["", seletedBill.discount_amount],
    ["Customer Item Value", seletedBill.custome_item_value],
    ["Sub total", seletedBill.sub_total],
  ];
  return (
    <>
      <TableContainer width="25%">
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>
                <Text fontWeight='semibold'>Bill No</Text>
              </Td>
              <Td>
                <Text>{seletedBill.invoice_id}</Text>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text fontWeight='semibold'>Customer</Text>
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
      {seletedBill.bill_services.length !== 0 && <TableContainer width="50%">
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
      </TableContainer>}

      {/* Services List */}
      {seletedBill.bill_services.length !== 0 && <TableContainer width="25%">
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
      </TableContainer>}

      {/* Payment List */}
      <TableContainer width="100%">
        <Text bg="#f1cac1" padding={3} borderRadius={10} fontWeight="bold">
          Payments
        </Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Discount</Th>
              <Th></Th>
            </Tr>
          </Thead>

          <Tbody>
            {seletedBill.bill_payments.map((payment, index) => (
              <Tr key={index}>
                <Td>
                  <Text>{payment.date}</Text>
                </Td>
                <Td>
                  <Text>{payment.discount}</Text>
                </Td>
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
                          {payment.payments_credit.map(
                            (credit, index) => (
                              <Tr key={index}>
                                <Td>{credit.date}</Td>
                                <Td>{credit.payeename}</Td>
                                <Td>{credit.amount}</Td>
                                <Td>{credit.due_date}</Td>
                              </Tr>
                            )
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <TableContainer width="25%">
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>
                <Text fontWeight='semibold'>Total Discount</Text>
              </Td>
              <Td>
                <Text>{seletedBill.discount_amount}</Text>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text fontWeight='semibold'>Customer Item Value</Text>
              </Td>
              <Td>
                <Text>
                  {seletedBill.custome_item_value}
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text fontWeight='semibold'>Sub Total</Text>
              </Td>
              <Td>
                <Text>
                  {seletedBill.sub_total}
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BillShowPage;
