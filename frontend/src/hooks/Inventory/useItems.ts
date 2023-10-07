import { useEffect, useState } from "react"
import ItemService from "../../services/Inventory/item-service"
import { Item } from "../../services/Inventory/item-page-service"
import axios from "axios"



const useAllItems = () => {
    const [allItems, setAllItems] = useState<Item[]>([])
    const [error, setError] = useState('')
    const [itemQuery, setAllItemQuery] = useState('')
    const [itemSizeQuery, setAllItemSizeQuery] = useState('')
    const [itemBrandQuery, setAllItemBrandQuery] = useState('')

    console.log(itemBrandQuery)

    useEffect(()=>{
        const {request, cancel} = ItemService.getAll<Item>({params: { itemQuery, itemSizeQuery, itemBrandQuery }})
        
        request     
            .then(res=> {
                setAllItems(res.data)
                
            })
            .catch(error=>{
                setError(error.message === 'canceled'? '':error.message)
            });
  
          return ()=>cancel();
      }, [itemQuery, itemSizeQuery, itemBrandQuery])

    return {allItems, setAllItems, setError , error, setAllItemQuery, setAllItemSizeQuery, setAllItemBrandQuery}
  
}

export default useAllItems