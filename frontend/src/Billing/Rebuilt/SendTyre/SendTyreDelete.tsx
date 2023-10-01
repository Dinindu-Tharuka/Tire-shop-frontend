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

import sendTyreService, {
  SendTyre,
} from "../../../services/Rebuild/send-tyre-service";
import SendTyreContext from "../../../Contexts/Rebuild/SendTyreContext";
import AllSendSupplierTyresContext from "../../../Contexts/Rebuild/AllSendSupplierContext";

interface Props {
  selectedSendTyre: SendTyre;
}

const SendTyreDelete = ({ selectedSendTyre }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();
  const { sendTyres, setSendTyres } = useContext(SendTyreContext);
  const { allSendSupplierTyres, setAllSendSupplierTyres } = useContext(
    AllSendSupplierTyresContext
  );
  const name = "Send Tyre";

  const onDeleteBill = (seletedSendTyre: SendTyre) => {
    const originalSendTyres = [...sendTyres];

    setSendTyres(
      sendTyres.filter((tyre) => tyre.order_no !== seletedSendTyre.order_no)
    );

    sendTyreService
      .delete(`${seletedSendTyre.order_no}`)
      .then((res) => {
        if (res.status === 204) {
          deleteToast({
            title: `${name}`,
            description: `${name} successfully deleted.`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });

          setAllSendSupplierTyres([
            ...allSendSupplierTyres.filter((tyre) => {
              const isAvailable = selectedSendTyre.send_tyres.some(
                (selectedTyre) => selectedTyre.id === tyre.id
              );

              return !isAvailable;
            }),
          ]);
        }
      })
      .catch((err) => {
        setSendTyres(originalSendTyres);

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
              Delete Taken Tyre record {selectedSendTyre.order_no}
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
                  onDeleteBill(selectedSendTyre);
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

export default SendTyreDelete;
