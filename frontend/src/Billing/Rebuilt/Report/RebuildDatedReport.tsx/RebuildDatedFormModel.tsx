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
import RebuildDatedReport from "./RebuildDatedReport";
import { RebuildReport } from "../../../../services/Reports/rebuild-report-service";

interface Props{
    reports:RebuildReport[]
}

const RebuildDatedFormModel = ({ reports }:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Tooltip label="Rebuilt Dated Report">
        <Button onClick={onOpen} width="200px">
          <Text marginEnd={5} marginTop={3}>
            Dated
          </Text>{" "}
          <Text marginTop={3}>
            <BsPrinter />
          </Text>
        </Button>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <RebuildDatedReport reports={ reports }/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RebuildDatedFormModel;
