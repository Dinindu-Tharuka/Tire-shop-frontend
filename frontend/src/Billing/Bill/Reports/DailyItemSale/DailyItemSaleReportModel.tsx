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
import { Bill } from "../../../../services/Billing/bill-page-service";
import DailyItemSaleReport from "./DailyItemSaleReport";

interface Props {
  filteredBills: Bill[];
}

const DailyItemSaleReportModel = ({ filteredBills }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip label="Daily Item Sale Report">
        <Button onClick={onOpen} width="200px" bg='#e3a99c'>
          <Text marginEnd={5} marginTop={3}>
            Daily 
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
            <DailyItemSaleReport filteredBills={filteredBills}/>
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

export default DailyItemSaleReportModel;
