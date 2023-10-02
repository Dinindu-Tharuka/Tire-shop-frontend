import { HStack, Text, Center, VStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import MainName from "./MainName";

const Navbar = () => {
  return (
    <HStack justifyContent="space-between">
      <MainName />
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
