import {
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import BillPageContext from "../../Contexts/Bill/BillContext";
import { calculateTotalPayment } from "../Bill/Calculations/CalculateTotalPayment";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import { makeUpDate } from "../UI/MakeUpDate";
import AllCustomerContext from "../../Contexts/Customer/AllCustomerContext";
import VehicleContext from "../../Contexts/Customer/VehicleContext";

const DebtorsTable = () => {
  const { bills } = useContext(BillPageContext);
  const { allCustomers } = useContext(AllCustomerContext);
  const { billPayments } = useContext(BillPaymentContext);
  const { vehicles } = useContext(VehicleContext);
  // Filter Creditors values
  const [billIdFilter, setBillIdFilter] = useState("");
  const [billVehicleFilter, setVehicleFilter] = useState("");

  const onTypeFilterBillNo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setBillIdFilter(event.currentTarget.value);
  };
  const onTypeFilterCustomer = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setVehicleFilter(event.currentTarget.value);
  };

  return (
    <Flex flexDir="column">
      <Flex>
        <Input
          placeholder="Search Bill No"
          onKeyUp={onTypeFilterBillNo}
          width="20vw"
          marginRight={10}
        />
        <Input
          placeholder="Search Vehicle"
          onKeyUp={onTypeFilterCustomer}
          width="20vw"
        />
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Bill No</Th>
              <Th>Customer id</Th>
              <Th>Vehicle</Th>
              <Th>Sub Total</Th>
              <Th>Total Payment</Th>
              <Th>Credit</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bills
              .filter(
                (bill) =>
                  bill.sub_total > calculateTotalPayment(billPayments, bill)
              )
              .filter((bill) => bill.invoice_id.startsWith(billIdFilter))
              .filter((bill) => bill.vehicle.startsWith(billVehicleFilter))
              .map((bill, index) => (
                <Tr key={index}>
                  <Td>{bill.invoice_id}</Td>
                  <Td>{vehicles.find(vehicle => vehicle.vehical_no === bill.vehicle)?.customer}</Td>
                  <Td>{bill.vehicle}</Td>
                  <Td>{bill.sub_total}</Td>
                  <Td>{calculateTotalPayment(billPayments, bill)}</Td>
                  <Td>
                    {bill.sub_total - calculateTotalPayment(billPayments, bill)}
                  </Td>
                  <Td>{makeUpDate(bill.date)}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default DebtorsTable;
