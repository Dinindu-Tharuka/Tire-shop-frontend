import { Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";
import CustomerSidePanel from "../SidePanel/CustomerSidePanel";
import useVehicles from "../../hooks/Customer/useVehicles";
import CustomerContext from "../../Contexts/Customer/CustomerContext";
import useCustomer from "../../hooks/Customer/useCustomer";
import VehicleContext from "../../Contexts/Customer/VehicleContext";
import CustomerTable from "../Customer/CustomerTable";
import useSupplier from "../../hooks/Registration/useSupplier";
import SupplierContext from "../../Contexts/Registration/SupplierContext";

const CustomerMainPage = () => {
  
  const {
    suppliers,
    setSuppliers,
    errorFetchSupplier,
    nextSupplierUrl,
    previousSupplierUrl,
    filterSupplierParams,
    setFilterSupplierParams,
    suppliersCount,
    isLoadingSupplierPage,
    setErrorFetchSupplier,
    setSupplierNameFilter,
    supplierNameFilter,
  } = useSupplier();
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
    setCustomerNameFilter,
  } = useCustomer();
  const { vehicles, setVehicles, setVehicleNoFilter, errorVehicleFetch } = useVehicles();
  const { colorMode } = useColorMode();
  return (
    
      <SupplierContext.Provider
        value={{
          suppliers,
          setSuppliers,
          errorFetchSupplier,
          nextSupplierUrl,
          previousSupplierUrl,
          filterSupplierParams,
          setFilterSupplierParams,
          suppliersCount,
          isLoadingSupplierPage,
          setErrorFetchSupplier,
          setSupplierNameFilter,
        }}
      >
        <VehicleContext.Provider
          value={{ vehicles, setVehicles, setVehicleNoFilter, errorVehicleFetch }}
        >
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
              setCustomerNameFilter,
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
      </SupplierContext.Provider>
  );
};

export default CustomerMainPage;
