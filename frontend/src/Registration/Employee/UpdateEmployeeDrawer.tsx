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
import { Supplier } from "../../services/Registration/supplier-service";
import { Employee } from "../../services/Registration/employee-service";
import UpdateEmplyeeForm from "./UpdateEmplyeeForm";
import { PADDING_UPDATE_DRAWER_BUTTON } from "../../Constants/Constants";

interface Props {
  selecedEmployee: Employee;
}

const UpdateEmployeeDrawer = ({ selecedEmployee }: Props) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <>
      <Button
        variant="link"
        bg="#ffc2b3"
        padding={PADDING_UPDATE_DRAWER_BUTTON}
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
          <DrawerHeader>Update Employee</DrawerHeader>

          <DrawerBody>
            <UpdateEmplyeeForm selectedEmployee={selecedEmployee} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UpdateEmployeeDrawer;
