import { useEffect, useState } from "react"
import { StockInvoice } from "../../services/Stock/stock-invoice-page-service";
import stockInvoiceService from "../../services/Stock/stock-invoice-service";


const useAllStockInvoice = () => {
    const [stockInvoices, setStockInvoices] = useState<StockInvoice[]>([])
    const [errorFetchStockInvoice, setErrorFetchStockInvoice] = useState('');
    const [isLoadingInvoices, setIsLoadingInvoices] = useState(false) 

    // Fltering
    const [filterGrnNo, setFilterGrnNo] = useState('')
    const [filterInvoiceNo, setFilterInvoiceNo] = useState('')
    const [filterSupplier, setFilterSupplier] = useState('')

    useEffect(()=>{
      setIsLoadingInvoices(true)
        const {request, cancel} = stockInvoiceService.getAll<StockInvoice>({params:{ filterGrnNo, filterInvoiceNo, filterSupplier }})
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
    }, [filterGrnNo, filterInvoiceNo, filterSupplier])
  return {stockInvoices, setStockInvoices, errorFetchStockInvoice, isLoadingInvoices, setErrorFetchStockInvoice, setFilterGrnNo, setFilterInvoiceNo, setFilterSupplier}
}

export default useAllStockInvoice