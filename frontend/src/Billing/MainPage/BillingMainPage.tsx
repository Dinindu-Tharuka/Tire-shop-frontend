import { Grid, GridItem, useColorMode, Text } from "@chakra-ui/react";
import React from "react";
import BillingSidePanel from "../SidePanel/BillingSidePanel";
import BillContext from "../../Contexts/Bill/BillContext";
import useBill from "../../hooks/Billing/useBill";
import { Outlet } from "react-router-dom";
import useStockInvoice from "../../hooks/Stock/useStockInvoice";
import useStockItem from "../../hooks/Stock/useStockItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";

const BillingMainPage = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  

  const {
    bills,
    setBills,
    nextBillPageUrl,
    previousBillPageUrl,
    filterBillPageParams,
    setFilterBillPageParams,
    billFetchError,
    isLoadingBills,
    billCount
  } = useBill();

  const {
    stockInvoices,
    setStockInvoices,
    nextStockInvoiceUrl,
    previousStockInvoiceUrl,
    filterStockInvoiceParams,
    setFilterStockInvoiceParams,
    isLoadingInvoices,
    errorFetchStockInvoice,
    setErrorFetchStockInvoice,
    invoicesCount
  } = useStockInvoice();

  const { stockItems, setStockItems } = useStockItem();
  return (
    <StockInvoiceContext.Provider
      value={{
        stockInvoices,
        setStockInvoices,
        nextStockInvoiceUrl,
        previousStockInvoiceUrl,
        filterStockInvoiceParams,
        setFilterStockInvoiceParams,
        isLoadingInvoices,
        errorFetchStockInvoice,
        setErrorFetchStockInvoice,
        invoicesCount
      }}
    >
      <StockItemContext.Provider value={{ stockItems, setStockItems }}>
        <BillContext.Provider
          value={{
            bills,
            setBills,
            nextBillPageUrl,
            previousBillPageUrl,
            filterBillPageParams,
            setFilterBillPageParams,
            billFetchError,
            isLoadingBills,
            billCount
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
              <BillingSidePanel />
            </GridItem>
          </Grid>
        </BillContext.Provider>
      </StockItemContext.Provider>
    </StockInvoiceContext.Provider>
  );
};

export default BillingMainPage;
