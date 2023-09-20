import { useEffect, useState } from "react"
import StockItemService,{ StockItemDefault } from "../../services/Stock/stock-item-service";


const useStockItem = () => {
    const [stockItems, setStockItems] = useState<StockItemDefault[]>([])
    const [errorFetchStockItems, setErrorFetchStockItems] = useState('');

    useEffect(()=>{
        const {request, cancel} = StockItemService.getAll<StockItemDefault>()
        request
          .then(res=>{
            setStockItems(res.data)
          })
          .catch(err=> setErrorFetchStockItems(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [])
  return {stockItems, setStockItems, errorFetchStockItems, setErrorFetchStockItems}
}

export default useStockItem