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
import ServicesService, {
  Service,
} from "../../services/Registration/services-service";
import ServiceContext from "../../Contexts/Registration/ServiceContext";

interface Props {
  selectedDeleteService: Service;
}

const ServiceDelete = ({ selectedDeleteService }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();

  const { services, setServices } = useContext(ServiceContext);
  const mainName = "Service";

  const onDeleteService = (service: Service) => {
    const originalServices = [...services];

    setServices(services.filter((ser) => ser.id !== service.id));

    ServicesService.delete(`${service.id}`)
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
        setServices(originalServices);

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
              Delete {mainName} {selectedDeleteService.description}
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
                  onDeleteService(selectedDeleteService);
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

export default ServiceDelete;
