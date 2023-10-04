import { Bill } from "../../../services/Billing/bill-page-service"
import {
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

interface Props{
    selectedBill:Bill
}

const BillShowDagPayments = ({selectedBill}:Props) => {
    const { colorMode } = useColorMode();
  return (
    <>
    {selectedBill.dag_payments.length !== 0 && (
              <TableContainer>
              <Text
                padding={3}
                bg="#f1cac1"
                textColor={colorMode === 'dark' ? '#200005':''}
                borderRadius={10}
                fontWeight="bold"
              >
                Dag Payment List
              </Text>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Job No</Th>
                    <Th paddingRight={100} textAlign='right'>Customer Price</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {selectedBill.dag_payments.map((payment, index) => (
                    <Tr key={index}>
                      <Td>
                        {payment.received_supplier_tyre}
                      </Td>
                      <Td paddingRight={100} textAlign='right'>{payment.customer_price}</Td>
                      
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            )}
    </>
  )
}

export default BillShowDagPayments