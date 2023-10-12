import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import StockInvoiceTable from "../StockInvoiceTable";

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
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default StockInvoiceMainPage;
