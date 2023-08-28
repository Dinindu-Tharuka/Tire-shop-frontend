import { useEffect, useState } from "react"
import StockItemService,{ StockItem } from "../../services/Stock/stock-item-service";


const useStockItem = () => {
    const [stockItems, setStockItems] = useState<StockItem[]>([])
    const [errorFetchStockItems, setErrorFetchStockItems] = useState('');

    useEffect(()=>{
        const {request, cancel} = StockItemService.getAll<StockItem>()
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