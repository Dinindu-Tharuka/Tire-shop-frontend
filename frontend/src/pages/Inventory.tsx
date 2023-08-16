import { Grid, GridItem, Text } from "@chakra-ui/react"

import ItemTable from "../componants/Inventory/ItemTable"
import { useEffect, useState } from "react";
import InventorySidePanel from "../componants/Inventory/InventorySidePanel";
import ItemService, { Item } from "../services/item-service";



const Inventory = () => {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState('')

  
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
              <ItemTable items={items}/>
          </GridItem>
          <GridItem 
            area='aside' 
            height={{base:'10vh', lg:'85vh'}} 
            width={{base:'100vw', lg:'15vw'}}>
              <InventorySidePanel/>
          </GridItem>
      </Grid>
    </>
  )
}

export default Inventory