import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Text,
  Tooltip,
  HStack,
} from "@chakra-ui/react";

import { BsPrinter } from "react-icons/bs";
import { PaymentCheque } from "../../../services/Billing/bill-page-service";
import CheckBanckDateReport from "./CheckBanckDateReport";

interface Props {
  filteredCheques: PaymentCheque[];
}

const CheckBankDateReportModel = ({ filteredCheques }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Check Bank Date Report">
        <Button onClick={onOpen} width="200px">
          <Text marginEnd={5} marginTop={3}>
            Bank
          </Text>{" "}
          <Text marginTop={3}>
            <BsPrinter />
          </Text>
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <CheckBanckDateReport filteredChecks={filteredCheques}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckBankDateReportModel;
