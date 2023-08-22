import { Grid, GridItem, Text } from "@chakra-ui/react";

import ItemTable from "../Item/ItemTable";
import { useEffect, useState } from "react";
import InventorySidePanel from "../SidePanel/InventorySidePanel";
import ItemService, { Item } from "../../../services/Inventory/item-service";

import { FieldValues } from "react-hook-form";
import useItems from "../../../hooks/Inventory/useItems";
import ItemCategoryTable from "../Category/ItemCategoryTable";
import categoryService, { Category } from "../../../services/Inventory/category-service";
import useCategory from "../../../hooks/Inventory/useCategory";
import SupplierTable from "../Supplier/SupplierTable";
import useSupplier from "../../../hooks/Inventory/useSupplier";
import SupplierService ,{ Supplier } from "../../../services/Inventory/supplier-service";

import { Outlet } from "react-router-dom";
import SupplierContext from "../../../Contexts/SupplierContext";
import ItemCategoryContext from "../../../Contexts/CategoryContext";
import ItemContext from "../../../Contexts/ItemContext";

const Inventory = () => {
  const { items, setItems, error, setError } = useItems();
  const { categories, setCategories, errorFetchCategory, setErrorFetchCategory} = useCategory();
  const { suppliers, setSuppliers, errorFetchSupplier, setErrorFetchSupplier } = useSupplier();



 


  // Item

  


  

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      <ItemCategoryContext.Provider value={{ categories,setCategories }}>
        <SupplierContext.Provider value={ {suppliers, setSuppliers}}>
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
              {/* <ItemTable/> */}
              {/* <ItemCategoryTable /> */}
                
                {/* <SupplierTable/> */}
                
                  <Outlet/>
            </GridItem>
            <GridItem
              area="aside"
              height={{ base: "10vh", lg: "85vh" }}
              width={{ base: "100vw", lg: "15vw" }}
            >
              <InventorySidePanel
              />
            </GridItem>
          </Grid>
        </SupplierContext.Provider>
      </ItemCategoryContext.Provider>
    </ItemContext.Provider>
    
 
  );
};

export default Inventory;
