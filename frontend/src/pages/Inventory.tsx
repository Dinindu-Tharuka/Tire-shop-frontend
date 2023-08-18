import { Grid, GridItem, Text } from "@chakra-ui/react"

import ItemTable from "../componants/Inventory/ItemTable"
import { useEffect, useState } from "react";
import InventorySidePanel from "../componants/Inventory/InventorySidePanel";
import ItemService, { Item } from "../services/item-service";
import apiClient from "../services/api-client";
import { FieldValues } from "react-hook-form";



const Inventory = () => {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState('')

  const onDelete = (itemSelected:Item)=>{   
    const originalItems = [...items]
    setItems(items.filter(item=> item.item_id !== itemSelected.item_id)) 
    apiClient
        .delete(`items/${itemSelected.item_id}/`)
        .catch(error =>{
          setError(error.message)
          setItems(originalItems)
        })

        
      }
      
    
    const onCreatedItem = (data:FieldValues)=>{
        const createdItem : Item= {
          item_id:data.item_id,
          name:data.name,
          size:data.size,
          brand:data.brand,
          type:data.type,
          plyrating:data.plyrating,
          country:data.country,
          vale_type:data.vale_type,
          item_category:data.item_category,
          supplier:data.supplier,
        }
        setItems([createdItem, ...items])
        
        
    }

  
  useEffect(()=>{
      const {request, cancel} = ItemService.getAllItems()   
      request     
          .then(response=> setItems(response.data))
          .catch(error=>setError(error.message === 'canceled'? '':error.message));

        return ()=>cancel();
    }, [])
  return (
    <>
    {/* Errors */}
      {error && <Text textColor='#e60000'>{error}</Text>}

      {/* Grid */}
      <Grid templateAreas={{
          lg:`"main aside"`,
          base:`"aside" "main"`}}>
          <GridItem 
            area='main' 
            height={{base:'10vh', lg:'85vh'}} 
            width={{base:'100vw', lg:'60vw'}}>
              <ItemTable onSelectedDeleteItem={(item)=>onDelete(item)} items={items}/>
          </GridItem>
          <GridItem 
            area='aside' 
            height={{base:'10vh', lg:'85vh'}} 
            width={{base:'100vw', lg:'15vw'}}>
              <InventorySidePanel onCreated={onCreatedItem}/>
          </GridItem>
      </Grid>
    </>
  )
}

export default Inventory