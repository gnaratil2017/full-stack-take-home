import { AddComment } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
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

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ height: 45 }}>
        <Typography variant="body1">Notes</Typography>

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
      </Box>

      {isCreating && <CreateNoteForm chatroomId={chatroom.id} handleClose={() => setIsCreating(false)} />}

      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        chatroomNotes.map((note) => (
          <NoteListItem key={note.id} note={note} chatroomId={chatroom.id} />
        ))
      )}
    </Box>
  );
};
