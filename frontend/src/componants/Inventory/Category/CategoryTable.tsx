import {
  Button,
  Flex,
  HStack,
  Text,
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
import { useContext, useState } from "react";
import ItemCategoryContext from "../../../Contexts/Inventory/CategoryContext";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import DeleteCategory from "./DeleteCategory";
import getCutUrl, { MAXIMUM_PAGES_PER_PAGE } from "../../../services/pagination-cut-link";

const CategoryTable = () => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    categories,
    nextCategoryUrl,
    previousCategoryUrl,
    setFilterCategoryParams,
    errorFetchCategory,
    setErrorFetchCategory,
    categoryCount,
  } = useContext(ItemCategoryContext);

  const numOfPages = Math.ceil(categoryCount / MAXIMUM_PAGES_PER_PAGE)

  if (errorFetchCategory)
    return <Text textColor="red">Unable to fetch data from the internet.</Text>;

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
                  <DeleteCategory selectedDeleteCategory={category} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          disabled={false}
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled = {currentPageNum === 1 ? true:false}
          onClick={() => {
            setFilterCategoryParams(
              getCutUrl(previousCategoryUrl, "item-categories") + ""
            );
            setErrorFetchCategory("");
            setCurrentPageNum(currentPageNum - 1)
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight='semibold'>page {currentPageNum} of {numOfPages}</Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled = {currentPageNum === numOfPages ? true:false}
          onClick={() => {
            setFilterCategoryParams(
              getCutUrl(nextCategoryUrl, "item-categories") + ""
            );
            setErrorFetchCategory("");
            setCurrentPageNum(currentPageNum + 1)
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default CategoryTable;
