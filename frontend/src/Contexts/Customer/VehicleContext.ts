import { Dispatch, SetStateAction } from "react"
import React from "react";
import { Vehicle } from "../../services/Customer/vehicle-service";

interface VehicleContextType{
    categories:Vehicle[];
    setCategories:Dispatch<SetStateAction<Vehicle[]>>
}

const ItemCategoryContext = React.createContext<VehicleContextType>({} as VehicleContextType)

export default ItemCategoryContext;