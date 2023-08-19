import { HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import supplierService from "../../../services/Inventory/supplier-service";

const SupplierAddForm = () => {
    const { register, handleSubmit } = useForm();
  
    const [errorSupplierCreate, setErrorSupplierCreate] = useState("");
    const [success, setSuccess] = useState("");
  
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
            <input
              {...register("name")}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>    
          
          <div className="mb-3">
            <input
              {...register("address")}
              type="text"
              className="form-control"
              placeholder="Address"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("telephone")}
              type="text"
              className="form-control"
              placeholder="Telephone"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("mobile")}
              type="text"
              className="form-control"
              placeholder="Mobile"
            />
          </div>
          <div className="mb-3">
            <input
              {...register("email")}
              type="text"
              className="form-control"
              placeholder="Email"
            />
          </div>
          
          
          
        </div>
        <HStack justifyContent="space-between">
          <button
            className="btn btn-primary align-self-end btn-lg"
            type="submit"
            onClick={() => {
              setErrorSupplierCreate("");
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

export default SupplierAddForm