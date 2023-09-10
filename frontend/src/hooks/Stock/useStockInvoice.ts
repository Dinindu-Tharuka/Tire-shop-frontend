import { useEffect, useState } from "react"
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";
import stockInvoiceService from "../../services/Stock/stock-invoice-service";


const useStockInvoice = () => {
    const [stockInvoices, setStockInvoices] = useState<StockInvoice[]>([])
    const [errorFetchStockInvoice, setErrorFetchStockInvoice] = useState('');
    const [isLoadingInvoices, setIsLoadingInvoices] = useState(false) 

    useEffect(()=>{
      setIsLoadingInvoices(true)
        const {request, cancel} = stockInvoiceService.getAll<StockInvoice>()
        request
          .then(res=>{
            
            setStockInvoices(res.data)
            setIsLoadingInvoices(false)
          })
          .catch(err=> {
            setErrorFetchStockInvoice(err.message === 'canceled'?'':err.message)
            setIsLoadingInvoices(false)
          })

        return ()=> cancel();
    }, [])
  return {stockInvoices, setStockInvoices, errorFetchStockInvoice, isLoadingInvoices, setErrorFetchStockInvoice}
}

export default useStockInvoice