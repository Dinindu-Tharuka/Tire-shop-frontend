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
  Text,
  Input,
} from "@chakra-ui/react";
import UpdateItem from "./UpdateItemDrawer";
import { useContext, useState } from "react";
import ItemPageContext from "../../../Contexts/Inventory/ItemPageContext";
import { Item } from "../../../services/Inventory/item-page-service";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import ItemDelete from "./ItemDelete";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../../services/pagination-cut-link";
import useStockItem from "../../../hooks/Stock/useStockItems";
import calculateStockitemCount from "./Calculations/CountStockItems";

const ItemTable = () => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const {
    items,
    setItems,
    nextItemPageUrl,
    previousItemPageUrl,
    setError,
    setFilterItemPageParams,
    error,
    itemCount,
    setItemQuery,
    setItemSizeQuery,
  } = useContext(ItemPageContext);

  const numOfPages = Math.ceil(itemCount / MAXIMUM_PAGES_PER_PAGE);
  const { toggleColorMode, colorMode } = useColorMode();

  const onTypeId = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setItemQuery(event.currentTarget.value);
  };
  const onTypeSize = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setItemSizeQuery(event.currentTarget.value);
  };

  const { stockItems } = useStockItem();
 
  if (error)
    return <Text textColor="red">Unable to fetch data from the internet.</Text>;

  return (
    <Flex alignItems="center" flexDir="column">
      <HStack>
        <Input placeholder="Search Item" onKeyUp={onTypeId} />
        <Input placeholder="Search Size" onKeyUp={onTypeSize} />
      </HStack>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>ID</Th>
              <Th>Stock Count</Th>
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
            {items?.map((item) => (
              <Tr key={item.item_id}>
                <Td>
                  <UpdateItem selectedUpdateItem={item} />
                </Td>
                <Td>
                  <ItemDelete selectedDeleteItem={item} />
                </Td>
                <Td>{item.item_id}</Td>
                <Td>{calculateStockitemCount(item, stockItems)}</Td>
                <Td>{item.name}</Td>
                <Td>{item.size}</Td>
                <Td>{item.brand}</Td>
                <Td>{item.type}</Td>
                <Td>{item.plyrating}</Td>
                <Td>{item.country}</Td>
                <Td>{item.vale_type}</Td>
                <Td>{item.item_category}</Td>
                <Td>{item.supplier}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === 1 ? true : false}
          onClick={() => {
            setFilterItemPageParams(
              getCutUrl(previousItemPageUrl, "items-pagination") + ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setError("");
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight="semibold">
          page {currentPageNum} of {numOfPages}
        </Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === numOfPages ? true : false}
          onClick={() => {
            setFilterItemPageParams(
              getCutUrl(nextItemPageUrl, "items-pagination") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setError("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default ItemTable;
