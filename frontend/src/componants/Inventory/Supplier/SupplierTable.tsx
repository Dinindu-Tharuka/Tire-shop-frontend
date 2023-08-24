import {
    Button,
    Flex,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorMode,
  } from "@chakra-ui/react";
import UpdateSupplierDrawer from "./UpdateSupplierDrawer";
import { useContext } from "react";
import SupplierContext from "../../../Contexts/SupplierContext";
import SupplierService ,{ Supplier } from "../../../services/Inventory/supplier-service";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import getSupplierCutUrl from "../Cut Url/supplier-url-cut";



const SupplierTable = () => {
  const {toggleColorMode, colorMode} = useColorMode();
  const {suppliers, setSuppliers, nextSupplierUrl, previousSupplierUrl, filterSupplierParams, setFilterSupplierParams} = useContext(SupplierContext)

  const onDeleteSupplier = (supplier:Supplier)=>{
    const originalSuppliers= [...suppliers]

    setSuppliers(suppliers.filter((sup)=> sup.id !== supplier.id))    

    SupplierService
      .delete(`${supplier.id}`)
      .catch(err => setSuppliers(originalSuppliers))

  }
  return (
    <Flex alignItems='center' flexDir='column'>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
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

      <HStack>
          <Button 
            colorScheme={colorMode === 'light'?'blackAlpha':'whiteAlpha'}
            onClick={() => setFilterSupplierParams(getSupplierCutUrl(previousSupplierUrl) + "")}
          ><IoIosArrowDropleftCircle/></Button>
          <Button
            colorScheme={colorMode === 'light'?'blackAlpha':'whiteAlpha'}
            onClick={() => setFilterSupplierParams(getSupplierCutUrl(nextSupplierUrl) + "")}
          ><IoIosArrowDroprightCircle/></Button>
      </HStack> 
    </Flex>
  )
}

export default SupplierTable