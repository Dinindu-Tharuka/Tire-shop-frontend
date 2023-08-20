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
import { Item } from "../../../services/Inventory/item-service";

import { FieldValues } from "react-hook-form";
import UpdateItem from "./UpdateItemDrawer";

interface Props {
  items: Item[] | undefined;
  onSelectedDeleteItem: (item: Item) => void;
  updatedItem: (item: FieldValues) => void;
}

const ItemTable = ({
  items,
  onSelectedDeleteItem: onSelectedItem,
  updatedItem}: Props) => {

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
                  updatedItem={updatedItem}
                  selectedUpdateItem={item}
                />
              </Td>
              <Td>
                <Button
                  padding={4}
                  onClick={() => onSelectedItem(item)}
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
