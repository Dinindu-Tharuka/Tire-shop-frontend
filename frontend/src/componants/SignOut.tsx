import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

const SignOut = () => {
  const {toggleColorMode, colorMode} = useColorMode();
  return (
    <Center width="100%" marginTop={7}>
      <Flex
        width="90%"
        height="30vh"
        bg={colorMode === 'light'? '#ca5c4f':'#0c0c12'}
        alignItems="center"
        flexDir="column"
        paddingTop={5}
        borderRadius="50px"
        justifyContent='space-between'
        paddingBottom={5}
        boxShadow='dark-lg'
      >
        <VStack>
          <Heading fontSize="2xl" textColor={colorMode === 'light'? '#ffeee7':'#e39f9c'}>Chamila</Heading>
          <Heading fontSize="2xl" textColor={colorMode === 'light'? '#ffeee7':'#e39f9c'}>
            Perera
          </Heading>
        </VStack>
        <VStack>
          <Text textColor={colorMode === 'light'? '#ffeee7':'#e39f9c'}>Admin</Text>
          <Button
            
            bg={colorMode === 'light'? '#e3a99c':'#252528'}          
            paddingX={10}
            fontWeight="bold"
            fontSize="xl"
            paddingY={6}
            
            borderRadius={20}
            boxShadow='dark-lg'
            marginBottom={20}
          >
            Sign Out
          </Button>
        </VStack>
      </Flex>
    </Center>
  );
};

export default SignOut;
