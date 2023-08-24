import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Show,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomerAddDrawer from "../Customer/CustomerAddDrawer";
import VehicleAddDrawer from "../Vehicle/VehicleAddDrawer";
const CustomerSidePanel = () => {
  const customerOptions = ["Customer"];
  const customerOptionLinks = ["", "categories", "suppliers"];
  const { toggleColorMode, colorMode } = useColorMode();

  const customerMenuList = customerOptions.map((option, index) => (
    <Flex key={index} width="100%" justifyContent="space-between">      
      <Menu>
        <MenuButton
          paddingRight={4}
          height="8vh"
          textAlign="left"
          width='100%'
          as={Button}
          rightIcon={<AiOutlineDown />}
          bg={colorMode === 'light'? '#e3a99c':''}
          _hover={
            colorMode === "light"
              ? { background: "#fababb" }
              : { background: "#3e3d40" }
          }
        >{option}</MenuButton>
        <MenuList height="8vh" bg={colorMode === 'light'?'#e3a99c':''} >{index === 0 ? <CustomerAddDrawer /> : ''}</MenuList>
      </Menu>
    </Flex>
  ));
  return (
    <Box >
      <Show above="lg">
        <VStack >{customerMenuList}</VStack>
      </Show>
      <Show below="lg">
        <HStack>{customerMenuList}</HStack>
      </Show>
    </Box>
  );
};

export default CustomerSidePanel;
