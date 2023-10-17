import {
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
          <Flex width="60vw" height="85vh">
            <TyreTakenTable/>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex width="60vw" height="80vh">
            <SendTyreTable/>
          </Flex>
        </TabPanel>
        <TabPanel>
        <Flex width="60vw" height="80vh">
          <ReceivedTyreTable/>
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
