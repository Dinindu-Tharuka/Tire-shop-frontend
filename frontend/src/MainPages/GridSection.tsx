import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../componants/Navbar";
import SideBarOptionList from "./SideBarOptionList";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../services/User/user-service";
import axiosInstance from "../services/api-client";
import useUser from "../hooks/User/useUser";
import UserContext from "../Contexts/User/UserContext";
import UserMeContext from "../Contexts/User/UserMe";
import AllCustomerContext from "../Contexts/Customer/AllCustomerContext";
import useAllCustomers from "../hooks/Customer/useAllCustomers";
import useAllSuppliers from "../hooks/Registration/useAllSuppliers";
import AllSupplierContext from "../Contexts/Registration/AllSupplierContext";
import useAllCustomerTakentyres from "../hooks/Rebuild/useAllCustomerTakentyres";
import AllCustomerTakenTyresContext from "../Contexts/Rebuild/AllCustomerTakenTyres";

const GridSection = () => {
  const [userMe, setUserMe] = useState<User>({} as User);
  const {
    customerTyresTaken,
    setCustomerTyresTaken,
    customerTyresTakenFetchError,
    setCustomerTyresTakenFetchError,
  } = useAllCustomerTakentyres();
  const {
    allSuppliers,
    setAllSuppliers,
    errorFetchAllSupplier,
    setErrorFetchAllSupplier,
    isLoadingAllSupplierPage,
    setIsLoadingAllSupplierPage,
  } = useAllSuppliers();
  const {
    allCustomers,
    setAllCustomers,
    errorAllCustomerFetch,
    setErrorAllCustomerFetch,
  } = useAllCustomers();
  const {
    users,
    setUsers,
    errorFetchUsers,
    setErrorFetchUser,
    isLoadingUsers,
  } = useUser();

  useEffect(() => {
    const hasReloadedBefore = localStorage.getItem("hasReloaded");
    if (!hasReloadedBefore) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }

    axiosInstance
      .get<User>("/users/me/")
      .then((res) => setUserMe(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <AllCustomerTakenTyresContext.Provider
      value={{
        customerTyresTaken,
        setCustomerTyresTaken,
        customerTyresTakenFetchError,
        setCustomerTyresTakenFetchError,
      }}
    >
      <AllSupplierContext.Provider
        value={{
          allSuppliers,
          setAllSuppliers,
          errorFetchAllSupplier,
          setErrorFetchAllSupplier,
          isLoadingAllSupplierPage,
        }}
      >
        <AllCustomerContext.Provider
          value={{
            allCustomers,
            setAllCustomers,
            errorAllCustomerFetch,
            setErrorAllCustomerFetch,
          }}
        >
          <UserMeContext.Provider value={userMe}>
            <UserContext.Provider
              value={{
                users,
                setUsers,
                errorFetchUsers,
                setErrorFetchUser,
                isLoadingUsers,
              }}
            >
              <Grid
                templateAreas={{
                  base: `"nav" "side" "main"`,
                  lg: `"nav nav" "side main"`,
                }}
              >
                <GridItem
                  area="nav"
                  height={{ base: "10vh", lg: "10vh" }}
                  marginBottom={5}
                >
                  <Navbar />
                </GridItem>

                <GridItem
                  area="side"
                  height={{ base: "10vh", lg: "85vh" }}
                  width={{ base: "100vw", lg: "20vw" }}
                >
                  <SideBarOptionList />
                </GridItem>

                <GridItem
                  area="main"
                  height={{ base: "80vh", lg: "85vh" }}
                  width={{ base: "100vw", lg: "80vw" }}
                >
                  <Outlet />
                </GridItem>
              </Grid>
            </UserContext.Provider>
          </UserMeContext.Provider>
        </AllCustomerContext.Provider>
      </AllSupplierContext.Provider>
    </AllCustomerTakenTyresContext.Provider>
  );
};

export default GridSection;
