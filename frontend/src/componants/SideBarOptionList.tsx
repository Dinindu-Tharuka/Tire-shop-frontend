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
} from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineInventory } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BsBuildings, BsChevronDown } from "react-icons/bs";
import { PiContactlessPayment } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { SiChase } from "react-icons/si";
import { RiShutDownLine } from "react-icons/ri";
import SignOut from "./SignOut";

const SideBarOptionList = () => {
  const options_lg = [
    "Main Dashbord",
    "Invoice",
    "Add Inventory",
    "Rebuilt Section",
    "GRN",
    "Registration",
  ];
  const options_base = [
    "Main Dashbord",
    "Invoice",
    "Add Inventory",
    "Rebuilt Section",
    "GRN",
    "Registration",
    "Sign out",
  ];
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
    RiShutDownLine,
  ];

  // Large Screens
  const sideBar = options_lg.map((option, index) => (
    <ListItem padding={4} _hover={{ background: "coral" }} boxShadow='1px 2px 2px 0 rgba(0, 0, 0, 0.2)' borderRadius={10}>
      <HStack>
        <Icon color="gray.500" key={index} as={icons_lg[index]} />
        <Button variant="link" textAlign="left">
          {option}
        </Button>
      </HStack>
    </ListItem>
  ));

  // Base Screen
  const sideBarBase = options_base.map((option, index) => (
    <HStack padding={5}>
      <Icon color="gray.500" key={index} as={icons_base[index]} />
      <Button variant="link" textAlign="left">
        {option}
      </Button>
    </HStack>
  ));
  return (
    <>
      {/* Large Screens */}
      <Show above="lg">
        <List marginTop={5} paddingX={5}>{sideBar}</List>
        {/* Sign Out Box */}
        <SignOut />
      </Show>

      {/* Base Screen */}
      <Show below="lg">
        <Menu>
          <MenuButton as={Button} rightIcon={<SiChase />}></MenuButton>
          <MenuList>{sideBarBase}</MenuList>
        </Menu>
      </Show>
    </>
  );
};

export default SideBarOptionList;
