// components/NoteForm.tsx
// 用于笔记的添加和编辑表单
import React from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Note } from "../types"; // 引入 types.ts 中的 Note 类型

interface NoteFormProps {
  newNote: Note;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Note
  ) => void;
  addClick: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  newNote,
  handleInputChange,
  addClick,
}) => {
  return (
    <Box mb={4}>
      <FormControl mb={2}>
        <FormLabel htmlFor="Title">Title</FormLabel>
        <Input
          id="Title"
          value={newNote.Title}
          onChange={(e) => handleInputChange(e, "Title")}
        />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="Description">Description</FormLabel>
        <Input
          id="Description"
          value={newNote.Description}
          onChange={(e) => handleInputChange(e, "Description")}
        />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="Due_date">Due Date</FormLabel>
        <Input
          id="Due_date"
          value={newNote.Due_date}
          onChange={(e) => handleInputChange(e, "Due_date")}
        />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="Priority">Priority</FormLabel>
        <Input
          id="Priority"
          value={newNote.Priority}
          onChange={(e) => handleInputChange(e, "Priority")}
        />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="Status">Status</FormLabel>
        <Input
          id="Status"
          value={newNote.Status}
          onChange={(e) => handleInputChange(e, "Status")}
        />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="Creation_Timestamp">Creation Timestamp</FormLabel>
        <Input
          id="Creation_Timestamp"
          value={newNote.Creation_Timestamp}
          onChange={(e) => handleInputChange(e, "Creation_Timestamp")}
        />
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="Last_Updated_Timestamp">
          Last Updated Timestamp
        </FormLabel>
        <Input
          id="Last_Updated_Timestamp"
          value={newNote.Last_Updated_Timestamp}
          onChange={(e) => handleInputChange(e, "Last_Updated_Timestamp")}
        />
      </FormControl>

      <Button colorScheme="blue" onClick={addClick}>
        Add Record
      </Button>
    </Box>
  );
};

export default NoteForm;
