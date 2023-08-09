import {HStack, Switch, useColorMode, Text} from '@chakra-ui/react'

const ColorModeSwitch = () => {
    const {toggleColorMode, colorMode} = useColorMode();
  return (
    <HStack padding='10px'>
        <Switch colorScheme='green' isChecked={colorMode === 'dark'} onChange={toggleColorMode}/>
        <Text>{colorMode === 'dark'? 'Dark':'Light'}</Text>
    </HStack>
  )
}

export default ColorModeSwitch