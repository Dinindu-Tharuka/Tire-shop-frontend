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
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";
import StockAddDrawer from "../StockInvoice/StockAddDrawer";
import BillAddDrawer from "../Bill/BillAddDrawer";
import RebuildSideBarOptions from "../Rebuilt/SideBarOptions/RebuildSideBarOptions";
  
 

const BillingSidePanel = () => {
    const billingList = ["Invoice", "Rebuilt", "GRN", "Debtors", "Banking Cheques"];
  const billing_links = ["", "rebuilt", "stock-invoice", "debtors", "cheques"];
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
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
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
              ) : index === 1 ? (
                <RebuildSideBarOptions key={num} />
              ) : index === 2 ? (
                <StockAddDrawer key={num} />
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
  )
}

export default BillingSidePanel