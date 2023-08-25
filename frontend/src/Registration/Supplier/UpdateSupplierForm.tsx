import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Supplierservice, {
  Supplier,
} from "../../services/Inventory/supplier-service";
import SupplierContext from "../../Contexts/SupplierContext";

interface Props {
  selectedSupplier: Supplier;
}

const UpdateSupplierForm = ({ selectedSupplier }: Props) => {
  const { register, handleSubmit } = useForm();

  const [errorCategoryUpdate, setErrorCategoryUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { suppliers, setSuppliers } = useContext(SupplierContext);

  const onSubmit = (data: FieldValues) => {
    const updated: Supplier = {
      id: selectedSupplier.id,
      name: data.name,
      address: data.address,
      telephone: data.telephone,
      mobile: data.mobile,
      email: data.email,
    };

    Supplierservice.update(updated, `${updated.id}`)
      .then((res) => {
        if (res.status === 202) {
          setSuccess("Successfully Updated.");
          setSuppliers(
            suppliers.map((sup) => (sup.id === updated.id ? updated : sup))
          );
        }
      })
      .catch((err) => setErrorCategoryUpdate("Not Successfully Updated."));
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
              {...register("name")}
              type="text"
              placeholder="Name"
              defaultValue={selectedSupplier.name}
            />
          </div>

          <div className="mb-3">
            <Input
              {...register("address")}
              type="text"
              placeholder="Adress"
              defaultValue={selectedSupplier.address}
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("mobile")}
              type="text"
              placeholder="Mobile"
              defaultValue={selectedSupplier.mobile}
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("telephone")}
              type="text"
              placeholder="Telephone"
              defaultValue={selectedSupplier.telephone}
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("email")}
              type="text"
              placeholder="Email"
              defaultValue={selectedSupplier.email}
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

export default UpdateSupplierForm;
