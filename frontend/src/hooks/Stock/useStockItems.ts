import { useEffect, useState } from "react"
import StockItemService,{ StockItemDefault } from "../../services/Stock/stock-item-service";


const useStockItem = () => {
    const [stockItems, setStockItems] = useState<StockItemDefault[]>([])
    const [errorFetchStockItems, setErrorFetchStockItems] = useState('');

    // Filtering 
    const [stockItemsInvoiceNoFilter, setStockItemsInvoiceNoFilter] = useState('')
    const [stockItemsItemIdFilter, setStockItemsItemIdFilter] = useState('')
    const [stockItemsBrandFilter, setStockItemsBrandFilter] = useState('')
    const [stockItemsSizeFilter, setStockItemsSizeFilter] = useState('')
    const [stockItemsStartDateFilter, setStockItemsStartDateFilter] = useState('')
    const [stockItemsEndDateFilter, setStockItemsEndDateFilter] = useState('')

    useEffect(()=>{
        const {request, cancel} = StockItemService.getAll<StockItemDefault>({params: {stockItemsInvoiceNoFilter, stockItemsItemIdFilter, stockItemsBrandFilter, stockItemsSizeFilter, stockItemsStartDateFilter, stockItemsEndDateFilter }})
        request
          .then(res=>{
            setStockItems(res.data)
          })
          .catch(err=> setErrorFetchStockItems(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [stockItemsInvoiceNoFilter, stockItemsItemIdFilter, stockItemsBrandFilter, stockItemsSizeFilter, stockItemsStartDateFilter, stockItemsEndDateFilter])
  return {stockItems, setStockItems, errorFetchStockItems, setErrorFetchStockItems, setStockItemsInvoiceNoFilter, setStockItemsItemIdFilter, setStockItemsBrandFilter, setStockItemsSizeFilter, setStockItemsStartDateFilter, setStockItemsEndDateFilter}
}

export default useStockItem