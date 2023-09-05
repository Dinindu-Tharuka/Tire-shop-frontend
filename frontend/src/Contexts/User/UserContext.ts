import { Dispatch, SetStateAction } from "react";
import React from "react";
import { User } from "../../services/User/user-service";


interface UserContextType{
    users:User[];
    setUsers:Dispatch<SetStateAction<User[]>>; 
    nextUserPageUrl:string | null;
    errorFetchStockItems:string;
    previousUserPageUrl:string | null;   
    setFilterUserPageParams:Dispatch<SetStateAction<string | null>>;
    isLoadingUsers:boolean;
    userCount:number
}

const UserContext = React.createContext<UserContextType>({} as UserContextType)

export default UserContext;