/////////////////////////////////////////////////////////////////////////////////////
// src/App.tsx
// The application uses the Chakra UI library for UI components.
// Reference: https://v2.chakra-ui.com/docs/components/button/usage
// The core of a task management app that allows users to view, add, and delete notes,
// as well as sort and filter them.
// The app communicates with back-end services to fetch and manage data via an API.
/////////////////////////////////////////////////////////////////////////////////////
// Introducing dependencies
import React, { Component } from "react"; // modules from the react library for creating React components.
import { Grid, GridItem, Box, Text } from "@chakra-ui/react"; // Components from the Chakra UI library to help build responsive layouts and interfaces.
// custom components
import NavBar from "./components/NavBar"; // displaying the navigation bar,
import NoteForm from "./components/NoteForm"; //  adding a note form
import NoteList from "./components/NoteList"; // displaying a list of notes
import { Note } from "./types";
import SortSelector from "./components/SortSelector"; // selecting a sorting method
import FilterSelector from "./components/FilterSelector"; // selecting filter criteria.
/////////////////////////////////////////////////////////////////////////////////////
// Defining AppState Type
interface AppState {
  // Defines the state structure of the component
  notes: Note[]; // An array of the currently displayed notes.
  newNote: Note; // The note that is currently being edited.
  sortOrder: string; // The current sort condition.
  filters: { [key: string]: string }; // Filter conditions, such as filtering notes by priority, status, or date.
}
/////////////////////////////////////////////////////////////////////////////////////
class App extends Component<{}, AppState> {
  /////////////////////////////////////////////////////////////////////////////////////
  // component constructor:
  // Initialising components
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
  ////////////////////////////////////////////////////////////////////////////////////
  // defines the address of the back-end API
  API_URL = "http://localhost:55038";
  /////////////////////////////////////////////////////////////////////////////////////
  // A lifecycle method that automatically calls the refreshNotes() function
  // after the component is mounted to get the notes data from the backend.
  componentDidMount() {
    this.refreshNotes();
  }
  ////////////////////////////////////////////////////////////////////////////////////
  // Get Note Data ///////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  // Get all notes from the backend API via fetch and update the component state notes
  // Function: The main purpose of this code is to fetch the notes data from the backend API and store it in the component's state.
  // Asynchronous operations: asynchronous requests are handled via async/await to ensure that the data is fetched before updating the state.
  // Error handling: if any error occurs during the request, catch catches and prints the error message.
  async refreshNotes() {
    // The async keyword marks the refreshNotes method as an asynchronous function. The function performs an asynchronous operation internally and returns a Promise, which can be awaited until the asynchronous operation completes.
    try {
      // fetch() is a browser's built-in API for making network requests, here to the backend to get the notes data.
      // This.API_URL is the base URL for the backend service (assumed to be http://localhost:55038),
      // and the request path is /api/React_Related/GetNote.
      // The await keyword waits for the response to the fetch request to be returned.
      // If the request is successful, the response will contain the contents of the response.
      // fetch() returns a Promise, that's why use await to wait for it to return a result.
      // await pauses the code until the fetch request completes.
      const response = await fetch(this.API_URL + "/api/React_Related/GetNote");
      // response.json() parses the data in the response object into JSON format.
      // await will wait for response.json() to return the parsed JSON data.
      // data: Note[] declares that the data variable is of type Note[] (i.e. an array of note objects).
      // The response JSON data should be an array conforming to the structure of the Note type.
      // Wait for the result of JSON parsing by await.
      const data: Note[] = await response.json();
      // this.setState() is React's method for updating the state of a component.
      // this.setState({ notes: data }) updates the state of the component, with notes set to the data retrieved from the backend API.
      // This step causes the component to re-render, displaying the new notes data.
      this.setState({ notes: data });
      // If an error occurs in the fetch request above (e.g., network failure, server error, etc.), the code in the catch block will be executed.
      // console.error(‘Error fetching notes:’, error); Prints the error message to the browser's console for debugging purposes.
      // error is the error object received by the catch block, which can contain specific error information to help the developer understand what happened.
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////
  // Processing Input Changes ////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  // handle changes to form fields and ensure that the data entered by the user in the form is correctly updated into the component's state.
  // Whenever the user changes something in an input box or drop-down box, handleInputChange is triggered and it dynamically updates the corresponding field in the newNote object.
  // if the user changes the title, the field will be "Title" and the value will be what the user entered in the input box. The Title field in the newNote object is then updated with this new value.
  // In this way, the newNote object will always keep the latest user input value.
  handleInputChange = (
    // Defines an arrow function called handleInputChange that accepts two arguments:
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, // An event object that represents the input event that occurred. It can be an event for an input box (<input>) or a drop-down selection box (<select>).ChangeEvent is the type of event used in React to indicate a change in the value of a form control.
    field: keyof Note // A string type representing the field in the Note object to be updated (e.g. Title, Description, Due_date, etc.). keyof Note enables the field argument to be only the name of the field already defined in the Note type.
  ) => {
    // e.target is the DOM element that triggered the event, usually an <input> or <select> element.
    // e.target.value gets the value entered or selected by the user in this input box or select box.
    // const { value } = e.target; is a deconstructed assignment that takes the value property and stores it in the variable value.
    const { value } = e.target;
    // method React uses to update the state of a component
    // prevState is the last state, which is passed as an argument to the setState function.
    // use prevState to ensure that update the state based on the current state and not an outdated state
    // The setState method returns a new state object that replaces the component's old state.
    this.setState((prevState) => ({
      // The newNote is an object used to store form input in the current state. this.setState({ newNote: ... }) This step updates the contents of the newNote object.
      newNote: {
        ...prevState.newNote, // uses the JavaScript spread operator, which copies all the properties of the prevState.newNote object into the new object. This leaves the values of the other fields in the newNote intact.
        // [field]: value Dynamically updates the value of the field field in the newNote object.
        // field is a dynamic field name (i.e. Title, Description, etc.) that represents the form item currently being updated.
        // value is the value entered or selected by the user, assigned to the corresponding field.
        // For example, if the user enters something in the ‘Title’ input box, the field would be ‘Title’ and the value would be the string entered by the user. The Title field in newNote is then updated with the value entered by the user.
        [field]: value,
      },
    }));
  };
  ////////////////////////////////////////////////////////////////////////////////////
  // Add Notes
  // sends the new note data entered by the user to the backend via a POST request.
  // After a successful addition, the refreshNotes method is called to refetch the list of notes.
  async addClick() {
    // an asynchronous function. addClick is the function that will be called when the user clicks the ‘Add Note’ button. It is responsible for handling the request to add a note and updating the component state.
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
  ////////////////////////////////////////////////////////////////////////////////////
  // Delete Notes
  // delete a note with a specified ID.
  // The deletion request is sent to the backend API via a DELETE request,
  // and the list of notes is updated upon success.
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
  ////////////////////////////////////////////////////////////////////////////////////
  // Processing sorted selections
  // Handles changes to sort conditions, updating sortOrder in state
  handleSelectSortOrder = (sortOrder: string) => {
    this.setState({ sortOrder });
  };
  ////////////////////////////////////////////////////////////////////////////////////
  // Handling of filter options
  // Processes changes to the filter criteria and updates the filters in the status.
  handleSelectFilter = (filter: string, value: string) => {
    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        [filter]: value,
      },
    }));
  };
  ////////////////////////////////////////////////////////////////////////////////////
  // Rendering Components
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
    ////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////
export default App;
