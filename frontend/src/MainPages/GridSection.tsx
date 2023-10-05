import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../Inventory/Navbar";
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
import AllCustomerTakenTyresContext from "../Contexts/Rebuild/AllCustomerTakenTyresContext";
import useAllSendTyres from "../hooks/Rebuild/useAllSendTyres";
import AllSendTyresContext from "../Contexts/Rebuild/AllSendTyreContext";
import useAllSendSupplierTyres from "../hooks/Rebuild/useAllSendSupplierTires";
import AllSendSupplierTyresContext from "../Contexts/Rebuild/AllSendSupplierContext";
import useReceivedTyre from "../hooks/Rebuild/Received/useReceivedTyre";
import ReceivedTyreContext from "../Contexts/Rebuild/Received/ReceivedTyreContex";
import useAllReceivedTyres from "../hooks/Rebuild/Received/useAllReceivedTyres";
import AllReceivedTyresContext from "../Contexts/Rebuild/Received/AllReceivedtyreContext";
import useAllReceivedSupplierTyres from "../hooks/Rebuild/Received/useAllReceivedSupplierTyres";
import AllReceivedSupplierTyresContext from "../Contexts/Rebuild/Received/AllReceivedSupplierTyre";
import useAllDagPayments from "../hooks/Billing/useAllDagPayments";
import AllDagPaymentContext from "../Contexts/Bill/AllDagPaymentContext";
import useUserProfile from "../hooks/User/useUserProfile";
import UserProfileContext from "../Contexts/User/UserProfileContext";

const GridSection = () => {
  const [userMe, setUserMe] = useState<User>({} as User);

  const {
    userProfiles,
    setUsersProfiles,
    errorFetchUserProfiles,
    setErrorFetchUserProfiles,
    isLoadingUserProfile,
  } = useUserProfile();

  const {
    allDagPayments,
    setAllDagPayments,
    allDagPaymentsFetchError,
    isLoadingallDagPayments,
  } = useAllDagPayments();

  const {
    allReceivedSupplierTyres,
    setAllReceivedSupplierTyres,
    allReceivedSupplierTyresFetchError,
    setAllReceivedSupplierTyresFetchError,
  } = useAllReceivedSupplierTyres();

  const {
    allReceivedTyres,
    setAllReceivedTyres,
    allReceivedTyresFetchError,
    setAllReceivedTyresFetchError,
  } = useAllReceivedTyres();
  const {
    receivedTyres,
    setReceivedTyres,
    errorFetchReceivedTyres,
    setErrorFetchReceivedTyres,
    nextReceivedTyresUrl,
    previousReceivedTyresUrl,
    filterReceivedTyreParams,
    setFilterReceivedTyreParams,
    isLoadingReceivedTyre,
    receivedTyreCount,
    setReceivedTyreNameFilter,
  } = useReceivedTyre();

  const {
    allSendSupplierTyres,
    setAllSendSupplierTyres,
    allSendTyresSupplierFetchError,
    setAllSendSupplierTyresFetchError,
  } = useAllSendSupplierTyres();

  const {
    allSendTyres,
    setAllSendTyres,
    allSendTyresFetchError,
    setAllSendTyresFetchError,
  } = useAllSendTyres();
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
    const isReloaded = localStorage.getItem("isReloaded");

    if (isReloaded === "false") {
      window.location.reload();
      localStorage.setItem("isReloaded", "true");
    }
    axiosInstance
      .get<User>("/users/me/")
      .then((res) => setUserMe(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <UserProfileContext.Provider
      value={
        {userProfiles,
        setUsersProfiles,
        errorFetchUserProfiles,
        setErrorFetchUserProfiles,
        isLoadingUserProfile}
      }
    >
      <AllDagPaymentContext.Provider
        value={{
          allDagPayments,
          setAllDagPayments,
          allDagPaymentsFetchError,
          isLoadingallDagPayments,
        }}
      >
        <AllReceivedSupplierTyresContext.Provider
          value={{
            allReceivedSupplierTyres,
            setAllReceivedSupplierTyres,
            allReceivedSupplierTyresFetchError,
            setAllReceivedSupplierTyresFetchError,
          }}
        >
          <AllReceivedTyresContext.Provider
            value={{
              allReceivedTyres,
              setAllReceivedTyres,
              allReceivedTyresFetchError,
              setAllReceivedTyresFetchError,
            }}
          >
            <ReceivedTyreContext.Provider
              value={{
                receivedTyres,
                setReceivedTyres,
                errorFetchReceivedTyres,
                setErrorFetchReceivedTyres,
                nextReceivedTyresUrl,
                previousReceivedTyresUrl,
                filterReceivedTyreParams,
                setFilterReceivedTyreParams,
                isLoadingReceivedTyre,
                receivedTyreCount,
                setReceivedTyreNameFilter,
              }}
            >
              <AllSendSupplierTyresContext.Provider
                value={{
                  allSendSupplierTyres,
                  setAllSendSupplierTyres,
                  allSendTyresSupplierFetchError,
                  setAllSendSupplierTyresFetchError,
                }}
              >
                <AllSendTyresContext.Provider
                  value={{
                    allSendTyres,
                    setAllSendTyres,
                    allSendTyresFetchError,
                    setAllSendTyresFetchError,
                  }}
                >
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
                </AllSendTyresContext.Provider>
              </AllSendSupplierTyresContext.Provider>
            </ReceivedTyreContext.Provider>
          </AllReceivedTyresContext.Provider>
        </AllReceivedSupplierTyresContext.Provider>
      </AllDagPaymentContext.Provider>
    </UserProfileContext.Provider>
  );
};

export default GridSection;
