import { Box, Button, HStack, Menu, MenuButton, MenuList, Show, Text, VStack, useColorMode } from "@chakra-ui/react"
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";




const InventorySidePanel = () => {
    const inventoryList = ['Item', 'Item Category', 'Supplier']
    const {toggleColorMode, colorMode} = useColorMode();
    const [selectedOption, setSelectedOption] = useState('')
    const options = ['ADD']

    const menu = options.map(option => (
        <Button 
            variant="link" 
            textAlign="left"
            bg='#aaa1a1'
            textColor={colorMode === 'light'? '#2b2323':'#e0d6d6'}
            _hover={colorMode === 'light'?{ background:'#3e3d40 ' }:{ background: "#fababb" }}
            width='100%'
            height='8vh'
            onClick={()=>setSelectedOption(option)}
            >
            {option}
        </Button>
    ))
    

  return (
    <>
    <Show above='lg'>
    {/* <Text fontWeight='bold' padding={4} _hover={colorMode === 'light'?{ background: "#fababb" }:{ background: "#3e3d40" }} >{item}</Text> */}
        <VStack>
            {inventoryList.map((item, index) => 
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
                        >{item}</MenuButton>
                    <MenuList>{menu}</MenuList>
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