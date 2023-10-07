import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { BsPrinter } from "react-icons/bs";
import FilteredItemShow from "./FilteredItemShow";
import { Item } from "../../../services/Inventory/item-page-service";

interface Props {
  items: Item[];
}

const ItemTableModel = ({ items }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <Button onClick={onOpen} width="200px">
        <BsPrinter />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          
          
          <ModalCloseButton />
          <ModalBody>
            <FilteredItemShow items={items} />
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

export default ItemTableModel;
