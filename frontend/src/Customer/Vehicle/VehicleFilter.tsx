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
  selectedVehicle: (vehicle: Vehicle | string) => void;
}

const VehicleFilter = ({ selectedVehicle }: Props) => {
  const { setVehicleNoFilter, vehicles } = useContext(VehicleContext);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [buttoneName , setButtoneName] = useState('Vehicle')

  const onVehicleType = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let currentValue = event.currentTarget.value;
    setVehicleNoFilter(currentValue);
  };
  return (
    <div>
      <Menu>
        <MenuButton
          minWidth={180}
          as={Button}
          rightIcon={<AiOutlineDown />}
          width="100%"
        >
          {buttoneName}
         
        </MenuButton>
        <MenuList>
          <Input onKeyUp={onVehicleType} placeholder="Search" />
          <MenuItem onClick={()=>{
            setVehicle(null)
            setButtoneName('All Vehicles')
            selectedVehicle('')
            }} className="dropdown-item">All Vehicles</MenuItem>
          {vehicles.filter((veh, index)=> index < 10).map((vehicle) => (
            <MenuItem  
                   
              key={vehicle.vehical_no}
              onClick={() => {
                selectedVehicle(vehicle);
                setVehicle(vehicle);
                setButtoneName(vehicle.vehical_no)
              }}
              className="dropdown-item"
            >
              {vehicle.vehical_no}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default VehicleFilter;
