import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import InventoryAddButtonDrawer from "../Item/AddItemDrawer";
import { FieldValues } from "react-hook-form";
import AddCategoryDrawer from "../Category/AddCategoryDrawer";
import AddSupplierDrawer from "../Supplier/AddSupplierDrawer";
import { Category } from "../../../services/Inventory/category-service";
import { Supplier } from "../../../services/Inventory/supplier-service";

interface Props {
  onCreated: (data: FieldValues) => void;
  onCretedCategory: (category: Category) => void;
}

const InventorySidePanel = ({ onCreated, onCretedCategory}: Props) => {
  const inventoryList = ["Item", "Item Category", "Supplier"];
  const { toggleColorMode, colorMode } = useColorMode();
  const [categories, setCategories] = useState([]);

  const options = ["ADD"];

  const inventoryMenuList = inventoryList.map((inventory, index) => (
    <Box key={index} width="100%">
      <Menu>
        <MenuButton
          paddingRight={4}
          height="10vh"
          onClick={() => console.log(inventory)}
          width="100%"
          textAlign="left"
          as={Button}
          rightIcon={<AiOutlineDown />}
          _hover={
            colorMode === "light"
              ? { background: "#fababb" }
              : { background: "#3e3d40" }
          }
        >
          {inventory}
        </MenuButton>
        <MenuList>
          {options.map((option, num) =>
            index === 0 ? (
              <InventoryAddButtonDrawer
                key={num}
                inventory={inventory}
                onCreated={onCreated}
              />
            ) : index === 1 ? (
              <AddCategoryDrawer createdCategory={onCretedCategory} key={num} />
            ) : index === 2 ? (
              <AddSupplierDrawer/>
            ) : null
          )}
        </MenuList>
      </Menu>
    </Box>
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
