import { Box, Button, HStack, Menu, MenuButton, MenuList, Show, Text, VStack, useColorMode } from "@chakra-ui/react"
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import InventoryAddButtonDrawer from "./InventoryAddButtonDrawer";





const InventorySidePanel = () => {
    const inventoryList = ['Item', 'Item Category', 'Supplier']
    const {toggleColorMode, colorMode} = useColorMode();
    
    const options = ['ADD']

    

  return (
    <>
    <Show above='lg'>
       
        <VStack>
            {inventoryList.map((inventory, index) => 
            <Box key={index} width='100%'>
                 <Menu>
                    <MenuButton 
                        paddingRight={4}
                        height='10vh'
                        width='100%' 
                        textAlign='left' 
                        as={Button} 
                        rightIcon={<AiOutlineDown />}
                        _hover={colorMode === 'light'?{ background: "#fababb" }:{ background: "#3e3d40" }}
                        >{inventory}</MenuButton>
                    <MenuList>
                        {
                            options.map((option, index) => (
                                <InventoryAddButtonDrawer key={index} inventory={inventory} option={option}/>
                            ))
                        }
                    </MenuList>
                 </Menu>                
            </Box>)}
        </VStack>
    </Show>
    <Show below="lg">
        <HStack>
            {inventoryList.map((item, index) => <Box key={index}><Text padding={2} >{item}</Text></Box>)}
        </HStack>
    </Show>
    </>
  )
}

export default InventorySidePanel