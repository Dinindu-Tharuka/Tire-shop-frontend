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

const SideBarOptionList = () => {
  const options = [
    "Main Dashbord",
    "Invoice",
    "Add Inventory",
    "Rebuilt Section",
    "GRN",
    "Registration",
  ];
  const icons = [
    AiOutlineHome,
    LiaFileInvoiceDollarSolid,
    MdOutlineInventory,
    BsBuildings,
    PiContactlessPayment,
    RxAvatar,
  ];

  const sideBar = options.map((option, index) => (
    <ListItem padding={5}>
      <HStack>
        <Icon key={index} as={icons[index]} />
        <Button variant="link" textAlign="left">
          {option}
        </Button>
      </HStack>
    </ListItem>
  ));
  const sideBarBase = options.map((option, index) => (
    <HStack padding={5}>
      <Icon key={index} as={icons[index]} />
      <Button variant="link" textAlign="left">
        {option}
      </Button>
    </HStack>
  ));
  return (
    <>
      <Show above="lg">
        <List>{sideBar}</List>
      </Show>
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
