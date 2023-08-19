import { HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import  categoryService, { Category } from "../../../services/Inventory/category-service";



const CategoryAddForm = () => {
  const { register, handleSubmit } = useForm();
  
  const [errorCategoryCreate, setErrorCategoryCreate] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (data:FieldValues)=>{

    categoryService
      .create(data)
      .then(res=>{
        if (res.status === 200){
          setSuccess('Successfully Created...')
        }
      })
      .catch(err=> setErrorCategoryCreate(err.message))

  }


  return (
    <>
      {errorCategoryCreate && <Text textColor="#dd0939">{errorCategoryCreate}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <input
              {...register("category_name")}
              type="text"
              className="form-control"
              placeholder="Category Name"
            />
          </div>    
          
          <div className="mb-3">
            <input
              {...register("description")}
              type="text"
              className="form-control"
              placeholder="Description"
            />
          </div>
          
          
          
        </div>
        <HStack justifyContent="space-between">
          <button
            className="btn btn-primary align-self-end btn-lg"
            type="submit"
            onClick={() => {
              setErrorCategoryCreate("");
              setSuccess("");
            }}
          >
            Save
          </button>
        </HStack>
      </form>
    </>
  )
}

export default CategoryAddForm