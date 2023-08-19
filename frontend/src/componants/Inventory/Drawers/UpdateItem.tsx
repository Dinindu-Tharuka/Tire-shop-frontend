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
import { Item } from "../../../services/Inventory/item-service";
import UpdateItemForm from "../Forms/UpdateItemForm";
import { FieldValues } from "react-hook-form";

interface Props {
  selectedUpdateItem: Item;
  updatedItem: (data: FieldValues) => void;
}

const UpdateItem = ({ selectedUpdateItem, updatedItem }: Props) => {
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
        bg="#ffc2b3"
        padding={3}
        textColor={colorMode === "light" ? "#2b2323" : "#e0d6d6"}
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
          <DrawerHeader>Update {selectedUpdateItem.item_id}</DrawerHeader>

          <DrawerBody>
            <UpdateItemForm
              updatedItem={updatedItem}
              selectedUpdateItem={selectedUpdateItem}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateItem;
