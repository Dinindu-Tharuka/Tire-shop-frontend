import {
    Button,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
  } from "@chakra-ui/react";
  import { useContext, useState } from "react";
  import { AiOutlineDown } from "react-icons/ai";
import { Vehicle } from "../../services/Customer/vehicle-service";
import VehicleContext from "../../Contexts/Customer/VehicleContext";
  
  interface Props {
    selectedCustomer: (vehicle: Vehicle) => void;
  }

const VehicleFilter = ({ selectedCustomer }:Props) => {
    const { setVehicleNoFilter, vehicles } = useContext(VehicleContext);
  const [vehicle, setVehicle] = useState<Vehicle>();

  const onCategoryType = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let currentValue = event.currentTarget.value;
    setVehicleNoFilter(currentValue);
  };
  return (
    <div>
      <Menu>
        <MenuButton as={Button} rightIcon={<AiOutlineDown />} width="100%">
          {vehicle === null ? "Select Category" : vehicle?.vehical_no}
        </MenuButton>
        <MenuList>
          {vehicles.map((vehicle) => (
            <MenuItem
              onClick={() => {
                selectedCustomer(vehicle);
                setVehicle(vehicle);
              }}
              className="dropdown-item"
            >
              {vehicle.vehical_no}
            </MenuItem>
          ))}
          <Input onKeyUp={onCategoryType} placeholder="Search" />
        </MenuList>
      </Menu>
    </div>
  )
}

export default VehicleFilter