import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../componants/Navbar";
import SideBarOptionList from "./SideBarOptionList";
import Inventory from "../componants/Inventory/Main Page/Inventory";
import MainImage from "../componants/MainImage";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import TokenContext from "../Contexts/Auth/TokenContex";

const GridSection = () => {
  const [access, setAccess] = useState<string | null>('')
  const [refresh, setRefresh] = useState('')

  if (!localStorage.getItem('access')){
    location.reload()
  }

  
  return (
    <TokenContext.Provider value={{access, setAccess, refresh, setRefresh}}>
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
    </TokenContext.Provider>
  );
};

export default GridSection;
