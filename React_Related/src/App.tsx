// Reference: https://v2.chakra-ui.com/docs/components/button/usage
import { Button, ButtonGroup, Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    //<Button colorScheme="blue">Button</Button>; // Add button
    <Grid
      templateAreas={{
        // Build a responsive layout
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`, // 1024px
      }}
    >
      <GridItem area="nav" bg="coral">
        Nav
      </GridItem>

      <Show above="lg">
        <GridItem area="aside" bg="gold">
          Aside
        </GridItem>
      </Show>
      <GridItem area="main" bg="dodgerblue">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
