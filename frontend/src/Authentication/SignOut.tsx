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
import { Link } from "react-router-dom";
import { useContext} from "react";
import UserMeContext from "../Contexts/User/UserMe";
import useUser from "../hooks/User/useUser";
import UserProfileContext from "../Contexts/User/UserProfileContext";
import { UserProfile } from "../Registration/User/User Profile/UserProfile";

const SignOut = () => {
  const { colorMode } = useColorMode();

  const { userProfiles } = useContext(UserProfileContext)

  console.log('userProfiles', userProfiles)
 
  const userMe = useContext(UserMeContext)
  const {users} = useUser() 

  const signOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
  return (
    <Center width="100%" marginTop={7}>
      <Flex
        width="90%"
        height="40vh"
        bg={colorMode === "light" ? "#ca5c4f" : "#0c0c12"}
        alignItems="center"
        flexDir="column"
        paddingTop={5}
        borderRadius="50px"
        justifyContent="space-between"
        paddingBottom={5}
        boxShadow="dark-lg"
      >
        <VStack>
          <Heading
            fontSize="2xl"
            textColor={colorMode === "light" ? "#ffeee7" : "#e39f9c"}
          >
            {userProfiles.find( user => user.user_account_id === userMe.id)?.first_name}
          </Heading>
          <Heading
            fontSize="2xl"
            textColor={colorMode === "light" ? "#ffeee7" : "#e39f9c"}
          >
            {userProfiles.find( user => user.user_account_id === userMe.id)?.last_name}
          </Heading>
        </VStack>
        <VStack>
          <Text textColor={colorMode === "light" ? "#ffeee7" : "#e39f9c"}>
          {userMe.id === 1? 'Admin': userMe.is_manager ? 'Manager':"Cashier"}
          </Text>
          <Button
            bg={colorMode === "light" ? "#e3a99c" : "#252528"}
            paddingX={10}
            fontWeight="bold"
            fontSize="xl"
            paddingY={6}
            borderRadius={20}
            boxShadow="dark-lg"
            marginBottom={2}
            onClick={signOut}
          >
            <Link to="/login">Sign Out</Link>            
          </Button>
          <UserProfile/>
        </VStack>
      </Flex>
    </Center>
  );
};

export default SignOut;
