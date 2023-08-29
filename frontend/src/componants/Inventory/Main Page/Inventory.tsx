import { Grid, GridItem, Spinner, Text, useColorMode, useToast } from "@chakra-ui/react";
import InventorySidePanel from "../SidePanel/InventorySidePanel";
import useItems from "../../../hooks/Inventory/useItems";
import useCategory from "../../../hooks/Inventory/useCategory";
import useSupplier from "../../../hooks/Registration/useSupplier";
import { Outlet } from "react-router-dom";
import SupplierContext from "../../../Contexts/Registration/SupplierContext";
import ItemCategoryContext from "../../../Contexts/Inventory/CategoryContext";
import ItemContext from "../../../Contexts/Inventory/ItemContext";

const Inventory = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const toast = useToast()
  const {
    items,
    setItems,
    nextItemPageUrl,
    previousItemPageUrl,
    filterItemPageParams,
    setFilterItemPageParams,
    isLoadingItems,
    error,
    setError    
  } = useItems();
  const {
    categories,
    setCategories,
    nextCategoryUrl,
    previousCategoryUrl,
    filterCategoryParams,
    setFilterCategoryParams,
    isLoadingCategories,
    errorFetchCategory,
    setErrorFetchCategory  
    
  } = useCategory();


  

  

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        nextItemPageUrl,
        previousItemPageUrl,
        filterItemPageParams,
        setFilterItemPageParams,
        isLoadingItems,
        setError,
        error
      }}
    >
      <ItemCategoryContext.Provider
        value={{
          categories,
          setCategories,
          nextCategoryUrl,
          previousCategoryUrl,
          filterCategoryParams,
          setFilterCategoryParams,
          isLoadingCategories,
          setErrorFetchCategory,
          errorFetchCategory
        }}
      >
        

        {/* Grid */}
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
            {(isLoadingCategories || isLoadingItems ) && <Spinner/>}
            
            
            <Outlet />
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
            <InventorySidePanel />
          </GridItem>
        </Grid>
      </ItemCategoryContext.Provider>
    </ItemContext.Provider>
  );
};

export default Inventory;
