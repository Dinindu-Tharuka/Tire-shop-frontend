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
import categoryService, {
  Category,
} from "../../../services/Inventory/category-service";
import { useState } from "react";
import UpdateCategoryDrawer from "./UpdateCategoryDrawer";

interface Props {
  categories: Category[];
  onDeleteCategory: (category: Category) => void;
  onUpdatedCategory: (category:Category)=> void;
}

const ItemCategoryTable = ({ categories, onDeleteCategory, onUpdatedCategory }: Props) => {
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Category Name</Th>
              <Th>Description</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories?.map((category, index) => (
              <Tr key={category.id}>
                <Td>{index + 1}</Td>
                <Td>{category.category_name}</Td>
                <Td>{category.description}</Td>

                <Td>
                  <UpdateCategoryDrawer onUpdatedCategory={onUpdatedCategory
                  } updateCategory={category} />
                </Td>
                <Td>
                  <Button
                    padding={4}
                    onClick={() => onDeleteCategory(category)}
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
  );
};

export default ItemCategoryTable;
