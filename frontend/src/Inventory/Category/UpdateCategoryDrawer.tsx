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
import UpdateCategoryForm from "./UpdateCategoryForm";
import { Category } from "../../services/Inventory/category-page-service";

interface Props {
  updateCategory: Category;
}

const UpdateCategoryDrawer = ({ updateCategory }: Props) => {
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
          <DrawerHeader>Update Category</DrawerHeader>

          <DrawerBody>
            <UpdateCategoryForm updateCategory={updateCategory} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateCategoryDrawer;
