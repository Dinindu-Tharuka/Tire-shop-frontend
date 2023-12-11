import {
  Button,
  HStack,
  Input,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ItemService, { Item } from "../../services/Inventory/item-page-service";
import ItemPageContext from "../../Contexts/Inventory/ItemPageContext";
import FilterCategory from "../Category/FilterCategory";
import { Category } from "../../services/Inventory/category-page-service";

const ItemAddForm = () => {
  const [errorItemCreate, setErrorItemCreate] = useState("");
  const [success, setSuccess] = useState("");

  const { register, handleSubmit } = useForm();
  const { colorMode } = useColorMode();
  const { items, setItems } = useContext(ItemPageContext);
  const [selectedCatgory, setSelectedCatgory] = useState<Category | null>(null);
  

  const onSubmit = (data: FieldValues) => {
    const newly = {
      ...data,
      item_category: selectedCatgory?.id,
    };
    console.log("Item", newly);

    ItemService.create(newly)
      .then((res) => {
        if (res.status === 201) {
          setSuccess("Successfully Created.");
          setItems([res.data, ...items]);
        }
      })
      .catch((err) => {
        setErrorItemCreate(err.message);
      });
  };

  return (
    <>
      {errorItemCreate && <Text textColor="#dd0939">{errorItemCreate}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form color="red" onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              type="text"
              placeholder="Item ID"
              {...register("item_id")}
            ></Input>
          </div>
          <div className="mb-3">
            <Input type="text" placeholder="Name" {...register("name")}></Input>
          </div>
          <div className="mb-3">
            <Input type="text" placeholder="Size" {...register("size")}></Input>
          </div>
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Brand"
              {...register("brand")}
            ></Input>
          </div>
          <div className="mb-3">
            <Input type="text" placeholder="Type" {...register("type")}></Input>
          </div>
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Plyrating"
              {...register("plyrating")}
            ></Input>
          </div>
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Country"
              {...register("country")}
            ></Input>
          </div>
          <div className="mb-3">
            <FilterCategory
              selectedCategory={(cat) => setSelectedCatgory(cat)}
            />
          </div>
          <div className="mb-3">
            <Select {...register("vale_type")}>
              <option value="Not selected">Valve Type</option>
              <option value="Long Valve">Long Valve</option>
              <option value="Short Valve">Short Valve</option>
            </Select>
          </div>          
        </div>
        <HStack justifyContent="space-between">
          <Button
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            type="submit"
            onClick={() => {
              setErrorItemCreate("");
              setSuccess("");
            }}
          >
            Save
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default ItemAddForm;
