import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import RegistrationSidePanel from '../SidePanel/RegistrationSidePanel'
import { Outlet } from 'react-router-dom'
import useSupplier from '../../hooks/Inventory/useSupplier'
import SupplierContext from '../../Contexts/SupplierContext'

const RegistraionMainPage = () => {
  const {
    suppliers,
    setSuppliers,
    nextSupplierUrl,
    previousSupplierUrl,
    filterSupplierParams,
    setFilterSupplierParams,
  } = useSupplier();
  return (
    <SupplierContext.Provider
          value={{
            suppliers,
            setSuppliers,
            nextSupplierUrl,
            previousSupplierUrl,
            filterSupplierParams,
            setFilterSupplierParams,
          }}
        >
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

            <Outlet/>
                
                  
            </GridItem>
            <GridItem
              area="aside"
              height={{ base: "10vh", lg: "85vh" }}
              width={{ base: "100vw", lg: "15vw" }}
            >
              <RegistrationSidePanel/>
              
            </GridItem>
          </Grid>
          </SupplierContext.Provider>
  )
}

export default RegistraionMainPage