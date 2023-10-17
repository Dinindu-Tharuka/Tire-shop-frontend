import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useContext } from "react";
import BillTable from "./BillTable";
import PaymentMainReport from "./Reports/Payments/PaymentMainReport";
import UserMeContext from "../../Contexts/User/UserMe";

const BillPageManager = () => {
  //Administrtion
  const userMe = useContext(UserMeContext)
  return (
    <Tabs>
      <TabList>
        <Tab>Invoices</Tab>
        {(userMe.is_superuser || userMe.is_manager) && <Tab>Payment Reports</Tab>}
      </TabList>

      <TabPanels>
        <TabPanel>
          <BillTable />
        </TabPanel>
        {(userMe.is_superuser || userMe.is_manager) && <TabPanel>
          <PaymentMainReport />
        </TabPanel>}
      </TabPanels>
    </Tabs>
  );
};

export default BillPageManager;
