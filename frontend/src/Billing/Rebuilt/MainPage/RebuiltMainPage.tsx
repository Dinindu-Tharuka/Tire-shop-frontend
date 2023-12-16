import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import TyreTakenTable from "../TyreTaken/TyreTakenTable";
import SendTyreTable from "../SendTyre/SendTyreTable";
import ReceivedTyreTable from "../ReceivedTyre/ReceivedTyreTable";
import RebuiltReports from "../Report/RebuiltReports";
import { useContext } from "react";
import UserMeContext from "../../../Contexts/User/UserMe";
import AddDrawerTakenTyre from "../TyreTaken/Add/AddDrawerTakenTyre";
import AddDrawerSendtyre from "../SendTyre/Add/AddDrawerSendtyre";
import AddDrawerReceivedTyre from "../ReceivedTyre/Add/AddDrawerReceivedTyre";

const RebuiltMainPage = () => {
  const userMe = useContext(UserMeContext)
  return (
    <Tabs>
      <TabList>
        <Tab>Accepting Tyres</Tab>
        <Tab>Send Tyre</Tab>
        <Tab>Received Tyre</Tab>
        {(userMe.is_superuser || userMe.is_manager) && <Tab>Reports</Tab>}
      </TabList>

      <TabPanels>
        <TabPanel>
          <Flex width="70vw" height="85vh" justifyContent='center'> 
            <TyreTakenTable/>
            <AddDrawerTakenTyre/>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex width="70vw" height="85vh" justifyContent='center'>
            <SendTyreTable/>
            <AddDrawerSendtyre/>
          </Flex>
        </TabPanel>
        <TabPanel>
        <Flex width="70vw" height="85vh" justifyContent='center'>
          <ReceivedTyreTable/>
          <AddDrawerReceivedTyre/>
        </Flex>
        </TabPanel>
        {(userMe.is_superuser || userMe.is_manager) && <TabPanel>
          <RebuiltReports/>
        </TabPanel>}
      </TabPanels>
    </Tabs>
  );
};

export default RebuiltMainPage;
