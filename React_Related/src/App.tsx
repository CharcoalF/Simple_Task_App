// Reference: https://v2.chakra-ui.com/docs/components/button/usage
import { Button, ButtonGroup, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Component } from "react";

// Define a type for the note structure
interface Note {
  id: string;
  description: string;
}

// Define the Props type
interface AppProps {
  // You can define the type of props here, or leave it empty if no props are passed
}

interface AppState {
  notes: Note[]; // An array of Note objects
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      notes: [], // Initialize the notes array as an empty array of Note objects
    };
  }

  API_URL = "http://localhost:55038"; // Make sure this is your backend URL

  componentDidMount() {
    this.refreshNotes();
  }

  // Fetch and update the state with the notes from the API
  async refreshNotes() {
    try {
      const response = await fetch(this.API_URL + "/api/React_Related/GetNote");
      const data: Note[] = await response.json(); // Define the data type as an array of Note objects
      this.setState({ notes: data });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  render() {
    const { notes } = this.state;

    return (
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`, // For larger screens (1024px)
        }}
      >
        <GridItem area="nav">
          <NavBar /> {/* From NavBar component */}
        </GridItem>

        <Show above="lg">
          <GridItem area="aside">Aside</GridItem>
        </Show>
        <GridItem area="main">Main</GridItem>
      </Grid>
    );
  }
}

export default App;
