import { Navigate, Outlet } from "react-router-dom"
import { User } from "../services/api-client";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";


const PrivateRoutes = () => {
    const access_token = localStorage.getItem('access')
    if (access_token){
        const user:User = jwtDecode(access_token ? access_token : '')
        const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
        if (isExpired)
            return <Navigate to='/login'/>

    }
    if (!access_token){        
            return <Navigate to='/login'/>}
    return <Outlet/>
}

export default PrivateRoutes