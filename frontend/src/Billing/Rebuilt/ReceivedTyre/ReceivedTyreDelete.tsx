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
import { useContext } from "react";
import { useRef } from "react";
import receivedTyreService, {
  ReceivedTyre,
} from "../../../services/Rebuild/Received/received-tyre-service";
import ReceivedTyreContext from "../../../Contexts/Rebuild/Received/ReceivedTyreContex";
import AllSendSupplierTyresContext from "../../../Contexts/Rebuild/AllSendSupplierContext";
import AllReceivedSupplierTyresContext from "../../../Contexts/Rebuild/Received/AllReceivedSupplierTyre";

interface Props {
  selectedReceivedTyre: ReceivedTyre;
}

const ReceivedTyreDelete = ({ selectedReceivedTyre }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();
  const { receivedTyres, setReceivedTyres } = useContext(ReceivedTyreContext);

  // To update deletion ofthe received supplier tyres
  const { allReceivedSupplierTyres, setAllReceivedSupplierTyres } = useContext(
    AllReceivedSupplierTyresContext
  );

  const name = "Received Tyre";

  const onDeleteBill = (seletedReceivedTyre: ReceivedTyre) => {
    const originalSendTyres = [...receivedTyres];

    setReceivedTyres(
      receivedTyres.filter(
        (tyre) => tyre.invoice_no !== seletedReceivedTyre.invoice_no
      )
    );

    receivedTyreService
      .delete(`${seletedReceivedTyre.invoice_no}`)
      .then((res) => {
        if (res.status === 204) {
          deleteToast({
            title: `${name}`,
            description: `${name} successfully deleted.`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          // To update deleted supplier tyres
          setAllReceivedSupplierTyres([
            ...allReceivedSupplierTyres.filter((supplierTyre) => {
              const isAvailble = selectedReceivedTyre.received_tyres.some(
                (seletedTyre) => seletedTyre.id === supplierTyre.id
              );

              return !isAvailble;
            }),
          ]);
        }
      })
      .catch((err) => {
        setReceivedTyres(originalSendTyres);

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
              Delete Taken Tyre record {selectedReceivedTyre.invoice_no}
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
                  onDeleteBill(selectedReceivedTyre);
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

export default ReceivedTyreDelete;
