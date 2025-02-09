// Reference: https://v2.chakra-ui.com/docs/components/button/usage
import { Box, Text, Grid, GridItem, Show } from "@chakra-ui/react";
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

  // 组件挂载后自动调用的函数，用于加载笔记
  componentDidMount() {
    this.refreshNotes();
  }

  // 从 API 获取笔记数据并更新 state
  async refreshNotes() {
    try {
      const response = await fetch(this.API_URL + "/api/React_Related/GetNote");
      const data: Note[] = await response.json(); // 获取数据并转换为 Note 类型
      this.setState({ notes: data }); // 更新 state
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
          lg: `"nav nav" "aside main"`, // 对于较大的屏幕
        }}
      >
        <GridItem area="nav">
          <NavBar /> {/* 导航栏组件 */}
        </GridItem>

        <Show above="lg">
          <GridItem area="aside">Aside</GridItem>
        </Show>

        <GridItem area="main">
          <Box p={4}>
            <Text fontSize="2xl" mb={4}>
              Notes
            </Text>
            {notes.length === 0 ? (
              <Text>No notes available</Text> // 如果没有笔记，显示一条消息
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
                </Box>
              ))
            )}
          </Box>
        </GridItem>
      </Grid>
    );
  }
}

export default App;
