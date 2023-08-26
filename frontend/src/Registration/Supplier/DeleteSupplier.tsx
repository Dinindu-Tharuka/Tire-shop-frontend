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
import SupplierService, {
  Supplier,
} from "../../services/Registration/supplier-service";
import SupplierContext from "../../Contexts/Registration/SupplierContext";

interface Props {
  selectedDeleteSupplier: Supplier;
}

const DeleteSupplier = ({ selectedDeleteSupplier }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();

  const { suppliers, setSuppliers } = useContext(SupplierContext);

  const onDeleteSupplier = (supplier: Supplier) => {
    const originalSuppliers = [...suppliers];

    setSuppliers(suppliers.filter((sup) => sup.id !== supplier.id));

    SupplierService.delete(`${supplier.id}`)
      .then((res) => {
        if (res.status === 204) {
          deleteToast({
            title: "Supplier",
            description: "Supplier successfully deleted.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        setSuppliers(originalSuppliers);

        deleteToast({
          title: "Error",
          description: "Supplier not successfully deleted.",
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
              Delete Supplier {selectedDeleteSupplier.name}
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
                  onDeleteSupplier(selectedDeleteSupplier);
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

export default DeleteSupplier;
