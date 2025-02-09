// Reference: https://v2.chakra-ui.com/docs/components/button/usage
import {
  Box,
  Text,
  Grid,
  GridItem,
  Show,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Component } from "react";
import SortSelector from "./components/SortSelector"; // 引入SortSelector组件

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
  newNote: Note; // 新的记录数据
  sortOrder: string; // 用于排序
  filter: { [key: string]: string }; // 筛选条件
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      notes: [], // 初始化时，笔记数组为空
      newNote: {
        id: "",
        Description: "",
        Creation_Timestamp: "",
        Due_date: "",
        Last_Updated_Timestamp: "",
        Priority: "",
        Status: "",
        Title: "",
      },
      sortOrder: "", // 默认排序
      filter: {
        Due_date: "",
        Priority: "",
        Status: "",
      },
    };
  }

  API_URL = "http://localhost:55038"; // 后端 API URL

  componentDidMount() {
    this.refreshNotes();
  }

  // 获取数据并刷新
  async refreshNotes() {
    try {
      const response = await fetch(this.API_URL + "/api/React_Related/GetNote");
      const data: Note[] = await response.json();
      this.setState({ notes: data });
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // 处理输入框变化
  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Note
  ) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      newNote: {
        ...prevState.newNote,
        [field]: value, // 动态设置字段值
      },
    }));
  };

  // 添加记录
  async addClick() {
    const { newNote } = this.state;
    const data = new FormData();

    // 将所有字段添加到 FormData 中
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

  // 删除记录
  async deleteClick(id: string) {
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

  // 选择排序顺序
  onSelectSortOrder = (sortOrder: string) => {
    this.setState({ sortOrder }, () => {
      this.refreshNotes(); // 选择排序后刷新笔记
    });
  };

  // 处理筛选变化
  handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: string
  ) => {
    const { value } = e.target;
    this.setState(
      (prevState) => ({
        filter: {
          ...prevState.filter,
          [field]: value, // 动态设置筛选条件
        },
      }),
      () => {
        this.refreshNotes(); // 筛选后刷新笔记
      }
    );
  };

  render() {
    const { notes, newNote, sortOrder, filter } = this.state;

    // 根据排序和筛选条件过滤和排序笔记
    let filteredNotes = notes.filter((note) => {
      return (
        (filter.Due_date ? note.Due_date.includes(filter.Due_date) : true) &&
        (filter.Priority ? note.Priority.includes(filter.Priority) : true) &&
        (filter.Status ? note.Status.includes(filter.Status) : true)
      );
    });

    if (sortOrder) {
      filteredNotes = filteredNotes.sort((a, b) => {
        if (sortOrder === "name") {
          return a.Title.localeCompare(b.Title);
        }
        if (sortOrder === "-added") {
          return (
            new Date(b.Creation_Timestamp).getTime() -
            new Date(a.Creation_Timestamp).getTime()
          );
        }
        return 0;
      });
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

        <Show above="lg">
          <GridItem area="aside">Aside</GridItem>
        </Show>

        <GridItem area="main">
          <Box p={4}>
            <Text fontSize="2xl" mb={4}>
              Notes
            </Text>

            {/* 添加新记录表单 */}
            <Box mb={4}>
              <FormControl mb={2}>
                <FormLabel htmlFor="Title">Title</FormLabel>
                <Input
                  id="Title"
                  value={newNote.Title}
                  onChange={(e) => this.handleInputChange(e, "Title")}
                />
              </FormControl>

              <FormControl mb={2}>
                <FormLabel htmlFor="Description">Description</FormLabel>
                <Input
                  id="Description"
                  value={newNote.Description}
                  onChange={(e) => this.handleInputChange(e, "Description")}
                />
              </FormControl>

              <FormControl mb={2}>
                <FormLabel htmlFor="Due_date">Due Date</FormLabel>
                <Input
                  id="Due_date"
                  value={newNote.Due_date}
                  onChange={(e) => this.handleInputChange(e, "Due_date")}
                />
              </FormControl>

              <FormControl mb={2}>
                <FormLabel htmlFor="Priority">Priority</FormLabel>
                <Input
                  id="Priority"
                  value={newNote.Priority}
                  onChange={(e) => this.handleInputChange(e, "Priority")}
                />
              </FormControl>

              <FormControl mb={2}>
                <FormLabel htmlFor="Status">Status</FormLabel>
                <Input
                  id="Status"
                  value={newNote.Status}
                  onChange={(e) => this.handleInputChange(e, "Status")}
                />
              </FormControl>

              <FormControl mb={2}>
                <FormLabel htmlFor="Creation_Timestamp">
                  Creation Timestamp
                </FormLabel>
                <Input
                  id="Creation_Timestamp"
                  value={newNote.Creation_Timestamp}
                  onChange={(e) =>
                    this.handleInputChange(e, "Creation_Timestamp")
                  }
                />
              </FormControl>

              <FormControl mb={2}>
                <FormLabel htmlFor="Last_Updated_Timestamp">
                  Last Updated Timestamp
                </FormLabel>
                <Input
                  id="Last_Updated_Timestamp"
                  value={newNote.Last_Updated_Timestamp}
                  onChange={(e) =>
                    this.handleInputChange(e, "Last_Updated_Timestamp")
                  }
                />
              </FormControl>
            </Box>

            {/* 添加记录按钮 */}
            <Button colorScheme="blue" onClick={() => this.addClick()}>
              Add Record
            </Button>

            {/* Sort and Filter Options */}
            <Box mt={4}>
              <SortSelector
                onSelectSortOrder={this.onSelectSortOrder}
                sortOrder={sortOrder}
              />
              <Select
                placeholder="Filter by Due Date"
                value={filter.Due_date}
                onChange={(e) => this.handleFilterChange(e, "Due_date")}
                mt={2}
              >
                <option value="2025-02-09">2025-02-09</option>
                {/* Add more filter options here */}
              </Select>

              <Select
                placeholder="Filter by Priority"
                value={filter.Priority}
                onChange={(e) => this.handleFilterChange(e, "Priority")}
                mt={2}
              >
                <option value="High">High</option>
                <option value="Low">Low</option>
              </Select>

              <Select
                placeholder="Filter by Status"
                value={filter.Status}
                onChange={(e) => this.handleFilterChange(e, "Status")}
                mt={2}
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </Select>
            </Box>

            {/* 显示已有的记录 */}
            {filteredNotes.length === 0 ? (
              <Text>No notes available</Text>
            ) : (
              filteredNotes.map((note) => (
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
          </Box>
        </GridItem>
      </Grid>
    );
  }
}

export default App;
