import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import StockInvoiceTable from "../StockInvoiceTable";
import StockItemsReport from "../Reports/StockItemsReport";
import { useContext } from "react";
import UserMeContext from "../../../Contexts/User/UserMe";

const StockInvoiceMainPage = () => {
  // Administration
  const userMe = useContext(UserMeContext)
  return (
    <Tabs>
      <TabList>
        <Tab>Invoices</Tab>
        {(userMe.is_superuser || userMe.is_manager) && <Tab>Reports</Tab>}
      </TabList>

      <TabPanels>
        <TabPanel>
          <StockInvoiceTable />
        </TabPanel>
        {(userMe.is_superuser || userMe.is_manager) && <TabPanel>
          <StockItemsReport/>
        </TabPanel>}
      </TabPanels>
    </Tabs>
  );
};

export default StockInvoiceMainPage;
