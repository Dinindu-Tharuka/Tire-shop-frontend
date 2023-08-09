import { Grid, GridItem, Show } from "@chakra-ui/react";

const GridSection = () => {
  return (
    <Grid templateAreas={{
        base:`"nav" "main"`,
        lg:`"nav nav" "side main"`
    }}>
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>
      <Show above="lg">
        <GridItem area="side" bg="blue">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="red">
        Main
      </GridItem>
    </Grid>
  );
};

export default GridSection;
