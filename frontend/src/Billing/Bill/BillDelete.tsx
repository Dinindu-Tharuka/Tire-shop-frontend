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
import BillService, { Bill } from "../../services/Billing/bill-page-service";
import BillContext from "../../Contexts/Bill/BillContext";
import AllBillContext from "../../Contexts/Bill/AllBillContext";

interface Props {
  selectedDeleteBill: Bill;
}

const BillDelete = ({ selectedDeleteBill }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();
  const { bills, setBills } = useContext(AllBillContext);

  

  const name = "Bill";

  const onDeleteBill = (seletedBill: Bill) => {
    const originalBills = [...bills];

    

    setBills(
      bills.filter((bill) => bill.invoice_id !== seletedBill.invoice_id)
    );

    BillService.delete(`${seletedBill.invoice_id}`)
      .then((res) => {

        if (res.status === 204) {
          deleteToast({
            title: `${name}`,
            description: `${name} successfully deleted.`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        setBills(originalBills);

        deleteToast({
          title: "Error",
          description: `${name} not successfully deleted.`,
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
              Delete Supplier {selectedDeleteBill.invoice_id}
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
                  onDeleteBill(selectedDeleteBill);
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

export default BillDelete;
