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
import ItemAddForm from "../Forms/ItemAddForm";
import { FieldValues } from "react-hook-form";
import SupplierAddForm from "../Forms/SupplierAddForm";


const AddSupplierDrawer = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const onCloseDrawer = () => {
    onClose();
  };

  return (
    <>
      <Button
        variant="link"
        textAlign="left"        
        textColor={colorMode === "light" ? "#2b2323" : "#e0d6d6"}
        bg={colorMode === 'light'? '#e3a99c':''} 
        _hover={
          colorMode === "light"
            ? { background: "#f1cac1" }
            : { background: "#766f6f" }
        }
        width="100%"
        height="8vh"
        onClick={onOpen}
      >
        Add
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"        
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>Add Supplier</DrawerHeader>

          <DrawerBody>
            <SupplierAddForm/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddSupplierDrawer