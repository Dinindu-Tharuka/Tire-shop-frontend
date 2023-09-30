import { Accordion, AccordionButton } from "@chakra-ui/react";

import AddDrawerTakenTyre from "../TyreTaken/Add/AddDrawerTakenTyre";
import AddDrawerSendtyre from "../SendTyre/Add/AddDrawerSendtyre";
import AddDrawerReceivedTyre from "../ReceivedTyre/Add/AddDrawerReceivedTyre";

const RebuildSideBarOptions = () => {
  return (
    <Accordion allowToggle padding={0}>
      <AccordionButton padding={0}>
        <AddDrawerTakenTyre />        
      </AccordionButton>
      <AccordionButton padding={0}>
        <AddDrawerSendtyre />        
      </AccordionButton>
      <AccordionButton padding={0}>
        <AddDrawerReceivedTyre />        
      </AccordionButton>
    </Accordion>
  );
};

export default RebuildSideBarOptions;
