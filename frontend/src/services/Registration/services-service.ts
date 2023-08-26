import createPagination from "../http-pagination-service";

export interface Service{
    id:number;
    description:string;
    service_value:number;   
}

export interface ServicePageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:Service[]
  }

export default createPagination('/services/')