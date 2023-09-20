import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import React from "react";
import RegistrationSidePanel from "../SidePanel/RegistrationSidePanel";
import { Outlet } from "react-router-dom";
import useSupplier from "../../hooks/Registration/useSupplier";
import SupplierContext from "../../Contexts/Registration/SupplierContext";
import useEmployee from "../../hooks/Registration/useEmployee";
import EmployeeContext from "../../Contexts/Registration/EmployeeContecxt";
import ServiceContext from "../../Contexts/Registration/ServiceContext";
import useService from "../../hooks/Registration/useService";
import UserContext from "../../Contexts/User/UserContext";
import useUser from "../../hooks/User/useUser";

const RegistraionMainPage = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    users,
    setUsers,
    errorFetchUsers,
    isLoadingUsers,
    setErrorFetchUser,
  } = useUser();

  
  const {
    suppliers,
    setSuppliers,
    nextSupplierUrl,
    previousSupplierUrl,
    filterSupplierParams,
    setFilterSupplierParams,
    errorFetchSupplier,
    isLoadingSupplierPage,
    suppliersCount,
    setErrorFetchSupplier,
    setSupplierNameFilter
  } = useSupplier();
  const {
    services,
    setServices,
    nextServiceUrl,
    previousServiceUrl,
    filterServiceParams,
    setFilterServiceParams,
    isLaodingServicePage,
    errorFetchService,
    servicesCount,
  } = useService();

  const {
    employees,
    setEmployees,
    nextEmployeeUrl,
    previousEmployeeUrl,
    filterEmployeeParams,
    setFilterEmployeeParams,
    errorFetchEmployee,
    isLoadingEmployees,
    employeeCount,
    setErrorFetchEmployee,
  } = useEmployee();

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        errorFetchUsers,
        isLoadingUsers,
        setErrorFetchUser,
        
      }}
    >
      <ServiceContext.Provider
        value={{
          services,
          setServices,
          nextServiceUrl,
          previousServiceUrl,
          filterServiceParams,
          setFilterServiceParams,
          isLaodingServicePage,
          servicesCount,
          errorFetchService,
        }}
      >
        <EmployeeContext.Provider
          value={{
            employees,
            setEmployees,
            nextEmployeeUrl,
            previousEmployeeUrl,
            filterEmployeeParams,
            setFilterEmployeeParams,
            errorFetchEmployee,
            isLoadingEmployees,
            employeeCount,
            setErrorFetchEmployee,
          }}
        >
          <SupplierContext.Provider
            value={{
              suppliers,
              setSuppliers,
              nextSupplierUrl,
              previousSupplierUrl,
              filterSupplierParams,
              setFilterSupplierParams,
              suppliersCount,
              isLoadingSupplierPage,
              errorFetchSupplier,
              setErrorFetchSupplier,
              setSupplierNameFilter,
            }}
          >
            <Grid
              templateAreas={{
                lg: `"main aside"`,
                base: `"aside" "main"`,
              }}
            >
              <GridItem
                area="main"
                height={{ base: "10vh", lg: "85vh" }}
                width={{ base: "100vw", lg: "60vw" }}
              >
                <Outlet />
              </GridItem>
              <GridItem
                area="aside"
                height={{ base: "10vh", lg: "85vh" }}
                width={{ base: "100vw", lg: "15vw" }}
                boxShadow="dark-lg"
                borderRadius={30}
                padding={5}
                bg={colorMode === "light" ? "#ca5c4f" : ""}
              >
                <RegistrationSidePanel />
              </GridItem>
            </Grid>
          </SupplierContext.Provider>
        </EmployeeContext.Provider>
      </ServiceContext.Provider>
    </UserContext.Provider>
  );
};

export default RegistraionMainPage;
