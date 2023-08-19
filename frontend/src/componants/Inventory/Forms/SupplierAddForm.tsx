import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import supplierService from "../../../services/Inventory/supplier-service";

const SupplierAddForm = () => {
    const { register, handleSubmit } = useForm();
  
    const [errorSupplierCreate, setErrorSupplierCreate] = useState("");
    const [success, setSuccess] = useState("");
    const {toggleColorMode, colorMode} = useColorMode();
  
    const onSubmit = (data:FieldValues)=>{
  
     supplierService
        .create(data)
        .then(res=> setSuccess(res.status === 200? 'Successefully Created.':''))
        .catch(error => setErrorSupplierCreate(error.message))
  
    }
  return (
    <>
      {errorSupplierCreate && <Text textColor="#dd0939">{errorSupplierCreate}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              {...register("name")}
              type="text"
              placeholder="Name"
            />
          </div>    
          
          <div className="mb-3">
            <Input
              {...register("address")}
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("telephone")}
              type="text"
              placeholder="Telephone"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("mobile")}
              type="text"
              placeholder="Mobile"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("email")}
              type="text"
              placeholder="Email"
            />
          </div>
          
          
          
        </div>
        <HStack justifyContent="space-between">
          <Button
          type="submit"          
          onClick={() => {
            setErrorSupplierCreate("");
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

export default SupplierAddForm