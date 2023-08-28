import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useColorMode,
    useDisclosure,
  } from "@chakra-ui/react";
  import { useRef, useState } from "react";
import { StockItem } from "../../services/Stock/stock-item-service";
import UpdateStockItemForm from "./UpdateStockItemForm";
  
  interface Props {
    selectedStockItem: StockItem;
  }

const UpdateStockItemDrawer = ({selectedStockItem}:Props) => {
    const { toggleColorMode, colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
  return (
    <>
      <Button
        variant="link"
        bg="#ffc2b3"
        padding={3}
        textColor={colorMode === "light" ? "#2b2323" : "#e0d6d6"}
        _hover={
          colorMode === "light"
            ? { background: "#3e3d40 " }
            : { background: "#fababb" }
        }
        onClick={onOpen}
      >
        Update
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>Update Stock Item</DrawerHeader>

          <DrawerBody>
            <UpdateStockItemForm selectedStockItem={selectedStockItem}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default UpdateStockItemDrawer