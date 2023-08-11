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
    <Center width="100%" marginTop={10} overflow="hidden">
      <Flex
        width="90%"
        height="35vh"
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
          <Heading fontSize="2xl" marginTop={3}>
            Perera
          </Heading>
        </VStack>
        <VStack>
          <Text>Admin</Text>
          <Button
            colorScheme="blue"
            marginTop={2}
            paddingX={10}
            fontWeight="bold"
            fontSize="xl"
            paddingY={6}
            borderRadius={20}
            boxShadow='dark-lg'
          >
            Sign Out
          </Button>
        </VStack>
      </Flex>
    </Center>
  );
};

export default SignOut;
