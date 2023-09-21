import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CustomerService from "../../services/Customer/customer-service";
import CustomerContext from "../../Contexts/Customer/CustomerContext";

const CustomerAddForm = () => {
    const { register, handleSubmit } = useForm();

    const [errorCustomerCreate, setErrorCustomerCreate] = useState("");
    const [success, setSuccess] = useState("");
    const { colorMode } = useColorMode();

    const {customers, setCustomers} = useContext(CustomerContext)

    const onSubmit = (data: FieldValues)=>{
      
      CustomerService
      .create(data)
      .then(res => {
        setSuccess(res.status === 201 ? 'Successfullt Created.':'')
        setCustomers([res.data, ...customers])
          })
          .catch(err => setErrorCustomerCreate(err.message))


    }
  return (
    <>
      {errorCustomerCreate && (
        <Text textColor="#dd0939">{errorCustomerCreate}</Text>
      )}
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
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorCustomerCreate("");
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