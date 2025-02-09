// components/NoteForm.tsx
// 用于笔记的添加和编辑表单
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Note } from "../types"; // 引入 types.ts 中的 Note 类型

interface NoteFormProps {
  newNote: Note;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Note
  ) => void;
  addClick: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({
  newNote,
  handleInputChange,
  addClick,
}) => {
  // 校验逻辑
  const validateTitle = (title: string) => {
    return title.length === 0 || title.length > 100;
  };

  const validateDescription = (description: string) => {
    return description.length > 500;
  };

  const validateDueDate = (dueDate: string) => {
    // 简单的正则检查日期格式 (DD/MM/YYYY)
    const regex = /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
    return !regex.test(dueDate);
  };

  return (
    <Box mb={4}>
      {/* Title */}
      <FormControl mb={2} isInvalid={validateTitle(newNote.Title)}>
        <FormLabel htmlFor="Title">Title</FormLabel>
        <Input
          id="Title"
          value={newNote.Title}
          onChange={(e) => handleInputChange(e, "Title")}
          maxLength={100} // 限制最大输入字符数
        />
        {validateTitle(newNote.Title) && (
          <FormErrorMessage>
            Title is required and must be less than 100 characters.
          </FormErrorMessage>
        )}
      </FormControl>

      {/* Description */}
      <FormControl mb={2} isInvalid={validateDescription(newNote.Description)}>
        <FormLabel htmlFor="Description">Description</FormLabel>
        <Input
          id="Description"
          value={newNote.Description}
          onChange={(e) => handleInputChange(e, "Description")}
          maxLength={500} // 限制最大输入字符数
        />
        {validateDescription(newNote.Description) && (
          <FormErrorMessage>
            Description cannot exceed 500 characters.
          </FormErrorMessage>
        )}
      </FormControl>

      {/* Due Date */}
      <FormControl mb={2} isInvalid={validateDueDate(newNote.Due_date)}>
        <FormLabel htmlFor="Due_date">Due Date</FormLabel>
        <Input
          id="Due_date"
          value={newNote.Due_date}
          onChange={(e) => handleInputChange(e, "Due_date")}
          placeholder="DD/MM/YYYY" // 提示用户输入格式
        />
        {validateDueDate(newNote.Due_date) && (
          <FormErrorMessage>
            Due date must be in the format DD/MM/YYYY.
          </FormErrorMessage>
        )}
      </FormControl>

      {/* Priority */}
      <FormControl mb={2}>
        <FormLabel htmlFor="Priority">Priority</FormLabel>
        <Select
          id="Priority"
          value={newNote.Priority}
          onChange={(e) => handleInputChange(e, "Priority")}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </Select>
      </FormControl>

      {/* Status */}
      <FormControl mb={2}>
        <FormLabel htmlFor="Status">Status</FormLabel>
        <Select
          id="Status"
          value={newNote.Status}
          onChange={(e) => handleInputChange(e, "Status")}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </Select>
      </FormControl>

      {/* Creation Timestamp */}
      <FormControl mb={2}>
        <FormLabel htmlFor="Creation_Timestamp">Creation Timestamp</FormLabel>
        <Input
          id="Creation_Timestamp"
          value={newNote.Creation_Timestamp}
          onChange={(e) => handleInputChange(e, "Creation_Timestamp")}
        />
      </FormControl>

      {/* Last Updated Timestamp */}
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
