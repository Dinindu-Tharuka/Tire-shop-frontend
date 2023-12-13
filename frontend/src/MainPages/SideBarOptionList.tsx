import {
  Button,
  Container,
  HStack,
  Icon,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  Show,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsBuildings, BsChevronDown } from "react-icons/bs";
import { PiContactlessPayment } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { BsBuildingFill } from "react-icons/bs";
import SignOut from "../Authentication/SignOut";
import { Link } from "react-router-dom";
import { MouseEventHandler, useContext, useState } from "react";
import UserMeContext from "../Contexts/User/UserMe";
import { BsBank } from "react-icons/bs";

const SideBarOptionList = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [selectedLGIndex, setSelectedLGIndex] = useState(-1);
  const color = useColorModeValue("#595959", "#d9d9d9");

  const userMe = useContext(UserMeContext);

  let options_lg = [
    "Main Dashbord",
    "Customer",
    "Billing",
    "Inventory",
    "GRN",
    "Rebuilt",
    "Cheques",
  ];
  let links_lg = [
    "/",
    "/customer",
    "/billing",
    "/grn",
    "/inventory",
    "/grn",
    "/rebuilt",
    "/cheques",
  ];
  let options_base = [
    "Main Dashbord",
    "Customer",
    "Billing",
    "Inventory",
    "GRN",
    "Rebuilt",
    "Cheques",
    "Sign out",
  ];
  let links_base = [
    "/",
    "/customer",
    "/billing",
    "/inventory",
    "/grn",
    "/rebuilt",
    "/cheques",
    "/login",
  ];

  if (userMe.is_superuser || userMe.is_manager) {
    options_lg = [
      "Main Dashbord",
      "Customer",
      "Billing",
      "Inventory",
      "GRN",
      "Rebuilt",
      "Cheques",
      "Registration",
    ];
    links_lg = [
      "/",
      "/customer",
      "/billing",
      "/inventory",
      "/grn",
      "/rebuilt",
      "/cheques",
      "/registration",
    ];
    options_base = [
      "Main Dashbord",
      "Customer",
      "Billing",
      "Inventory",
      "GRN",
      "Rebuilt",
      "Registration",
      "Sign out",
    ];
    links_base = [
      "/",
      "/customer",
      "/billing",
      "/inventory",
      "/grn",
      "/rebuilt",
      "/registration",
      "/login",
    ];
  }

  const icons_lg = [
    AiOutlineHome,
    LiaFileInvoiceDollarSolid,
    MdOutlineInventory,
    BsBuildings,
    PiContactlessPayment,
    BsBuildingFill,
    BsBank,
    RxAvatar,
  ];
  const icons_base = [
    AiOutlineHome,
    LiaFileInvoiceDollarSolid,
    MdOutlineInventory,
    BsBuildings,
    PiContactlessPayment,
    BsBank,
    RxAvatar,
  ];

  //Sign Out
  const signout = (option: string) => {
    if (option == "Sign out") {
      localStorage.clear();
    }
  };

  // Large Screens
  const sideBar = options_lg.map((option, index) => (
    <ListItem
      key={index}
      padding={4}
      _hover={
        colorMode === "light"
          ? { background: "#fababb" }
          : { background: "#3e3d40" }
      }
      bg={selectedLGIndex === index ? "#fababb" : ""}
      boxShadow="1px 2px 2px 0 rgba(0, 0, 0, 0.2)"
      borderRadius={10}
    >
      <HStack>
        <Icon color={color} key={index} as={icons_lg[index]} />
        <Button
          textColor={
            colorMode === "dark" && selectedLGIndex === index ? "black" : color
          }
          variant="link"
          textAlign="left"
        >
          <Link to={links_lg[index]} onClick={() => setSelectedLGIndex(index)}>
            {option}
          </Link>
        </Button>
      </HStack>
    </ListItem>
  ));

  // Base Screen
  const sideBarBase = options_base.map((option, index) => (
    <HStack padding={5} key={index}>
      <Icon color="gray.500" key={index} as={icons_base[index]} />
      <Button variant="link" textAlign="left">
        <Link to={links_base[index]} onClick={() => signout(option)}>
          {option}
        </Link>
      </Button>
    </HStack>
  ));
  return (
    <>
      {/* Large Screens */}
      <Show above="lg">
        <Container overflow='auto' maxHeight='50vh' minHeight='50vh'>
          <List marginTop={5} paddingX={5}>
            {sideBar}
          </List>
        </Container>
        <SignOut/>
      </Show>

      {/* Base Screen */}
      <Show below="lg">
        <Menu>
          <MenuButton as={Button} rightIcon={<AiOutlineMenu />}></MenuButton>
          <MenuList>{sideBarBase}</MenuList>
        </Menu>
      </Show>
    </>
  );
};

export default SideBarOptionList;
