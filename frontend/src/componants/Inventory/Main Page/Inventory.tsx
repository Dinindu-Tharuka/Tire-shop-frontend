import { Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";
import InventorySidePanel from "../SidePanel/InventorySidePanel";
import useItems from "../../../hooks/Inventory/useItems";
import useCategory from "../../../hooks/Inventory/useCategory";
import useSupplier from "../../../hooks/Inventory/useSupplier";
import { Outlet } from "react-router-dom";
import SupplierContext from "../../../Contexts/SupplierContext";
import ItemCategoryContext from "../../../Contexts/CategoryContext";
import ItemContext from "../../../Contexts/ItemContext";

const Inventory = () => {
  const {toggleColorMode, colorMode} = useColorMode();
  const {
    items,
    setItems,
    nextItemPageUrl,
    previousItemPageUrl,
    filterItemPageParams,
    setFilterItemPageParams,
    error,
  } = useItems();
  const {
    categories,
    setCategories,
    nextCategoryUrl,
    previousCategoryUrl,
    filterCategoryParams,
    setFilterCategoryParams,
  } = useCategory();
  const {
    suppliers,
    setSuppliers,
    nextSupplierUrl,
    previousSupplierUrl,
    filterSupplierParams,
    setFilterSupplierParams,
  } = useSupplier();

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        nextItemPageUrl,
        previousItemPageUrl,
        filterItemPageParams,
        setFilterItemPageParams,
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
        }}
      >
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
          {/* Errors */}
          {error && <Text textColor="#e60000">{error}</Text>}

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
              <Outlet />
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
              <InventorySidePanel />
            </GridItem>
          </Grid>
        </SupplierContext.Provider>
      </ItemCategoryContext.Provider>
    </ItemContext.Provider>
  );
};

export default Inventory;
