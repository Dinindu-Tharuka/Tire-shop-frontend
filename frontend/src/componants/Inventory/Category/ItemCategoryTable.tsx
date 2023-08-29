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
import getCutUrl from "../../../services/pagination-cut-link";

const ItemCategoryTable = () => {
  const [pageNum , setPAgeNum] = useState(0)
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    categories,
    setCategories,
    nextCategoryUrl,
    previousCategoryUrl,
    setFilterCategoryParams,
    errorFetchCategory,
    setErrorFetchCategory
  } = useContext(ItemCategoryContext);



  if (errorFetchCategory)
    return <Text textColor='red'>Unable to fetch data from the internet.</Text>

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
                  <DeleteCategory selectedDeleteCategory={category}/>
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
          onClick={() =>{
            setFilterCategoryParams(getCutUrl(previousCategoryUrl, 'item-categories') + "")
            setErrorFetchCategory('')
            console.log(previousCategoryUrl);
            
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          onClick={() =>{
            setFilterCategoryParams(getCutUrl(nextCategoryUrl, 'item-categories') + "")
            setErrorFetchCategory('')
            console.log(nextCategoryUrl);
            
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default ItemCategoryTable;
