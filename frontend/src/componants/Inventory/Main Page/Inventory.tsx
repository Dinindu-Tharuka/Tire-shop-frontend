import { Grid, GridItem, Text } from "@chakra-ui/react";

import ItemTable from "../Item/ItemTable";
import { useEffect, useState } from "react";
import InventorySidePanel from "../SidePanel/InventorySidePanel";
import ItemService, { Item } from "../../../services/Inventory/item-service";

import { FieldValues } from "react-hook-form";
import useItems from "../../../hooks/Inventory/useItems";
import ItemCategoryTable from "../Category/ItemCategoryTable";
import { Category } from "../../../services/Inventory/category-service";

const Inventory = () => {
  const { items, error, setError, setItems } = useItems();
  const [createdCategory, setCreatedCategory] = useState<Category>();

  const onDelete = (itemSelected: Item) => {
    const originalItems = [...items];
    setItems(items.filter((item) => item.item_id !== itemSelected.item_id));

    ItemService.delete(itemSelected.item_id).catch((error) => {
      setError(error.message);
      setItems(originalItems);
    });
  };

  const onCreatedItem = (data: FieldValues) => {
    const createdItem: Item = {
      item_id: data.item_id,
      name: data.name,
      size: data.size,
      brand: data.brand,
      type: data.type,
      plyrating: data.plyrating,
      country: data.country,
      vale_type: data.vale_type,
      item_category: data.item_category,
      supplier: data.supplier,
    };
    setItems([createdItem, ...items]);
  };

  const onUpdatedItem = (data: FieldValues) => {
    const updatedItem: Item = {
      item_id: data.item_id,
      name: data.name,
      size: data.size,
      brand: data.brand,
      type: data.type,
      plyrating: data.plyrating,
      country: data.country,
      vale_type: data.vale_type,
      item_category: data.item_category,
      supplier: data.supplier,
    };
    setItems(
      items.map((item) =>
        item.item_id === updatedItem.item_id ? updatedItem : item
      )
    );
  };

  return (
    <>
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
          <ItemTable
            updatedItem={onUpdatedItem}
            onSelectedDeleteItem={(item) => onDelete(item)}
            items={items}
          />
          {/* <ItemCategoryTable createdCategory={createdCategory} /> */}
        </GridItem>
        <GridItem
          area="aside"
          height={{ base: "10vh", lg: "85vh" }}
          width={{ base: "100vw", lg: "15vw" }}
        >
          <InventorySidePanel
            onCretedCategory={(category) => setCreatedCategory(category)}
            onCreated={onCreatedItem}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default Inventory;
