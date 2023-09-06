import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useRef } from "react";
import vehicleService, { Vehicle } from "../../services/Customer/vehicle-service";
import VehicleContext from "../../Contexts/Customer/VehicleContext";

interface Props {
  selectedDeleteVehicle: Vehicle;
}

const VehicleDelete = ({ selectedDeleteVehicle }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();

  const { vehicles, setVehicles } = useContext(VehicleContext);
  const mainName = "Vehicle";

  const onDeleteCustomer = (vehicle: Vehicle) => {
    const originalCustomers = [...vehicles];

    setVehicles(vehicles.filter((veh) => veh.vehical_no !== vehicle.vehical_no));

    vehicleService.delete(`${vehicle.vehical_no}`)
      .then((res) => {
        if (res.status === 204) {
          deleteToast({
            title: `${mainName}`,
            description: `${mainName} successfully deleted.`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        setVehicles(originalCustomers);

        deleteToast({
          title: "Error",
          description: `${mainName} not successfully deleted.`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Button bg="#f87454" onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Supplier {selectedDeleteVehicle.vehical_no}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  onDeleteCustomer(selectedDeleteVehicle);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default VehicleDelete;
