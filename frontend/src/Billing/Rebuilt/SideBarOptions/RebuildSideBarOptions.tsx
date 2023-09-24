import { Accordion, AccordionButton } from "@chakra-ui/react";

import AddDrawerTakenTyre from "../TyreTaken/Add/AddDrawerTakenTyre";

const RebuildSideBarOptions = () => {
  return (
    <Accordion allowToggle>
      <AccordionButton>
        <AddDrawerTakenTyre />
      </AccordionButton>
    </Accordion>
  );
};

export default RebuildSideBarOptions;
