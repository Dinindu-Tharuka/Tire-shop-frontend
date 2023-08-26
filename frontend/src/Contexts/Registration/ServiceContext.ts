import React, { Dispatch, SetStateAction } from "react";
import { Service } from "../../services/Registration/services-service";


interface ServiceContextType{
    services:Service[];
    setServices:Dispatch<SetStateAction<Service[]>>;
    nextServiceUrl:string|null;
    previousServiceUrl:string|null;
    filterServiceParams:string | null
    setFilterServiceParams:Dispatch<SetStateAction<string | null>>;
}

const ServiceContext = React.createContext<ServiceContextType>({} as ServiceContextType)

export default ServiceContext