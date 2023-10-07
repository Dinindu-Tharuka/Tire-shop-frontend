import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'

import { BsPrinter } from 'react-icons/bs'
import FilteredItemShow from './FilteredItemShow'
import { Item } from '../../../services/Inventory/item-page-service'

interface Props{
  items:Item[]
}

const ItemTableReport = ({ items }:Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const currntDate = new Date()
  return (
    <>
      <Button onClick={onOpen} width='200px'><BsPrinter/></Button>

      <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Stock In Hand Report</ModalHeader>
          <Text marginLeft={10}>{currntDate.getFullYear()}-{currntDate.getMonth()}-{currntDate.getDay()}</Text>
          <ModalCloseButton />
          <ModalBody >

            <FilteredItemShow items={items}/>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ItemTableReport