import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import React, { useContext } from "react";
  import { useRef } from "react";
import StockItemService,{ StockItem } from "../../services/Stock/stock-item-service";
import StockItemContext from "../../Contexts/Stock/StockItemContext";

  
  interface Props{
      selectedStockItem:StockItem
  }

const StockItemDelete = ({selectedStockItem}:Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const deleteToast = useToast()  
    const { stockItems, setStockItems } = useContext(StockItemContext);

    const name = 'Stock Item';
  
    const onDeleteBill = (seletedStockItem: StockItem) => {
      const originalStockItems = [...stockItems];
  
      setStockItems(stockItems.filter((item) => item.id !== seletedStockItem.id));
  
      StockItemService
        .delete(`${seletedStockItem.id}`)
        .then(res => {
          if (res.status === 204){
          deleteToast({
            title: `${name}`,
              description: `${name} successfully deleted.`,
              status: 'success',
              duration: 2000,
              isClosable: true,
          })}
        })
        .catch((err) =>{
        setStockItems(originalStockItems)
  
        deleteToast({
          title: 'Error',
            description: `${name} not successfully deleted.`,
            status: 'error',
            duration: 2000,
            isClosable: true,
        })}
      );
    };
  return (
    <>
    <Button bg='#f87454' onClick={onOpen}>
      Delete 
    </Button>

    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Stock Item {selectedStockItem.id}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={()=>{
              onClose()
              onDeleteBill(selectedStockItem)
              }}  ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  </>
  )
}

export default StockItemDelete