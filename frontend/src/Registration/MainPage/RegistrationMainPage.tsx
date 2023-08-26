import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import React from "react";
import RegistrationSidePanel from "../SidePanel/RegistrationSidePanel";
import { Outlet } from "react-router-dom";
import useSupplier from "../../hooks/Inventory/useSupplier";
import SupplierContext from "../../Contexts/Inventory/SupplierContext";
import useEmployee from "../../hooks/Registration/useEmployee";
import EmployeeContext from "../../Contexts/Registration/EmployeeContecxt";

const RegistraionMainPage = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    suppliers,
    setSuppliers,
    nextSupplierUrl,
    previousSupplierUrl,
    filterSupplierParams,
    setFilterSupplierParams,
  } = useSupplier();

  const {
    employees,
    setEmployees,
    nextEmployeeUrl,
    previousEmployeeUrl,
    filterEmployeeParams,
    setFilterEmployeeParams,
  } = useEmployee();

  console.log(employees);
  

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        setEmployees,
        nextEmployeeUrl,
        previousEmployeeUrl,
        filterEmployeeParams,
        setFilterEmployeeParams,
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
  );
};

export default RegistraionMainPage;
