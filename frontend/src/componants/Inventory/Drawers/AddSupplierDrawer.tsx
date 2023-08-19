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
        bg="#aaa1a1"
        textColor={colorMode === "light" ? "#2b2323" : "#e0d6d6"}
        _hover={
          colorMode === "light"
            ? { background: "#3e3d40 " }
            : { background: "#fababb" }
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