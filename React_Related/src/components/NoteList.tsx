// components/NoteList.tsx
// 用于显示笔记列表和删除按钮
import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Note } from "../types"; // 引入 types.ts 中的 Note 类型

interface NoteListProps {
  notes: Note[];
  deleteClick: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, deleteClick }) => {
  return (
    <>
      {notes.length === 0 ? (
        <Text>No notes available</Text>
      ) : (
        notes.map((note) => (
          <Box key={note.id} mb={3} p={4} borderWidth={1} borderRadius="md">
            <Text>ID: {note.id}</Text>
            <Text>Title: {note.Title}</Text>
            <Text>Description: {note.Description}</Text>
            <Text>Status: {note.Status}</Text>
            <Text>Due Date: {note.Due_date}</Text>
            <Text>Priority: {note.Priority}</Text>
            <Text>Creation Timestamp: {note.Creation_Timestamp}</Text>
            <Text>Last Timestamp: {note.Last_Updated_Timestamp}</Text>

            <Button colorScheme="red" onClick={() => deleteClick(note.id)}>
              Delete Record
            </Button>
          </Box>
        ))
      )}
    </>
  );
};

export default NoteList;
