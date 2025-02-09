// Reference: https://v2.chakra-ui.com/docs/components/button/usage
import { Button, ButtonGroup, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

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
      <GridItem area="nav">
        {/*change NavBar color: bg="coral" */}
        <NavBar /> {/*from NavBar component*/}
      </GridItem>

      <Show above="lg">
        <GridItem area="aside">
          {" "}
          {/*change Aside color: bg="gold" */}
          Aside
        </GridItem>
      </Show>
      <GridItem area="main">
        {" "}
        {/*change Main color: bg="dodgerblue" */}
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
