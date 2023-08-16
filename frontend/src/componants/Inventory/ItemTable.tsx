import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Item } from "../../pages/Inventory"

interface Props{
    items:Item[]
}

const ItemTable = ({items}:Props) => {
  return (
    <TableContainer>
        <Table>            
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Size</Th>
                    <Th>Brand</Th>
                    <Th>Type</Th>
                    <Th>PR</Th>
                    <Th>Country</Th>
                    <Th>Valve</Th>
                    <Th>Category</Th>
                    <Th>Supplier</Th>
                </Tr>
            </Thead>
            <Tbody>
                {items.map((item) => (<Tr key={item.item_id}>
                    <Td>{item.item_id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.size}</Td>
                    <Td>{item.brand}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.plyrating}</Td>
                    <Td>{item.country}</Td>
                    <Td>{item.vale_type}</Td>
                    <Td>{item.item_category}</Td>
                    <Td>{item.supplier}</Td>
                </Tr>))}
            </Tbody>
        </Table>
    </TableContainer>
  )
}

export default ItemTable