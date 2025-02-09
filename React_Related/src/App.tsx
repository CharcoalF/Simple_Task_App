// Reference: https://v2.chakra-ui.com/docs/components/button/usage
// src/App.tsx
import React, { Component } from "react";
import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { Note } from "./types";
import SortSelector from "./components/SortSelector";
import FilterSelector from "./components/FilterSelector";

interface AppState {
  notes: Note[];
  newNote: Note;
  sortOrder: string;
  filters: { [key: string]: string };
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      notes: [],
      newNote: {
        id: "",
        Title: "",
        Description: "",
        Due_date: "",
        Priority: "",
        Status: "",
        Creation_Timestamp: "",
        Last_Updated_Timestamp: "",
      },
      sortOrder: "",
      filters: {},
    };
  }

  API_URL = "http://localhost:55038";

  componentDidMount() {
    this.refreshNotes();
  }

  async refreshNotes() {
    try {
      const response = await fetch(this.API_URL + "/api/React_Related/GetNote");
      const data: Note[] = await response.json();
      this.setState({ notes: data });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Note
  ) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      newNote: {
        ...prevState.newNote,
        [field]: value,
      },
    }));
  };

  async addClick() {
    const { newNote } = this.state;
    const data = new FormData();
    for (let key in newNote) {
      data.append(key, newNote[key as keyof Note]);
    }

    fetch(this.API_URL + "/api/React_Related/AddNotes", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        this.refreshNotes();
      })
      .catch((error) => console.error("Error adding note:", error));
  }

  async deleteClick(id: string) {
    console.log("Delete button clicked, ID:", id);
    try {
      const response = await fetch(
        this.API_URL + "/api/React_Related/DeleteNote",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const result = await response.json();
      console.log("Delete result:", result);

      if (response.ok) {
        alert(result.message);
        this.refreshNotes();
      } else {
        alert("Error deleting note: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("An error occurred while deleting the note.");
    }
  }

  handleSelectSortOrder = (sortOrder: string) => {
    this.setState({ sortOrder });
  };

  handleSelectFilter = (filter: string, value: string) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [filter]: value,
      },
    }));
  };

  render() {
    const { notes, newNote, sortOrder, filters } = this.state;

    let filteredNotes = notes;
    if (filters.Status) {
      filteredNotes = filteredNotes.filter(
        (note) => note.Status === filters.Status
      );
    }
    if (filters.Priority) {
      filteredNotes = filteredNotes.filter(
        (note) => note.Priority === filters.Priority
      );
    }
    if (filters.Due_date) {
      filteredNotes = filteredNotes.filter(
        (note) => note.Due_date === filters.Due_date
      );
    }

    return (
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
      >
        <GridItem area="nav">
          <NavBar />
        </GridItem>

        <GridItem area="main">
          <Box p={4}>
            <Text fontSize="2xl" mb={4}>
              Notes
            </Text>

            <SortSelector
              onSelectSortOrder={this.handleSelectSortOrder}
              sortOrder={sortOrder}
            />

            <FilterSelector onSelectFilter={this.handleSelectFilter} />

            <NoteForm
              newNote={newNote}
              handleInputChange={this.handleInputChange}
              addClick={() => this.addClick()}
            />

            <NoteList notes={filteredNotes} deleteClick={this.deleteClick} />
          </Box>
        </GridItem>
      </Grid>
    );
  }
}

export default App;
