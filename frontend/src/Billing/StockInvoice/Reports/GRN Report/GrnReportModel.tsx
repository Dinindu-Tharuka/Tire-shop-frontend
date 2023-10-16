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
import { StockItemDefault } from "../../../../services/Stock/stock-item-service";
import GrnFilteredReport from "./GrnFilteredReport";

interface Props {
  stockItems: StockItemDefault[];
}


const GrnReportModel = ({ stockItems }:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <Tooltip label="GRN Report">
      <Button onClick={onOpen} width="200px" bg='#e3a99c'>
        <Text marginEnd={5} marginTop={3}>
          GRN
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
          <GrnFilteredReport stockItems={stockItems}/>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
}

export default GrnReportModel