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
import tyreTakenService, { TyreTaken } from "../../../services/Rebuild/tyre-taken-service";
import TakenTyreContext from "../../../Contexts/Rebuild/TakenTyreContext";
  
  interface Props {
    selectedTakenTyre: TyreTaken;
  }

const TakenTyreDelete = ({ selectedTakenTyre }:Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();
  const { takenTyres, setTakenTyres } = useContext(TakenTyreContext);

  

  const name = "Taken Tyre";

  const onDeleteBill = (seletedTakntyre: TyreTaken) => {
    const originalBills = [...takenTyres];

    

    setTakenTyres(
      takenTyres.filter((tyre) => tyre.id !== seletedTakntyre.id)
    );

    tyreTakenService.delete(`${seletedTakntyre.id}`)
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
        setTakenTyres(originalBills);

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
              Delete Taken Tyre record {selectedTakenTyre.id}
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
                  onDeleteBill(selectedTakenTyre);
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
  )
}

export default TakenTyreDelete