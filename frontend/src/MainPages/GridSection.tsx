import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../componants/Navbar";
import SideBarOptionList from "./SideBarOptionList";
import Inventory from "../componants/Inventory/Main Page/Inventory";
import MainImage from "../componants/MainImage";
import { Outlet } from "react-router-dom";

const GridSection = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "side" "main"`,
        lg: `"nav nav" "side main"`,
      }}
    >
      <GridItem
        area="nav"
        height={{ base: "10vh", lg: "10vh" }}
        marginBottom={5}
      >
        <Navbar />
      </GridItem>

      <GridItem
        area="side"
        height={{ base: "10vh", lg: "85vh" }}
        width={{ base: "100vw", lg: "20vw" }}
      >
        <SideBarOptionList />
      </GridItem>

      <GridItem
        area="main"
        height={{ base: "80vh", lg: "85vh" }}
        width={{ base: "100vw", lg: "80vw" }}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default GridSection;
