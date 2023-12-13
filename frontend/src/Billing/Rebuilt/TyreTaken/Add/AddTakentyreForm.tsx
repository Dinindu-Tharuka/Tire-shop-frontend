import {
  Button,
  useColorMode,
  Text,
  Select,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Input,
  MenuItem,
} from "@chakra-ui/react";
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
import {
  BILL_ITEM_MARGIN_BOTTOM,
  BILL_ITEM_MARGIN_LEFT,
  BILL_ITEM_WIDTH,
} from "../../../Bill/UI Contastants/BillFormConstatnts";
import { AiOutlineDown } from "react-icons/ai";

export const AddTakentyreForm = () => {
  // useForm
  const { register, handleSubmit, control } = useForm<TyreTaken>();

  // for filtering vehicles
  const [selectedVehicleFilter, setSelectedVehicleFilter] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [errorTakenTyreCreate, setErrorTakenTyreCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { colorMode } = useColorMode();

  const { takenTyres, setTakenTyres } = useContext(TakenTyreContext);

  // For customers
  const { allCustomers } = useContext(AllCustomerContext);
  const { vehicles } = useContext(VehicleContext);

  // For refetch reports
  const { setReFetchPageReports } = useContext(RebuildReportsPageContext);
  const { setRefetchRebuildAllReports } = useContext(AllRebuildReportsContext);
  const date = new Date();
  const milliseconds = date.getMilliseconds();

  const onCreate = (data: TyreTaken) => {
    const originalTakenTyres = [...takenTyres];

    const selectedCustomer = allCustomers.find(
      (customer) =>
        customer.id ===
        vehicles.find((vehicle) => vehicle.vehical_no === selectedVehicle)
          ?.customer
    )?.id;

    const newTyre = {
      ...data,
      vehicle: selectedVehicle,
      customer: selectedCustomer,
    };
    console.log("new tyre", newTyre);

    tyreTakenService
      .create(newTyre)
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
            <Menu>
              <MenuButton
                marginRight={BILL_ITEM_MARGIN_LEFT}
                width={BILL_ITEM_WIDTH}
                marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                as={Button}
                rightIcon={<AiOutlineDown />}
              >
                {selectedVehicle ? selectedVehicle : "Select Vehicle"}
              </MenuButton>
              <MenuList>
                <Input
                  type="text"
                  onChange={(e) =>
                    setSelectedVehicleFilter(e.currentTarget.value)
                  }
                />
                {vehicles
                  .filter((vehicle) =>
                    vehicle.vehical_no.startsWith(selectedVehicleFilter)
                  )
                  .map((vehicle) => (
                    <MenuItem
                      onClick={() => setSelectedVehicle(vehicle.vehical_no)}
                    >
                      {vehicle.vehical_no}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
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
