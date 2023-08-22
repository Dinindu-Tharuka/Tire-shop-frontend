import { Grid, GridItem, Text } from "@chakra-ui/react";
import CustomerSidePanel from "../SidePanel/CustomerSidePanel";


const CustomerMainPage = () => {
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
            <h1>Main</h1>
                
                {/* <Outlet/> */}
            </GridItem>
            <GridItem
              area="aside"
              height={{ base: "10vh", lg: "85vh" }}
              width={{ base: "100vw", lg: "15vw" }}
            >
                <h1>Side</h1>
              <CustomerSidePanel/>
            </GridItem>
          </Grid>
  )
}

export default CustomerMainPage