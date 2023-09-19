import { useEffect, useState } from "react"
import StockItemUniqueService, { StockItemUnique } from "../../services/Stock/stock-item-unique-service";



const useStockItemUnique = () => {
    const [stockItemsUnique, setStockItemsUnique] = useState<StockItemUnique[]>([])
    const [errorFetchStockItemsUnque, setErrorFetchStockItemsunique] = useState('');

    useEffect(()=>{
        const {request, cancel} = StockItemUniqueService.getAll<StockItemUnique>()
        request
          .then(res=>{
            setStockItemsUnique(res.data)
          })
          .catch(err=> setErrorFetchStockItemsunique(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [])
  return {stockItemsUnique, setStockItemsUnique, errorFetchStockItemsUnque, setErrorFetchStockItemsunique}
}

export default useStockItemUnique