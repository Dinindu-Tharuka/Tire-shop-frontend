import create from "../http-service";

export interface UserProfile{
    id:number;
    user_account_id:number;
    first_name:string;
    last_name:string;

}

export default create('/user-profiles/')