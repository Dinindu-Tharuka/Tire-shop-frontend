import { Button, useColorMode, Text, Select, HStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import TakenTyreContext from "../../../../Contexts/Rebuild/TakenTyreContext";
import VehicleContext from "../../../../Contexts/Customer/VehicleContext";
import { useForm } from "react-hook-form";
import tyreTakenService, {
  TyreTaken,
} from "../../../../services/Rebuild/tyre-taken-service";
import AddCustomerTakenTyre from "./AddCustomerTakenTyre";
import AllCustomerContext from "../../../../Contexts/Customer/AllCustomerContext";
import RebuildReportsPageContext from "../../../../Contexts/Rebuild/Reports/RebuildReortsContext";
import AllRebuildReportsContext from "../../../../Contexts/Rebuild/Reports/AllRebuildReportsContext";

export const AddTakentyreForm = () => {
  // useForm
  const { register, handleSubmit, control } = useForm<TyreTaken>();

  const [errorTakenTyreCreate, setErrorTakenTyreCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();

  const { takenTyres, setTakenTyres } = useContext(TakenTyreContext);
  const { allCustomers } = useContext(AllCustomerContext);
  const { vehicles } = useContext(VehicleContext);

  // For refetch reports
  const { setReFetchPageReports } = useContext(RebuildReportsPageContext);
  const { setRefetchRebuildAllReports } = useContext(AllRebuildReportsContext);
  const date = new Date();
  const milliseconds = date.getMilliseconds();

  const onCreate = (data: TyreTaken) => {
    console.log(data, "create");
    const originalTakenTyres = [...takenTyres];

    tyreTakenService
      .create(data)
      .then((res) => {
        setSuccess("Succefully created.");

        setTakenTyres([res.data, ...takenTyres]);

        //refetch reports
        setReFetchPageReports("" + milliseconds);
        setRefetchRebuildAllReports("" + milliseconds);
      })
      .catch((err) => {
        setErrorTakenTyreCreate("Not Succefully created.");
        setTakenTyres([...originalTakenTyres]);
      });
  };
  return (
    <>
      {errorTakenTyreCreate && (
        <Text textColor="#dd0939">{errorTakenTyreCreate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onCreate)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 w-50">
            <Select {...register("customer")}>
              <option>Select Customer</option>
              {allCustomers.map((customer) => (
                <option value={customer.id}>{customer.name}</option>
              ))}
            </Select>
          </div>

          <div className="mb-3 w-50">
            <Select {...register("vehicle")}>
              <option>Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option value={vehicle.vehical_no}>{vehicle.vehical_no}</option>
              ))}
            </Select>
          </div>
          <div className="mb-3 w-100">
            <AddCustomerTakenTyre register={register} control={control} />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorTakenTyreCreate("");
              setSuccess("");
            }}
          >
            Create
          </Button>
        </HStack>
      </form>
    </>
  );
};
