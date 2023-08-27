import { Grid, GridItem, useColorMode } from "@chakra-ui/react";
import React from "react";
import BillingSidePanel from "../SidePanel/BillingSidePanel";
import BillContext from "../../Contexts/Bill/BillContext";
import useBill from "../../hooks/Billing/useBill";
import { Outlet } from "react-router-dom";

const BillingMainPage = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const {
    bills,
    setBills,
    nextBillPageUrl,
    previousBillPageUrl,
    filterBillPageParams,
    setFilterBillPageParams,
  } = useBill();
  return (
    <BillContext.Provider
      value={{
        bills,
        setBills,
        nextBillPageUrl,
        previousBillPageUrl,
        filterBillPageParams,
        setFilterBillPageParams,
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
          <Outlet/>
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
          <BillingSidePanel />
        </GridItem>
      </Grid>
    </BillContext.Provider>
  );
};

export default BillingMainPage;
