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

  return (
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
  );
};

export default BillingMainPage;
