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
} from "@chakra-ui/react";
import UpdateItem from "./UpdateItemDrawer";
import { useContext, useState } from "react";
import ItemContext from "../../../Contexts/Inventory/ItemContext";
import ItemService, { Item } from "../../../services/Inventory/item-service";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import DeleteCategory from "../Category/DeleteCategory";
import ItemDelete from "./ItemDelete";
import getCutUrl from "../../../services/pagination-cut-link";

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
  } = useContext(ItemContext);

  const numOfPages = Math.ceil(itemCount / 7);

  const { toggleColorMode, colorMode } = useColorMode();

  const onDeleteItem = (itemSelected: Item) => {
    const originalItems = [...items];
    setItems(items.filter((item) => item.item_id !== itemSelected.item_id));

    ItemService.delete(itemSelected.item_id).catch((error) => {
      setItems(originalItems);
    });
  };
  if (error)
    return <Text textColor="red">Unable to fetch data from the internet.</Text>;

  return (
    <Flex alignItems="center" flexDir="column">
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
                  <UpdateItem selectedUpdateItem={item} />
                </Td>
                <Td>
                  <ItemDelete selectedDeleteItem={item} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === 1 ? true:false}
          onClick={() => {
            setFilterItemPageParams(
              getCutUrl(previousItemPageUrl, "items") + ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setError("");
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight='semibold'>page {currentPageNum} of {numOfPages}</Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === numOfPages ? true:false}
          onClick={() => {
            setFilterItemPageParams(getCutUrl(nextItemPageUrl, "items") + "");
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
