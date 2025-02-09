// Reference: https://v2.chakra-ui.com/docs/components/button/usage
import { Box, Text, Grid, GridItem, Show, Button } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Component } from "react";

// 定义 Note 类型
interface Note {
  id: string;
  Description: string;
  Creation_Timestamp: string;
  Due_date: string;
  Last_Updated_Timestamp: string;
  Priority: string;
  Status: string;
  Title: string;
}

// 定义组件的 Props 和 State 类型
interface AppProps {}

interface AppState {
  notes: Note[]; // 用来存储笔记的数组
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      notes: [], // 初始化时，笔记数组为空
    };
  }

  API_URL = "http://localhost:55038"; // 后端 API URL

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

  // 添加记录
  async addClick() {
    // 确保获取的是正确的输入框值
    var newNotes = (document.getElementById("newRecord") as HTMLInputElement)
      .value;
    const data = new FormData();
    data.append("newNotes", newNotes);

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

  // 删除记录
  async deleteClick(id: string) {
    // 确保 id 是 string 类型
    fetch(this.API_URL + "/api/React_Related/DeleteNote", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        this.refreshNotes();
      })
      .catch((error) => console.error("Error deleting note:", error));
  }

  render() {
    const { notes } = this.state;

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

        <Show above="lg">
          <GridItem area="aside">Aside</GridItem>
        </Show>

        <GridItem area="main">
          <Box p={4}>
            <Text fontSize="2xl" mb={4}>
              Notes
            </Text>

            {/* 输入框用于添加记录 */}
            <Box mb={4}>
              <input id="newRecord" type="text" placeholder="Enter new note" />
            </Box>

            {notes.length === 0 ? (
              <Text>No notes available</Text>
            ) : (
              notes.map((note) => (
                <Box
                  key={note.id}
                  mb={3}
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                >
                  <Text>ID: {note.id}</Text>
                  <Text>Title: {note.Title}</Text>
                  <Text>Description: {note.Description}</Text>
                  <Text>Status: {note.Status}</Text>
                  <Text>Due Date: {note.Due_date}</Text>
                  <Text>Priority: {note.Priority}</Text>
                  <Text>Creation Timestamp: {note.Creation_Timestamp}</Text>
                  <Text>Last Timestamp: {note.Last_Updated_Timestamp}</Text>

                  <Button
                    colorScheme="red"
                    onClick={() => this.deleteClick(note.id)}
                  >
                    Delete Record
                  </Button>
                </Box>
              ))
            )}

            <Button colorScheme="blue" onClick={() => this.addClick()}>
              Add Record
            </Button>
          </Box>
        </GridItem>
      </Grid>
    );
  }
}

export default App;
