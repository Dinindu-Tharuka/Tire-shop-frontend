import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import TyreTakenTable from "../TyreTaken/TyreTakenTable";

const RebuiltMainPage = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Accepting Tyres</Tab>
        <Tab>Send Tyre</Tab>
        <Tab>Received Tyre</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Flex width="60vw" height="85vh">
            <TyreTakenTable/>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex width="60vw" height="80vh" bg="blue.700"></Flex>
        </TabPanel>
        <TabPanel>
        <Flex width="60vw" height="80vh" bg="yellow.700"></Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RebuiltMainPage;
