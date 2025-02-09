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
import { Note } from "../types";

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
  const validateTitle = (title: string) =>
    title.length === 0 || title.length > 100;
  const validateDescription = (description: string) => description.length > 500;
  const validateDueDate = (dueDate: string) =>
    !/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/.test(dueDate);

  return (
    <Box mb={4}>
      <FormControl mb={2} isInvalid={validateTitle(newNote.Title)}>
        <FormLabel htmlFor="Title">Title</FormLabel>
        <Input
          id="Title"
          value={newNote.Title}
          onChange={(e) => handleInputChange(e, "Title")}
          maxLength={100}
        />
        {validateTitle(newNote.Title) && (
          <FormErrorMessage>
            Title is required and must be less than 100 characters.
          </FormErrorMessage>
        )}
      </FormControl>

      <FormControl mb={2} isInvalid={validateDescription(newNote.Description)}>
        <FormLabel htmlFor="Description">Description</FormLabel>
        <Input
          id="Description"
          value={newNote.Description}
          onChange={(e) => handleInputChange(e, "Description")}
          maxLength={500}
        />
        {validateDescription(newNote.Description) && (
          <FormErrorMessage>
            Description cannot exceed 500 characters.
          </FormErrorMessage>
        )}
      </FormControl>

      <FormControl mb={2} isInvalid={validateDueDate(newNote.Due_date)}>
        <FormLabel htmlFor="Due_date">Due Date</FormLabel>
        <Input
          id="Due_date"
          value={newNote.Due_date}
          onChange={(e) => handleInputChange(e, "Due_date")}
          placeholder="DD/MM/YYYY"
        />
        {validateDueDate(newNote.Due_date) && (
          <FormErrorMessage>
            Due date must be in the format DD/MM/YYYY.
          </FormErrorMessage>
        )}
      </FormControl>

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

      <Button colorScheme="blue" onClick={addClick}>
        Add Record
      </Button>
    </Box>
  );
};

export default NoteForm;
