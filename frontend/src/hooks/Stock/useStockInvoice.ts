import { useEffect, useState } from "react"
import StockInvoiceService, { StockInvoice, StockInvoicePageStructure } from "../../services/Stock/stock-invoice-service";


const useStockInvoice = () => {
    const [stockInvoices, setStockInvoices] = useState<StockInvoice[]>([])
    const [errorFetchStockInvoice, setErrorFetchStockInvoice] = useState('');
    const [nextStockInvoiceUrl, setNextStockInvoiceUrl] = useState<string | null>('')
    const [previousStockInvoiceUrl, setPreviousStockInvoiceUrl] = useState<string | null>('')
    const [filterStockInvoiceParams, setFilterStockInvoiceParams] = useState<string | null>('')

 
    

    useEffect(()=>{
        const {request, cancel} = StockInvoiceService.getAll<StockInvoicePageStructure>(filterStockInvoiceParams)
        request
          .then(res=>{
            
            setStockInvoices(res.data.results)
            setNextStockInvoiceUrl(res.data.next)
            setPreviousStockInvoiceUrl(res.data.previous)
          })
          .catch(err=> setErrorFetchStockInvoice(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [filterStockInvoiceParams])
  return {stockInvoices, setStockInvoices, errorFetchStockInvoice, nextStockInvoiceUrl, previousStockInvoiceUrl, filterStockInvoiceParams, setFilterStockInvoiceParams}
}

export default useStockInvoice