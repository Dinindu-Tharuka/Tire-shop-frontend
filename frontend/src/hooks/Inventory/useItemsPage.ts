import { useEffect, useState } from "react"
import ItemService,{ Item, ItemPageStructure } from "../../services/Inventory/item-page-service"


const useItemsPagination = () => {
    const [items, setItems] = useState<Item[]>([])
    const [error, setError] = useState('')
    const [nextItemPageUrl, setnextItemPageUrl] = useState<string | null>('')
    const [previousItemPageUrl, setPreviousItemPageUrl] = useState<string | null>('')
    const [filterItemPageParams, setFilterItemPageParams] = useState<string | null>('')
    const [isLoadingItems, setIsLoadingItems] = useState(false)
    const [itemCount, setItemCount] = useState(0)
    


    useEffect(()=>{
        setIsLoadingItems(true)
        const {request, cancel} = ItemService.getAll<ItemPageStructure>(filterItemPageParams)   
        request     
            .then(res=> {
                setItems(res.data.results)
                setnextItemPageUrl(res.data.next)
                setPreviousItemPageUrl(res.data.previous)
                setIsLoadingItems(false)
                setItemCount(res.data.count)
            })
            .catch(error=>{
                setError(error.message === 'canceled'? '':error.message)                
                setIsLoadingItems(false)
            });
  
          return ()=>cancel();
      }, [filterItemPageParams])

    return {items, setItems, nextItemPageUrl, previousItemPageUrl, filterItemPageParams, setFilterItemPageParams, error, isLoadingItems, setError, itemCount}
  
}

export default useItemsPagination