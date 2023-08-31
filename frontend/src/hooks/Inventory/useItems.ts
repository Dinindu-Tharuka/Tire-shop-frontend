import { useEffect, useState } from "react"
import ItemService from "../../services/Inventory/item-service"
import { Item } from "../../services/Inventory/item-page-service"



const useItems = () => {
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState('')


    useEffect(()=>{
        const {request, cancel} = ItemService.getAll<Item>()  
        request     
            .then(res=> {
                setItems(res.data)
                
            })
            .catch(error=>{
                setError(error.message === 'canceled'? '':error.message)
            });
  
          return ()=>cancel();
      }, [])

    return {items, setItems, setError , error}
  
}

export default useItems