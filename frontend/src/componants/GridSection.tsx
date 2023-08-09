import { Grid, GridItem, Show } from "@chakra-ui/react";
import Navbar from "./Navbar";

const GridSection = () => {
  return (
    <Grid templateAreas={{
        base:`"nav" "main"`,
        lg:`"nav nav" "side main"`
    }}>
      <GridItem area="nav">
        <Navbar/>
      </GridItem>
      <Show above="lg">
        <GridItem area="side">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main">
        Main
      </GridItem>
    </Grid>
  );
};

export default GridSection;
