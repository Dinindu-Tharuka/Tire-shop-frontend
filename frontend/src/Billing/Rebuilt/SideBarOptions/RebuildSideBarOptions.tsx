import { Accordion, AccordionButton } from "@chakra-ui/react";

import AddDrawerTakenTyre from "../TyreTaken/Add/AddDrawerTakenTyre";
import AddDrawerSendtyre from "../SendTyre/Add/AddDrawerSendtyre";

const RebuildSideBarOptions = () => {
  return (
    <Accordion allowToggle>
      <AccordionButton>
        <AddDrawerTakenTyre />        
      </AccordionButton>
      <AccordionButton>
        <AddDrawerSendtyre />        
      </AccordionButton>
    </Accordion>
  );
};

export default RebuildSideBarOptions;
