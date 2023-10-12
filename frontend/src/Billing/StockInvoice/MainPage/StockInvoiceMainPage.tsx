import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import StockInvoiceTable from "../StockInvoiceTable";
import StockItemsReport from "../Reports/StockItemsReport";

const StockInvoiceMainPage = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Invoices</Tab>
        <Tab>Reports</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <StockInvoiceTable />
        </TabPanel>
        <TabPanel>
          <StockItemsReport/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default StockInvoiceMainPage;
