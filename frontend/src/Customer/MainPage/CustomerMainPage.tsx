import { Grid, GridItem, Text } from "@chakra-ui/react";
import CustomerSidePanel from "../SidePanel/CustomerSidePanel";
import useCategory from "../../hooks/Inventory/useCategory";
import useVehicles from "../../hooks/Customer/useVehicles";
import CustomerContext from "../../Contexts/Customer/CustomerContext";
import useCustomer from "../../hooks/Customer/useCustomer";
import VehicleContext from "../../Contexts/Customer/VehicleContext";
import CustomerTable from "../Customer/CustomerTable";
import VehicleTable from "../Vehicle/VehicleTable";


const CustomerMainPage = () => {
  const {customers, setCustomers, nextUrl, previousUrl, setFilterParams, filterParams} = useCustomer();
  const {vehicles, setVehicles} = useVehicles()
  return (
    <VehicleContext.Provider value={{vehicles, setVehicles}}>
    <CustomerContext.Provider value={{ customers, setCustomers, nextUrl, previousUrl, setFilterParams, filterParams }}>
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
              <CustomerTable/>
              {/* <VehicleTable/> */}
                  
                  {/* <Outlet/> */}
              </GridItem>
              <GridItem
                area="aside"
                height={{ base: "10vh", lg: "85vh" }}
                width={{ base: "100vw", lg: "15vw" }}
              >
                <CustomerSidePanel/>
                
              </GridItem>
      </Grid>
    </CustomerContext.Provider>
    </VehicleContext.Provider>
  )
}

export default CustomerMainPage