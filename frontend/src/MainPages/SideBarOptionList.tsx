import {
  Button,
  HStack,
  Icon,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  Show,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsBuildings, BsChevronDown } from "react-icons/bs";
import { PiContactlessPayment } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";

import { RiShutDownLine } from "react-icons/ri";
import SignOut from "../Authentication/SignOut";
import { Link } from "react-router-dom";
import { MouseEventHandler, useContext } from "react";
import UserMeContext from "../Contexts/User/UserMe";

const SideBarOptionList = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const userMe = useContext(UserMeContext)

  let options_lg = [
    "Main Dashbord",
    "Customer",
    "Billing",
    "Inventory",
    
  ];
  let links_lg = [
    "/",
    "/customer",
    "/billing",
    "/inventory",
  ];
  let options_base = [
    "Main Dashbord",
    "Customer",
    "Billing",
    "Inventory",
    "Sign out",
    
  ];
  let links_base = [
    "/",
    "/customer",
    "/billing",
    "/inventory",
    "/login",
  ];

  if (userMe.is_superuser || userMe.is_manager){

    options_lg = [
      "Main Dashbord",
      "Customer",
      "Billing",
      "Inventory",
      "Registration",
      
    ];
    links_lg = [
      "/",
      "/customer",
      "/billing",
      "/inventory",
      "/registration",
    ];
    options_base = [
      "Main Dashbord",
      "Customer",
      "Billing",
      "Inventory",
      "Registration",
      "Sign out",
      
    ];
    links_base = [
      "/",
      "/customer",
      "/billing",
      "/inventory",
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
    RxAvatar,
  ];
  const icons_base = [
    AiOutlineHome,
    LiaFileInvoiceDollarSolid,
    MdOutlineInventory,
    BsBuildings,
    PiContactlessPayment,
    RxAvatar,
  ];

  //Sign Out
  const signout = (option:string)=>{
    if (option == 'Sign out'){
      localStorage.clear()
    }
      

  }

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
      boxShadow="1px 2px 2px 0 rgba(0, 0, 0, 0.2)"
      borderRadius={10}
    >
      <HStack>
        <Icon
          color={colorMode === "light" ? "#595959" : "#d9d9d9"}
          key={index}
          as={icons_lg[index]}
        />
        <Button
          textColor={colorMode === "light" ? "#595959" : "#d9d9d9"}
          variant="link"
          textAlign="left"
        >
          <Link to={links_lg[index]}>{option}</Link>
        </Button>
      </HStack>
    </ListItem>
  ));

  // Base Screen
  const sideBarBase = options_base.map((option, index) => (
    <HStack padding={5} key={index}>
      <Icon color="gray.500" key={index} as={icons_base[index]} />
      <Button variant="link" textAlign="left">
        <Link to={links_base[index]} onClick={()=>signout(option)}>{option}</Link>
      </Button>
    </HStack>
  ));
  return (
    <>
      {/* Large Screens */}
      <Show above="lg">
        <List marginTop={5} paddingX={5}>
          {sideBar}
        </List>
        {/* Sign Out Box */}
        <SignOut />
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
