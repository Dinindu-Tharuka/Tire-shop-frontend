import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'

const RegistraionMainPage = () => {
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
                
                  
            </GridItem>
            <GridItem
              area="aside"
              height={{ base: "10vh", lg: "85vh" }}
              width={{ base: "100vw", lg: "15vw" }}
            >
              
            </GridItem>
          </Grid>
  )
}

export default RegistraionMainPage