
import { Dispatch, SetStateAction } from "react";
import React from "react";
import { UserProfile } from "../../services/User/user-service";


interface UserProfileContextType{
    userProfiles:UserProfile[];
    setUsersProfiles:Dispatch<SetStateAction<UserProfile[]>>; 
    errorFetchUserProfiles:string;
    setErrorFetchUserProfiles:Dispatch<SetStateAction<string>>
    isLoadingUserProfile:boolean;
}

const UserProfileContext = React.createContext<UserProfileContextType>({} as UserProfileContextType)

export default UserProfileContext;