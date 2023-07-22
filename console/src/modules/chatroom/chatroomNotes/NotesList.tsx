import { AddComment } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { useState } from "react";

import { ChatroomDataFragment, useChatroomNotesQuery } from "~src/codegen/graphql";
import { NoteListItem } from "./NoteListItem";
import { CreateNoteForm } from "./CreateNoteForm";

export type NotesListProps = {
  chatroom: ChatroomDataFragment;
};

export const NotesList: React.FC<NotesListProps> = ({ chatroom }) => {
  const [isCreating, setIsCreating] = useState(false)

  const { data, loading } = useChatroomNotesQuery({ variables: { chatroomId: chatroom.id  }});

  const chatroomNotes = data?.chatroomNotes ?? [];

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {!isCreating && (
        <Button
          size="small"
          variant="contained"
          startIcon={<AddComment />}
          onClick={() => setIsCreating(true)}
        >
          New Note
        </Button>
      )}

      {isCreating && <CreateNoteForm chatroomId={chatroom.id} handleClose={() => setIsCreating(false)} />}

      {chatroomNotes.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </Box>
  );
};
