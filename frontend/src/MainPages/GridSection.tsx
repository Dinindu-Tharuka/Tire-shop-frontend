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
import useStockItem from "../hooks/Stock/useStockItems";
import AllStockItemsContext from "../Contexts/Stock/AllStockItemContext";
import useAllItems from "../hooks/Inventory/useItems";
import { AllItemContext } from "../Contexts/Inventory/AllItemContest";
import usePageRebuildReports from "../hooks/Reports/usePageRebuildReports";
import RebuildReportsPageContext from "../Contexts/Reports/RebuildReortsContext";
import useAllRebuildReports from "../hooks/Reports/useAllRebuildReports";
import AllRebuildReportsContext from "../Contexts/Reports/AllRebuildReportsContext";
import useVehicles from "../hooks/Customer/useVehicles";
import VehicleContext from "../Contexts/Customer/VehicleContext";
import usePageStockItems from "../hooks/Stock/usePageStockItems";
import StockItemsPageContext from "../Contexts/Stock/StockItemPageContext";

const GridSection = () => {
  const [userMe, setUserMe] = useState<User>({} as User);

  const { vehicles, setVehicles, setVehicleNoFilter, errorVehicleFetch } =
    useVehicles();

  const {
    pageStockItems,
    setPageStockItems,
    errorFetchPageStockItems,
    setErrorFetchPageStockItems,
    nextPageStockItemsTyresUrl,
    previousPageStockItemsUrl,
    filterPageStockItemsParams,
    setFilterPageStockItemsParams,
    isLoadingPageStockItems,
    pageStockItemsCount,
    setPageStockItemsNameFilter,
    setPageStockItemsInvoiceNoFilter,
    setPageStockItemsItemIdFilter,
    setPageStockItemsBrandFilter,
    setPageStockItemsSizeFilter,
    setPageStockItemsStartDateFilter,
    setPageStockItemsEndDateFilter,
  } = usePageStockItems();

  const {
    allCustomers,
    setAllCustomers,
    errorAllCustomerFetch,
    setErrorAllCustomerFetch,
    setAllCustomerNameFilter,
  } = useAllCustomers();

  const {
    allRebuildReports,
    setAllRebuildReports,
    errorFetchRebuildAllReports,
    setErrorFetchRebuildAllReports,
    isLoadingRebuildAllReportsPage,
    setRefetchRebuildAllReports,
    setReportsRebuildIdFilter,
    setReportsJobNoFilter,
    setReportsCustomerFilter,
    setReportVehicleFilter,
    setReportEndDateFilter,
    setReportStartDateFilter,
  } = useAllRebuildReports();

  const {
    rebuildPageReports,
    setRebuildPageReports,
    errorFetchRebuildPageReports,
    setErrorFetchRebuildPageReports,
    nextRebuildPageReportsUrl,
    previousRebuildPageReportsUrl,
    setFilterRebuildPageReportsParams,
    rebuildPageReportsCount,
    isLoadingRebuildPageReportsPage,
    setReFetchPageReports,
    setPageReportsRebuildIdFilter,
    setPageReportsJobNoFilter,
    setPageReportsCustomerFilter,
    setPageReportVehicleFilter,
    setPageReportEndDateFilter,
    setPageReportStartDateFilter,
  } = usePageRebuildReports();

  const {
    allItems,
    setAllItems,
    setError,
    error,
    setAllItemQuery,
    setAllItemSizeQuery,
    setAllItemBrandQuery,
  } = useAllItems();

  const {
    stockItems,
    setStockItems,
    errorFetchStockItems,
    setErrorFetchStockItems,
    setStockItemsInvoiceNoFilter,
    setStockItemsItemIdFilter,
    setStockItemsBrandFilter,
    setStockItemsSizeFilter,
    setStockItemsStartDateFilter,
    setStockItemsEndDateFilter,
  } = useStockItem();

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
    <StockItemsPageContext.Provider
      value={{
        pageStockItems,
        setPageStockItems,
        errorFetchPageStockItems,
        setErrorFetchPageStockItems,
        nextPageStockItemsTyresUrl,
        previousPageStockItemsUrl,
        setFilterPageStockItemsParams,
        isLoadingPageStockItems,
        pageStockItemsCount,
        setPageStockItemsInvoiceNoFilter,
        setPageStockItemsItemIdFilter,
        setPageStockItemsBrandFilter,
        setPageStockItemsSizeFilter,
        setPageStockItemsStartDateFilter,
        setPageStockItemsEndDateFilter,
      }}
    >
      <VehicleContext.Provider
        value={{ vehicles, setVehicles, setVehicleNoFilter, errorVehicleFetch }}
      >
        <AllRebuildReportsContext.Provider
          value={{
            allRebuildReports,
            setAllRebuildReports,
            errorFetchRebuildAllReports,
            setErrorFetchRebuildAllReports,
            isLoadingRebuildAllReportsPage,
            setRefetchRebuildAllReports,
            setReportsRebuildIdFilter,
            setReportsJobNoFilter,
            setReportsCustomerFilter,
            setReportVehicleFilter,
            setReportEndDateFilter,
            setReportStartDateFilter,
          }}
        >
          <RebuildReportsPageContext.Provider
            value={{
              rebuildPageReports,
              setRebuildPageReports,
              errorFetchRebuildPageReports,
              setErrorFetchRebuildPageReports,
              nextRebuildPageReportsUrl,
              previousRebuildPageReportsUrl,
              setFilterRebuildPageReportsParams,
              rebuildPageReportsCount,
              isLoadingRebuildPageReportsPage,
              setReFetchPageReports,
              setPageReportsRebuildIdFilter,
              setPageReportsJobNoFilter,
              setPageReportsCustomerFilter,
              setPageReportVehicleFilter,
              setPageReportEndDateFilter,
              setPageReportStartDateFilter,
            }}
          >
            <AllItemContext.Provider
              value={{
                allItems,
                setAllItems,
                setAllItemQuery,
                setAllItemSizeQuery,
                setAllItemBrandQuery,
              }}
            >
              <AllStockItemsContext.Provider
                value={{
                  stockItems,
                  setStockItems,
                  errorFetchStockItems,
                  setErrorFetchStockItems,
                  setStockItemsInvoiceNoFilter,
                  setStockItemsItemIdFilter,
                  setStockItemsBrandFilter,
                  setStockItemsSizeFilter,
                  setStockItemsStartDateFilter,
                  setStockItemsEndDateFilter,
                }}
              >
                <UserProfileContext.Provider
                  value={{
                    userProfiles,
                    setUsersProfiles,
                    errorFetchUserProfiles,
                    setErrorFetchUserProfiles,
                    isLoadingUserProfile,
                  }}
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
                                      setAllCustomerNameFilter,
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
                                            height={{
                                              base: "10vh",
                                              lg: "10vh",
                                            }}
                                            marginBottom={5}
                                          >
                                            <Navbar />
                                          </GridItem>

                                          <GridItem
                                            area="side"
                                            height={{
                                              base: "10vh",
                                              lg: "85vh",
                                            }}
                                            width={{
                                              base: "100vw",
                                              lg: "20vw",
                                            }}
                                          >
                                            <SideBarOptionList />
                                          </GridItem>

                                          <GridItem
                                            area="main"
                                            height={{
                                              base: "80vh",
                                              lg: "85vh",
                                            }}
                                            width={{
                                              base: "100vw",
                                              lg: "80vw",
                                            }}
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
              </AllStockItemsContext.Provider>
            </AllItemContext.Provider>
          </RebuildReportsPageContext.Provider>
        </AllRebuildReportsContext.Provider>
      </VehicleContext.Provider>
    </StockItemsPageContext.Provider>
  );
};

export default GridSection;
