import createPagination from "../http-pagination-service";

export interface User{
    id:number;
    user_name:string;
    email: string
}
export interface UserPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:User[]
}

export default createPagination('/users/')