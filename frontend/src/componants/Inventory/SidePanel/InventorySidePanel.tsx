import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";
import InventoryAddButtonDrawer from "../Item/AddItemDrawer";
import AddCategoryDrawer from "../Category/AddCategoryDrawer";
import AddSupplierDrawer from "../Supplier/AddSupplierDrawer";
import { Link } from "react-router-dom";

const InventorySidePanel = () => {
  const inventoryList = ["Item", "Category", "Supplier"];
  const inventory_links = ["", "categories", "suppliers"];
  const { toggleColorMode, colorMode } = useColorMode();

  const options = ["ADD"];

  const inventoryMenuList = inventoryList.map((inventory, index) => (
    <Flex key={index} width="100%" justifyContent="space-between">
      <Accordion
        allowToggle
        bg={colorMode === "light" ? "#e3a99c" : "#252528"}
        width="100%"
        borderRadius={10}
      >
        <AccordionItem borderRadius={10}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Link to={inventory_links[index]}>
                  <Text fontWeight="bold">{inventory}</Text>
                </Link>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg={colorMode === "light" ? "#f1cac1" : ""}>
            {options.map((option, num) =>
              index === 0 ? (
                <InventoryAddButtonDrawer key={num} />
              ) : index === 1 ? (
                <AddCategoryDrawer key={num} />
              ) : index === 2 ? (
                <AddSupplierDrawer key={num} />
              ) : null
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  ));

  return (
    <>
      <Show above="lg">
        <VStack>{inventoryMenuList}</VStack>
      </Show>
      <Show below="lg">
        <HStack>{inventoryMenuList}</HStack>
      </Show>
    </>
  );
};

export default InventorySidePanel;
