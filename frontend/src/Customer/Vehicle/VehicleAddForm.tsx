
import { Button, HStack, Input, Select, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CustomerContext from "../../Contexts/Customer/CustomerContext";
import VehicleService, { Vehicle } from "../../services/Customer/vehicle-service";
import VehicleContext from "../../Contexts/Customer/VehicleContext";
import SelectedCustomerContext from "../../Contexts/Customer/SelectedCustomerContex";

const VehicleAddForm = () => {
  const { register, handleSubmit } = useForm();

  const [errorCustomerUpdate, setErrorCustomerUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const {vehicles, setVehicles} = useContext(VehicleContext)
  const {customers} = useContext(CustomerContext)
  const {selectedCustomer} = useContext(SelectedCustomerContext)


  const onCreate = (data: FieldValues) => {   

    console.log(data);
    

    VehicleService
    .create(data)
    .then(res =>{ 
        setSuccess('Created Successfully')
        setVehicles([res.data, ...vehicles])
        })
        .catch(err => setErrorCustomerUpdate(err.message))

  };
  return (
    <>
      {errorCustomerUpdate && (
        <Text textColor="#dd0939">{errorCustomerUpdate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onCreate)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">

          <div className="mb-3">
            <Input
              {...register("vehical_no")}
              type="text"
              placeholder="Vehical No"
                           
            />
          </div>

          <div className="mb-3">
            <Input 
                {...register("type")} 
                type="text" 
                placeholder="Type" 
                />
          </div>

          <div className="mb-3">
            <Input 
                {...register("madal")} 
                type="text" 
                placeholder="Madal" 
                />
          </div>

          <div className="mb-3">
            <Input
              {...register("brand")}
              type="text"
              placeholder="Brand"
              
            />
          </div>

          <div className="mb-3 h-75">
            <Select {...register("customer")}>
              <option value={selectedCustomer.id} key={selectedCustomer.id}>{selectedCustomer.name}</option>
              {customers.map( cus=> <option value={cus.id}>{cus.name}</option>)}

            </Select>
            
          </div>

        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorCustomerUpdate("");
              setSuccess("");
            }}
          >
            Create
          </Button>
        </HStack>
      </form>
    </>
  )
}

export default VehicleAddForm