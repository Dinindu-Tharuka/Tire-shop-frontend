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
import { RebuildReport } from "../../../../services/Reports/rebuild-report-service";
import ShowFilteredRebuildCustomerInformationReport from "./ShowFilteredRebuildCustomerInformationReport";

interface Props {
  reports: RebuildReport[];
}

const RebuiltCustomerInformation = ({ reports }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Rebuilt Customer Information Report">
        <Button onClick={onOpen} width="200px" bg='#e3a99c'>
          <Text marginEnd={5} marginTop={3}>
            Customer
          </Text>{" "}
          <Text marginTop={3}>
            <BsPrinter />
          </Text>
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ShowFilteredRebuildCustomerInformationReport reports={reports} />
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

export default RebuiltCustomerInformation;
