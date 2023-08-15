import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

const SignOut = () => {
  return (
    <Center width="100%" marginTop={7}>
      <Flex
        width="90%"
        height="30vh"
        bg="blue.400"
        alignItems="center"
        flexDir="column"
        paddingTop={5}
        borderRadius="50px"
        justifyContent='space-between'
        paddingBottom={5}
        boxShadow='dark-lg'
      >
        <VStack>
          <Heading fontSize="2xl">Chamila</Heading>
          <Heading fontSize="2xl">
            Perera
          </Heading>
        </VStack>
        <VStack>
          <Text>Admin</Text>
          <Button
            colorScheme="blue"           
            paddingX={10}
            fontWeight="bold"
            fontSize="xl"
            paddingY={6}
            marginTop={5}
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
