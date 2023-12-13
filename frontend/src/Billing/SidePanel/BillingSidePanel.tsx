import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Show,
  Text,
  VStack,
  useColorMode,
  useStatStyles,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import StockAddDrawer from "../StockInvoice/StockAddDrawer";
import BillAddDrawer from "../Bill/BillAddDrawer";
import RebuildSideBarOptions from "../Rebuilt/SideBarOptions/RebuildSideBarOptions";
import { useContext, useState } from "react";
import UserMeContext from "../../Contexts/User/UserMe";

const BillingSidePanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  // Administration
  const userMe = useContext(UserMeContext);
  let billingList = [
    "Invoice",
    "GRN",
  ];
  let billing_links = ["", "stock-invoice"];
  
  if (userMe.is_superuser || userMe.is_manager) {
    billingList = [
      "Invoice",
      "Debtors",
    ];
    billing_links = [
      "",
      "debtors",
    ];
  }

  const { colorMode } = useColorMode();

  const options = ["ADD"];

  const inventoryMenuList = billingList.map((bill, index) => (
    <Flex key={index} width="100%" justifyContent="space-between">
      <Accordion
        allowToggle
        bg={colorMode === "light" ? "#e3a99c" : "#252528"}
        width="100%"
        borderRadius={10}
      >
        <AccordionItem borderRadius={10}>
          <h2>
            <AccordionButton onClick={()=> setSelectedIndex(index) } padding={0}>
              <Box as="span" flex="1" textAlign="left" bg={selectedIndex === index ? '#f1cac1':''} padding={3} borderRadius={10}>
                <Link to={billing_links[index]}>
                  <Text fontWeight="bold">{bill}</Text>
                </Link>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg={colorMode === "light" ? "#f1cac1" : ""}>
            {options.map((option, num) =>
              index === 0 ? (
                <BillAddDrawer key={num} />
              ) : null
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  ));
  return (
    <Box>
      <Show above="lg">
        <VStack>{inventoryMenuList}</VStack>
      </Show>
      <Show below="lg">
        <HStack>{inventoryMenuList}</HStack>
      </Show>
    </Box>
  );
};

export default BillingSidePanel;
