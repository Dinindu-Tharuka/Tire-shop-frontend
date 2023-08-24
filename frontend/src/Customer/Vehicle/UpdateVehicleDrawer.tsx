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
import UpdateVehicleForm from "./UpdateVehicleForm";
import { Vehicle } from "../../services/Customer/vehicle-service";
 
  
  interface Props {
    onSelectedVehicle: Vehicle;
  }
  

const UpdateVehicleDrawer = ({ onSelectedVehicle}: Props) => {
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
          <DrawerHeader>Update Vehicle</DrawerHeader>

          <DrawerBody>
            <UpdateVehicleForm onSelectedVehicle={onSelectedVehicle} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default UpdateVehicleDrawer