import {
    Divider,
    HStack,
    Table,
    TableCaption,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";
  import { useContext, useEffect, useState } from "react";
  import BillPaymentContext from "../../../../../Contexts/Bill/BillPaymentContext";
  import AllBillContext from "../../../../../Contexts/Bill/AllBillContext";
  import AllCustomerContext from "../../../../../Contexts/Customer/AllCustomerContext";
  
  interface Props {
    startDate: string;
    endDate: string;
  }

const CreditCardReport = ({ startDate, endDate}:Props) => {
    const [totalAmount, setTotalAmount] = useState(0);
  const { billPayments } = useContext(BillPaymentContext);
  const { allBills } = useContext(AllBillContext);
  const { allCustomers } = useContext(AllCustomerContext);
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (start > end) {
    end.setDate(start.getDate() + 1);
  }
  if (isNaN(end.getTime()) && isNaN(start.getTime())) {
    end = new Date();
    start = new Date();
  } else if (isNaN(end.getTime())) {
    end = new Date();
    end.setDate(start.getDate());
  }

  // For Calculatons
  useEffect(() => {
    let total: number[] = [];
    setTotalAmount(0);
    let index = 0;
    billPayments.forEach((payment) =>
      payment.payments_credit_card
        .filter((c) => new Date(c.date) >= start && new Date(c.date) < end)
        .forEach((credit_card) => {
          console.log("cash", credit_card);
          total[index] = credit_card.amount;
          setTotalAmount(
            total.reduce(
              (currentValue, cas) => currentValue + parseFloat(cas + ""),
              0
            )
          );
          index++;
        })
    );
  }, [startDate, endDate]);
  return (
    <>
      <Tag padding={5}  width="58vw" fontWeight="bold" >
        Daily Credit Card Payments
      </Tag>

      <TableContainer width="58vw">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Invoice No</Th>
              <Th>Date</Th>
              <Th>Customer</Th>
              <Th>Payee Name</Th>
              <Th textAlign='right'>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {billPayments.map((payment, index) => (
              <>
                {payment.payments_credit_card
                  .filter(
                    (c) => new Date(c.date) >= start && new Date(c.date) < end
                  )
                  .map((credit_card) => (
                    <Tr>
                      <Td>{payment.bill_id}</Td>
                      <Td>{credit_card.date}</Td>
                      <Td>
                        {
                          allCustomers.find(
                            (customer) =>
                              allBills.find(
                                (bill) => bill.invoice_id === payment.bill_id
                              )?.customer === customer.id
                          )?.name
                        }
                      </Td>
                      <Td>{credit_card.payeename}</Td>
                      <Td>{credit_card.amount}</Td>
                    </Tr>
                  ))}
              </>
            ))}
            <Tr>
              <Th>Total Amount</Th>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td textAlign='right'>{totalAmount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Divider orientation="horizontal" />
    </>
  )
}

export default CreditCardReport