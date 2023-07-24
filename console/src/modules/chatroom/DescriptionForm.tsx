import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useUpdateChatroomDescriptionMutation } from "~src/codegen/graphql";
import { ErrorBanner } from "~src/modules/shared/ErrorBanner";

export type DescriptionFormProps = {
  chatroomId: string;
  description?: string;
  handleClose(): void;
};

export const DescriptionForm: React.FC<DescriptionFormProps> = ({
  chatroomId,
  description,
  handleClose,
}) => {
  const initialDescription = useRef(description).current
  const [descriptionValue, setDescriptionValue] = useState(description);

  const [updateChatroomDescription, { loading, error, reset }] = useUpdateChatroomDescriptionMutation();

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setDescriptionValue(event.target.value)
  };

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();

    updateChatroomDescription({
      variables: { chatroomId, newDescription: descriptionValue },
      onCompleted: handleClose,
    })
  };

  return (
    <>
      {error && <ErrorBanner />}

      <form onSubmit={handleSubmit}>
        <TextField
          name="description"
          value={descriptionValue}
          onChange={handleTextChange}
          onFocus={reset}
          disabled={loading}
          maxRows={5}
          fullWidth
          multiline
          autoFocus
        />

        <Box display="flex" justifyContent="flex-end" marginTop={1} gap={1}>
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
            disabled={loading || descriptionValue === initialDescription}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size="1em" />
              ) : null
            }
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};
