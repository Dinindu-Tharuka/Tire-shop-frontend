import React from "react";
import { User } from "../../services/User/user-service";

const UserMeContext = React.createContext<User>({} as User)

export default UserMeContext