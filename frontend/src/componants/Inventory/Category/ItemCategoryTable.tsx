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
import categoryService, {
  Category,
} from "../../../services/Inventory/category-service";
import UpdateCategoryDrawer from "./UpdateCategoryDrawer";
import { useContext } from "react";
import ItemCategoryContext from "../../../Contexts/Inventory/CategoryContext";
import getCategoryCutUrl from "../Cut Url/category-url-cut";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const ItemCategoryTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    categories,
    setCategories,
    nextCategoryUrl,
    previousCategoryUrl,
    setFilterCategoryParams,
    filterCategoryParams,
  } = useContext(ItemCategoryContext);

  const onDeleteCategory = (category: Category) => {
    const originalCategories = [...categories];
    setCategories(categories.filter((cat) => cat.id !== category.id));

    categoryService.delete(`${category.id}`).catch((err) => {
      setCategories(originalCategories);
    });
  };

  return (
    <Flex alignItems="center" flexDir="column">
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Category Name</Th>
              <Th>Description</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories?.map((category, index) => (
              <Tr key={category.id}>
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

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          onClick={() =>
            setFilterCategoryParams(getCategoryCutUrl(previousCategoryUrl) + "")
          }
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          onClick={() =>
            setFilterCategoryParams(getCategoryCutUrl(nextCategoryUrl) + "")
          }
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default ItemCategoryTable;
