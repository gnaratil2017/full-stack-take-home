import { AddComment } from "@mui/icons-material";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";

import { ChatroomDataFragment, useChatroomNotesQuery } from "~src/codegen/graphql";
import { NoteListItem } from "./NoteListItem";
import { CreateNoteForm } from "./CreateNoteForm";
import { ErrorBanner } from "~src/modules/shared/ErrorBanner";

export type NotesSectionProps = {
  chatroom: ChatroomDataFragment;
};

export const NotesSection: React.FC<NotesSectionProps> = ({ chatroom }) => {
  const [isCreating, setIsCreating] = useState(false)

  const { data, loading, error } = useChatroomNotesQuery({ variables: { chatroomId: chatroom.id  }});

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

      {error && <ErrorBanner customMessage="We're sorry, we were unable to fetch the notes." />}

      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {chatroomNotes.length === 0 && !isCreating && !error && (
            <Alert severity="info" variant="outlined">No notes.</Alert>
          )}

          {chatroomNotes.map((note) => (
            <NoteListItem key={note.id} note={note} chatroomId={chatroom.id} />
          ))}
        </>
      )}
    </Box>
  );
};
