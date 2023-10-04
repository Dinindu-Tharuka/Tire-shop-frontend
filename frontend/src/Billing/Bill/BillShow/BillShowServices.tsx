import useService from "../../../hooks/Registration/useService";
import { Bill } from "../../../services/Billing/bill-page-service"
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

interface Props{
    selectedBill:Bill
}
const BillShowServices = ({selectedBill}:Props) => {
    const { colorMode } = useColorMode();
    const { services } = useService();
  return (
    <>
    {selectedBill.bill_services.length !== 0 && (
              <TableContainer>
                <Text
                  padding={3}
                  bg="#f1cac1"
                  textColor={colorMode === 'dark' ? '#200005':''}
                  borderRadius={10}
                  fontWeight="bold"
                >
                  Services List
                </Text>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Service</Th>
                      <Th paddingRight={100} textAlign='right'>Employee</Th>
                     
                      <Th paddingRight={100} textAlign='right'> Price</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {selectedBill.bill_services.map((service, index) => (
                      <Tr key={index}>
                        <Td>
                          {
                            services.find((ser) => ser.id === service.service)
                              ?.description
                          }
                        </Td>
                        <Td paddingRight={100} textAlign='right'>{service.employee}</Td>
                        
                        <Td paddingRight={100} textAlign='right'>
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
    </>
  )
}

export default BillShowServices