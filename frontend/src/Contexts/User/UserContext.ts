import { Dispatch, SetStateAction } from "react";
import React from "react";
import { User } from "../../services/User/user-service";


interface UserContextType{
    users:User[];
    setUsers:Dispatch<SetStateAction<User[]>>; 
    errorFetchUsers:string;
    setErrorFetchUser:Dispatch<SetStateAction<string>>
    isLoadingUsers:boolean;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType)

export default UserContext;