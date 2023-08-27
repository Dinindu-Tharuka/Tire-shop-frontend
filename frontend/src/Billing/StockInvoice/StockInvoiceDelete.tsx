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
import StockInvoiceService,{ StockInvoice } from "../../services/Stock/stock-invoice-service";
import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";
  
  interface Props{
      selectedStockInvoice:StockInvoice
  }

const StockInvoiceDelete = ({selectedStockInvoice}:Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const deleteToast = useToast()  
    const { stockInvoices, setStockInvoices } = useContext(StockInvoiceContext);

    const name = 'Stock Invoice';
  
    const onDeleteBill = (seletedStockInvoice: StockInvoice) => {
      const originalBills = [...stockInvoices];
  
      setStockInvoices(stockInvoices.filter((invoice) => invoice.invoice_no !== seletedStockInvoice.invoice_no));
  
      StockInvoiceService
        .delete(`${seletedStockInvoice.invoice_no}`)
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
        setStockInvoices(originalBills)
  
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
            Delete Supplier {selectedStockInvoice.invoice_no}
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
              onDeleteBill(selectedStockInvoice)
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

export default StockInvoiceDelete