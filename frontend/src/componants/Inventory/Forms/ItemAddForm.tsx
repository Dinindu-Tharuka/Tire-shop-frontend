import { HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ItemService, { Item } from "../../../services/Inventory/item-service";
import useCategory from "../../../hooks/Inventory/useCategory";

interface Props {
  onClose: () => void;
  onCretedItem: (data: FieldValues) => void;
}

const ItemAddForm = ({ onClose, onCretedItem }: Props) => {
  const { register, handleSubmit } = useForm();
  const [errorItemCreate, setErrorItemCreate] = useState("");
  const [success, setSuccess] = useState("");

  const {categories, errorFetchCategory} = useCategory();

  const onSubmit = (data: FieldValues) => {
    ItemService.create(data)
      .then((res) => {
        if (res.status === 200) {
          setSuccess("Successfully Created.");
          onCretedItem(data);
        }
      })
      .catch((err) => {
        if (err.message !== "canceled") {
          setErrorItemCreate(err.message);
        }
      });
  };

  return (
    <>
      {errorItemCreate && <Text textColor="#dd0939">{errorItemCreate}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <input
              {...register("item_id")}
              id="id"
              type="text"
              className="form-control"
              placeholder="Item ID"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("name")}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("size")}
              type="text"
              className="form-control"
              placeholder="Size"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("brand")}
              type="text"
              className="form-control"
              placeholder="Brand"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("type")}
              type="text"
              className="form-control"
              placeholder="Type"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("plyrating")}
              type="text"
              className="form-control"
              placeholder="Plyrating"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("country")}
              type="text"
              className="form-control"
              placeholder="Country"
            />
          </div>
          <div className="mb-3">
            <select {...register("item_category")} className="select w-100 p-2">
              <option>Select Category</option>
              {categories.map(category => <option value={category.id}>{category.category_name}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <select {...register("vale_type")} className="select w-100 p-2">
              <option value="Not selected">Valve Type</option>
              <option value="Long Valve">Long Valve</option>
              <option value="Short Valve">Short Valve</option>
            </select>
          </div>
          <div className="mb-3">
            <select {...register("supplier")} className="select w-100 p-2">
              <option>Select Supplier</option>
              <option value="1">Two</option>
              <option value="2">Three</option>
            </select>
          </div>
        </div>
        <HStack justifyContent="space-between">
          <button
            className="btn btn-primary align-self-end btn-lg"
            type="submit"
            onClick={() => {
              setErrorItemCreate("");
              setSuccess("");
            }}
          >
            Save
          </button>
        </HStack>
      </form>
    </>
  );
};

export default ItemAddForm;
