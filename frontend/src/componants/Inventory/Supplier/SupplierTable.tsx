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
import UpdateSupplierDrawer from "./UpdateSupplierDrawer";
import { useContext } from "react";
import SupplierContext from "../../../Contexts/SupplierContext";
import SupplierService ,{ Supplier } from "../../../services/Inventory/supplier-service";



const SupplierTable = () => {

  const {suppliers, setSuppliers} = useContext(SupplierContext)

  const onDeleteSupplier = (supplier:Supplier)=>{
    const originalSuppliers= [...suppliers]

    setSuppliers(suppliers.filter((sup)=> sup.id !== supplier.id))

    SupplierService
      .delete(`${supplier.id}`)
      .catch(err => setSuppliers(originalSuppliers))

  }
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
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
            {suppliers?.map((supplier, index) => (
              <Tr key={supplier.id}>
                <Td>{index + 1}</Td>
                <Td>{supplier.name}</Td>
                <Td>{supplier.address}</Td>
                <Td>{supplier.telephone}</Td>
                <Td>{supplier.mobile}</Td>
                <Td>{supplier.email}</Td>
                <Td>
                  <UpdateSupplierDrawer selecedSupplier={supplier}/>
                </Td>
                <Td>
                  <Button
                    padding={4}
                    onClick={() => onDeleteSupplier(supplier)}
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

export default SupplierTable