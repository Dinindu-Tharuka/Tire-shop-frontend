import { useEffect, useState } from "react"
import StockInvoiceService, { StockInvoice, StockInvoicePageStructure } from "../../services/Stock/stock-invoice-service";


const useStockInvoice = () => {
    const [stockInvoices, setStockInvoices] = useState<StockInvoice[]>([])
    const [errorFetchStockInvoice, setErrorFetchStockInvoice] = useState('');
    const [nextStockInvoiceUrl, setNextStockInvoiceUrl] = useState<string | null>('')
    const [previousStockInvoiceUrl, setPreviousStockInvoiceUrl] = useState<string | null>('')
    const [filterStockInvoiceParams, setFilterStockInvoiceParams] = useState<string | null>('')
    const [isLoadingInvoices, setIsLoadingInvoices] = useState(false)    

    useEffect(()=>{
      setIsLoadingInvoices(true)
        const {request, cancel} = StockInvoiceService.getAll<StockInvoicePageStructure>(filterStockInvoiceParams)
        request
          .then(res=>{
            
            setStockInvoices(res.data.results)
            setNextStockInvoiceUrl(res.data.next)
            setPreviousStockInvoiceUrl(res.data.previous)
            setIsLoadingInvoices(false)
          })
          .catch(err=> {
            setErrorFetchStockInvoice(err.message === 'canceled'?'':err.message)
            setIsLoadingInvoices(false)
          })

        return ()=> cancel();
    }, [filterStockInvoiceParams])
  return {stockInvoices, setStockInvoices, errorFetchStockInvoice, nextStockInvoiceUrl, previousStockInvoiceUrl, filterStockInvoiceParams, setFilterStockInvoiceParams, isLoadingInvoices}
}

export default useStockInvoice