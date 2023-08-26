import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import supplierService, {
  Supplier,
} from "../../services/Registration/supplier-service";
import SupplierContext from "../../Contexts/Registration/SupplierContext";

const SupplierAddForm = () => {
  const { register, handleSubmit } = useForm();

  const [errorSupplierCreate, setErrorSupplierCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { suppliers, setSuppliers } = useContext(SupplierContext);

  const onSubmit = (data: FieldValues) => {
    supplierService
      .create(data)
      .then((res) => {
        if (res.status == 201) {
          setSuccess("Successefully Created.");
          setSuppliers([res.data, ...suppliers]);
        }
      })
      .catch((error) => setErrorSupplierCreate(error.message));
  };
  return (
    <>
      {errorSupplierCreate && (
        <Text textColor="#dd0939">{errorSupplierCreate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input {...register("name")} type="text" placeholder="Name" />
          </div>

          <div className="mb-3">
            <Input {...register("address")} type="text" placeholder="Address" />
          </div>
          <div className="mb-3">
            <Input
              {...register("telephone")}
              type="text"
              placeholder="Telephone"
            />
          </div>
          <div className="mb-3">
            <Input {...register("mobile")} type="text" placeholder="Mobile" />
          </div>
          <div className="mb-3">
            <Input {...register("email")} type="text" placeholder="Email" />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
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
  );
};

export default SupplierAddForm;
