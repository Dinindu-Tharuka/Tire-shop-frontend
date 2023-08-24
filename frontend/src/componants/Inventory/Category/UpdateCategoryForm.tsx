import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import categoryService, {
  Category,
} from "../../../services/Inventory/category-service";
import ItemCategoryContext from "../../../Contexts/CategoryContext";

interface Props {
  updateCategory: Category;
}

const UpdateCategoryForm = ({updateCategory } : Props) => {
  const { register, handleSubmit } = useForm();

  const [errorCategoryUpdate, setErrorCategoryUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const {categories, setCategories} = useContext(ItemCategoryContext)

  const onSubmit = (data: FieldValues) => {
    const updated: Category = {
      id: updateCategory.id,
      category_name: data.category_name,
      description: data.description,
    };

   
       

    categoryService
      .update(updated, `${updated.id}`)
      .then((res) =>{
        setSuccess("Successfully Updated.")    
        setCategories(categories.map((cat => cat.id === updated.id? updated:cat)))
      }
      )
      .catch((err) => setErrorCategoryUpdate(err.message));
  };
  return (
    <>
      {errorCategoryUpdate && (
        <Text textColor="#dd0939">{errorCategoryUpdate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              {...register("category_name")}
              type="text"
              placeholder="Category Name"
              defaultValue={updateCategory.category_name}
            />
          </div>

          <div className="mb-3">
            <Input
              {...register("description")}
              type="text"
              placeholder="Description"
              defaultValue={updateCategory.description}
            />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorCategoryUpdate("");
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

export default UpdateCategoryForm;
