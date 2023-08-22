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
import { RiH1 } from "react-icons/ri";
  import { Link } from "react-router-dom";
const CustomerSidePanel = () => {
    
  const customerOptions = ["Customer", "Vehicle" ];
  const customerOptionLinks = ['', 'categories', 'suppliers']
  const { toggleColorMode, colorMode } = useColorMode();

  

  const customerMenuList = customerOptions.map((option, index) => (
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
        <Link to={customerOptionLinks[index]}><Text fontWeight='bold'>{option}</Text></Link>
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
          <h1>add</h1>
        </MenuList>
      </Menu>
    </Flex>
  ));
  return (
    <>
      <Show above="lg">
        <VStack>{customerMenuList}
        </VStack>
      </Show>
      <Show below="lg">
        <HStack>{customerMenuList}</HStack>
      </Show>
    </>
  )
}

export default CustomerSidePanel