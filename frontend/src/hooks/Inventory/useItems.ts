import { useEffect, useState } from "react"
import ItemService,{ Item } from "../../services/Inventory/item-service"


const useItems = () => {
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState('')

    useEffect(()=>{
        const {request, cancel} = ItemService.getAll<Item>()   
        request     
            .then(response=> setItems(response.data))
            .catch(error=>setError(error.message === 'canceled'? '':error.message));
  
          return ()=>cancel();
      }, [])

    return {items, error, setItems, setError}
  
}

export default useItems