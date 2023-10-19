import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import PayMultipleStockInvoicesPage from "./PayMultipleStockInvoicesPage";

const PayMultipleStockInvoices = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  return (
    <>
      <Button onClick={onOpen} padding={5} marginRight={10} width={250}>
        Pay Multiple
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size='5xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>GRN Payments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PayMultipleStockInvoicesPage/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PayMultipleStockInvoices;
