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
import { StockInvoice } from "../../services/Stock/stock-invoice-service";
import UpdateStockInvoiceForm from "./UpdateStockInvoiceForm";
  
  interface Props {
    selectedUpdateStockInvoice: StockInvoice
    
  }

const UpdateStockInvoiceDrawer = ({selectedUpdateStockInvoice}:Props) => {
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
        size='full'
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>Update {selectedUpdateStockInvoice.invoice_no}</DrawerHeader>

          <DrawerBody>
            <UpdateStockInvoiceForm seletedStockInvoice={selectedUpdateStockInvoice}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateStockInvoiceDrawer;
