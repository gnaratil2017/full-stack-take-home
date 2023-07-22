import { Alert, Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";
import { ChatroomNotesDocument, useCreateChatroomNoteMutation } from "~src/codegen/graphql";

export type CreateNoteFormProps = {
  chatroomId: string;
  handleClose(): void;
};

export const CreateNoteForm: React.FC<CreateNoteFormProps> = ({
  chatroomId,
  handleClose,
}) => {
  const [contentValue, setContentValue] = useState('');

  const [createChatroomNote, { loading, error, reset }] = useCreateChatroomNoteMutation({
    refetchQueries: [{ query: ChatroomNotesDocument, variables: { chatroomId }}],
    awaitRefetchQueries: true,
  });

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setContentValue(event.target.value)
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    createChatroomNote({
      variables: { chatroomId, content: contentValue.trim() },
      onCompleted: () => handleClose(),
    })
  };

  return (
    <>
      {error && <Alert severity="error">We're sorry, something went wrong. Please try again.</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          name="content"
          value={contentValue}
          onChange={handleTextChange}
          onFocus={reset}
          disabled={loading}
          maxRows={5}
          fullWidth
          multiline
          autoFocus
        />

        <Box display="flex" justifyContent="flex-end" marginTop={4} gap={1}>
          <Button
            size="small"
            variant="text"
            color="primary"
            disabled={loading}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading || contentValue === ''}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size="1em" />
              ) : null
            }
          >
            Create
          </Button>
        </Box>
      </form>
    </>
  );
};
