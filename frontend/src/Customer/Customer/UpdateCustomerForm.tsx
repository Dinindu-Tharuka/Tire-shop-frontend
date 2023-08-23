import CustomerService, { Customer } from "../../services/Customer/customer-service";
import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CustomerContext from "../../Contexts/Customer/CustomerContext";

interface Props {
  onSelectedCustomer: Customer;
}

function UpdateCustomerForm({ onSelectedCustomer }: Props) {
  const { register, handleSubmit } = useForm();

  const [errorCustomerUpdate, setErrorCustomerUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const {customers, setCustomers} = useContext(CustomerContext)

  const onUpdate = (data: FieldValues) => {

    const updated = { id:onSelectedCustomer.id,  ...data  }

    
    CustomerService
    .update(data, `${onSelectedCustomer.id}`)
    .then(res =>{ 
        setSuccess(res.status === 200 ? 'Updated Successfully':'')
        customers.map(cus => cus.id === onSelectedCustomer.id ? updated : cus)
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
              {...register("name")}
              type="text"
              placeholder="Name"
              defaultValue={onSelectedCustomer.name}
            />
          </div>

          <div className="mb-3">
            <Input
              {...register("address")}
              type="text"
              placeholder="Address"
              defaultValue={onSelectedCustomer.address}
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("telephone")}
              type="text"
              placeholder="Telephone"
              defaultValue={onSelectedCustomer.telephone}
            />
          </div>
          <div className="mb-3">
            <Input 
                {...register("mobile")} 
                type="text" 
                placeholder="Mobile" 
                defaultValue={onSelectedCustomer.mobile}
                />
          </div>
          <div className="mb-3">
            <Input 
                {...register("email")} 
                type="text" 
                placeholder="Email" 
                defaultValue={onSelectedCustomer.email}
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
  );
}

export default UpdateCustomerForm;
