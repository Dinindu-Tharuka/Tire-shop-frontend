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
import UpdateCategoryDrawer from "./UpdateCategoryDrawer";
import { useContext } from "react";
import ItemCategoryContext from "../../../Contexts/CategoryContext";


const ItemCategoryTable = () => {

  const {categories, setCategories} = useContext(ItemCategoryContext)

  const onDeleteCategory = (category:Category)=>{
  
    const originalCategories = [...categories];
    setCategories(categories.filter((cat) => cat.id !== category.id));
    

    categoryService
      .delete(`${category.id}`)
      .catch((err) => {        
        setCategories(originalCategories);
    });

  }

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
                  <UpdateCategoryDrawer updateCategory={category} />
                </Td>
                <Td>
                  <Button
                    onClick={() => onDeleteCategory(category)}
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
  );
};

export default ItemCategoryTable;
