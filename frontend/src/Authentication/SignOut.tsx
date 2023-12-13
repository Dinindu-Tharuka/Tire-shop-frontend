import {
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserMeContext from "../Contexts/User/UserMe";
import UserProfileContext from "../Contexts/User/UserProfileContext";
import { UserProfile } from "../Registration/User/User Profile/UserProfile";

const SignOut = () => {
  const { colorMode } = useColorMode();
  const { userProfiles } = useContext(UserProfileContext);
  const userMe = useContext(UserMeContext);

  const signOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.setItem("isReloaded", 'false')
  };
  return (
    <Center width="100%" marginTop={2}>
      <Flex
        width="90%"
        height="35vh"
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
          <Text
            fontSize="2xl"
            textColor={colorMode === "light" ? "#ffeee7" : "#e39f9c"}
            fontWeight='bold'
            margin={0}
            padding={0}
          >
            {
              userProfiles.find((user) => user.user_account_id === userMe.id)
                ?.first_name
            }
          </Text>
          <Text
            fontSize="2xl"
            fontWeight='bold'
            textColor={colorMode === "light" ? "#ffeee7" : "#e39f9c"}
            padding={0}
            margin={0}
          >
            {
              userProfiles.find((user) => user.user_account_id === userMe.id)
                ?.last_name
            }
          </Text>
        </VStack>
        <VStack>
          <Text margin={0} padding={0} textColor={colorMode === "light" ? "#ffeee7" : "#e39f9c"}>
            {userMe.is_superuser
              ? "Superuser"
              : userMe.is_manager
              ? "Manager"
              : "Cashier"}
          </Text>
          <UserProfile />
          <Button
            bg={colorMode === "light" ? "#e3a99c" : "#252528"}
            paddingX={10}
            fontWeight="bold"
            fontSize="xl"
            paddingY={3}
            borderRadius={20}
            boxShadow="dark-lg"
            marginBottom={2}
            onClick={signOut}
          >
            <Link to="/login">Sign Out</Link>
          </Button>
        </VStack>
      </Flex>
    </Center>
  );
};

export default SignOut;
