import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { StockInvoice } from "../../../../services/Stock/stock-invoice-page-service";
import DoMultiplePayments from "./DoMultiplePayments";

interface Props {
  selectedInvoices: StockInvoice[];
}

const DoMultiplePaymentModel = ({ selectedInvoices }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} bg="orange">Pay</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DoMultiplePayments selectedInvoices={selectedInvoices} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DoMultiplePaymentModel;
