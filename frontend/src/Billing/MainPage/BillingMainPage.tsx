import { Grid, GridItem, useColorMode, Text } from "@chakra-ui/react";
import BillingSidePanel from "../SidePanel/BillingSidePanel";
import { Outlet } from "react-router-dom";
import useStockInvoicePage from "../../hooks/Stock/useStockInvoicePage";
import useStockItem from "../../hooks/Stock/useStockItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import StockInvoicePageContext from "../../Contexts/Stock/StockInvoicePageContext";
import useBillPayment from "../../hooks/Billing/useBillPayment";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import useBill from "../../hooks/Billing/useBill";
import AllBillContext from "../../Contexts/Bill/AllBillContext";
import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";
import useStockInvoice from "../../hooks/Stock/useStockInvoice";
import usePageBill from "../../hooks/Billing/usePageBill";
import BillContext from "../../Contexts/Bill/BillContext";

const BillingMainPage = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const {
    stockInvoices,
    setStockInvoices,
    errorFetchStockInvoice,
    nextStockInvoiceUrl,
    previousStockInvoiceUrl,
    filterStockInvoiceParams,
    setFilterStockInvoiceParams,
    isLoadingInvoices,
    invoicesCount,
    setErrorFetchStockInvoice,
    setInvoiceIdFilter,
  } = useStockInvoicePage();

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
    nextBillPageUrl,
    previousBillPageUrl,
    filterBillPageParams,
    setFilterBillPageParams,
    billFetchError,
    isLoadingBills,
    billCount,
    setBillFetchError,
    setBillIdFilter
  } = usePageBill();

  const { stockItems, setStockItems } = useStockItem();
  return (
    <StockInvoicePageContext.Provider
      value={{
        stockInvoices,
        setStockInvoices,
        errorFetchStockInvoice,
        nextStockInvoiceUrl,
        previousStockInvoiceUrl,
        filterStockInvoiceParams,
        setFilterStockInvoiceParams,
        isLoadingInvoices,
        invoicesCount,
        setErrorFetchStockInvoice,
        setInvoiceIdFilter,
      }}
    >
      <BillPaymentContext.Provider
        value={{
          billPayments,
          setBillPayments,
          billPaymentFetchError,
          setBillPaymentFetchError,
          isLoadingBillPayments,
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
              billCount,
              setBillFetchError,
              setBillIdFilter
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
      </BillPaymentContext.Provider>
    </StockInvoicePageContext.Provider>
  );
};

export default BillingMainPage;
