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
  import { useRef } from "react";
import { ReceivedTyre } from "../../../../services/Rebuild/Received/received-tyre-service";
import ReceivedTyreUpdate from "./ReceivedTyreUpdate";
  
  interface Props {
    selectedReceivedTyre: ReceivedTyre;
  }

const ReceivedTyreUpdateDrawer = ({selectedReceivedTyre}:Props) => {
    const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
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
        Update
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>
            Update Send Tyres {selectedReceivedTyre.invoice_no}
          </DrawerHeader>

          <DrawerBody>
            <ReceivedTyreUpdate selectedReceivedTyre={selectedReceivedTyre}/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ReceivedTyreUpdateDrawer
