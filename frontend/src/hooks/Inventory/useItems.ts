import { useEffect, useState } from "react"
import ItemService,{ Item, ItemPageStructure } from "../../services/Inventory/item-service"


const useItems = () => {
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState('')
    const [nextItemPageUrl, setnextItemPageUrl] = useState<string | null>('')
    const [previousItemPageUrl, setPreviousItemPageUrl] = useState<string | null>('')
    const [filterItemPageParams, setFilterItemPageParams] = useState<string | null>('')
    


    useEffect(()=>{
        const {request, cancel} = ItemService.getAll<ItemPageStructure>(filterItemPageParams)   
        request     
            .then(res=> {
                setItems(res.data.results)
                setnextItemPageUrl(res.data.next)
                setPreviousItemPageUrl(res.data.previous)
            })
            .catch(error=>setError(error.message === 'canceled'? '':error.message));
  
          return ()=>cancel();
      }, [filterItemPageParams])

    return {items, setItems, nextItemPageUrl, previousItemPageUrl, filterItemPageParams, setFilterItemPageParams, error}
  
}

export default useItems