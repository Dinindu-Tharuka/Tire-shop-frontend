import {HStack, Text, Center} from '@chakra-ui/react'
import ColorModeSwitch from './ColorModeSwitch'

const Navbar = () => {
  return (
    <HStack justifyContent='space-between'>
        <Center w='100px' h='60px'>
            <Text>
                Tyre Center
            </Text>
        </Center>

        <ColorModeSwitch/>
        
    </HStack>
  )
}

export default Navbar