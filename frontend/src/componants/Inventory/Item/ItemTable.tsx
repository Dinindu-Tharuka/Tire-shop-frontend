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
import UpdateItem from "./UpdateItemDrawer";
import { useContext } from "react";
import ItemContext from "../../../Contexts/ItemContext";
import ItemService, { Item } from "../../../services/Inventory/item-service";


const ItemTable = () => {

    const {items, setItems} = useContext(ItemContext)

    const onDeleteItem = (itemSelected: Item) => {
      const originalItems = [...items];
      setItems(items.filter((item) => item.item_id !== itemSelected.item_id));
  
      ItemService
        .delete(itemSelected.item_id)
        .catch((error) => {
          setItems(originalItems);
      });
    };

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
          {items?.map((item) => (
            <Tr key={item.item_id}>
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
              <Td>
                <UpdateItem
                  
                  selectedUpdateItem={item}
                />
              </Td>
              <Td>
                <Button
                  padding={4}
                  onClick={() => onDeleteItem(item)}
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
  );
};

export default ItemTable;
