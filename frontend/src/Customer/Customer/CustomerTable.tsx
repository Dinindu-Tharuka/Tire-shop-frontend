import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useContext } from "react";
import CustomerContext from "../../Contexts/Customer/CustomerContext";
import CustomerService, {
  Customer,
} from "../../services/Customer/customer-service";
import UpdateCustomerDrawer from "./UpdateCustomerDrawer";
import VehicleAccoringView from "../Vehicle/VehicleAccoringView";
import getCutUrl from "../GetCuUrl";
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from 'react-icons/io'

const CustomerTable = () => {
  const {
    customers,
    setCustomers,
    nextUrl,
    previousUrl,
    setFilterParams,
    filterParams,
  } = useContext(CustomerContext);

  const onDeleteCustomer = (customer: Customer) => {
    const originalCustomers = [...customers];
    setCustomers(customers.filter((cu) => cu.id !== customer.id));

    CustomerService.delete(`${customer.id}`).catch((err) =>
      setCustomers([...originalCustomers])
    );
  };
  return (
    <>
      <Flex alignItems='center' flexDir='column'>
        
    
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th justifyContent="center"></Th>
                <Th>Address</Th>
                <Th>Telephone</Th>
                <Th>Mobile</Th>
                <Th>Email</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers?.map((customer, index) => (
                <Tr key={index}>
                  <Td>{customer.name}</Td>
                  <Td>
                    <Accordion allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              Vehicles
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <VehicleAccoringView customer_id={customer.id} />
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Td>
                  <Td>{customer.address}</Td>
                  <Td>{customer.telephone}</Td>
                  <Td>{customer.mobile}</Td>
                  <Td>{customer.email}</Td>

                  <Td>
                    <UpdateCustomerDrawer onSelectedCustomer={customer} />
                  </Td>
                  <Td>
                    <Button
                      onClick={() => onDeleteCustomer(customer)}
                      padding={4}
                      bg="#f87454"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => setFilterParams(getCutUrl(previousUrl) + "")}
              >
                <IoIosArrowDropleftCircle/>
              </a>
            </li>
            
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => setFilterParams(getCutUrl(nextUrl) + "")}
              >
                <IoIosArrowDroprightCircle />
              </a>
            </li>
          </ul>
        </nav>

      </Flex>
    </>
  );
};

export default CustomerTable;
