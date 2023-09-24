import {
  Button,
  HStack,
  Select,
  Table,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import tyreTakenService, {
  TyreTaken,
} from "../../../services/Rebuild/tyre-taken-service";
import TakenTyreContext from "../../../Contexts/Rebuild/TakenTyreContext";
import CustomerContext from "../../../Contexts/Customer/CustomerContext";
import VehicleContext from "../../../Contexts/Customer/VehicleContext";

import AddCustomerTakenTyre from "./AddCustomerTakenTyre";

interface Props {
  selectedTakenTyre: TyreTaken;
}

export const TakenTyreUpdate = ({ selectedTakenTyre }: Props) => {
  const { register, handleSubmit, control } = useForm<TyreTaken>();

  const [errorTakenTyreUpdate, setErrorTakenTyreUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();

  const { takenTyres, setTakenTyres } = useContext(TakenTyreContext);
  const { customers } = useContext(CustomerContext);
  const { vehicles } = useContext(VehicleContext);

  const onUpdate = (data: TyreTaken) => {
    console.log(data, "submited");

    tyreTakenService
      .update(data, `${selectedTakenTyre.id}`)
      .then((res) => {
        setSuccess(res.status === 200 ? "Updated Successfully" : "");

        setTakenTyres(
          takenTyres.map((cus) =>
            cus.id === selectedTakenTyre.id ? res.data : cus
          )
        );
      })
      .catch((err) => setErrorTakenTyreUpdate(err.message));
  };
  return (
    <>
      {errorTakenTyreUpdate && (
        <Text textColor="#dd0939">{errorTakenTyreUpdate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onUpdate)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 w-50">
            <Select {...register("customer")}>
              <option value={selectedTakenTyre.customer}>
                {
                  customers.find(
                    (customer) => customer.id === selectedTakenTyre.customer
                  )?.name
                }
              </option>
              {customers.map((customer) => (
                <option value={customer.id}>{customer.name}</option>
              ))}
            </Select>
          </div>

          <div className="mb-3 w-50">
            <Select {...register("vehicle")}>
              <option value={selectedTakenTyre.vehicle}>
                {selectedTakenTyre.vehicle}
              </option>
              {vehicles.map((vehicle) => (
                <option value={vehicle.vehical_no}>{vehicle.vehical_no}</option>
              ))}
            </Select>
          </div>
          <div className="mb-3 w-100">
            <AddCustomerTakenTyre
              register={register}
              control={control}
              customerArrays={selectedTakenTyre.customer_tyres}
            />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorTakenTyreUpdate("");
              setSuccess("");
            }}
          >
            Update
          </Button>
        </HStack>
      </form>
    </>
  );
};
