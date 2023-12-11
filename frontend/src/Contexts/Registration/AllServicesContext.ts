import React, { Dispatch, SetStateAction } from "react";
import { Service } from "../../services/Registration/services-service";


interface AllServiceContextType{
    allServices:Service[];
    setAllServices:Dispatch<SetStateAction<Service[]>>;
    isLaodingService:boolean;
    errorFetchAllService:string;
}

const AllServiceContext = React.createContext<AllServiceContextType>({} as AllServiceContextType)

export default AllServiceContext