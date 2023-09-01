import { Navigate, Outlet } from "react-router-dom"


const PrivateRoutes = () => {
    const access_token = localStorage.getItem('access')
    if (!access_token)
        return <Navigate to='/login'/>
    return <Outlet/>
}

export default PrivateRoutes