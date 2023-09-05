import { Navigate, Outlet } from "react-router-dom";
import { UserToken } from "../services/api-client";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

const PrivateRoutes = () => {
  const access_token = localStorage.getItem("access");

  let isExpired = null;
  if (access_token) {
    const user: UserToken = jwtDecode(access_token ? access_token : "");
    isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
    if (isExpired) return <Navigate to="/login" />;
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
