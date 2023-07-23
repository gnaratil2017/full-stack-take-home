import { DeleteOutline } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import { ChatroomNoteDataFragment } from "~src/codegen/graphql";
import { useDeleteChatroomNote } from "./useDeleteChatroomNote";

export type NoteListItemProps = {
  note: ChatroomNoteDataFragment;
  chatroomId: string
};

export const NoteListItem: React.FC<NoteListItemProps> = ({ note, chatroomId }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [deleteNote, { loading, error, reset }] = useDeleteChatroomNote(chatroomId)

  const handleClose = () => {
    setOpen(false);
    reset();
  }

  const handleConfirm = () => {
    deleteNote({
      variables: { noteId: note.id },
      onCompleted: handleClose,
    });
  };

  return (
    <>
      <Card sx={{ backgroundColor: theme.palette.grey[900], padding: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
            {note.content}

            <IconButton onClick={() => setOpen(true)} sx={{ alignSelf: "flex-start" }}>
              <DeleteOutline />
            </IconButton>
        </Box>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        {error && <Alert severity="error">We're sorry, something went wrong. Please try again.</Alert>}

        <DialogTitle>Delete Note?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size="1em" />
              ) : null
            }
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};
