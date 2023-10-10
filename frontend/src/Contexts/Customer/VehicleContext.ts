import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Vehicle } from "../../services/Customer/vehicle-service";

interface VehicleContextType{
    vehicles:Vehicle[];
    setVehicles:Dispatch<SetStateAction<Vehicle[]>>;
    setVehicleNoFilter:Dispatch<SetStateAction<string>>;
    errorVehicleFetch:string;
}

const VehicleContext = React.createContext<VehicleContextType>({} as VehicleContextType)

export default VehicleContext;