import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import BillTable from "./BillTable";
import PaymentMainReport from "./Reports/Payments/PaymentMainReport";

const BillPageManager = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Invoices</Tab>
        <Tab>Payment Reports</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <BillTable />
        </TabPanel>
        <TabPanel>
          <PaymentMainReport />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default BillPageManager;
