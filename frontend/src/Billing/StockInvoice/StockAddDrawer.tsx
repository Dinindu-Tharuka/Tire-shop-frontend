import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    useColorMode,
    useDisclosure,
  } from "@chakra-ui/react";
  import { useRef } from "react";
import StockAddForm from "./StockAddForm";
import { IoAdd } from "react-icons/io5";
import { COLOURS } from "../../Generics/Constants";

const StockAddDrawer = () => {
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
  return (
    <>    
    <IconButton
        icon={<IoAdd />}
        aria-label="invoice add"
        bg={COLOURS.DELETE_BUTTON_COLOR}
        onClick={onOpen}
      />
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
      size='full'
    >
      <DrawerOverlay />
      <DrawerContent height="100vh">
        <DrawerCloseButton />
        <DrawerHeader>Add Stock Invoice</DrawerHeader>

        <DrawerBody>
          <StockAddForm/>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </>
  )
}

export default StockAddDrawer