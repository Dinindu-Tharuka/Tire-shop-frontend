import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const CustomerAddForm = () => {
    const { register, handleSubmit } = useForm();

    const [errorCategoryCreate, setErrorCategoryCreate] = useState("");
    const [success, setSuccess] = useState("");
    const { toggleColorMode, colorMode } = useColorMode();

    const onSubmit = (data: FieldValues)=>{

    }
  return (
    <>
      {errorCategoryCreate && (
        <Text textColor="#dd0939">{errorCategoryCreate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              {...register("category_name")}
              type="text"
              placeholder="Category Name"
            />
          </div>

          <div className="mb-3">
            <Input
              {...register("description")}
              type="text"
              placeholder="Description"
            />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorCategoryCreate("");
              setSuccess("");
            }}
          >
            Save
          </Button>
        </HStack>
      </form>
    </>
  )
}

export default CustomerAddForm