import { Grid, GridItem, useColorMode, Text } from "@chakra-ui/react";
import BillingSidePanel from "../SidePanel/BillingSidePanel";
import { Outlet } from "react-router-dom";
import useStockInvoicePage from "../../hooks/Stock/useStockInvoicePage";
import useStockItem from "../../hooks/Stock/useStockItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import StockInvoicePageContext from "../../Contexts/Stock/StockInvoicePageContext";
import useBillPayment from "../../hooks/Billing/useBillPayment";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import AllStockInvoiceContext from "../../Contexts/Stock/AllStockInvoiceContext";
import useAllStockInvoice from "../../hooks/Stock/useAllStockInvoice";
import useStockItemUnique from "../../hooks/Stock/useStockItemUnique";
import StockItemUniqueContext from "../../Contexts/Stock/StockItemUniqueContext";
import useSupplier from "../../hooks/Registration/useSupplier";
import SupplierContext from "../../Contexts/Registration/SupplierContext";
import useCustomer from "../../hooks/Customer/useCustomer";
import CustomerContext from "../../Contexts/Customer/CustomerContext";
import useStockpayment from "../../hooks/Stock/useStockpayment";
import StockPaymentContext from "../../Contexts/Stock/StockPaymentContext";
import useTyreTakenPagination from "../../hooks/Rebuild/useTakenTyre";
import TakenTyreContext from "../../Contexts/Rebuild/TakenTyreContext";
import useVehicles from "../../hooks/Customer/useVehicles";
import VehicleContext from "../../Contexts/Customer/VehicleContext";
import useSendtyre from "../../hooks/Rebuild/usesendtyre";
import SendTyreContext from "../../Contexts/Rebuild/SendTyreContext";

const BillingMainPage = () => {
  const { colorMode } = useColorMode();

 
  const {
    sendTyres,
    setSendTyres,
    errorFetchSendTyres,
    setErrorFetchSendTyres,
    nextSendTyresUrl,
    previousSendTyresUrl,
    filterSendTyreParams,
    setFilterSendTyreParams,
    isLoadingSendTyre,
    sendTyreCount,
    setSendTyreNameFilter,
  } = useSendtyre();
  const {
    takenTyres,
    setTakenTyres,
    errorFetchTakenTyres,
    setErrorFetchTakenTyres,
    nextTakenTyresUrl,
    previousTakenTyresUrl,
    filterTakenTyreParams,
    setFilterTakenTyreParams,
    isLoadingTakenTyre,
    takenTyreCount,
    setTakenTyreNameFilter,
  } = useTyreTakenPagination();

  const {
    stockPayments,
    setStockPayments,
    stockPaymentsFetchError,
    setStockPaymentsFetchError,
  } = useStockpayment();

  const { vehicles, setVehicles, setVehicleNoFilter, errorVehicleFetch } =
    useVehicles();

  const {
    customers,
    setCustomers,
    nextUrl,
    previousUrl,
    setFilterParams,
    filterParams,
    errorCustomerFetch,
    setErrorCustomerFetch,
    isLoadingCustomer,
    customerCount,
    setCustomerNameFilter,
  } = useCustomer();

  const { stockItemsUnique, setStockItemsUnique } = useStockItemUnique();
  const {
    suppliers,
    setSuppliers,
    errorFetchSupplier,
    nextSupplierUrl,
    previousSupplierUrl,
    filterSupplierParams,
    setFilterSupplierParams,
    suppliersCount,
    isLoadingSupplierPage,
    setErrorFetchSupplier,
    setSupplierNameFilter,
  } = useSupplier();
  const {
    stockInvoices:stockAllInvoices,
    setStockInvoices: setStockAllInvoices,
    isLoadingInvoices: isLoadingAllInvoices,
    errorFetchStockInvoice: errorFetchStockAllInvoice,
    setErrorFetchStockInvoice: setErrorFetchAllStockInvoice,
    setFilterGrnNo,
    setFilterInvoiceNo,
    setFilterSupplier
  } = useAllStockInvoice();

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
    setInvoiceBillIdFilter,
  } = useStockInvoicePage();

  const {
    billPayments,
    setBillPayments,
    billPaymentFetchError,
    setBillPaymentFetchError,
    isLoadingBillPayments,
    setIsLoadingBillPayments,
  } = useBillPayment();

  const { stockItems, setStockItems } = useStockItem();

  return (
    <SendTyreContext.Provider
      value={{
        sendTyres,
        setSendTyres,
        errorFetchSendTyres,
        setErrorFetchSendTyres,
        nextSendTyresUrl,
        previousSendTyresUrl,
        filterSendTyreParams,
        setFilterSendTyreParams,
        isLoadingSendTyre,
        sendTyreCount,
        setSendTyreNameFilter,
      }}
    >
      <VehicleContext.Provider
        value={{ vehicles, setVehicles, setVehicleNoFilter, errorVehicleFetch }}
      >
        <TakenTyreContext.Provider
          value={{
            takenTyres,
            setTakenTyres,
            errorFetchTakenTyres,
            setErrorFetchTakenTyres,
            nextTakenTyresUrl,
            previousTakenTyresUrl,
            filterTakenTyreParams,
            setFilterTakenTyreParams,
            isLoadingTakenTyre,
            takenTyreCount,
            setTakenTyreNameFilter,
          }}
        >
          <StockPaymentContext.Provider
            value={{
              stockPayments,
              setStockPayments,
              stockPaymentsFetchError,
              setStockPaymentsFetchError,
            }}
          >
            <CustomerContext.Provider
              value={{
                customers,
                setCustomers,
                nextUrl,
                previousUrl,
                setFilterParams,
                filterParams,
                errorCustomerFetch,
                setErrorCustomerFetch,
                isLoadingCustomer,
                customerCount,
                setCustomerNameFilter,
              }}
            >
              <SupplierContext.Provider
                value={{
                  suppliers,
                  setSuppliers,
                  errorFetchSupplier,
                  nextSupplierUrl,
                  previousSupplierUrl,
                  filterSupplierParams,
                  setFilterSupplierParams,
                  suppliersCount,
                  isLoadingSupplierPage,
                  setErrorFetchSupplier,
                  setSupplierNameFilter,
                }}
              >
                <StockItemUniqueContext.Provider
                  value={{ stockItemsUnique, setStockItemsUnique }}
                >
                  <AllStockInvoiceContext.Provider
                    value={{
                      stockAllInvoices,
                      setStockAllInvoices,
                      isLoadingAllInvoices,
                      errorFetchStockAllInvoice,
                      setErrorFetchAllStockInvoice,
                      setFilterGrnNo,
                      setFilterInvoiceNo,
                      setFilterSupplier
                    }}
                  >
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
                        setInvoiceBillIdFilter,
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
                        <StockItemContext.Provider
                          value={{ stockItems, setStockItems }}
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
                        </StockItemContext.Provider>
                      </BillPaymentContext.Provider>
                    </StockInvoicePageContext.Provider>
                  </AllStockInvoiceContext.Provider>
                </StockItemUniqueContext.Provider>
              </SupplierContext.Provider>
            </CustomerContext.Provider>
          </StockPaymentContext.Provider>
        </TakenTyreContext.Provider>
      </VehicleContext.Provider>
    </SendTyreContext.Provider>
  );
};

export default BillingMainPage;
