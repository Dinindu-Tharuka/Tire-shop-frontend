import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Login from "./Login";
import MainImage from "../componants/MainImage";

const LoginPage = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      bg="red.100"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        width="80vw"
        height="90vh"
        bg="#f95278"
        flexDir="row"
        borderRadius={50}
      >
        <Flex width="40vw" justifyContent="center" alignItems="center">
          <Box>
            <Login />
          </Box>
        </Flex>
        <Flex>
          <MainImage />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
