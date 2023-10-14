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
import BillPaidHistoryReport from "./BillPaidHistoryReport";
import { Bill } from "../../../../services/Billing/bill-page-service";
  
  interface Props {
    filteredBills: Bill[];
  }

const BillPaidHistoryModel = ({ filteredBills }:Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <Tooltip label="Paid History Report">
      <Button onClick={onOpen} width="200px">
        <Text marginEnd={5} marginTop={3}>
          Paid
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
          <BillPaidHistoryReport filteredBills={filteredBills}/>
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

export default BillPaidHistoryModel