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
import { TyreTaken } from "../../../services/Rebuild/tyre-taken-service";
import { TakenTyreUpdate } from "./TakenTyreUpdate.1";


interface Props {
  selectedTakenTyre: TyreTaken;
}

const TakenTyreUpdateDrawer = ({ selectedTakenTyre }: Props) => {
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
          <DrawerHeader>Update Taken Tyres</DrawerHeader>

          <DrawerBody>
            <TakenTyreUpdate selectedTakenTyre={selectedTakenTyre} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TakenTyreUpdateDrawer;
