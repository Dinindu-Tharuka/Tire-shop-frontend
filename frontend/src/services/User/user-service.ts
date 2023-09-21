
import create from "../http-service";

export interface User{
    id:number;
    user_name:string;
    email: string;
    is_manager:boolean;
    is_superuser:boolean;
    first_name:string;
    last_name:string;
}
export interface UserPageStructure{
    count:number;
    next:string | null;
    previous:string | null;
    results:User[];
}

export default create('/user/')