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
import StockAddItemForm from "./StockAddItemForm";
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";

interface Props {
  selectedStockInvoice: StockInvoice;
}

const StockAddItemDrawer = ({ selectedStockInvoice }: Props) => {
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
        Add Item
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>Add Stock Item</DrawerHeader>

          <DrawerBody>
            <StockAddItemForm seletedInvoice={selectedStockInvoice} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default StockAddItemDrawer;
