import { Button, HStack, Input, Select, Text, useColorMode } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ItemService, { Item } from "../../services/Inventory/item-page-service";
import ItemPageContext from "../../Contexts/Inventory/ItemPageContext";
import useCategoryPagination from "../../hooks/Inventory/useCategoryPage";
import useSupplier from "../../hooks/Registration/useSupplier";

interface Props {
  selectedUpdateItem: Item;
}

const UpdateItemForm = ({ selectedUpdateItem }: Props) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();

  const { categories } = useCategoryPagination();
  const { suppliers } = useSupplier();

  const { items, setItems } = useContext(ItemPageContext);

  const onSubmit = (data: FieldValues) => {
    ItemService.update(data, data.item_id)
      .then((res) => {
        setSuccess("Successfully Updated.");
        setItems(
          items.map((item) =>
            item.item_id === res.data.item_id ? res.data : item
          )
        );
      })
      .catch((err) => {
        if (err.message !== "canceled") {
          setError(err.message);
        }
      });
  };
  return (
    <>
      {error && <Text textColor="#dd0939">{error}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              {...register("item_id")}
              defaultValue={selectedUpdateItem.item_id}
              type="text"
              placeholder="Item ID"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("name")}
              defaultValue={selectedUpdateItem.name}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("size")}
              defaultValue={selectedUpdateItem.size}
              type="text"
              placeholder="Size"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("brand")}
              defaultValue={selectedUpdateItem.brand}
              type="text"
              placeholder="Brand"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("type")}
              defaultValue={selectedUpdateItem.type}
              type="text"
              placeholder="Type"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("plyrating")}
              defaultValue={selectedUpdateItem.plyrating}
              type="text"
              placeholder="Plyrating"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("country")}
              defaultValue={selectedUpdateItem.country}
              type="text"
              placeholder="Country"
            />
          </div>
          <div className="mb-3">
            <Select {...register("vale_type")} className="select w-100 p-2">
              <option
                value={
                  selectedUpdateItem.vale_type !== "Not selected"
                    ? selectedUpdateItem.vale_type
                    : "Not selected"
                }
              >
                {selectedUpdateItem.vale_type !== "Not selected"
                  ? selectedUpdateItem.vale_type
                  : "Valve Type"}
              </option>
              <option value="Long Valve">Long Valve</option>
              <option value="Short Valve">Short Valve</option>
            </Select>
          </div>
          <div className="mb-3">
            <Select {...register("item_category")} className="select w-100 p-2">
              <option>
                {selectedUpdateItem.item_category !== null
                  ? categories.find(
                      (category) =>
                        category.id === selectedUpdateItem.item_category
                    )?.category_name
                  : "Select Category"}
              </option>

              {categories.map((category, index) => (
                <option key={index} value="2">
                  {category.category_name}
                </option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <Select {...register("supplier")} className="select w-100 p-2">
              <option>
                {selectedUpdateItem.supplier !== null
                  ? suppliers.find(
                      (course) => course.id === selectedUpdateItem.supplier
                    )?.name
                  : "Select Supplier"}
              </option>
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            onClick={() => {}}
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            type="submit"
          >
            Save
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default UpdateItemForm;
