import { Button, HStack, Input, Select, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ItemService, { Item } from "../../../services/Inventory/item-service";
import useCategory from "../../../hooks/Inventory/useCategory";
import useSupplier from "../../../hooks/Inventory/useSupplier";
import ItemContext from "../../../Contexts/ItemContext";



const ItemAddForm = () => {
  const { register, handleSubmit } = useForm();
  const [errorItemCreate, setErrorItemCreate] = useState("");
  const [success, setSuccess] = useState("");

  const {categories, errorFetchCategory} = useCategory();
  const {suppliers, errorFetchSupplier} = useSupplier();

  const { toggleColorMode, colorMode } = useColorMode();

  const {items, setItems} = useContext(ItemContext)

  const onSubmit = (data: FieldValues) => {
    ItemService.create(data)
      .then((res) => {
        if (res.status === 200) {
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
            <Input type="text" placeholder="Item ID" {...register("item_id")}></Input>            
          </div>
          <div className="mb-3">
            <Input type="text" placeholder="Name" {...register("name")}></Input>            
          </div>
          <div className="mb-3">
          <Input type="text" placeholder="Size" {...register("size")}></Input>            
          </div>
          <div className="mb-3">
          <Input type="text" placeholder="Brand" {...register("brand")}></Input>
           
          </div>
          <div className="mb-3">
          <Input type="text" placeholder="Type" {...register("type")}></Input>
            
          </div>
          <div className="mb-3">
          <Input type="text" placeholder="Plyrating" {...register("plyrating")}></Input>
           
          </div>
          <div className="mb-3">
          <Input type="text" placeholder="Country" {...register("country")}></Input>            
          </div>
          <div className="mb-3">
            <Select {...register("item_category")} placeholder="Select Category">              
              {categories.map(category => <option value={category.id}>{category.category_name}</option>)}
            </Select>
          
            
          </div>
          <div className="mb-3">
            <Select {...register("vale_type")} >
              <option value="Not selected">Valve Type</option>
              <option value="Long Valve">Long Valve</option>
              <option value="Short Valve">Short Valve</option>
            </Select>
          </div>
          <div className="mb-3">
            <Select {...register("supplier")} placeholder="Select Supplier">              
              {suppliers.map(supplier => <option value={supplier.id}>{supplier.name}</option>)}
            </Select>
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            bg={colorMode === 'light'? '#e3a99c':'#575757'}
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
