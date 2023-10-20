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
import DoMultiplePaymentsForm from "./DoMultiplePaymentsForm";
import { Dispatch, SetStateAction } from "react";

interface Props {
  selectedInvoices: StockInvoice[];
  setSelectedInvoices: Dispatch<SetStateAction<StockInvoice[]>>;
}

const DoMultiplePaymentModel = ({ selectedInvoices, setSelectedInvoices }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} bg="orange">
        Pay
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DoMultiplePaymentsForm selectedInvoices={selectedInvoices} setSelectedInvoices={setSelectedInvoices} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DoMultiplePaymentModel;
