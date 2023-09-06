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
import CustomerService, {
  Customer,
} from "../../services/Customer/customer-service";
import CustomerContext from "../../Contexts/Customer/CustomerContext";

interface Props {
  selectedDeleteCustomer: Customer;
}

const CustomerDelete = ({ selectedDeleteCustomer }:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();

  const { customers, setCustomers } = useContext(CustomerContext);
  const mainName = "Customer";

  const onDeleteCustomer = (customer: Customer) => {
    const originalCustomers = [...customers];

    setCustomers(customers.filter((cus) => cus.id !== customer.id));

    CustomerService.delete(`${customer.id}`)
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
        setCustomers(originalCustomers);

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
              Delete Supplier {selectedDeleteCustomer.name}
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
                  onDeleteCustomer(selectedDeleteCustomer);
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

export default CustomerDelete;
