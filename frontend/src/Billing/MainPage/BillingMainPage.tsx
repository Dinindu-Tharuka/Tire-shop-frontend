import { Grid, GridItem, useColorMode, Text } from "@chakra-ui/react";
import React from "react";
import BillingSidePanel from "../SidePanel/BillingSidePanel";
import BillContext from "../../Contexts/Bill/BillContext";
import usePageBill from "../../hooks/Billing/usePageBill";
import { Outlet } from "react-router-dom";
import useStockInvoice from "../../hooks/Stock/useStockInvoice";
import useStockItem from "../../hooks/Stock/useStockItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";
import useBillPayment from "../../hooks/Billing/useBillPayment";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import useBill from "../../hooks/Billing/useBill";
import AllBillContext from "../../Contexts/Bill/AllBillContext";

const BillingMainPage = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const {
    billPayments,
    setBillPayments,
    billPaymentFetchError,
    setBillPaymentFetchError,
    isLoadingBillPayments,
    setIsLoadingBillPayments,
  } = useBillPayment();

  const {
    bills,
    setBills,
    billFetchError,
    isLoadingBills,
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
    invoicesCount,
  } = useStockInvoice();

  const { stockItems, setStockItems } = useStockItem();
  return (
    <BillPaymentContext.Provider
      value={{
        billPayments,
        setBillPayments,
        billPaymentFetchError,
        setBillPaymentFetchError,
        isLoadingBillPayments,
      }}
    >
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
          invoicesCount,
        }}
      >
        <StockItemContext.Provider value={{ stockItems, setStockItems }}>
          <AllBillContext.Provider
            value={{
              bills,
              setBills,
              isLoadingBills,
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
          </AllBillContext.Provider>
        </StockItemContext.Provider>
      </StockInvoiceContext.Provider>
    </BillPaymentContext.Provider>
  );
};

export default BillingMainPage;
