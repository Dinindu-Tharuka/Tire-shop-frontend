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

const RegistrationSidePanel = () => {

  const registerList = ["User", "Employee", "Supplier"];
  const inventory_links = ['', 'categories', 'suppliers']
  const { toggleColorMode, colorMode } = useColorMode();

  const options = ["ADD"];

  const inventoryMenuList = registerList.map((inventory, index) => (
    <Flex key={index} width="100%" justifyContent='space-between'>
      <Flex 
          padding={3}
          borderRadius={20}
          alignItems='center'
          _hover={
            colorMode === "light"
              ? { background: "#fababb" }
              : { background: "#3e3d40" }
          }
          width='100%'
          >
        <Link to={inventory_links[index]}><Text fontWeight='bold'>{inventory}</Text></Link>
      </Flex>
      <Menu>
        <MenuButton
          paddingRight={4}
          height="10vh"          
          textAlign="left"
          as={Button}
          rightIcon={<AiOutlineDown />}
          _hover={
            colorMode === "light"
              ? { background: "#fababb" }
              : { background: "#3e3d40" }
          }
        >
          
          
         
        </MenuButton>
        <MenuList>
          {/* {options.map((option, num) =>
            index === 0 ? (
              <InventoryAddButtonDrawer key={num}/>
            ) : index === 1 ? (
              <AddCategoryDrawer key={num} />
            ) : index === 2 ? (
              <AddSupplierDrawer key={num}/>
            ) : null
          )} */}
        </MenuList>
      </Menu>
    </Flex>
  ));

  return (
    <div>RegistrationSidePanel</div>
  )
}

export default RegistrationSidePanel