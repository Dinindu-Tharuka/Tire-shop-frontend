import { Dispatch, SetStateAction } from "react";
import React from "react";
import { Employee } from "../../services/Registration/employee-service";

interface EmployeeContextType{
    employees:Employee[];
    setEmployees:Dispatch<SetStateAction<Employee[]>>;
    nextEmployeeUrl:string|null;
    previousEmployeeUrl:string|null;
    filterEmployeeParams:string | null
    setFilterEmployeeParams:Dispatch<SetStateAction<string | null>>;
    errorFetchEmployee:string;
    isLoadingEmployees:boolean;
    employeeCount:number;
    setErrorFetchEmployee:Dispatch<SetStateAction<string>>;
}

const EmployeeContext = React.createContext<EmployeeContextType>({} as EmployeeContextType)

export default EmployeeContext;