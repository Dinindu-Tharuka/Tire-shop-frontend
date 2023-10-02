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
import { Item } from "../../services/Inventory/item-page-service";
import UpdateItemForm from "./UpdateItemForm";

interface Props {
  selectedUpdateItem: Item;
}

const UpdateItem = ({ selectedUpdateItem }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Button
        variant="link"
        bg="#ffc2b3"
        padding={2.5}
        textColor={colorMode === "light" ? "#2b2323" : "#4d0012"}
        _hover={
          colorMode === "light"
            ? { background: "#3e3d40 " }
            : { background: "#fababb" }
        }
        //   width="100%"
        //   height="8vh"
        onClick={onOpen}
      >
        Update
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
          <DrawerHeader>Update</DrawerHeader>

          <DrawerBody>
            <UpdateItemForm selectedUpdateItem={selectedUpdateItem} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateItem;
