import { Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";
import CustomerSidePanel from "../SidePanel/CustomerSidePanel";
import useCategoryPagination from "../../hooks/Inventory/useCategoryPage";
import useVehicles from "../../hooks/Customer/useVehicles";
import CustomerContext from "../../Contexts/Customer/CustomerContext";
import useCustomer from "../../hooks/Customer/useCustomer";
import VehicleContext from "../../Contexts/Customer/VehicleContext";
import CustomerTable from "../Customer/CustomerTable";
import VehicleTable from "../Vehicle/VehicleTable";

const CustomerMainPage = () => {
  const {
    customers,
    setCustomers,
    nextUrl,
    previousUrl,
    setFilterParams,
    filterParams,
    errorCustomerFetch,
    setErrorCustomerFetch,
    isLoadingCustomer,
    customerCount,
  } = useCustomer();
  const { vehicles, setVehicles } = useVehicles();
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <VehicleContext.Provider value={{ vehicles, setVehicles }}>
      <CustomerContext.Provider
        value={{
          customers,
          setCustomers,
          nextUrl,
          previousUrl,
          setFilterParams,
          filterParams,
          errorCustomerFetch,
          setErrorCustomerFetch,
          isLoadingCustomer,
          customerCount,
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
            <CustomerTable />
          </GridItem>
          <GridItem
            area="aside"
            height={{ base: "10vh", lg: "85vh" }}
            width={{ base: "100vw", lg: "15vw" }}
            boxShadow="dark-lg"
            borderRadius={30}
            padding={5}
            bg={colorMode === "light" ? "#ca5c4f" : ""}
          >
            <CustomerSidePanel />
          </GridItem>
        </Grid>
      </CustomerContext.Provider>
    </VehicleContext.Provider>
  );
};

export default CustomerMainPage;
