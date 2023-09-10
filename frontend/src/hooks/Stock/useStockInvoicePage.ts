import { useEffect, useState } from "react"
import StockInvoiceService, { StockInvoice, StockInvoicePageStructure } from "../../services/Stock/stock-invoice-page-service";


const useStockInvoicePage = () => {
    const [stockInvoices, setStockInvoices] = useState<StockInvoice[]>([])
    const [errorFetchStockInvoice, setErrorFetchStockInvoice] = useState('');
    const [nextStockInvoiceUrl, setNextStockInvoiceUrl] = useState<string | null>('')
    const [previousStockInvoiceUrl, setPreviousStockInvoiceUrl] = useState<string | null>('')
    const [filterStockInvoiceParams, setFilterStockInvoiceParams] = useState<string | null>('')
    const [isLoadingInvoices, setIsLoadingInvoices] = useState(false) 
    const [invoicesCount, setInvoicesCount] = useState(0)   

    useEffect(()=>{
      setIsLoadingInvoices(true)
        const {request, cancel} = StockInvoiceService.getAll<StockInvoicePageStructure>(filterStockInvoiceParams)
        request
          .then(res=>{
            
            setStockInvoices(res.data.results)
            setNextStockInvoiceUrl(res.data.next)
            setPreviousStockInvoiceUrl(res.data.previous)
            setIsLoadingInvoices(false)
            setInvoicesCount(res.data.count)
          })
          .catch(err=> {
            setErrorFetchStockInvoice(err.message === 'canceled'?'':err.message)
            setIsLoadingInvoices(false)
          })

        return ()=> cancel();
    }, [filterStockInvoiceParams])
  return {stockInvoices, setStockInvoices, errorFetchStockInvoice, nextStockInvoiceUrl, previousStockInvoiceUrl, filterStockInvoiceParams, setFilterStockInvoiceParams, isLoadingInvoices, invoicesCount, setErrorFetchStockInvoice}
}

export default useStockInvoicePage