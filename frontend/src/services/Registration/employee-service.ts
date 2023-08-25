import createPagination from "../http-pagination-service";


export interface Employee{
    id:number;
    nic:string;
    name:string;
    address:string;
    telephone:string;
    designation:string;
}

export interface EmployeePageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:Employee[]
}

export default createPagination('/employees/')