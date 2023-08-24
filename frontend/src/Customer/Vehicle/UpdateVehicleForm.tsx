
import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CustomerContext from "../../Contexts/Customer/CustomerContext";
import VehicleService, { Vehicle } from "../../services/Customer/vehicle-service";
import VehicleContext from "../../Contexts/Customer/VehicleContext";

interface Props {
    onSelectedVehicle: Vehicle;
}

const UpdateVehicleForm = ({onSelectedVehicle}:Props) => {
    const { register, handleSubmit } = useForm();

  const [errorCustomerUpdate, setErrorCustomerUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const {vehicles, setVehicles} = useContext(VehicleContext)
  const {customers} = useContext(CustomerContext)

  const onUpdate = (data: FieldValues) => {

    console.log(data);
    

    const updated = {   ...data , customer:onSelectedVehicle.customer}

    console.log('Updated', updated);
    

    
    VehicleService
    .update(updated, `${onSelectedVehicle.vehical_no}`)
    .then(res =>{ 
        setSuccess('Updated Successfully')
        vehicles.map(veh => veh.vehical_no === onSelectedVehicle.vehical_no ? updated : veh)
        })
        .catch(err => setErrorCustomerUpdate(err.message))

  };
  return (
    <>
      {errorCustomerUpdate && (
        <Text textColor="#dd0939">{errorCustomerUpdate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onUpdate)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              {...register("customer")}
              type="text"
              placeholder="Customer Name"
              defaultValue={customers.find(cu => cu.id === onSelectedVehicle.customer)?.name}              
              disabled                          
            />
          </div>

          <div className="mb-3">
            <Input
              {...register("vehical_no")}
              type="text"
              placeholder="Vehical No"
              defaultValue={onSelectedVehicle.vehical_no}              
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("brand")}
              type="text"
              placeholder="Brand"
              defaultValue={onSelectedVehicle.brand}
            />
          </div>
          <div className="mb-3">
            <Input 
                {...register("type")} 
                type="text" 
                placeholder="Type" 
                defaultValue={onSelectedVehicle.type}
                />
          </div>
          <div className="mb-3">
            <Input 
                {...register("madal")} 
                type="text" 
                placeholder="Madal" 
                defaultValue={onSelectedVehicle.madal}
                />
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
            Update
          </Button>
        </HStack>
      </form>
    </>
  )
}

export default UpdateVehicleForm