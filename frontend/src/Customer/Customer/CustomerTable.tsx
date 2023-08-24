import {
    Button,
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
import CustomerService, { Customer } from "../../services/Customer/customer-service";
import UpdateCustomerDrawer from "./UpdateCustomerDrawer";
  

const CustomerTable = () => {
    const {customers, setCustomers} = useContext(CustomerContext)

    const onDeleteCustomer = (customer:Customer)=>{
      const originalCustomers = [...customers]
      setCustomers(customers.filter(cu => cu.id !== customer.id))
      
      CustomerService
        .delete(`${customer.id}`)
        .catch(err => setCustomers([...originalCustomers]))
    }
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Name</Th>
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
                <Td>{index + 1}</Td>
                <Td>{customer.name}</Td>
                <Td>{customer.address}</Td>
                <Td>{customer.telephone}</Td>
                <Td>{customer.mobile}</Td>
                <Td>{customer.email}</Td>

                <Td>
                  <UpdateCustomerDrawer onSelectedCustomer={customer}/>
                </Td>
                <Td>
                  <Button                  
                    onClick={()=>onDeleteCustomer(customer)}
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
    </>
  )
}

export default CustomerTable