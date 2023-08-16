import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Item } from '../../services/item-service'

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
                    <Th></Th>
                    <Th></Th>
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
                    <Td><Button bg='#ffc2b3'>Update</Button></Td>
                    <Td><Button bg='#f87454'>Delete</Button></Td>
                </Tr>))}
            </Tbody>
        </Table>
    </TableContainer>
  )
}

export default ItemTable