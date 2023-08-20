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
import UpdateItem from "../Item/UpdateItemDrawer";
import useCategory from "../../../hooks/Inventory/useCategory";
import categoryService, {
  Category,
} from "../../../services/Inventory/category-service";
import { useState } from "react";

interface Props {
  createdCategory?: Category | null;
}

const ItemCategoryTable = ({ createdCategory }: Props) => {
  const [error, setError] = useState("");
  const { categories, setCategories, errorFetchCategory } = useCategory();

  const onDelete = (cat: Category) => {
    const originalCategories = [...categories];
    setCategories(categories.filter((cate) => cate.id !== cat.id));

    categoryService.delete(`${cat.id}`).catch((err) => {
      setError(err.message);
      setCategories(originalCategories);
    });
  };
  return (
    <>
      {error === ""}
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
                  {/* <UpdateItem */}
                  {/* selectedUpdateItem={category} */}
                  {/* /> */}
                </Td>
                <Td>
                  <Button
                    padding={4}
                    onClick={() => onDelete(category)}
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
