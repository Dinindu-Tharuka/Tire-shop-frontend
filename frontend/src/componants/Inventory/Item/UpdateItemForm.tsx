import { Button, HStack, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ItemService, { Item } from "../../../services/Inventory/item-service";

interface Props {
  selectedUpdateItem: Item;
  updatedItem: (data: FieldValues) => void;
}

const UpdateItemForm = ({ selectedUpdateItem, updatedItem }: Props) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {toggleColorMode, colorMode} = useColorMode();

  const onSubmit = (data: FieldValues) => {
    ItemService.update(data, data.item_id)
      .then((res) => {
        setSuccess("Successfully Updated.");
        updatedItem(data);
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
            <input
              {...register("item_id")}
              defaultValue={selectedUpdateItem.item_id}
              id="id"
              type="text"
              className="form-control"
              placeholder="Item ID"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("name")}
              defaultValue={selectedUpdateItem.name}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("size")}
              defaultValue={selectedUpdateItem.size}
              type="text"
              className="form-control"
              placeholder="Size"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("brand")}
              defaultValue={selectedUpdateItem.brand}
              type="text"
              className="form-control"
              placeholder="Brand"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("type")}
              defaultValue={selectedUpdateItem.type}
              type="text"
              className="form-control"
              placeholder="Type"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("plyrating")}
              defaultValue={selectedUpdateItem.plyrating}
              type="text"
              className="form-control"
              placeholder="Plyrating"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("country")}
              defaultValue={selectedUpdateItem.country}
              type="text"
              className="form-control"
              placeholder="Country"
            />
          </div>
          <div className="mb-3">
            <select {...register("vale_type")} className="select w-100 p-2">
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
            </select>
          </div>
          <div className="mb-3">
            <select {...register("item_category")} className="select w-100 p-2">
              <option>
                {selectedUpdateItem.item_category !== null
                  ? selectedUpdateItem.item_category
                  : "Select Category"}
              </option>
              
              <option value="2">Three</option>
            </select>
          </div>
          <div className="mb-3">
            <select {...register("supplier")} className="select w-100 p-2">
              <option>
                {selectedUpdateItem.item_category !== null
                  ? selectedUpdateItem.item_category
                  : "Select Supplier"}
              </option>
              <option value="1">Two</option>
              <option value="2">Three</option>
            </select>
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            onClick={() => {}}
            bg={colorMode === 'light'? '#e3a99c':'#575757'}
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
