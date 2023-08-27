import { Grid, GridItem, useColorMode } from '@chakra-ui/react'
import React from 'react'
import BillingSidePanel from '../SidePanel/BillingSidePanel';

const BillingMainPage = () => {
    const {toggleColorMode, colorMode} = useColorMode();
  return (
    <Grid
              templateAreas={{
                lg: `"main aside"`,
                base: `"aside" "main"`,
              }}
            >
              <GridItem
                area="main"
                height={{ base: "10vh", lg: "85vh" }}
                width={{ base: "100vw", lg: "60vw" }}
                
              >  
              {/* <CustomerTable/> */}
              
              </GridItem>
              <GridItem
                area="aside"
                height={{ base: "10vh", lg: "85vh" }}
                width={{ base: "100vw", lg: "15vw" }}
                boxShadow='dark-lg'
                borderRadius={30}
                padding={5}
                bg={colorMode === 'light'?'#ca5c4f':''}
              >
                <BillingSidePanel/>
                
              </GridItem>
      </Grid>
  )
}

export default BillingMainPage