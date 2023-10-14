import { Bill } from "../../../services/Billing/bill-page-service";
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
import { useContext, useEffect, useRef, useState } from "react";
import BillShowPage from "./BillShowPage";
import BillPageContext from "../../../Contexts/Bill/BillContext";

interface Props {
  selectedBill: Bill;
}

const BillShowDrawer = ({ selectedBill }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { setBillFetchError } = useContext(BillPageContext);

  useEffect(() => {
    setBillFetchError("");
  }, []);
  return (
    <>
      <Button
        textAlign="left"
        textColor={colorMode === "light" ? "#2b2323" : "#e0d6d6"}
        bg={colorMode === "light" ? "#f1cac1" : ""}
        _hover={
          colorMode === "light"
            ? { background: "#f1cac1" }
            : { background: "#766f6f" }
        }
        padding={2.5}
        width="5vw"
        onClick={onOpen}
      >
        Show
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>Customer Bill</DrawerHeader>

          <DrawerBody>
            <BillShowPage seletedBill={selectedBill} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default BillShowDrawer;
