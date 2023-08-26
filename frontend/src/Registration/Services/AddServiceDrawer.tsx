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
import ServiceAddForm from "./ServiceAddForm";

const AddServiceDrawer = () => {
    const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <>
    <Button
      variant="link"
      textAlign="left"
      textColor={colorMode === "light" ? "#2b2323" : "#e0d6d6"}
      bg={colorMode === "light" ? "#f1cac1" : ""}
      _hover={
        colorMode === "light"
          ? { background: "#f1cac1" }
          : { background: "#766f6f" }
      }
      width="100%"
      height="3vh"
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
        <DrawerHeader>Add Service</DrawerHeader>
        <DrawerBody>
          <ServiceAddForm />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </>
  )
}

export default AddServiceDrawer